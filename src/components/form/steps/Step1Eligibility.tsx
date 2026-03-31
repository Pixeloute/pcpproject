'use client';

import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { step1Schema, type Step1FormData } from '@/lib/validations';
import type { Step1Data } from '@/lib/types';
import { Car, Truck, Caravan, Bike, AlertTriangle, ArrowRight } from 'lucide-react';

const AGREEMENT_TYPES = [
  { value: 'pcp', label: 'PCP', desc: 'Personal Contract Purchase' },
  { value: 'hp', label: 'HP', desc: 'Hire Purchase' },
  { value: 'unsure', label: 'Not Sure', desc: "I'm not certain of the type" },
] as const;

const VEHICLE_TYPES = [
  { value: 'car', label: 'Car', icon: Car },
  { value: 'van', label: 'Van', icon: Truck },
  { value: 'campervan', label: 'Campervan', icon: Caravan },
  { value: 'motorbike', label: 'Motorbike', icon: Bike },
] as const;

const YEARS = Array.from({ length: 18 }, (_, i) => String(2024 - i));

interface Props {
  defaultValues?: Partial<Step1Data>;
  onNext: (data: Step1Data, ineligible?: { reason: string }) => void;
}

export default function Step1Eligibility({ defaultValues, onNext }: Props) {
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<Step1FormData>({
    resolver: zodResolver(step1Schema),
    defaultValues: {
      agreementType: defaultValues?.agreementType,
      agreementYear: defaultValues?.agreementYear || '',
      vehicleType: defaultValues?.vehicleType,
    },
  });

  const agreementYear = watch('agreementYear');

  const onSubmit = (data: Step1FormData) => {
    const year = parseInt(data.agreementYear);
    if (year < 2007 || year > 2024) {
      onNext(data as Step1Data, {
        reason: `Your agreement year (${data.agreementYear}) falls outside the FCA scheme coverage period of April 2007 to November 2024.`,
      });
      return;
    }
    onNext(data as Step1Data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <p className="form-label">What type of car finance agreement did you have?</p>
        <Controller
          name="agreementType"
          control={control}
          render={({ field }) => (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {AGREEMENT_TYPES.map((type) => (
                <label
                  key={type.value}
                  className={`radio-card ${field.value === type.value ? 'radio-card-selected' : ''}`}
                >
                  <input
                    type="radio"
                    className="sr-only"
                    value={type.value}
                    checked={field.value === type.value}
                    onChange={() => field.onChange(type.value)}
                  />
                  <div className={`w-4 h-4 rounded-full border-2 flex-shrink-0 ${field.value === type.value ? 'border-amber-500 bg-amber-500' : 'border-gray-300'}`} />
                  <div>
                    <span className="font-semibold text-[#0F1F3D] text-sm block">{type.label}</span>
                    <span className="text-gray-500 text-xs">{type.desc}</span>
                  </div>
                </label>
              ))}
            </div>
          )}
        />
        {errors.agreementType && (
          <p className="form-error">
            <AlertTriangle className="w-4 h-4" />
            {errors.agreementType.message}
          </p>
        )}
      </div>

      <div>
        <label className="form-label" htmlFor="agreementYear">
          Approximately which year was your finance agreement taken out?
        </label>
        <select
          id="agreementYear"
          {...register('agreementYear')}
          className={`form-input ${errors.agreementYear ? 'form-input-error' : ''}`}
        >
          <option value="">Select a year…</option>
          {YEARS.map((year) => (
            <option key={year} value={year}>{year}</option>
          ))}
          <option value="2006">Before 2007 (not eligible)</option>
        </select>
        {errors.agreementYear && (
          <p className="form-error">
            <AlertTriangle className="w-4 h-4" />
            {errors.agreementYear.message}
          </p>
        )}
        {agreementYear && parseInt(agreementYear) >= 2007 && parseInt(agreementYear) <= 2024 && (
          <p className="text-teal-600 text-xs mt-1.5 font-medium">✓ This year falls within the FCA scheme coverage period.</p>
        )}
      </div>

      <div>
        <p className="form-label">What type of vehicle was the finance for?</p>
        <Controller
          name="vehicleType"
          control={control}
          render={({ field }) => (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {VEHICLE_TYPES.map((type) => (
                <label
                  key={type.value}
                  className={`flex flex-col items-center justify-center gap-2 p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 hover:border-amber-400 hover:bg-amber-50 ${field.value === type.value ? 'border-amber-500 bg-amber-50' : 'border-gray-200'}`}
                >
                  <input
                    type="radio"
                    className="sr-only"
                    value={type.value}
                    checked={field.value === type.value}
                    onChange={() => field.onChange(type.value)}
                  />
                  <type.icon className={`w-7 h-7 ${field.value === type.value ? 'text-amber-600' : 'text-gray-400'}`} />
                  <span className="text-sm font-semibold text-[#0F1F3D]">{type.label}</span>
                </label>
              ))}
            </div>
          )}
        />
        {errors.vehicleType && (
          <p className="form-error">
            <AlertTriangle className="w-4 h-4" />
            {errors.vehicleType.message}
          </p>
        )}
      </div>

      <button type="submit" className="btn-primary w-full flex items-center justify-center gap-3 group">
        Continue
        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
      </button>
    </form>
  );
}
