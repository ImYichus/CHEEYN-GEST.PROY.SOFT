'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, Heart, ShoppingCart, Star } from 'lucide-react';

export default function ProductDetailPage() {
  const { id } = useParams();
  const router = useRouter();

  const [product, setProduct] = useState<any>(null);
  const [allProducts, setAllProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);

  const [selectedColor, setSelectedColor] = useState<{ name: string; value: string } | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [availableVariants, setAvailableVariants] = useState<any[]>([]);
  const [variantStock, setVariantStock] = useState<number>(0);

  // Cargar productos desde la API
  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch('/api/products');
        const data = await res.json();
        setAllProducts(data);

        // Buscar el producto seleccionado
        const found = data.find((p: any) => p.id === Number(id));
        if (found) {
          setProduct(found);

          // Inicializar variantes si existen
          if (found.variantes && found.variantes.length > 0) {
            setAvailableVariants(found.variantes);

            const firstVariant = found.variantes[0];
            setSelectedColor({ name: firstVariant.color, value: firstVariant.color });
            setSelectedSize(firstVariant.talla);
            setVariantStock(firstVariant.stock);
          }
        } else {
          setProduct(null);
        }
      } catch (error) {
        console.error('Error al cargar productos:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-2xl text-[#1e5128] font-serif">
        Cargando producto...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center text-2xl text-[#1e5128] font-serif">
        Producto no encontrado 😢
      </div>
    );
  }

  const handleAddToCart = () => {
    alert(`Agregado ${quantity} × ${product.nombre} al carrito`);
  };

  const handleBack = () => {
    router.push('/products');
  };

  const relatedProducts = allProducts
    .filter((p) => p.categoria.id === product.categoria.id && p.id !== product.id)
    .slice(0, 4);
  
  // Stock total
  const enStock = product.enStock;

  const handleColorChange = (color: { name: string; value: string }) => {
  setSelectedColor(color);
  updateVariantStock(color.name, selectedSize);
  };

  const handleSizeChange = (size: string) => {
    setSelectedSize(size);
    updateVariantStock(selectedColor?.name, size);
  };

  const updateVariantStock = (colorName: string | undefined, size: string | null) => {
    if (!colorName || !size) return;
    const variant = availableVariants.find(
      (v) => v.color === colorName && v.talla === size
    );
    setVariantStock(variant?.stock || 0);
  };

  return (
    <div className="min-h-screen bg-[#d8f3dc] flex flex-col font-serif">

      {/* HEADER */}
      <header className="bg-[#1e5128] shadow-xl py-4 sticky top-0 z-50"> 
        <div className="container mx-auto px-4 flex justify-between items-center">
          <Link href="/" className="text-3xl font-bold text-[#d8f3dc] tracking-widest">
            CHEEYN
          </Link>
          <nav>
            <Link href="/cart" className="text-[#d8f3dc] hover:text-[#95d5b2] ml-6 font-medium transition-colors">
              Carrito 
            </Link>
            <Link href="/login" className="text-[#d8f3dc] hover:text-[#95d5b2] ml-6 font-medium transition-colors">
              Login
            </Link>
          </nav>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {/* Botón Volver */}
        <button
          onClick={handleBack}
          className="flex items-center text-[#1e5128] mb-8 hover:text-[#4e9f3d] transition-colors"
        >
          <ChevronLeft className="mr-2 w-5 h-5" />
          Volver al catálogo
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 bg-white rounded-2xl shadow-xl p-8">
          {/* Imagen */}
          <div className="flex justify-center items-center">
            <div className="relative w-full h-96 rounded-lg overflow-hidden shadow-lg">
                {product.imagenUrl && (
                  <Image
                    src={product.imagenUrl}
                    alt={product.nombre}
                    fill
                    className="object-cover"
                  />
                )}
            </div>
          </div>

          {/* Información */}
          <div className="flex flex-col justify-between space-y-6">
            <p className="text-sm text-[#4e9f3d] font-semibold mb-3">{product.categoria.nombre}</p>

            <div>
              <h1 className="text-3xl font-bold text-[#1e5128] mb-2">{product.nombre}</h1>
              <p className="text-gray-600 mb-4">{product.descripcion}</p>

              {/* Calificación */}
              <div className="flex items-center mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${i < 4 ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                  />
                ))}
                <span className="ml-2 text-sm text-gray-600">(4.0)</span>
              </div>

              {/* Precio */}
              <div className="flex items-center gap-3 mb-4">
                <span className="text-4xl font-extrabold text-[#4e9f3d]">
                  ${product.precio.toFixed(2)}
                </span>
              </div>

              {/* Stock */}
              <div>
                {product.enStock ? (
                  <div className="flex items-center gap-2 text-green-600">
                    <div className="h-2 w-2 rounded-full bg-green-600" />
                    <span>En stock - Envío inmediato</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-red-600">
                    <div className="h-2 w-2 rounded-full bg-red-600" />
                    <span>Producto agotado</span>
                  </div>
                )}
              </div>
              <br/>

              {/* Cantidad */}
              <div className="flex items-center gap-4 mb-6">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-1 bg-[#4e9f3d] text-white rounded-md hover:bg-[#3d8130] transition"
                  disabled={variantStock === 0 || quantity <= 1}
                >
                  -
                </button>
                <span className="text-lg font-bold text-[#1e5128]">{quantity}</span>
                <button
                  onClick={() => setQuantity(Math.min(quantity + 1, variantStock))}
                  className="px-3 py-1 bg-[#4e9f3d] text-white rounded-md hover:bg-[#3d8130] transition"
                  disabled={variantStock === 0 || quantity >= variantStock}
                >
                  +
                </button>
              </div>
              <span className="text-sm text-gray-600">
                {variantStock > 0 ? `${variantStock} en stock` : "Agotado"}
              </span>

              <div className="space-y-4">


                {/* Color Selector */}
                {availableVariants.length > 0 && (
                  <div>
                    <label className="text-black mb-4">Color: {selectedColor?.name}</label>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {Array.from(new Set(availableVariants.map(v => v.color))).map((color) => (
                        <button
                          key={color}
                          onClick={() => handleColorChange({ name: color, value: color })}
                          className={`h-10 w-10 rounded-full border-2 transition-all ${
                            selectedColor?.name === color
                              ? "border-black scale-110 shadow-md"
                              : "border-gray-300 hover:border-gray-400"
                          }`}
                          style={{ backgroundColor: color }}
                          title={color}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* Size Selector */}
                {availableVariants.length > 0 && (
                  <div>
                    <label className="text-black mb-4">Talla: {selectedSize}</label>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {Array.from(new Set(availableVariants.map(v => v.talla))).map((size) => (
                        <button
                          key={size}
                          onClick={() => handleSizeChange(size)}
                          className={`px-4 py-2 border-2 rounded-md transition-all border-2 font-semibold${
                            selectedSize === size
                              ? "border-black bg-black text-white"
                              : "border-gray-300 bg-transparent text-black hover:border-gray-400"
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <br />
              {/* Botones */}
              <div className="flex gap-4">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 flex items-center justify-center gap-2 py-3 bg-[#1e5128] text-white rounded-lg hover:bg-[#4e9f3d] transition"
                >
                  <ShoppingCart className="w-5 h-5" />
                  Agregar al Carrito
                </button>

                <button
                  onClick={() => setIsFavorite(!isFavorite)}
                  className={`p-3 border rounded-lg ${isFavorite ? 'bg-red-100 text-red-500 border-red-300' : 'bg-white text-gray-500 border-gray-300'} hover:bg-red-50 transition`}
                >
                  <Heart
                    className={`w-5 h-5 ${isFavorite ? 'fill-red-500 text-red-500' : ''}`}
                  />
                </button>
              </div>
            </div>

            <div className="border-t pt-6">
              <p className="text-sm text-gray-500">
                Envío gratis en compras mayores a $50.  
                Garantía de satisfacción de 30 días.
              </p>
            </div>
          </div>
        </div>

        {/* Productos relacionados */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-[#1e5128] mb-6">Productos Relacionados</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {relatedProducts.length > 0 ? (
              relatedProducts.map((item) => (
                <Link
                  key={item.id}
                  href={`/products/${item.id}`}
                  className="block bg-white rounded-lg shadow-md hover:shadow-xl transition overflow-hidden"
                >
                  <div className="relative w-full h-40">
                    {product.imagenUrl && (
                      <Image
                        src={product.imagenUrl}
                        alt={product.nombre}
                        fill
                        className="object-cover"
                      />
                    )}
                  </div>
                  <div className="p-4 text-center">
                    <p className="text-sm text-[#1e5128] font-medium">{item.nombre}</p>
                    <p className="text-[#4e9f3d] font-bold mt-1">${item.precio.toFixed(2)}</p>
                  </div>
                </Link>
              ))
            ) : (
              <p className="text-gray-500 text-center mt-4">
                No hay productos relacionados disponibles.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
