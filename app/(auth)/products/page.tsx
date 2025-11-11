// app/products/page.tsx

'use client'; 

import { useEffect, useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation'; 
import { ChevronLeft, ChevronRight, Search } from 'lucide-react'; 

// --- DATOS Y TIPOS ---

interface Product {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  imagenUrl: string;
  categoria: { id: number; nombre: string };
  enStock: boolean;
}

const CATEGORIES = ['Todos', 'Vestidos', 'Faldas', 'Pantalones', 'Blusas', 'Chaquetas', 'Calzado', 'Accesorios', 'Ropa Casual'];
const PRODUCTS_PER_PAGE = 8; 



function ProductCard({ id, nombre, precio, imagenUrl }: Product) {
  return (
    <Link href={`/products/${id}`} className="block h-full font-serif">
      {/* CLAVE: h-[350px] para una altura fija y uniforme */}
      <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-200 overflow-hidden group flex flex-col h-[350px]"> 
        
        {/* IMAGEN */}
        <div className="relative w-full h-40 flex-shrink-0">
            {imagenUrl && (
              <Image
                src={imagenUrl}
                alt={nombre}
                layout="fill"
                objectFit="cover"
                className="transition-transform duration-300 group-hover:scale-105"
              />
            )}
        </div>
        
        {/* CONTENIDO */}
        <div className="p-3 text-center flex flex-col flex-grow justify-between">
          <h3 className="text-sm font-bold text-[#1e5128] mb-1 group-hover:text-[#4e9f3d] tracking-wider">
            {nombre}
          </h3>
          <p className="text-lg font-extrabold text-[#4e9f3d] mt-1">
            ${precio.toFixed(2)}
          </p>
          <button className="mt-2 w-full py-1.5 px-3 bg-[#4e9f3d] text-white rounded-md hover:bg-[#3d8130] transition-colors duration-200 text-xs">
            Añadir
          </button>
        </div>
      </div>
    </Link>
  );
}

// --- COMPONENTE PRINCIPAL ---

export default function ProductsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
  const [currentPage, setCurrentPage] = useState(
    parseInt(searchParams.get('page') || '1')
  );
  const selectedCategory = searchParams.get('category') || 'Todos';
  
  const filteredProducts = useMemo(() => {
    let result = products;

    if (selectedCategory !== 'Todos') {
      result = result.filter(p => p.categoria.nombre === selectedCategory);
    }

    if (searchTerm) {
      const lowerCaseSearch = searchTerm.toLowerCase();
      result = result.filter(
        p => 
          p.nombre.toLowerCase().includes(lowerCaseSearch) || 
          p.descripcion.toLowerCase().includes(lowerCaseSearch)
      );
    }
    
    return result;
  }, [products, searchTerm, selectedCategory]);

  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);
  const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
  const endIndex = startIndex + PRODUCTS_PER_PAGE;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleFilterChange('search', searchTerm);
    setCurrentPage(1); 
  };

  const handleCategoryClick = (category: string) => {
    handleFilterChange('category', category);
    setCurrentPage(1); 
  };

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      handleFilterChange('page', String(newPage));
    }
  };

  const handleFilterChange = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value && value !== 'Todos') {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`/products?${params.toString()}`, { scroll: false }); 
  };



  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch('/api/products');
        const data = await res.json();
        const mappedProducts = data.map((p: any) => ({
        id: p.id,
        nombre: p.nombre,
        descripcion: p.descripcion,
        precio: Number(p.precio),
        imagenUrl: p.multimediaProductos?.[0]?.url || '', // primera imagen
        categoria: { id: p.categoria.id, nombre: p.categoria.nombre },
        enStock: p.variantes.some((v: any) => v.stock > 0), // true si hay stock
      }));
        setProducts(data);
      } catch (error) {
        console.error('Error al cargar productos:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-[#1e5128] text-2xl font-serif">
        Cargando productos...
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-[#d8f3dc] flex flex-col font-serif">
      
      {/* 1. HEADER (BANNER) - Fondo verde oscuro, Letras claras */}
      <header className="bg-[#1e5128] shadow-xl py-4 sticky top-0 z-50"> 
        <div className="container mx-auto px-4 flex justify-between items-center">
          <Link href="/" className="text-3xl font-bold text-[#d8f3dc] tracking-widest">
            CHEEYN
          </Link>
          <nav>
            {/* Se corrigió el cálculo del carrito, aunque no está implementado */}
            <Link href="/cart" className="text-[#d8f3dc] hover:text-[#95d5b2] ml-6 font-medium transition-colors">
              Carrito 
            </Link>
            <Link href="/login" className="text-[#d8f3dc] hover:text-[#95d5b2] ml-6 font-medium transition-colors">
              Login
            </Link>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 flex-grow">
        <h1 className="text-5xl font-extrabold text-[#1e5128] mb-10 text-center leading-tight tracking-wider">
          Descubre la Elegancia de Cheeyn
        </h1>
        
        {/* BUSCADOR - Background Blanco y Letras Verde */}
        <form onSubmit={handleSearchSubmit} className="max-w-4xl mx-auto mb-10">
          <div className="relative">
            <input
              type="text"
              placeholder="Buscar productos por nombre o descripción..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-4 pl-12 border-2 border-[#4e9f3d] rounded-full shadow-lg focus:outline-none focus:border-[#1e5128] transition-colors bg-white text-[#1e5128]"
            />
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          </div>
        </form>

        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* BARRA DE FILTRADO (IZQUIERDA) - Fijo con 'sticky top-24' */}
          <aside className="lg:w-1/4 bg-white p-6 rounded-xl shadow-xl h-fit sticky self-start"> 
            <h2 className="text-2xl font-bold text-[#1e5128] mb-5 border-b pb-3 border-gray-200 tracking-wide">
                Categorías
            </h2>
            <nav className="space-y-2">
              {CATEGORIES.map(category => (
                <button
                  key={category}
                  onClick={() => handleCategoryClick(category)}
                  className={`block w-full text-left py-2 px-3 rounded-lg transition-all text-base ${
                    selectedCategory === category
                      ? 'bg-[#4e9f3d] text-white font-semibold shadow-md'
                      : 'text-[#1e5128] hover:bg-[#d8f3dc]'
                  }`}
                >
                  {category}
                </button>
              ))}
            </nav>
          </aside>

          {/* CONTENIDO PRINCIPAL (PRODUCTOS) */}
          <section className="lg:w-3/4">
            
            {currentProducts.length === 0 ? (
                <div className="text-center p-12 bg-white rounded-lg shadow-md">
                    <p className="text-2xl text-[#1e5128] mb-2 font-serif">No se encontraron productos.</p>
                    <p className="text-gray-600">Intenta ajustar tu búsqueda o filtro.</p>
                </div>
            ) : (
                <>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"> 
                      {currentProducts.map((product) => (
                        <ProductCard key={product.id} {...product} />
                      ))}
                    </div>

                    {/* PAGINACIÓN */}
                    {totalPages > 1 && (
                      <div className="flex justify-center items-center space-x-4 mt-10">
                        <button
                          onClick={() => handlePageChange(currentPage - 1)}
                          disabled={currentPage === 1}
                          className="p-2 border rounded-full bg-white text-[#4e9f3d] disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#d8f3dc] transition shadow-md"
                        >
                          <ChevronLeft className="w-5 h-5" />
                        </button>

                        <span className="text-lg font-semibold text-[#1e5128] font-serif">
                          Página {currentPage} de {totalPages}
                        </span>

                        <button
                          onClick={() => handlePageChange(currentPage + 1)}
                          disabled={currentPage === totalPages}
                          className="p-2 border rounded-full bg-white text-[#4e9f3d] disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#d8f3dc] transition shadow-md"
                        >
                          <ChevronRight className="w-5 h-5" />
                        </button>
                      </div>
                    )}
                </>
            )}

          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#1e5128] text-[#d8f3dc] py-6 mt-auto">
        <div className="container mx-auto text-center text-sm font-serif">
          © {new Date().getFullYear()} Cheeyn. Todos los derechos reservados.
        </div>
      </footer>
    </div>
  );
}