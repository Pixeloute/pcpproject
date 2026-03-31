import { z } from 'zod';

const CURRENT_YEAR = new Date().getFullYear();

export const step1Schema = z.object({
  agreementType: z.enum(['pcp', 'hp', 'unsure'], {
    required_error: 'Please select your agreement type',
  }),
  agreementYear: z
    .string()
    .min(1, 'Please select the year of your agreement')
    .refine(
      (val) => {
        const year = parseInt(val);
        return year >= 2007 && year <= 2024;
      },
      {
        message:
          'Your agreement must be between April 2007 and November 2024 to be eligible',
      }
    ),
  vehicleType: z.enum(['car', 'van', 'campervan', 'motorbike'], {
    required_error: 'Please select your vehicle type',
  }),
});

export const step2Schema = z.object({
  registrationNumber: z
    .string()
    .min(1, 'Please enter your vehicle registration')
    .transform((val) => val.toUpperCase().replace(/\s/g, '')),
  vehicleMake: z.string().optional(),
  vehicleModel: z.string().optional(),
  vehicleYear: z.string().optional(),
  vehicleColour: z.string().optional(),
  lenderName: z.string().min(1, 'Please select or enter your lender'),
  lenderOther: z.string().optional(),
  approximateLoanAmount: z
    .string()
    .min(1, 'Please enter an approximate loan amount')
    .refine((val) => !isNaN(Number(val.replace(/[£,]/g, ''))) && Number(val.replace(/[£,]/g, '')) > 0, {
      message: 'Please enter a valid loan amount',
    }),
  agreementMonth: z.string().min(1, 'Please select the month'),
  agreementYear2: z
    .string()
    .min(1, 'Please select the year')
    .refine(
      (val) => {
        const year = parseInt(val);
        return year >= 2007 && year <= 2024;
      },
      { message: 'Agreement must be between 2007 and 2024' }
    ),
});

export const step3Schema = z
  .object({
    firstName: z.string().min(2, 'Please enter your first name'),
    lastName: z.string().min(2, 'Please enter your last name'),
    dateOfBirth: z
      .string()
      .min(1, 'Please enter your date of birth')
      .refine((val) => {
        const dob = new Date(val);
        const age = (new Date().getTime() - dob.getTime()) / (1000 * 60 * 60 * 24 * 365.25);
        return age >= 18;
      }, 'You must be 18 or over to use this service'),
    currentAddressLine1: z.string().min(3, 'Please enter your address'),
    currentAddressLine2: z.string().optional(),
    currentCity: z.string().min(2, 'Please enter your city or town'),
    currentPostcode: z
      .string()
      .min(5, 'Please enter a valid UK postcode')
      .regex(/^[A-Z]{1,2}\d[A-Z\d]?\s?\d[A-Z]{2}$/i, 'Please enter a valid UK postcode'),
    sameAddressAtAgreement: z.boolean(),
    previousAddressLine1: z.string().optional(),
    previousAddressLine2: z.string().optional(),
    previousCity: z.string().optional(),
    previousPostcode: z.string().optional(),
    mobileNumber: z
      .string()
      .min(1, 'Please enter your mobile number')
      .regex(/^(\+44|0)[0-9]{10}$/, 'Please enter a valid UK mobile number'),
    emailAddress: z.string().email('Please enter a valid email address'),
    emailConfirm: z.string().email('Please confirm your email address'),
  })
  .refine((data) => data.emailAddress === data.emailConfirm, {
    message: 'Email addresses do not match',
    path: ['emailConfirm'],
  })
  .refine(
    (data) => {
      if (!data.sameAddressAtAgreement) {
        return (
          data.previousAddressLine1 &&
          data.previousAddressLine1.length >= 3 &&
          data.previousCity &&
          data.previousCity.length >= 2 &&
          data.previousPostcode &&
          /^[A-Z]{1,2}\d[A-Z\d]?\s?\d[A-Z]{2}$/i.test(data.previousPostcode)
        );
      }
      return true;
    },
    {
      message: 'Please enter your address at the time of the agreement',
      path: ['previousAddressLine1'],
    }
  );

export const step4Schema = z.object({
  noFosDetermination: z
    .boolean()
    .refine((v) => v === true, { message: 'You must confirm this declaration' }),
  noPriorRedress: z
    .boolean()
    .refine((v) => v === true, { message: 'You must confirm this declaration' }),
  noInsolvency: z
    .boolean()
    .refine((v) => v === true, { message: 'You must confirm this declaration' }),
  noMultipleRepresentation: z
    .boolean()
    .refine((v) => v === true, { message: 'You must confirm this declaration' }),
  feeDisclosureAcknowledged: z
    .boolean()
    .refine((v) => v === true, { message: 'You must acknowledge the fee disclosure' }),
  marketingConsent: z
    .boolean()
    .refine((v) => v === true, { message: 'You must consent to be contacted about your enquiry' }),
  selfClaimingDeclaration: z
    .boolean()
    .refine((v) => v === true, { message: 'You must confirm this declaration' }),
});

export type Step1FormData = z.infer<typeof step1Schema>;
export type Step2FormData = z.infer<typeof step2Schema>;
export type Step3FormData = z.infer<typeof step3Schema>;
export type Step4FormData = z.infer<typeof step4Schema>;
