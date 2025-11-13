import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

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
        multimedia: true,
        variantes: true,
      },
    });

    // Convertir Decimal a number y agregar enStock según variantes
    const productosJSON = productos.map((p) => ({
      ...p,
      precio: Number(p.precio),
      enStock: p.variantes.some((v) => v.inStock),
    }));

    return NextResponse.json(productosJSON);
  } catch (error) {
    console.error('Error al obtener productos:', error);
    return NextResponse.json(
      { error: 'Error al obtener los productos' },
      { status: 500 }
    );
  }
}
