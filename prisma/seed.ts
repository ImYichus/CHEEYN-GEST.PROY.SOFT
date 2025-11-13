import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Iniciando seed de la base de datos...');

  // Crear categorías
  const categoriaVestidos = await prisma.categoria.upsert({
    where: { nombre: 'Vestidos' },
    update: {},
    create: {
      nombre: 'Vestidos',
      descripcion: 'Vestidos elegantes y casuales',
    },
  });

  const categoriaBlusas = await prisma.categoria.upsert({
    where: { nombre: 'Blusas' },
    update: {},
    create: {
      nombre: 'Blusas',
      descripcion: 'Blusas para toda ocasión',
    },
  });

  const categoriaPantalones = await prisma.categoria.upsert({
    where: { nombre: 'Pantalones' },
    update: {},
    create: {
      nombre: 'Pantalones',
      descripcion: 'Pantalones cómodos y elegantes',
    },
  });

  console.log('✅ Categorías creadas');

  // Crear productos con tus imágenes
  
  const producto1 = await prisma.producto.create({
    data: {
      nombre: 'Vestido Elegante',
      descripcion: 'Hermoso vestido con estampado floral para ocasiones especiales',
      precio: 149.99,
      sku: 'VEST-002',
      imagenUrl: 'https://th.bing.com/th/id/OIP.Q4_BNNZEr5rEmYew_6JfCgHaJQ?w=197&h=246&c=7&r=0&o=7&pid=1.7&rm=3',
      categoriaId: categoriaVestidos.id,
      variantes: {
        create: [
          { talla: 'S', color: 'Floral', stock: 2, inStock: true },
          { talla: 'M', color: 'Floral', stock: 5, inStock: true },
          { talla: 'L', color: 'Floral', stock: 8, inStock: true },
        ],
      },
      multimedia: {
        create: [
          {
            url: 'https://th.bing.com/th/id/OIP.Q4_BNNZEr5rEmYew_6JfCgHaJQ?w=197&h=246&c=7&r=0&o=7&pid=1.7&rm=3',
            esImagen: true,
            orden: 0,
          },
        ],
      },
    },
  });

  const producto2 = await prisma.producto.create({
    data: {
      nombre: 'Blusa Casual Moderna',
      descripcion: 'Blusa cómoda y elegante para uso diario',
      precio: 45.00,
      sku: 'BLUS-002',
      imagenUrl: 'https://th.bing.com/th/id/OIP.Rom95X4a0_QKCw7w7eZbJAHaLG?w=197&h=296&c=7&r=0&o=7&pid=1.7&rm=3',
      categoriaId: categoriaBlusas.id,
      variantes: {
        create: [
          { talla: 'S', color: 'Blanco', stock: 20, inStock: true },
          { talla: 'M', color: 'Blanco', stock: 25, inStock: true },
          { talla: 'L', color: 'Blanco', stock: 12, inStock: true },
        ],
      },
      multimedia: {
        create: [
          {
            url: 'https://th.bing.com/th/id/OIP.Rom95X4a0_QKCw7w7eZbJAHaLG?w=197&h=296&c=7&r=0&o=7&pid=1.7&rm=3',
            esImagen: true,
            orden: 0,
          },
        ],
      },
    },
  });

  const producto3 = await prisma.producto.create({
    data: {
      nombre: 'Pantalón Casual Elegante',
      descripcion: 'Pantalón cómodo para toda ocasión',
      precio: 79.99,
      sku: 'PANT-002',
      imagenUrl: 'https://i5.walmartimages.com.mx/mg/gm/1p/images/product-images/img_large/00750193047030l.jpg?odnHeight=612&odnWidth=612&odnBg=FFFFFF',
      categoriaId: categoriaPantalones.id,
      variantes: {
        create: [
          { talla: '28', color: 'Beige', stock: 15, inStock: true },
          { talla: '30', color: 'Beige', stock: 18, inStock: true },
          { talla: '32', color: 'Beige', stock: 10, inStock: true },
          { talla: '34', color: 'Beige', stock: 7, inStock: true },
        ],
      },
      multimedia: {
        create: [
          {
            url: 'https://i5.walmartimages.com.mx/mg/gm/1p/images/product-images/img_large/00750193047030l.jpg?odnHeight=612&odnWidth=612&odnBg=FFFFFF',
            esImagen: true,
            orden: 0,
          },
        ],
      },
    },
  });

  console.log('✅ Productos creados:', {
    producto1: producto1.nombre,
    producto2: producto2.nombre,
    producto3: producto3.nombre,
  });

  console.log('🎉 Seed completado exitosamente!');
}

main()
  .catch((e) => {
    console.error('❌ Error durante el seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
