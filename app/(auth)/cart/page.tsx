// app/cart/page.tsx

'use client'; 

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface CartItem {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  quantity: number;
}

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    { id: 1, name: 'Collar Cheeyn Elegance', price: 49.99, imageUrl: 'https://picsum.photos/id/10/100/100', quantity: 1 },
    { id: 2, name: 'Aretes Cheeyn Sparkle', price: 29.99, imageUrl: 'https://picsum.photos/id/20/100/100', quantity: 2 },
  ]);

  const updateQuantity = (id: number, newQuantity: number) => {
    setCartItems(prevItems => 
      prevItems.map(item => 
        item.id === id ? { ...item, quantity: Math.max(1, newQuantity) } : item
      )
    );
  };

  const removeItem = (id: number) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#d8f3dc] flex flex-col"> {/* AÑADIDO: flex flex-col */}
      {/* Header */}
      <header className="bg-[#1e5128] shadow-xl py-4 sticky top-0 z-50"> 
        <div className="container mx-auto px-4 flex justify-between items-center">
          <Link href="/" className="text-3xl font-bold text-[#d8f3dc] tracking-widest"> {/* Letra más espaciada */}
            CHEEYN
          </Link>
          <nav>
            <Link href="/products" className="text-[#d8f3dc] hover:text-[#95d5b2] ml-6 font-medium transition-colors">
              Catalogo
            </Link>
            <Link href="/login" className="text-[#d8f3dc] hover:text-[#95d5b2] ml-6 font-medium transition-colors">
              Login
            </Link>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 flex-grow"> {/* AÑADIDO: flex-grow */}
        <h1 className="text-4xl font-extrabold text-[#1e5128] mb-8 text-center">
          Tu Carrito Cheeyn ({totalItems})
        </h1>

        {cartItems.length === 0 ? (
          <div className="text-center p-8 bg-white rounded-lg shadow-md">
            <p className="text-xl text-[#1e5128] mb-4">Tu carrito está vacío.</p>
            <Link href="/products" className="text-[#4e9f3d] hover:underline font-medium">
              Explora nuestros productos
            </Link>
          </div>
        ) : (
          <div className="lg:flex lg:space-x-8">
            {/* Detalles de los Ítems */}
            <div className="lg:w-2/3 bg-white p-6 rounded-lg shadow-md space-y-4">
              {cartItems.map(item => (
                <div key={item.id} className="flex items-center border-b border-gray-200 pb-4 last:border-b-0">
                  <div className="relative w-24 h-24 mr-4 flex-shrink-0">
                    <Image
                      src={item.imageUrl}
                      alt={item.name}
                      layout="fill"
                      objectFit="cover"
                      className="rounded-md"
                    />
                  </div>
                  <div className="flex-grow">
                    <h2 className="text-xl font-semibold text-[#1e5128]">{item.name}</h2>
                    <p className="text-gray-600">${item.price.toFixed(2)} c/u</p>
                    <div className="flex items-center mt-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="px-3 py-1 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors"
                      >
                        -
                      </button>
                      <span className="mx-3 text-lg text-[#1e5128]">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="px-3 py-1 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors"
                      >
                        +
                      </button>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="ml-auto text-red-600 hover:text-red-800 transition-colors text-sm"
                      >
                        Eliminar
                      </button>
                    </div>
                  </div>
                  <div className="text-xl font-bold text-[#4e9f3d] ml-4">
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>

            {/* Resumen del Carrito */}
            <div className="lg:w-1/3 bg-white p-6 rounded-lg shadow-md mt-8 lg:mt-0">
              <h2 className="text-2xl font-bold text-[#1e5128] mb-4 border-b pb-3">Resumen del Pedido</h2>
              <div className="flex justify-between text-lg mb-2">
                <span className="text-[#1e5128]">Subtotal:</span>
                <span className="font-semibold text-[#1e5128]">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-lg mb-4">
                <span className="text-[#1e5128]">Envío:</span>
                <span className="font-semibold text-[#1e5128]">Gratis</span> {/* Placeholder */}
              </div>
              <div className="flex justify-between text-2xl font-bold text-[#4e9f3d] border-t pt-4 mt-4">
                <span>Total:</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <button className="mt-6 w-full py-3 px-4 bg-[#4e9f3d] text-white rounded-md hover:bg-[#3d8130] transition-colors duration-200 text-lg font-semibold">
                Proceder al Pago
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-[#1e5128] text-[#d8f3dc] py-6 mt-auto"> {/* AÑADIDO: mt-auto */}
        <div className="container mx-auto text-center text-sm">
          © {new Date().getFullYear()} Cheeyn. Todos los derechos reservados.
        </div>
      </footer>
    </div>
  );
}