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
    // Fondo claro usando Light Orange (#F9DBBD)
    <div className="flex justify-center items-center min-h-screen bg-[#F9DBBD]"> 
      <div className="p-8 bg-white shadow-2xl rounded-lg w-full max-w-lg">
        {/* Título usando Chocolate Cosmos (#450920) */}
        <h1 className="text-3xl font-bold mb-6 text-center text-[#450920]">
          Crea tu Cuenta Cheeyn
        </h1>
        
        {/* Mensajes de Alerta y Éxito */}
        {error && <p className="mb-4 p-3 bg-red-100 text-red-700 border border-red-300 rounded">{error}</p>}
        {/* Usando Salmon Pink para el éxito (#FFA5AB) */}
        {success && <p className="mb-4 p-3 bg-[#fdf2f2] text-[#A53860] border border-[#FFA5AB] rounded">{success}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Nombre Completo */}
          <div>
            {/* Etiquetas usando Chocolate Cosmos (#450920) */}
            <label className="block text-sm font-medium text-[#450920]" htmlFor="name">Nombre Completo</label>
            <input
              id="name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              // Foco del input usando Raspberry Rose (#A53860)
              className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-[#A53860] focus:border-[#A53860]"
            />
          </div>

          {/* ... Repite la estructura para Email, Password, Phone, y Address ... */}
          
          {/* Correo Electrónico */}
          <div>
            <label className="block text-sm font-medium text-[#450920]" htmlFor="email">Correo Electrónico</label>
            <input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-[#A53860] focus:border-[#A53860]"
            />
          </div>

          {/* Contraseña */}
          <div>
            <label className="block text-sm font-medium text-[#450920]" htmlFor="password">Contraseña (Mín. 6 caracteres)</label>
            <input
              id="password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-[#A53860] focus:border-[#A53860]"
            />
          </div>

          {/* Teléfono */}
          <div>
            <label className="block text-sm font-medium text-[#450920]" htmlFor="phone">Teléfono</label>
            <input
              id="phone"
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-[#A53860] focus:border-[#A53860]"
            />
          </div>
          
          {/* Dirección */}
          <div>
            <label className="block text-sm font-medium text-[#450920]" htmlFor="address">Dirección de Envío (Calle y Número)</label>
            <input
              id="address"
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
              className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-[#A53860] focus:border-[#A53860]"
            />
          </div>


          {/* Botón de Registro con Raspberry Rose (#A53860) y hover más oscuro */}
          <button
            type="submit"
            className="w-full py-3 px-4 border border-transparent rounded-md shadow-lg text-lg font-semibold text-white bg-[#A53860] hover:bg-[#913052] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#A53860] transition duration-150 ease-in-out mt-6"
          >
            Crear Cuenta Cheeyn
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          ¿Ya tienes cuenta? <a href="/login" className="font-medium text-[#A53860] hover:text-[#450920]">Inicia sesión</a>
        </p>
      </div>
    </div>
  );
}