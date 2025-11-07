import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#d8f3dc] flex flex-col font-serif">
      {/* Header */}
      <header className="bg-[#1e5128] shadow-xl py-4 sticky top-0 z-50">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <Link href="/" className="text-3xl font-bold text-[#d8f3dc] tracking-widest">
            CHEEYN
          </Link>
          <nav>
            <Link href="/products" className="text-[#d8f3dc] hover:text-[#95d5b2] ml-6 font-medium transition-colors">
              Productos
            </Link>
            <Link href="/cart" className="text-[#d8f3dc] hover:text-[#95d5b2] ml-6 font-medium transition-colors">
              Carrito
            </Link>
            <Link href="/login" className="text-[#d8f3dc] hover:text-[#95d5b2] ml-6 font-medium transition-colors">
              Login
            </Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-16 flex-grow flex items-center justify-center">
        <div className="text-center max-w-4xl">
          <h1 className="text-6xl font-extrabold text-[#1e5128] mb-6 tracking-wider leading-tight">
            Bienvenido a CHEEYN
          </h1>
          <p className="text-xl text-[#1e5128] mb-8 leading-relaxed">
            Descubre nuestra colección exclusiva de productos elegantes y modernos. 
            Tu estilo, tu identidad.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/products"
              className="px-8 py-4 bg-[#4e9f3d] text-white rounded-full font-semibold text-lg hover:bg-[#3d8130] transition-colors shadow-lg"
            >
              Ver Catálogo
            </Link>
            <Link
              href="/signup"
              className="px-8 py-4 bg-white text-[#4e9f3d] border-2 border-[#4e9f3d] rounded-full font-semibold text-lg hover:bg-[#d8f3dc] transition-colors shadow-lg"
            >
              Crear Cuenta
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#1e5128] text-[#d8f3dc] py-6 mt-auto">
        <div className="container mx-auto text-center text-sm">
          © {new Date().getFullYear()} Cheeyn. Todos los derechos reservados.
        </div>
      </footer>
    </div>
  );
}
