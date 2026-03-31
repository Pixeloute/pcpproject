import { Info } from 'lucide-react';

export default function FreeRouteBanner() {
  return (
    <div className="bg-blue-50 border-b border-blue-200">
      <div className="max-w-6xl mx-auto px-4 py-2.5 flex items-start sm:items-center gap-2">
        <Info className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5 sm:mt-0" />
        <p className="text-xs text-blue-800 leading-snug">
          <strong>Important:</strong> The FCA motor finance redress scheme is free to use. You can claim directly with your lender or via the Financial Ombudsman Service without a claims management company.{' '}
          <a
            href="https://www.fca.org.uk/consumers/motor-finance-complaints"
            target="_blank"
            rel="noopener noreferrer"
            className="underline font-medium hover:text-blue-900"
          >
            Learn about the free route →
          </a>
        </p>
      </div>
    </div>
  );
}
