import { google } from 'googleapis';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const credentials = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_JSON || '');

    if (!credentials) {
      console.error('Google Service Account credentials are missing');
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
    }

    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth });

    const { packageType, pickupLocation, deliveryLocation, deliveryDate, deliveryTime, additionalDetails } = await req.json();

    const spreadsheetId = process.env.SPREADSHEET_ID;
    
    if (!spreadsheetId) {
      console.error('Spreadsheet ID is missing');
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
    }

    const range = 'Hoja1!A:F'; // This will append to the next available row

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

