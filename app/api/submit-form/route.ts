import fs from 'fs';
import path from 'path';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  if (req.method === 'POST') {
    try {
      // Leer los datos enviados desde el formulario
      const { packageType, pickupLocation, deliveryLocation, deliveryDate, deliveryTime, additionalDetails } = await req.json();

      // Crear la nueva fila para el CSV
      const newRow = `${packageType},${pickupLocation},${deliveryLocation},${deliveryDate},${deliveryTime},${additionalDetails}\n`;

      // Ruta para el archivo CSV
      const filePath = path.join(process.cwd(), 'public', 'downloads', 'delivery_requests.csv');

      // Verificar si el archivo CSV ya existe
      const fileExists = fs.existsSync(filePath);

      // Si el archivo no existe, agregar encabezados y la nueva fila
      if (!fileExists) {
        const header = 'Package Type,Pickup Location,Delivery Location,Delivery Date,Delivery Time,Additional Details\n';
        fs.writeFileSync(filePath, header + newRow, { flag: 'w' });
      } else {
        // Si el archivo existe, agregar solo la nueva fila
        fs.appendFileSync(filePath, newRow);
      }

      // Retornar respuesta de éxito
      return NextResponse.json({ message: 'Form submitted successfully, data saved to CSV' });
    } catch (error) {
      console.error(error);
      return NextResponse.json({ error: 'Error saving data to CSV' }, { status: 500 });
    }
  } else {
    return NextResponse.json({ error: 'Method Not Allowed' }, { status: 405 });
  }
}
