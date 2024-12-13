import Image from 'next/image';
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20"> {/* Ajusta la altura */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/">
              <Image
                src="/volta.png"
                alt="Logo"
                width={100} // Tamaño del logo más grande
                height={100}
                className="-ml-2 hover:scale-110 transition-transform duration-300" // Efecto hover en el logo
              />
            </Link>
          </div>
          <div className="flex items-center space-x-6"> {/* Espaciado más amplio */}
            <Link
              href="/"
              className="text-red-700 hover:text-red-900 px-3 py-2 rounded-md text-lg font-medium transition-colors duration-300 hover:bg-red-100"
            >
              Home
            </Link>
            <Link
              href="/form"
              className="text-red-700 hover:text-red-900 px-3 py-2 rounded-md text-lg font-medium transition-colors duration-300 hover:bg-red-100"
            >
              Solicita una Entrega
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
