'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation'; // Importa useRouter para la redirección

export default function SignupPage() {
  const router = useRouter(); // Inicializa el router
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    address: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Nuevo estado de carga

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsLoading(true);

    const { name, email, password, phone, address } = formData;

    if (!name || !email || password.length < 6 || !phone || !address) {
      setError('Por favor, completa todos los campos. La contraseña debe tener al menos 6 caracteres.');
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        // Manejar errores como "Email ya registrado"
        setError(data.message || 'Error en el registro. Inténtalo de nuevo.');
        setIsLoading(false);
        return;
      }

      setSuccess(data.message || '¡Cuenta creada con éxito! Redirigiendo a inicio de sesión...');
      // Redirigir al login después de un pequeño retraso
      setTimeout(() => {
        router.push('/login');
      }, 1500);

    } catch (err) {
      console.error('Error de red:', err);
      setError('Error de conexión con el servidor.');
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#d8f3dc]">
      <div className="p-8 bg-white shadow-2xl rounded-lg w-full max-w-lg">
        <h1 className="text-3xl font-bold mb-6 text-center text-[#1e5128]">
          Crea tu Cuenta Cheeyn
        </h1>

        {error && <p className="mb-4 p-3 bg-red-100 text-red-700 border border-red-300 rounded">{error}</p>}
        {success && <p className="mb-4 p-3 bg-[#f1f9f4] text-[#4e9f3d] border border-[#95d5b2] rounded">{success}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Nombre Completo */}
          <div>
            <label className="block text-sm font-medium text-[#1e5128]" htmlFor="name">Nombre Completo</label>
            <input
              id="name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              disabled={isLoading}
              className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-[#4e9f3d] focus:border-[#4e9f3d] disabled:bg-gray-50"
            />
          </div>

          {/* Correo Electrónico */}
          <div>
            <label className="block text-sm font-medium text-[#1e5128]" htmlFor="email">Correo Electrónico</label>
            <input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              disabled={isLoading}
              className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-[#4e9f3d] focus:border-[#4e9f3d] disabled:bg-gray-50"
            />
          </div>

          {/* Contraseña */}
          <div>
            <label className="block text-sm font-medium text-[#1e5128]" htmlFor="password">Contraseña (Mín. 6 caracteres)</label>
            <input
              id="password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              disabled={isLoading}
              className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-[#4e9f3d] focus:border-[#4e9f3d] disabled:bg-gray-50"
            />
          </div>

          {/* Teléfono */}
          <div>
            <label className="block text-sm font-medium text-[#1e5128]" htmlFor="phone">Teléfono</label>
            <input
              id="phone"
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              disabled={isLoading}
              className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-[#4e9f3d] focus:border-[#4e9f3d] disabled:bg-gray-50"
            />
          </div>

          {/* Dirección */}
          <div>
            <label className="block text-sm font-medium text-[#1e5128]" htmlFor="address">Dirección de Envío (Calle y Número)</label>
            <input
              id="address"
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
              disabled={isLoading}
              className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-[#4e9f3d] focus:border-[#4e9f3d] disabled:bg-gray-50"
            />
          </div>

          {/* Botón de Registro */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 px-4 border border-transparent rounded-md shadow-lg text-lg font-semibold text-white bg-[#4e9f3d] hover:bg-[#3d8130] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#4e9f3d] transition duration-150 ease-in-out mt-6 disabled:bg-gray-400"
          >
            {isLoading ? 'Registrando...' : 'Crear Cuenta Cheeyn'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          ¿Ya tienes cuenta? <a href="/login" className="font-medium text-[#4e9f3d] hover:text-[#1e5128]">Inicia sesión</a>
        </p>
      </div>
    </div>
  );
}