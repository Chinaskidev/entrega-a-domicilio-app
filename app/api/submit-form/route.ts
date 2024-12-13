import { google } from 'googleapis';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    // Verificar que la variable de entorno no tenga espacios en blanco o saltos de línea extra
    const rawCredentials = process.env.GOOGLE_SERVICE_ACCOUNT_JSON;
    
    if (!rawCredentials) {
      console.error('Google Service Account JSON is missing');
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
    }

    // Eliminar espacios en blanco y saltos de línea antes de intentar parsear
    const cleanedCredentials = rawCredentials.trim();

    // Parsear las credenciales
    const credentials = JSON.parse(cleanedCredentials);

    if (!credentials) {
      console.error('Failed to parse Google Service Account credentials');
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
    }

    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth });

    // Obtener los datos del formulario enviado
    const { packageType, pickupLocation, deliveryLocation, deliveryDate, deliveryTime, additionalDetails } = await req.json();

    // Obtener el ID de la hoja de cálculo desde las variables de entorno
    const spreadsheetId = process.env.SPREADSHEET_ID;
    
    if (!spreadsheetId) {
      console.error('Spreadsheet ID is missing');
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
    }

    // Definir el rango donde se agregarán los datos en la hoja
    const range = 'Hoja1!A:F'; // Esto agregará los datos a la siguiente fila disponible

    // Agregar los datos en Google Sheets
    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range,
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [
          [packageType, pickupLocation, deliveryLocation, deliveryDate, deliveryTime, additionalDetails],
        ],
      },
    });

    return NextResponse.json({ message: 'Data saved to Google Sheets successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error saving data to Google Sheets:', error);
    return NextResponse.json({ error: 'Error saving data to Google Sheets' }, { status: 500 });
  }
}
