import { NextResponse } from 'next/server';
import { PrismaClient } from '@/app/generated/prisma';

declare global {
  var prisma: PrismaClient | undefined;
}

const prisma: PrismaClient = globalThis.prisma || new PrismaClient();
if (process.env.NODE_ENV !== 'production') globalThis.prisma = prisma;

export async function GET() {
  try {
    const productos = await prisma.producto.findMany({
      include: {
        categoria: true,
        multimediaProductos: true,
        variantes: true, // <-- incluir variantes
      },
    });

    // Convertir Decimal a number y agregar enStock según variantes
    const productosJSON = productos.map((p) => ({
      ...p,
      precio: Number(p.precio),
      enStock: p.variantes.some(v => v.inStock), // <-- true si alguna variante tiene stock
    }));

    return NextResponse.json(productosJSON);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Error al obtener los productos' },
      { status: 500 }
    );
  }
}
