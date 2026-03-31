'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { step3Schema, type Step3FormData } from '@/lib/validations';
import type { Step3Data } from '@/lib/types';
import { AlertTriangle, ArrowRight, ArrowLeft, Lock } from 'lucide-react';

interface Props {
  defaultValues?: Partial<Step3Data>;
  onNext: (data: Step3Data) => void;
  onBack: () => void;
}

export default function Step3Personal({ defaultValues, onNext, onBack }: Props) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Step3FormData>({
    resolver: zodResolver(step3Schema),
    defaultValues: {
      sameAddressAtAgreement: defaultValues?.sameAddressAtAgreement ?? true,
      firstName: defaultValues?.firstName || '',
      lastName: defaultValues?.lastName || '',
      dateOfBirth: defaultValues?.dateOfBirth || '',
      currentAddressLine1: defaultValues?.currentAddressLine1 || '',
      currentAddressLine2: defaultValues?.currentAddressLine2 || '',
      currentCity: defaultValues?.currentCity || '',
      currentPostcode: defaultValues?.currentPostcode || '',
      previousAddressLine1: defaultValues?.previousAddressLine1 || '',
      previousAddressLine2: defaultValues?.previousAddressLine2 || '',
      previousCity: defaultValues?.previousCity || '',
      previousPostcode: defaultValues?.previousPostcode || '',
      mobileNumber: defaultValues?.mobileNumber || '',
      emailAddress: defaultValues?.emailAddress || '',
      emailConfirm: defaultValues?.emailConfirm || '',
    },
  });

  const sameAddress = watch('sameAddressAtAgreement');

  const onSubmit = (data: Step3FormData) => {
    onNext(data as Step3Data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-xl border border-gray-200 mb-1">
        <Lock className="w-4 h-4 text-gray-500 flex-shrink-0" />
        <p className="text-xs text-gray-500">Your data is encrypted and only used to process your enquiry. See our Privacy Policy.</p>
      </div>

      {/* Name */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="form-label" htmlFor="firstName">First Name</label>
          <input
            id="firstName"
            {...register('firstName')}
            className={`form-input ${errors.firstName ? 'form-input-error' : ''}`}
            placeholder="Your first name"
            autoComplete="given-name"
          />
          {errors.firstName && <p className="form-error"><AlertTriangle className="w-4 h-4" />{errors.firstName.message}</p>}
        </div>
        <div>
          <label className="form-label" htmlFor="lastName">Last Name</label>
          <input
            id="lastName"
            {...register('lastName')}
            className={`form-input ${errors.lastName ? 'form-input-error' : ''}`}
            placeholder="Your last name"
            autoComplete="family-name"
          />
          {errors.lastName && <p className="form-error"><AlertTriangle className="w-4 h-4" />{errors.lastName.message}</p>}
        </div>
      </div>

      {/* DOB */}
      <div>
        <label className="form-label" htmlFor="dateOfBirth">Date of Birth</label>
        <input
          id="dateOfBirth"
          type="date"
          {...register('dateOfBirth')}
          className={`form-input ${errors.dateOfBirth ? 'form-input-error' : ''}`}
          autoComplete="bday"
          max={new Date(new Date().setFullYear(new Date().getFullYear() - 18)).toISOString().split('T')[0]}
        />
        {errors.dateOfBirth && <p className="form-error"><AlertTriangle className="w-4 h-4" />{errors.dateOfBirth.message}</p>}
      </div>

      {/* Current address */}
      <div>
        <p className="form-label">Current Address</p>
        <div className="space-y-3">
          <input
            {...register('currentAddressLine1')}
            className={`form-input ${errors.currentAddressLine1 ? 'form-input-error' : ''}`}
            placeholder="Address line 1"
            autoComplete="address-line1"
          />
          {errors.currentAddressLine1 && <p className="form-error"><AlertTriangle className="w-4 h-4" />{errors.currentAddressLine1.message}</p>}
          <input
            {...register('currentAddressLine2')}
            className="form-input"
            placeholder="Address line 2 (optional)"
            autoComplete="address-line2"
          />
          <div className="grid grid-cols-2 gap-3">
            <input
              {...register('currentCity')}
              className={`form-input ${errors.currentCity ? 'form-input-error' : ''}`}
              placeholder="City / Town"
              autoComplete="address-level2"
            />
            <input
              {...register('currentPostcode')}
              className={`form-input uppercase ${errors.currentPostcode ? 'form-input-error' : ''}`}
              placeholder="Postcode"
              autoComplete="postal-code"
              style={{ textTransform: 'uppercase' }}
            />
          </div>
          {(errors.currentCity || errors.currentPostcode) && (
            <p className="form-error"><AlertTriangle className="w-4 h-4" />{errors.currentCity?.message || errors.currentPostcode?.message}</p>
          )}
        </div>
      </div>

      {/* Same address check */}
      <div>
        <label className="flex items-start gap-3 cursor-pointer p-4 bg-gray-50 rounded-xl border border-gray-200 hover:border-amber-300 transition-colors">
          <input
            type="checkbox"
            {...register('sameAddressAtAgreement')}
            className="mt-0.5 w-4 h-4 rounded border-gray-300 text-amber-500 focus:ring-amber-400"
          />
          <span className="text-sm text-gray-700 font-medium">
            My address was the same when I took out the finance agreement
          </span>
        </label>
      </div>

      {/* Previous address — shown if not same */}
      {!sameAddress && (
        <div>
          <p className="form-label">Address at the Time of the Agreement</p>
          <div className="space-y-3">
            <input
              {...register('previousAddressLine1')}
              className={`form-input ${errors.previousAddressLine1 ? 'form-input-error' : ''}`}
              placeholder="Address line 1"
            />
            {errors.previousAddressLine1 && <p className="form-error"><AlertTriangle className="w-4 h-4" />{errors.previousAddressLine1.message}</p>}
            <input
              {...register('previousAddressLine2')}
              className="form-input"
              placeholder="Address line 2 (optional)"
            />
            <div className="grid grid-cols-2 gap-3">
              <input
                {...register('previousCity')}
                className={`form-input ${errors.previousCity ? 'form-input-error' : ''}`}
                placeholder="City / Town"
              />
              <input
                {...register('previousPostcode')}
                className={`form-input uppercase ${errors.previousPostcode ? 'form-input-error' : ''}`}
                placeholder="Postcode"
                style={{ textTransform: 'uppercase' }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Contact details */}
      <div>
        <label className="form-label" htmlFor="mobileNumber">Mobile Number</label>
        <input
          id="mobileNumber"
          type="tel"
          {...register('mobileNumber')}
          className={`form-input ${errors.mobileNumber ? 'form-input-error' : ''}`}
          placeholder="e.g. 07700 900000"
          autoComplete="tel"
        />
        {errors.mobileNumber && <p className="form-error"><AlertTriangle className="w-4 h-4" />{errors.mobileNumber.message}</p>}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="form-label" htmlFor="emailAddress">Email Address</label>
          <input
            id="emailAddress"
            type="email"
            {...register('emailAddress')}
            className={`form-input ${errors.emailAddress ? 'form-input-error' : ''}`}
            placeholder="your@email.com"
            autoComplete="email"
          />
          {errors.emailAddress && <p className="form-error"><AlertTriangle className="w-4 h-4" />{errors.emailAddress.message}</p>}
        </div>
        <div>
          <label className="form-label" htmlFor="emailConfirm">Confirm Email Address</label>
          <input
            id="emailConfirm"
            type="email"
            {...register('emailConfirm')}
            className={`form-input ${errors.emailConfirm ? 'form-input-error' : ''}`}
            placeholder="Confirm your email"
          />
          {errors.emailConfirm && <p className="form-error"><AlertTriangle className="w-4 h-4" />{errors.emailConfirm.message}</p>}
        </div>
      </div>

      <div className="flex gap-3 pt-2">
        <button type="button" onClick={onBack} className="flex items-center gap-2 px-6 py-3 bg-white border-2 border-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
        <button type="submit" className="btn-primary flex-1 flex items-center justify-center gap-3 group">
          Continue
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </form>
  );
}
