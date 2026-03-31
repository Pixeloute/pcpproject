export interface Step1Data {
  agreementType: 'pcp' | 'hp' | 'unsure';
  agreementYear: string;
  vehicleType: 'car' | 'van' | 'campervan' | 'motorbike';
}

export interface Step2Data {
  registrationNumber: string;
  vehicleMake: string;
  vehicleModel: string;
  vehicleYear: string;
  vehicleColour: string;
  lenderName: string;
  lenderOther: string;
  approximateLoanAmount: string;
  agreementMonth: string;
  agreementYear2: string;
}

export interface Step3Data {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  currentAddressLine1: string;
  currentAddressLine2: string;
  currentCity: string;
  currentPostcode: string;
  sameAddressAtAgreement: boolean;
  previousAddressLine1: string;
  previousAddressLine2: string;
  previousCity: string;
  previousPostcode: string;
  mobileNumber: string;
  emailAddress: string;
  emailConfirm: string;
}

export interface Step4Data {
  noFosDetermination: boolean;
  noPriorRedress: boolean;
  noInsolvency: boolean;
  noMultipleRepresentation: boolean;
  feeDisclosureAcknowledged: boolean;
  marketingConsent: boolean;
  selfClaimingDeclaration: boolean;
}

export interface ClaimFormData {
  step1: Step1Data;
  step2: Step2Data;
  step3: Step3Data;
  step4: Step4Data;
}

export interface DVLAResponse {
  make?: string;
  yearOfManufacture?: number;
  colour?: string;
  fuelType?: string;
  registrationNumber?: string;
}

export interface DVLAError {
  error: string;
}
