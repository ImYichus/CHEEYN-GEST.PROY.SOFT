import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '@/lib/prisma';

// Requerido: Debes crear una clave secreta para firmar los tokens JWT.
// AGREGAR ESTO EN TU ARCHIVO .env (en desarrollo, puedes usar una cadena random)
// Ejemplo en .env: JWT_SECRET="tu_clave_secreta_muy_larga"
const JWT_SECRET = process.env.JWT_SECRET || 'mi-secreto-super-seguro-default-solo-dev';

/**
 * Maneja las peticiones POST para el inicio de sesión.
 * Ruta: /api/auth/login
 */
export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ message: 'Email and password are required' }, { status: 400 });
    }

    // 1. Buscar el usuario por email
    const user = await prisma.usuario.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json({ message: 'Credenciales inválidas' }, { status: 401 });
    }

    // 2. Comparar la contraseña ingresada con el hash guardado
    const passwordMatch = await bcrypt.compare(password, user.passwordHash);

    if (!passwordMatch) {
      return NextResponse.json({ message: 'Credenciales inválidas' }, { status: 401 });
    }

    // 3. Generar el Token JWT
    const token = jwt.sign(
      { userId: user.id, email: user.email, rol: user.rol },
      JWT_SECRET,
      { expiresIn: '1d' } // El token expira en 1 día
    );

    // 4. Crear una respuesta para establecer el token como cookie HTTP-Only
    const response = NextResponse.json(
      { 
        message: 'Login exitoso', 
        user: { id: user.id, nombre: user.nombre, email: user.email, rol: user.rol } 
      }, 
      { status: 200 }
    );

    // Configurar la cookie (la mejor práctica para tokens JWT en Next.js)
    response.cookies.set('auth_token', token, {
      httpOnly: true, // No accesible vía JavaScript del lado del cliente
      secure: process.env.NODE_ENV === 'production', // Solo si estás en producción (HTTPS)
      sameSite: 'strict', // Protección CSRF
      maxAge: 60 * 60 * 24, // 1 día (igual que la expiración del token)
      path: '/',
    });

    return response;

  } catch (error) {
    console.error('Error during login:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}