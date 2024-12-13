import { google } from 'googleapis';

export async function POST(req: Request) {
  try {
    console.log(process.env.GOOGLE_SERVICE_ACCOUNT_JSON); // Verifica el contenido de la variable
    const credentials = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_JSON || '');

    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth });

    // Obtener datos del formulario enviado
    const { packageType, pickupLocation, deliveryLocation, deliveryDate, deliveryTime, additionalDetails } = await req.json();

    // ID de la hoja y rango
    const spreadsheetId = process.env.SPREADSHEET_ID; // Obtenemos el ID de la hoja desde el entorno
    const range = 'Hoja1!A1:F1'; // Asegúrate de que "Hoja1" es el nombre correcto de tu hoja de cálculo

    // Insertar los datos en Google Sheets
    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range,
      valueInputOption: 'RAW',
      requestBody: {
        values: [
          [packageType, pickupLocation, deliveryLocation, deliveryDate, deliveryTime, additionalDetails],
        ],
      },
    });

    return new Response(JSON.stringify({ message: 'Datos guardados en Google Sheets exitosamente' }), { status: 200 });
  } catch (error) {
    console.error('Error saving data to Google Sheets:', error);
    return new Response(JSON.stringify({ error: 'Error saving data to Google Sheets' }), { status: 500 });
  }
}
