import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import prisma from '@/lib/prisma'; // Usa la instancia global

/**
 * Maneja las peticiones POST para el registro de nuevos usuarios.
 * Ruta: /api/auth/signup
 */
export async function POST(request: Request) {
  try {
    const { name, email, password, phone, address } = await request.json();

    // 1. Validación básica (la validación del lado del cliente también es importante)
    if (!name || !email || !password || !phone || !address) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

    // 2. Comprobar si el usuario ya existe
    const existingUser = await prisma.usuario.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json({ message: 'El correo electrónico ya está registrado.' }, { status: 409 });
    }

    // 3. Hashear la contraseña (CRUCIAL para seguridad)
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    // 4. Crear el nuevo usuario en la base de datos
    const newUser = await prisma.usuario.create({
      data: {
        nombre: name,
        email,
        passwordHash,
        direccionEnvio: address,
        // rol: CLIENTE (por defecto en el schema.prisma)
      },
    });

    // 5. Respuesta exitosa
    // NOTA: Nunca devuelvas el passwordHash en la respuesta
    return NextResponse.json({
      message: 'Usuario registrado exitosamente',
      userId: newUser.id,
    }, { status: 201 });

  } catch (error) {
    console.error('Error during signup:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}