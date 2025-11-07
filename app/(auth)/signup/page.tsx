// app/(auth)/signup/page.tsx

'use client';

import { useState } from 'react';

export default function SignupPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    address: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // ** LÓGICA DE REGISTRO AQUÍ **
    const { name, email, password, phone, address } = formData;

    if (!name || !email || password.length < 6 || !phone || !address) {
        setError('Por favor, completa todos los campos. La contraseña debe tener al menos 6 caracteres.');
        return;
    }

    // 2. Llamada al Route Handler (API) para crear el usuario
    console.log('Intentando registrar usuario con datos completos:', formData);

    // Aquí iría el fetch() para llamar a tu API de /api/signup
    setSuccess('¡Cuenta creada con éxito! Serás redirigido al inicio de sesión.');
  };

  return (
    // Fondo claro usando Verde Claro (#d8f3dc)
    <div className="flex justify-center items-center min-h-screen bg-[#d8f3dc]"> 
      <div className="p-8 bg-white shadow-2xl rounded-lg w-full max-w-lg">
        {/* Título usando Verde Oscuro (#1e5128) */}
        <h1 className="text-3xl font-bold mb-6 text-center text-[#1e5128]">
          Crea tu Cuenta Cheeyn
        </h1>
        
        {/* Mensajes de Alerta y Éxito */}
        {error && <p className="mb-4 p-3 bg-red-100 text-red-700 border border-red-300 rounded">{error}</p>}
        {/* Usando Verde Claro para el éxito */}
        {success && <p className="mb-4 p-3 bg-[#f1f9f4] text-[#4e9f3d] border border-[#95d5b2] rounded">{success}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Nombre Completo */}
          <div>
            {/* Etiquetas usando Verde Oscuro (#1e5128) */}
            <label className="block text-sm font-medium text-[#1e5128]" htmlFor="name">Nombre Completo</label>
            <input
              id="name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              // Foco del input usando Verde Medio (#4e9f3d)
              className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-[#4e9f3d] focus:border-[#4e9f3d]"
            />
          </div>

          {/* ... Repite la estructura para Email, Password, Phone, y Address ... */}
          
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
              className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-[#4e9f3d] focus:border-[#4e9f3d]"
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
              className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-[#4e9f3d] focus:border-[#4e9f3d]"
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
              className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-[#4e9f3d] focus:border-[#4e9f3d]"
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
              className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-[#4e9f3d] focus:border-[#4e9f3d]"
            />
          </div>


          {/* Botón de Registro con Verde Medio (#4e9f3d) y hover más oscuro */}
          <button
            type="submit"
            className="w-full py-3 px-4 border border-transparent rounded-md shadow-lg text-lg font-semibold text-white bg-[#4e9f3d] hover:bg-[#3d8130] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#4e9f3d] transition duration-150 ease-in-out mt-6"
          >
            Crear Cuenta Cheeyn
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          ¿Ya tienes cuenta? <a href="/login" className="font-medium text-[#4e9f3d] hover:text-[#1e5128]">Inicia sesión</a>
        </p>
      </div>
    </div>
  );
}