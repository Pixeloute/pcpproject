import { NextRequest, NextResponse } from 'next/server';

function generateCaseReference(): string {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `PCP-${timestamp}-${random}`;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { step1, step2, step3, step4 } = body;

    if (!step1 || !step2 || !step3 || !step4) {
      return NextResponse.json({ error: 'Incomplete form data' }, { status: 400 });
    }

    const caseReference = generateCaseReference();
    const submittedAt = new Date().toISOString();

    // Log submission for server-side capture (replace with CRM/email integration)
    console.log('=== NEW PCP CLAIM SUBMISSION ===');
    console.log('Case Reference:', caseReference);
    console.log('Submitted At:', submittedAt);
    console.log('Agreement Type:', step1.agreementType);
    console.log('Agreement Year:', step1.agreementYear);
    console.log('Vehicle Type:', step1.vehicleType);
    console.log('Registration:', step2.registrationNumber);
    console.log('Vehicle Make:', step2.vehicleMake);
    console.log('Lender:', step2.lenderName === 'Other' ? step2.lenderOther : step2.lenderName);
    console.log('Loan Amount:', step2.approximateLoanAmount);
    console.log('Name:', `${step3.firstName} ${step3.lastName}`);
    console.log('Email:', step3.emailAddress);
    console.log('Mobile:', step3.mobileNumber);
    console.log('Postcode:', step3.currentPostcode);
    console.log('================================');

    // TODO: Integrate with CRM (HubSpot, Salesforce, etc.) or send notification email
    // await sendToCRM({ caseReference, submittedAt, step1, step2, step3, step4 });

    return NextResponse.json({
      success: true,
      caseReference,
      submittedAt,
    });
  } catch {
    return NextResponse.json({ error: 'Submission failed. Please try again.' }, { status: 500 });
  }
}
