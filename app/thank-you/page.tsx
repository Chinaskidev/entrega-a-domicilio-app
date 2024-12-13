import Link from 'next/link';
import Navbar from '../components/Navbar';

export default function ThankYou() {
  return (
    <div
      className="min-h-screen flex flex-col"
      style={{
        backgroundImage: "url('/salato.jpg')", 
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <Navbar />
      <main className="flex-grow flex items-center justify-center py-10 px-4">
        <div className="bg-red-100 max-w-lg w-full p-8 rounded-lg shadow-lg text-center">
          <h1 className="text-3xl font-bold mb-6 text-gray-800">Gracias por su solicitud.</h1>
          <p className="text-xl mb-8 text-gray-700">
          Su solicitud de entrega se ha enviado correctamente.
          </p>
          <Link
            href="/"
            className="bg-red-500 text-white py-2 px-6 rounded-md text-lg font-semibold hover:bg-red-600 transition duration-300"
          >
            Regresa a casa
          </Link>
        </div>
      </main>
    </div>
  );
}
