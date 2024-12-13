'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '../components/Navbar';

export default function DeliveryForm() {
  const [formData, setFormData] = useState({
    packageType: '',
    pickupLocation: '',
    deliveryLocation: '',
    deliveryDate: '',
    deliveryTime: '',
    additionalDetails: '',
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch('/api/submit-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        router.push('/thank-you');
      } else {
        alert('There was an error submitting the form.');
      }
    } catch (error) {
      console.error(error);
      alert('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{
        backgroundImage: "url('/delivery.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <Navbar />
      <main className="flex-grow flex items-center justify-center py-10 px-4">
        <div className="bg-red-100 max-w-lg w-full p-8 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Solicitar una entrega</h1>
          <form onSubmit={handleSubmit}>
            {/* Package Type */}
            <div className="mb-4">
              <label htmlFor="packageType" className="block text-gray-700 font-bold mb-2">
                Tipo de Paquete
              </label>
              <select
                id="packageType"
                name="packageType"
                value={formData.packageType}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 text-black bg-white"
                required
              >
                <option value="">Selecciona el tipo de paquete</option>
                <option value="small">Pequeño</option>
                <option value="medium">Mediano</option>
                <option value="large">Grande</option>
                <option value="document">Documentos</option>
              </select>
            </div>

            {/* Pickup Location */}
            <div className="mb-4">
              <label htmlFor="pickupLocation" className="block text-gray-700 font-bold mb-2">
              Lugar de recogida
              </label>
              <input
                type="text"
                id="pickupLocation"
                name="pickupLocation"
                value={formData.pickupLocation}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 text-black bg-white"
                required
              />
            </div>

            {/* Delivery Location */}
            <div className="mb-4">
              <label htmlFor="deliveryLocation" className="block text-gray-700 font-bold mb-2">
               Lugar de entrega
              </label>
              <input
                type="text"
                id="deliveryLocation"
                name="deliveryLocation"
                value={formData.deliveryLocation}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                required
              />
            </div>

            {/* Delivery Date */}
            <div className="mb-4">
              <label htmlFor="deliveryDate" className="block text-gray-700 font-bold mb-2">
               Fecha de entrega
              </label>
              <input
                type="date"
                id="deliveryDate"
                name="deliveryDate"
                value={formData.deliveryDate}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                required
              />
            </div>

            {/* Delivery Time */}
            <div className="mb-4">
              <label htmlFor="deliveryTime" className="block text-gray-700 font-bold mb-2">
                Hora de recogida
              </label>
              <input
                type="time"
                id="deliveryTime"
                name="deliveryTime"
                value={formData.deliveryTime}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                required
              />
            </div>

            {/* Additional Details */}
            <div className="mb-4">
              <label htmlFor="additionalDetails" className="block text-gray-700 font-bold mb-2">
               Información adicional
              </label>
              <textarea
                id="additionalDetails"
                name="additionalDetails"
                value={formData.additionalDetails}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 text-black bg-white"
                rows={4}
                placeholder="Facilite cualquier información adicional sobre la entrega.."
              />
            </div>

            <button
              type="submit"
              className="w-full bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition duration-300"
              disabled={loading}
            >
              {loading ? 'Enviando...' : 'Enviar solicitud'}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
