import { NextResponse } from 'next/server';
import { Pool } from 'pg';

// Configuración del pool de PostgreSQL
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export async function POST(req: Request) {
  try {
    // Obtener los datos del formulario enviado
    const { packageType, pickupLocation, deliveryLocation, deliveryDate, deliveryTime, additionalDetails } = await req.json();

    // Validar que los campos requeridos existan
    if (!packageType || !pickupLocation || !deliveryLocation || !deliveryDate || !deliveryTime) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Insertar los datos en la base de datos
    const query = `
      INSERT INTO deliveries (package_type, pickup_location, delivery_location, delivery_date, delivery_time, additional_details)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *;
    `;
    const values = [packageType, pickupLocation, deliveryLocation, deliveryDate, deliveryTime, additionalDetails];

    const result = await pool.query(query, values);

    return NextResponse.json({ message: 'Data saved successfully', data: result.rows[0] }, { status: 200 });
  } catch (error) {
    console.error('Error saving data to PostgreSQL:', error);
    return NextResponse.json({ error: 'Error saving data to PostgreSQL' }, { status: 500 });
  }
}
