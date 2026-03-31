'use client';

import { useState } from 'react';
import { useMultiStepForm } from '@/hooks/useMultiStepForm';
import Step1Eligibility from './steps/Step1Eligibility';
import Step2Vehicle from './steps/Step2Vehicle';
import Step3Personal from './steps/Step3Personal';
import Step4Declarations from './steps/Step4Declarations';
import type { Step1Data, Step2Data, Step3Data, Step4Data } from '@/lib/types';
import { CheckCircle, XCircle, Clock, Phone, ExternalLink } from 'lucide-react';

const STEP_LABELS = ['Eligibility', 'Vehicle Details', 'Your Details', 'Declarations'];

function ProgressBar({ currentStep, totalSteps }: { currentStep: number; totalSteps: number }) {
  const pct = ((currentStep - 1) / (totalSteps - 1)) * 100;
  return (
    <div className="mb-8">
      <div className="flex justify-between mb-3">
        {STEP_LABELS.map((label, idx) => {
          const step = idx + 1;
          const done = step < currentStep;
          const active = step === currentStep;
          return (
            <div key={label} className="flex flex-col items-center gap-1 flex-1">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-all duration-300 ${
                  done
                    ? 'bg-teal-500 border-teal-500 text-white'
                    : active
                    ? 'bg-amber-500 border-amber-500 text-white scale-110'
                    : 'bg-white border-gray-300 text-gray-400'
                }`}
              >
                {done ? <CheckCircle className="w-4 h-4" /> : step}
              </div>
              <span className={`text-xs hidden sm:block font-medium ${active ? 'text-amber-600' : done ? 'text-teal-600' : 'text-gray-400'}`}>
                {label}
              </span>
            </div>
          );
        })}
      </div>
      <div className="relative h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-amber-400 to-amber-500 rounded-full transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>
      <p className="text-xs text-gray-500 text-right mt-1">Step {currentStep} of {totalSteps}</p>
    </div>
  );
}

function IneligibleScreen({ reason }: { reason: string }) {
  return (
    <div className="text-center py-8">
      <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <XCircle className="w-9 h-9 text-orange-500" />
      </div>
      <h3 className="text-xl font-bold text-[#0F1F3D] mb-3">Your Agreement May Not Be Eligible</h3>
      <p className="text-gray-600 text-sm leading-relaxed mb-6 max-w-md mx-auto">{reason}</p>

      <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 text-left max-w-md mx-auto mb-6">
        <p className="text-blue-800 font-semibold text-sm mb-2 flex items-center gap-2">
          <ExternalLink className="w-4 h-4" />
          You Can Still Contact the FCA Directly
        </p>
        <p className="text-blue-700 text-xs leading-relaxed">
          Even if your agreement is outside the scheme parameters, you may have other avenues. The Financial Ombudsman Service can assess individual circumstances outside of the formal scheme.
        </p>
      </div>

      <a
        href="https://www.fca.org.uk/consumers/motor-finance-complaints"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 text-sm text-blue-600 underline hover:text-blue-800"
      >
        FCA Motor Finance Information <ExternalLink className="w-3 h-3" />
      </a>
    </div>
  );
}

function SuccessScreen({ caseRef }: { caseRef: string }) {
  return (
    <div className="text-center py-8">
      <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <CheckCircle className="w-9 h-9 text-teal-600" />
      </div>
      <h3 className="text-2xl font-bold text-[#0F1F3D] mb-2">Enquiry Received</h3>
      <p className="text-gray-600 text-sm mb-2">Your case reference is:</p>
      <div className="inline-block bg-[#0F1F3D] text-amber-400 font-mono text-lg font-bold px-6 py-3 rounded-xl mb-6 tracking-wider">
        {caseRef}
      </div>

      <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 text-left max-w-sm mx-auto mb-6 space-y-3">
        <h4 className="font-bold text-[#0F1F3D] text-sm">What Happens Next</h4>
        {[
          { icon: Clock, text: 'A case manager will review your details within 1–2 business days' },
          { icon: Phone, text: 'We\'ll call or email you to discuss your case and confirm next steps' },
          { icon: CheckCircle, text: 'If eligible, we\'ll prepare and submit your complaint before the June 2026 deadline' },
        ].map(({ icon: Icon, text }, i) => (
          <div key={i} className="flex items-start gap-3">
            <Icon className="w-4 h-4 text-teal-600 mt-0.5 flex-shrink-0" />
            <p className="text-gray-600 text-xs leading-snug">{text}</p>
          </div>
        ))}
      </div>

      <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl max-w-sm mx-auto">
        <p className="text-blue-800 text-xs leading-relaxed">
          <strong>Reminder:</strong> The FCA redress scheme is free to use. You can withdraw your enquiry within 14 days with no obligation. A full agreement must be signed before we act on your behalf.
        </p>
      </div>
    </div>
  );
}

export default function ClaimWizard() {
  const {
    currentStep,
    totalSteps,
    formData,
    isSubmitted,
    isIneligible,
    ineligibilityReason,
    updateStep1,
    updateStep2,
    updateStep3,
    updateStep4,
    goToNext,
    goToPrev,
    markIneligible,
    markSubmitted,
  } = useMultiStepForm();

  const [caseRef, setCaseRef] = useState('');

  const handleStep1 = (data: Step1Data, ineligible?: { reason: string }) => {
    updateStep1(data);
    if (ineligible) {
      markIneligible(ineligible.reason);
    } else {
      goToNext();
    }
  };

  const handleStep2 = (data: Step2Data) => {
    updateStep2(data);
    goToNext();
  };

  const handleStep3 = (data: Step3Data) => {
    updateStep3(data);
    goToNext();
  };

  const handleStep4 = async (data: Step4Data) => {
    updateStep4(data);
    const res = await fetch('/api/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        step1: formData.step1,
        step2: formData.step2,
        step3: formData.step3,
        step4: data,
      }),
    });
    const result = await res.json();
    if (res.ok) {
      setCaseRef(result.caseReference);
      markSubmitted();
    } else {
      alert('There was a problem submitting your enquiry. Please try again or call us on 0800 123 4567.');
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
      <div className="bg-gradient-to-r from-[#0F1F3D] to-[#1a3260] px-6 py-5">
        <h2 className="text-white font-bold text-xl">Check Your Eligibility</h2>
        <p className="text-gray-400 text-sm mt-0.5">Takes approximately 3 minutes · No commitment required</p>
      </div>

      <div className="p-6 md:p-8">
        {isIneligible ? (
          <IneligibleScreen reason={ineligibilityReason} />
        ) : isSubmitted ? (
          <SuccessScreen caseRef={caseRef} />
        ) : (
          <>
            <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
            {currentStep === 1 && (
              <Step1Eligibility defaultValues={formData.step1} onNext={handleStep1} />
            )}
            {currentStep === 2 && (
              <Step2Vehicle defaultValues={formData.step2} onNext={handleStep2} onBack={goToPrev} />
            )}
            {currentStep === 3 && (
              <Step3Personal defaultValues={formData.step3} onNext={handleStep3} onBack={goToPrev} />
            )}
            {currentStep === 4 && (
              <Step4Declarations defaultValues={formData.step4} onSubmit={handleStep4} onBack={goToPrev} />
            )}
          </>
        )}
      </div>
    </div>
  );
}

