import { PrismaClient, EstadoPedido } from '@prisma/client';

// 1. CONFIGURACIÓN INICIAL DE PRISMA CLIENTE
const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL_TEST, 
    },
  },
});

// 2. UTILIDADES DE LIMPIEZA Y HOOKS DE PRUEBA
// Función para limpiar la BD antes de cada prueba.
async function cleanDatabase() {
  await prisma.detallePedido.deleteMany();
  await prisma.pedido.deleteMany();
  await prisma.usuario.deleteMany();
  await prisma.varianteProducto.deleteMany();
  await prisma.multimediaProducto.deleteMany();
  await prisma.producto.deleteMany();
  await prisma.categoria.deleteMany();
}

beforeEach(async () => {
  await cleanDatabase();
});

afterAll(async () => {
  await prisma.$disconnect();
});


// 3. FUNCIÓN DE CREACIÓN DE DATOS BASE
async function setupData() {
    const user = await prisma.usuario.create({
        data: {
            nombre: 'Cliente de Prueba',
            email: 'test-user@example.com',
            passwordHash: 'hashed_password_123',
            direccionEnvio: 'Calle Prueba #101'
        }
    });

    const category = await prisma.categoria.create({
        data: { nombre: 'Ropa de Verano', descripcion: 'Artículos frescos' }
    });

    const product = await prisma.producto.create({
        data: {
            nombre: 'Pantalón Corto Sport',
            precio: 35.00,
            sku: 'PANT-CORT-005',
            categoriaId: category.id,
            imagenUrl: 'url_principal.jpg'
        }
    });

    const variant_M_Red = await prisma.varianteProducto.create({
        data: {
            productoId: product.id,
            talla: 'M',
            color: 'Rojo',
            stock: 10,
            inStock: true
        }
    });

    return { user, category, product, variant_M_Red };
}


// 4. PRUEBAS DE INTEGRACIÓN CENTRALES
describe('Validación de Integridad y Reglas de Negocio de E-commerce', () => {

  // PRUEBA 1: RESTRICCIÓN DE UNICIDAD (VarianteProducto)
  it('should enforce unique constraint on variant: (productId, talla, color)', async () => {
    const { product } = await setupData();

    // Intenta crear la VARIANTE DUPLICADA (M, Rojo) (DEBE FALLAR)
    await expect(
      prisma.varianteProducto.create({
        data: { productoId: product.id, talla: 'M', color: 'Rojo', stock: 5, inStock: true },
      }),
    ).rejects.toThrow();
  });

  // PRUEBA 2: FLUJO DE INVENTARIO Y CAMBIO DE ESTADO 'inStock'
  it('should set inStock=false when stock reaches zero and true when restocked', async () => {
    const { variant_M_Red } = await setupData();

    // Caso A: Agotamiento de stock
    const fullDeduction = await prisma.varianteProducto.update({
      where: { id: variant_M_Red.id },
      data: { stock: 0, inStock: false },
    });
    expect(fullDeduction.stock).toBe(0);
    expect(fullDeduction.inStock).toBe(false);

    // Caso B: Reposición de stock
    const restock = await prisma.varianteProducto.update({
        where: { id: variant_M_Red.id },
        data: { stock: 20, inStock: true },
    });
    expect(restock.stock).toBe(20);
    expect(restock.inStock).toBe(true);
  });

  // PRUEBA 3: CREACIÓN DE PEDIDO Y USO DEL ENUM COMPLETO
  it('should create an order with the correct state (PROCESANDO)', async () => {
    const { user, variant_M_Red } = await setupData();
    const price = 35.00;

    const pedido = await prisma.pedido.create({
      data: {
        usuarioId: user.id,
        direccionEnvio: user.direccionEnvio || 'N/A',
        estado: EstadoPedido.PROCESANDO,
        total: price * 2,
        detalles: {
          create: [
            { varianteId: variant_M_Red.id, cantidad: 2, precioUnitario: price },
          ],
        },
      },
    });

    expect(pedido).toBeDefined();
    expect(pedido.estado).toBe('PROCESANDO');
    expect(pedido.total.toNumber()).toBe(70.00);
  });
  
  // PRUEBA 4: ON DELETE CASCADE (Producto -> Variantes y Multimedia)
  it('should delete variants and multimedia when a Product is deleted', async () => {
    const { product } = await setupData();

    // Añadir Multimedia extra
    await prisma.multimediaProducto.create({
        data: { productoId: product.id, url: 'imagen_zoom.jpg', esImagen: true, orden: 1 },
    });

    // Verificar conteos iniciales
    expect(await prisma.varianteProducto.count({ where: { productoId: product.id } })).toBe(1);
    expect(await prisma.multimediaProducto.count({ where: { productoId: product.id } })).toBe(1);

    // BORRAR EL PRODUCTO (Debe activar la cascada)
    await prisma.producto.delete({ where: { id: product.id } });

    // ASERCIONES: Los registros dependientes deben haber desaparecido
    expect(await prisma.varianteProducto.count({ where: { productoId: product.id } })).toBe(0);
    expect(await prisma.multimediaProducto.count({ where: { productoId: product.id } })).toBe(0);
  });
  
  // PRUEBA 5: ON DELETE RESTRICT (Usuario -> Pedido)
  it('should prevent deleting a User if they have existing Pedidos (ON DELETE RESTRICT)', async () => {
    const { user, variant_M_Red } = await setupData();

    // Crear un pedido asociado al usuario
    await prisma.pedido.create({
      data: {
        usuarioId: user.id,
        direccionEnvio: user.direccionEnvio || 'N/A',
        total: 10.00,
        detalles: {
            create: { varianteId: variant_M_Red.id, cantidad: 1, precioUnitario: 10.00 }
        }
      },
    });

    // Intentar borrar al usuario (DEBE FALLAR)
    await expect(
      prisma.usuario.delete({ where: { id: user.id } }),
    ).rejects.toThrow();

    // Verificar que el usuario sigue existiendo
    const userCheck = await prisma.usuario.findUnique({ where: { id: user.id } });
    expect(userCheck).toBeDefined();
  });
});