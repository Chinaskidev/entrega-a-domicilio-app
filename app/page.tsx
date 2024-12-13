import Link from 'next/link'
import Navbar from './components/Navbar'
import { Leaf, Zap, PiggyBank } from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section */}
        <section
          className="relative text-white py-20"
          style={{
            backgroundImage: "url('/scooter.jpg')", // Reemplaza con la ruta de tu imagen
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="container mx-auto text-center px-4 bg-red-600 bg-opacity-50 rounded-lg py-10">
            <h1 className="text-4xl font-bold mb-4">Entregas rápidas y ecológicas</h1>
            <p className="text-xl mb-8">Utilizamos scooters eléctricos para realizar entregas rápidas y respetuosas con el medio ambiente.</p>
            <Link
              href="/form"
              className="inline-block bg-white text-blue-600 py-2 px-6 rounded-full text-lg font-semibold hover:bg-blue-100 transition duration-300"
            >
              Solicita una Entrega
            </Link>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 px-4" style={{ backgroundColor: '#fce4ec' }}> {/* Rojo pastel claro */}
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">¿Por qué elegir nuestro servicio?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <FeatureCard
                title="Ecológico"
                description="Nuestros scooters eléctricos reducen las emisiones de carbono, por lo que cada entrega es respetuosa con el medio ambiente."
                Icon={Leaf}
              />
              <FeatureCard
                title="Entrega rápida"
                description="Desplázo fácilmente entre el tráfico para realizar entregas más rápidas."
                Icon={Zap}
              />
              <FeatureCard
                title="Rentable"
                description="maximizamos la eficiencia de las entregas con nuestro servicio rápido y confiable,"
                Icon={PiggyBank}
              />
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

interface FeatureCardProps {
  title: string
  description: string
  Icon: React.ComponentType<{ className?: string }>
}

function FeatureCard({ title, description, Icon }: FeatureCardProps) {
  return (
    <div
      className="bg-white p-6 rounded-lg shadow-md text-center transform transition duration-300 hover:scale-105 hover:shadow-xl"
    >
      <div className="mb-4 flex justify-center">
        <Icon className="w-12 h-12 text-blue-600" />
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  )
}
