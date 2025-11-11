'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    if (!email || !password) {
      setError('Por favor, ingresa tu correo y contraseña.');
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        // Manejar errores de credenciales inválidas (status 401)
        setError(data.message || 'Credenciales inválidas. Verifica tu correo y contraseña.');
        setIsLoading(false);
        return;
      }

      // Login exitoso: La cookie HTTP-Only se ha establecido en el navegador
      // Redirigir al área protegida (ejemplo: '/products')
      router.push('/products');

    } catch (err) {
      console.error('Error de red o conexión:', err);
      setError('Error de conexión con el servidor. Intenta de nuevo.');
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#d8f3dc]">
      <div className="p-8 bg-white shadow-2xl rounded-lg w-full max-w-md">

        <h1 className="text-3xl font-bold mb-6 text-center text-[#1e5128]">
          Iniciar Sesión
        </h1>

        {error && (
          <p className="mb-4 p-3 bg-red-100 text-red-700 border border-red-300 rounded">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[#1e5128]" htmlFor="email">Correo Electrónico</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isLoading}
              className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-[#4e9f3d] focus:border-[#4e9f3d] disabled:bg-gray-50"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#1e5128]" htmlFor="password">Contraseña</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={isLoading}
              className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-[#4e9f3d] focus:border-[#4e9f3d] disabled:bg-gray-50"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 px-4 border border-transparent rounded-md shadow-lg text-lg font-semibold text-white bg-[#4e9f3d] hover:bg-[#3d8130] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#4e9f3d] transition duration-150 ease-in-out mt-6 disabled:bg-gray-400"
          >
            {isLoading ? 'Iniciando Sesión...' : 'Entrar a Cheeyn'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          ¿No tienes cuenta?
          <a href="/signup" className="font-medium text-[#4e9f3d] hover:text-[#1e5128]">Regístrate aquí</a>
        </p>
      </div>
    </div>
  );
}