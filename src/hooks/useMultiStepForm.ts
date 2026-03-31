'use client';

import { useState } from 'react';
import type { Step1Data, Step2Data, Step3Data, Step4Data } from '@/lib/types';

export interface FormState {
  step1: Partial<Step1Data>;
  step2: Partial<Step2Data>;
  step3: Partial<Step3Data>;
  step4: Partial<Step4Data>;
}

const TOTAL_STEPS = 4;

export function useMultiStepForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormState>({
    step1: {},
    step2: {},
    step3: {},
    step4: {},
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isIneligible, setIsIneligible] = useState(false);
  const [ineligibilityReason, setIneligibilityReason] = useState('');

  const updateStep1 = (data: Partial<Step1Data>) => {
    setFormData((prev) => ({ ...prev, step1: { ...prev.step1, ...data } }));
  };

  const updateStep2 = (data: Partial<Step2Data>) => {
    setFormData((prev) => ({ ...prev, step2: { ...prev.step2, ...data } }));
  };

  const updateStep3 = (data: Partial<Step3Data>) => {
    setFormData((prev) => ({ ...prev, step3: { ...prev.step3, ...data } }));
  };

  const updateStep4 = (data: Partial<Step4Data>) => {
    setFormData((prev) => ({ ...prev, step4: { ...prev.step4, ...data } }));
  };

  const goToNext = () => {
    if (currentStep < TOTAL_STEPS) {
      setCurrentStep((s) => s + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const goToPrev = () => {
    if (currentStep > 1) {
      setCurrentStep((s) => s - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const markIneligible = (reason: string) => {
    setIsIneligible(true);
    setIneligibilityReason(reason);
  };

  const markSubmitted = () => {
    setIsSubmitted(true);
  };

  return {
    currentStep,
    totalSteps: TOTAL_STEPS,
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
  };
}
