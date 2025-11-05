// app/(auth)/login/page.tsx

'use client'; 

import { useState } from 'react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // ** LÓGICA DE LOGIN AQUÍ **
    if (!email || !password) {
        setError('Por favor, ingresa tu correo y contraseña.');
        return;
    }

    // 2. Llamada al Route Handler (API) para autenticación
    console.log('Intentando iniciar sesión con:', { email, password });
    
    // Aquí iría el fetch() para llamar a tu API de /api/login
  };

  return (
    // Asegúrate de que este sea el primer elemento después de 'return ('
    // El comentario de una sola línea de JS (//) funciona bien aquí si está fuera del JSX.
    <div className="flex justify-center items-center min-h-screen bg-[#F9DBBD]">
      <div className="p-8 bg-white shadow-2xl rounded-lg w-full max-w-md">
        
        {/* Título usando Chocolate Cosmos (#450920) */}
        <h1 className="text-3xl font-bold mb-6 text-center text-[#450920]">
            Iniciar Sesión
        </h1>
        
        {/* Mensaje de Error */}
        {error && (
            <p className="mb-4 p-3 bg-red-100 text-red-700 border border-red-300 rounded">{error}</p>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            {/* Etiquetas usando Chocolate Cosmos (#450920) */}
            <label className="block text-sm font-medium text-[#450920]" htmlFor="email">Correo Electrónico</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              // Foco del input usando Raspberry Rose (#A53860)
              className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-[#A53860] focus:border-[#A53860]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#450920]" htmlFor="password">Contraseña</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-[#A53860] focus:border-[#A53860]"
            />
          </div>
          
          {/* Botón de Login con Raspberry Rose (#A53860) */}
          <button
            type="submit"
            className="w-full py-3 px-4 border border-transparent rounded-md shadow-lg text-lg font-semibold text-white bg-[#A53860] hover:bg-[#913052] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#A53860] transition duration-150 ease-in-out mt-6"
          >
            Entrar a Cheeyn
          </button>
        </form>
        
        <p className="mt-6 text-center text-sm text-gray-600">
          ¿No tienes cuenta? 
          {/* Enlace de Registro con Raspberry Rose (#A53860) */}
          <a href="/signup" className="font-medium text-[#A53860] hover:text-[#450920]">Regístrate aquí</a>
        </p>
      </div>
    </div>
  ); // <--- Es vital que el 'return (' se cierre aquí con ');'
} // <--- Es vital que la función se cierre aquí con '}'