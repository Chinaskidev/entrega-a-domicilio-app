'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Navbar from '../components/Navbar'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function DeliveryForm() {
  const [formData, setFormData] = useState({
    packageType: '',
    pickupLocation: '',
    deliveryLocation: '',
    deliveryDate: '',
    deliveryTime: '',
    additionalDetails: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/submit-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        router.push('/thank-you')
      } else {
        const errorData = await response.json()
        alert(`Error: ${errorData.error}`)
      }
    } catch (error) {
      console.error('Submission error:', error)
      alert('An error occurred while submitting the form. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <div className="min-h-screen flex flex-col bg-cover bg-center" style={{backgroundImage: 'url("/delivery.jpg")'}}>
      <Navbar />
      <main className="flex-grow container mx-auto py-10 px-4 flex items-center justify-center">
        <Card className="w-full max-w-md bg-red-100 shadow-xl">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-center">Solicitar un envío</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="packageType" className="block text-gray-700 font-bold mb-2">
                Tipo de paquete
                </label>
                <select
                  id="packageType"
                  name="packageType"
                  value={formData.packageType}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Selecciona el tipo de paquete</option>
                  <option value="small">Pequeño</option>
                  <option value="medium">Mediano</option>
                  <option value="large">Grande</option>
                  <option value="document">Documentos</option>
                </select>
              </div>
              <div>
                <label htmlFor="pickupLocation" className="block text-gray-700 font-bold mb-2">
                  Lugar de recogida
                </label>
                <input
                  type="text"
                  id="pickupLocation"
                  name="pickupLocation"
                  value={formData.pickupLocation}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="deliveryLocation" className="block text-gray-700 font-bold mb-2">
                  Lugar de entrega
                </label>
                <input
                  type="text"
                  id="deliveryLocation"
                  name="deliveryLocation"
                  value={formData.deliveryLocation}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="deliveryDate" className="block text-gray-700 font-bold mb-2">
                  Fecha de entrega
                </label>
                <input
                  type="date"
                  id="deliveryDate"
                  name="deliveryDate"
                  value={formData.deliveryDate}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="deliveryTime" className="block text-gray-700 font-bold mb-2">
                  Tiempo de entrega
                </label>
                <input
                  type="time"
                  id="deliveryTime"
                  name="deliveryTime"
                  value={formData.deliveryTime}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="additionalDetails" className="block text-gray-700 font-bold mb-2">
                  Informacion adicional
                </label>
                <textarea
                  id="additionalDetails"
                  name="additionalDetails"
                  value={formData.additionalDetails}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={4}
                ></textarea>
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300 disabled:opacity-50"
              >
                {isSubmitting ? 'Enviando...' : 'Enviar solicitud'}
              </button>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}

