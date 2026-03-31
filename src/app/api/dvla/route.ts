import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { registrationNumber } = body;

    if (!registrationNumber || typeof registrationNumber !== 'string') {
      return NextResponse.json({ error: 'Registration number is required' }, { status: 400 });
    }

    const cleanReg = registrationNumber.toUpperCase().replace(/\s/g, '');

    if (!/^[A-Z0-9]{2,7}$/.test(cleanReg)) {
      return NextResponse.json({ error: 'Invalid registration number format' }, { status: 400 });
    }

    const apiKey = process.env.DVLA_API_KEY;

    if (!apiKey) {
      // Return a mock response in development when no API key is configured
      return NextResponse.json({
        make: 'FORD',
        yearOfManufacture: 2018,
        colour: 'BLUE',
        fuelType: 'PETROL',
        registrationNumber: cleanReg,
        _mock: true,
      });
    }

    const response = await fetch(
      'https://driver-vehicle-licensing.api.gov.uk/vehicle-enquiry/v1/vehicles',
      {
        method: 'POST',
        headers: {
          'x-api-key': apiKey,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ registrationNumber: cleanReg }),
      }
    );

    if (response.status === 404) {
      return NextResponse.json({ error: 'Vehicle not found. Please check the registration number.' }, { status: 404 });
    }

    if (!response.ok) {
      return NextResponse.json({ error: 'Unable to look up vehicle. Please enter details manually.' }, { status: 502 });
    }

    const data = await response.json();
    return NextResponse.json({
      make: data.make,
      yearOfManufacture: data.yearOfManufacture,
      colour: data.colour,
      fuelType: data.fuelType,
      registrationNumber: cleanReg,
    });
  } catch {
    return NextResponse.json({ error: 'Vehicle lookup failed. Please enter details manually.' }, { status: 500 });
  }
}
