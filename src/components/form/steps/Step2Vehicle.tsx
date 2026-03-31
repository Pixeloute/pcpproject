'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { step2Schema, type Step2FormData } from '@/lib/validations';
import type { Step2Data } from '@/lib/types';
import { MAJOR_LENDERS } from '@/lib/lenders';
import { Search, AlertTriangle, ArrowRight, ArrowLeft, CheckCircle, Loader2 } from 'lucide-react';

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

const YEARS = Array.from({ length: 18 }, (_, i) => String(2024 - i));

interface Props {
  defaultValues?: Partial<Step2Data>;
  onNext: (data: Step2Data) => void;
  onBack: () => void;
}

export default function Step2Vehicle({ defaultValues, onNext, onBack }: Props) {
  const [dvlaLoading, setDvlaLoading] = useState(false);
  const [dvlaResult, setDvlaResult] = useState<{ make?: string; yearOfManufacture?: number; colour?: string; _mock?: boolean } | null>(null);
  const [dvlaError, setDvlaError] = useState('');
  const [showLenderOther, setShowLenderOther] = useState(defaultValues?.lenderName === 'Other');

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<Step2FormData>({
    resolver: zodResolver(step2Schema),
    defaultValues: {
      registrationNumber: defaultValues?.registrationNumber || '',
      vehicleMake: defaultValues?.vehicleMake || '',
      vehicleYear: defaultValues?.vehicleYear || '',
      vehicleColour: defaultValues?.vehicleColour || '',
      lenderName: defaultValues?.lenderName || '',
      lenderOther: defaultValues?.lenderOther || '',
      approximateLoanAmount: defaultValues?.approximateLoanAmount || '',
      agreementMonth: defaultValues?.agreementMonth || '',
      agreementYear2: defaultValues?.agreementYear2 || '',
    },
  });

  const regNumber = watch('registrationNumber');

  const lookupVehicle = async () => {
    if (!regNumber || regNumber.length < 2) return;
    setDvlaLoading(true);
    setDvlaError('');
    setDvlaResult(null);
    try {
      const res = await fetch('/api/dvla', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ registrationNumber: regNumber }),
      });
      const data = await res.json();
      if (!res.ok) {
        setDvlaError(data.error || 'Vehicle lookup failed. Please enter details manually.');
        return;
      }
      setDvlaResult(data);
      if (data.make) setValue('vehicleMake', data.make);
      if (data.yearOfManufacture) setValue('vehicleYear', String(data.yearOfManufacture));
      if (data.colour) setValue('vehicleColour', data.colour);
    } catch {
      setDvlaError('Unable to connect to vehicle lookup. Please enter details manually.');
    } finally {
      setDvlaLoading(false);
    }
  };

  const onSubmit = (data: Step2FormData) => {
    onNext(data as Step2Data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {/* Vehicle Registration Lookup */}
      <div>
        <label className="form-label" htmlFor="registrationNumber">
          Vehicle Registration Number
        </label>
        <div className="flex gap-2">
          <input
            id="registrationNumber"
            {...register('registrationNumber')}
            className={`form-input flex-1 uppercase font-mono tracking-widest ${errors.registrationNumber ? 'form-input-error' : ''}`}
            placeholder="e.g. AB12 CDE"
            maxLength={8}
            style={{ textTransform: 'uppercase' }}
          />
          <button
            type="button"
            onClick={lookupVehicle}
            disabled={dvlaLoading || !regNumber}
            className="flex items-center gap-2 px-4 py-3 bg-[#0F1F3D] hover:bg-[#1a3260] text-white rounded-xl text-sm font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
          >
            {dvlaLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
            {dvlaLoading ? 'Looking up…' : 'Look Up'}
          </button>
        </div>
        {errors.registrationNumber && (
          <p className="form-error"><AlertTriangle className="w-4 h-4" />{errors.registrationNumber.message}</p>
        )}
        {dvlaError && <p className="text-amber-600 text-xs mt-1.5 flex items-center gap-1"><AlertTriangle className="w-4 h-4" />{dvlaError}</p>}
        {dvlaResult && (
          <div className="mt-2 p-3 bg-teal-50 border border-teal-200 rounded-xl flex items-start gap-2">
            <CheckCircle className="w-4 h-4 text-teal-600 mt-0.5 flex-shrink-0" />
            <div className="text-teal-800 text-xs">
              <strong>Vehicle found:</strong> {dvlaResult.make} {dvlaResult.yearOfManufacture} ({dvlaResult.colour})
              {dvlaResult._mock && <span className="text-teal-600"> — demo data (add DVLA API key for live lookup)</span>}
            </div>
          </div>
        )}
      </div>

      {/* Vehicle details — shown after lookup or for manual entry */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="form-label" htmlFor="vehicleMake">Make / Manufacturer</label>
          <input
            id="vehicleMake"
            {...register('vehicleMake')}
            className="form-input"
            placeholder="e.g. Ford"
          />
        </div>
        <div>
          <label className="form-label" htmlFor="vehicleYear">Year of Manufacture</label>
          <input
            id="vehicleYear"
            {...register('vehicleYear')}
            className="form-input"
            placeholder="e.g. 2018"
          />
        </div>
        <div>
          <label className="form-label" htmlFor="vehicleColour">Colour</label>
          <input
            id="vehicleColour"
            {...register('vehicleColour')}
            className="form-input"
            placeholder="e.g. Blue"
          />
        </div>
      </div>

      {/* Lender */}
      <div>
        <label className="form-label" htmlFor="lenderName">Finance Lender</label>
        <select
          id="lenderName"
          {...register('lenderName')}
          className={`form-input ${errors.lenderName ? 'form-input-error' : ''}`}
          onChange={(e) => {
            register('lenderName').onChange(e);
            setShowLenderOther(e.target.value === 'Other');
          }}
        >
          <option value="">Select your lender…</option>
          {MAJOR_LENDERS.map((l) => <option key={l} value={l}>{l}</option>)}
        </select>
        {errors.lenderName && <p className="form-error"><AlertTriangle className="w-4 h-4" />{errors.lenderName.message}</p>}
        {showLenderOther && (
          <input
            {...register('lenderOther')}
            className="form-input mt-2"
            placeholder="Please enter your lender name"
          />
        )}
      </div>

      {/* Loan amount */}
      <div>
        <label className="form-label" htmlFor="approximateLoanAmount">
          Approximate Loan / Finance Amount (£)
        </label>
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-semibold">£</span>
          <input
            id="approximateLoanAmount"
            {...register('approximateLoanAmount')}
            className={`form-input pl-8 ${errors.approximateLoanAmount ? 'form-input-error' : ''}`}
            placeholder="e.g. 15000"
            type="number"
            min="1"
          />
        </div>
        {errors.approximateLoanAmount && (
          <p className="form-error"><AlertTriangle className="w-4 h-4" />{errors.approximateLoanAmount.message}</p>
        )}
        <p className="text-gray-400 text-xs mt-1">This is the total financed amount, not the monthly payment.</p>
      </div>

      {/* Precise agreement date */}
      <div>
        <p className="form-label">Approximate Date the Agreement Began</p>
        <div className="grid grid-cols-2 gap-3">
          <select
            {...register('agreementMonth')}
            className={`form-input ${errors.agreementMonth ? 'form-input-error' : ''}`}
          >
            <option value="">Month…</option>
            {MONTHS.map((m, i) => <option key={m} value={String(i + 1)}>{m}</option>)}
          </select>
          <select
            {...register('agreementYear2')}
            className={`form-input ${errors.agreementYear2 ? 'form-input-error' : ''}`}
          >
            <option value="">Year…</option>
            {YEARS.map((y) => <option key={y} value={y}>{y}</option>)}
          </select>
        </div>
        {(errors.agreementMonth || errors.agreementYear2) && (
          <p className="form-error"><AlertTriangle className="w-4 h-4" />Please select the agreement date</p>
        )}
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
