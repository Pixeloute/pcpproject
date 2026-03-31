'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { step4Schema, type Step4FormData } from '@/lib/validations';
import type { Step4Data } from '@/lib/types';
import { AlertTriangle, ArrowLeft, Send, Loader2, Info, ShieldCheck } from 'lucide-react';

const DECLARATIONS = [
  {
    key: 'noFosDetermination' as const,
    text: 'I confirm that I have NOT previously received a Financial Ombudsman Service determination on this specific finance agreement.',
  },
  {
    key: 'noPriorRedress' as const,
    text: 'I confirm that I have NOT previously accepted redress or settlement in relation to this specific finance agreement.',
  },
  {
    key: 'noInsolvency' as const,
    text: 'I confirm that I am NOT currently subject to bankruptcy, an Individual Voluntary Arrangement (IVA), or a Debt Relief Order — or I will immediately notify ClaimAssist if any insolvency event applies.',
  },
  {
    key: 'noMultipleRepresentation' as const,
    text: 'I confirm that I have NOT instructed any other claims management company or solicitor to act on my behalf in relation to this same finance agreement.',
  },
];

interface Props {
  defaultValues?: Partial<Step4Data>;
  onSubmit: (data: Step4Data) => Promise<void>;
  onBack: () => void;
}

export default function Step4Declarations({ defaultValues, onSubmit, onBack }: Props) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Step4FormData>({
    resolver: zodResolver(step4Schema),
    defaultValues: {
      noFosDetermination: defaultValues?.noFosDetermination ?? false,
      noPriorRedress: defaultValues?.noPriorRedress ?? false,
      noInsolvency: defaultValues?.noInsolvency ?? false,
      noMultipleRepresentation: defaultValues?.noMultipleRepresentation ?? false,
      feeDisclosureAcknowledged: defaultValues?.feeDisclosureAcknowledged ?? false,
      marketingConsent: defaultValues?.marketingConsent ?? false,
      selfClaimingDeclaration: defaultValues?.selfClaimingDeclaration ?? false,
    },
  });

  const handleFormSubmit = async (data: Step4FormData) => {
    setIsSubmitting(true);
    try {
      await onSubmit(data as Step4Data);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-5">
      {/* Mandatory declarations */}
      <div>
        <h3 className="font-bold text-[#0F1F3D] mb-3 flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-teal-600" />
          Required Declarations
        </h3>
        <div className="space-y-3">
          {DECLARATIONS.map(({ key, text }) => (
            <label key={key} className={`flex items-start gap-3 p-4 rounded-xl border-2 cursor-pointer transition-colors ${errors[key] ? 'border-red-300 bg-red-50' : 'border-gray-200 bg-gray-50 hover:border-amber-300'}`}>
              <input
                type="checkbox"
                {...register(key)}
                className="mt-0.5 w-4 h-4 flex-shrink-0 rounded border-gray-300 text-amber-500 focus:ring-amber-400"
              />
              <span className="text-sm text-gray-700 leading-snug">{text}</span>
            </label>
          ))}
          {(errors.noFosDetermination || errors.noPriorRedress || errors.noInsolvency || errors.noMultipleRepresentation) && (
            <p className="form-error text-sm"><AlertTriangle className="w-4 h-4" />Please confirm all declarations above to continue.</p>
          )}
        </div>
      </div>

      {/* Fee disclosure — mandatory PS26/3 LG-8 */}
      <div className="p-5 bg-amber-50 border-2 border-amber-200 rounded-xl">
        <div className="flex items-start gap-3 mb-3">
          <Info className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-bold text-amber-800 text-sm">Fee Disclosure — Please Read Carefully</p>
          </div>
        </div>
        <div className="text-sm text-amber-900 space-y-2 mb-4 leading-relaxed">
          <p><strong>The FCA motor finance redress scheme is entirely free to use.</strong> You can submit a complaint directly to your lender or to the Financial Ombudsman Service at no cost to you.</p>
          <p>If you choose to use ClaimAssist, our fee is charged as a percentage of any compensation you receive:</p>
          <ul className="list-disc pl-5 space-y-1 text-amber-800">
            <li>Up to £1,499 redress: <strong>30% + VAT</strong></li>
            <li>£1,500 – £9,999 redress: <strong>28% + VAT</strong></li>
            <li>£10,000 or more: <strong>15% + VAT</strong></li>
          </ul>
          <p>Example: On an FCA average payout of £830, our fee would be approximately <strong>£249</strong> (incl. VAT at 30%), and you would receive approximately <strong>£581</strong>. If no compensation is received, no fee is charged.</p>
          <p className="text-xs text-amber-700">You have a 14-day cooling-off period from signing. Full terms available before any agreement is signed.</p>
        </div>
        <label className={`flex items-start gap-3 cursor-pointer p-3 rounded-lg border-2 transition-colors ${errors.feeDisclosureAcknowledged ? 'border-red-300 bg-red-50' : 'border-amber-300 bg-white hover:border-amber-500'}`}>
          <input
            type="checkbox"
            {...register('feeDisclosureAcknowledged')}
            className="mt-0.5 w-4 h-4 flex-shrink-0 rounded border-amber-300 text-amber-500 focus:ring-amber-400"
          />
          <span className="text-sm text-amber-900 font-medium leading-snug">
            I have read and understood the fee disclosure above, including that the FCA scheme is free to use without a claims management company.
          </span>
        </label>
        {errors.feeDisclosureAcknowledged && (
          <p className="form-error mt-2"><AlertTriangle className="w-4 h-4" />{errors.feeDisclosureAcknowledged.message}</p>
        )}
      </div>

      {/* Self-claiming declaration — addresses government focus */}
      <label className={`flex items-start gap-3 p-4 rounded-xl border-2 cursor-pointer transition-colors ${errors.selfClaimingDeclaration ? 'border-red-300 bg-red-50' : 'border-gray-200 bg-gray-50 hover:border-amber-300'}`}>
        <input
          type="checkbox"
          {...register('selfClaimingDeclaration')}
          className="mt-0.5 w-4 h-4 flex-shrink-0 rounded border-gray-300 text-amber-500 focus:ring-amber-400"
        />
        <span className="text-sm text-gray-700 leading-snug">
          I confirm that I am the registered keeper or named party on the finance agreement, that I am making this enquiry on my own behalf, and that I am aged 18 or over.
        </span>
      </label>
      {errors.selfClaimingDeclaration && (
        <p className="form-error"><AlertTriangle className="w-4 h-4" />{errors.selfClaimingDeclaration.message}</p>
      )}

      {/* Marketing consent */}
      <label className={`flex items-start gap-3 p-4 rounded-xl border-2 cursor-pointer transition-colors ${errors.marketingConsent ? 'border-red-300 bg-red-50' : 'border-gray-200 bg-gray-50 hover:border-amber-300'}`}>
        <input
          type="checkbox"
          {...register('marketingConsent')}
          className="mt-0.5 w-4 h-4 flex-shrink-0 rounded border-gray-300 text-amber-500 focus:ring-amber-400"
        />
        <span className="text-sm text-gray-700 leading-snug">
          I consent to ClaimAssist contacting me by phone, email, and SMS regarding my enquiry and any related services. I can withdraw this consent at any time. Your data is processed in accordance with our{' '}
          <a href="#" className="underline text-blue-600 hover:text-blue-800">Privacy Policy</a>.
        </span>
      </label>
      {errors.marketingConsent && (
        <p className="form-error"><AlertTriangle className="w-4 h-4" />{errors.marketingConsent.message}</p>
      )}

      <div className="flex gap-3 pt-2">
        <button
          type="button"
          onClick={onBack}
          disabled={isSubmitting}
          className="flex items-center gap-2 px-6 py-3 bg-white border-2 border-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-colors disabled:opacity-50"
        >
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="btn-navy flex-1 flex items-center justify-center gap-3 group disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Submitting…
            </>
          ) : (
            <>
              <Send className="w-5 h-5" />
              Submit My Enquiry
            </>
          )}
        </button>
      </div>

      <p className="text-xs text-gray-400 text-center leading-relaxed">
        By submitting you are not signing a contract. A case manager will review your enquiry and contact you before any agreement is entered into.
      </p>
    </form>
  );
}
