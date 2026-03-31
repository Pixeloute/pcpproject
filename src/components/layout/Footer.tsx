import { Shield, Lock } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#0F1F3D] text-gray-300 mt-0">
      {/* Free route mandatory notice */}
      <div className="bg-[#0a1628] border-t border-[#1a3260]">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="bg-blue-900/40 border border-blue-700/50 rounded-xl p-4">
            <p className="text-blue-200 text-sm font-semibold mb-1">
              Important Information — Free Consumer Route
            </p>
            <p className="text-blue-300 text-xs leading-relaxed">
              The FCA motor finance redress scheme is entirely free for consumers to use. You do not need to use a claims management company. You can make a claim directly with your lender or through the Financial Ombudsman Service at no cost. If you choose to use ClaimAssist, our fee will reduce the compensation you receive. Please read our fee disclosure carefully before proceeding.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 bg-amber-500 rounded-lg flex items-center justify-center">
                <Shield className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-white">ClaimAssist</span>
            </div>
            <p className="text-xs leading-relaxed text-gray-400">
              ClaimAssist is a trading name of [Company Name] Ltd. Authorised and regulated by the Financial Conduct Authority. FCA Registration No: [FRN]. Registered in England & Wales. Company No: [Co. No]. ICO Registration: [ICO No].
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm mb-3">Our Fees</h4>
            <div className="text-xs space-y-1 text-gray-400">
              <p>Up to £1,499 redress: 30% + VAT</p>
              <p>£1,500 – £9,999 redress: 28% + VAT</p>
              <p>£10,000+ redress: 15% + VAT</p>
              <p className="mt-2 text-gray-500">No Win, No Fee. Fees apply only if compensation is received.</p>
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm mb-3">Regulatory</h4>
            <div className="text-xs space-y-1 text-gray-400">
              <p>FCA Policy Statement PS26/3</p>
              <p>Scheme covers: 6 April 2007 – 1 November 2024</p>
              <p>14-day cancellation right applies</p>
              <p className="mt-2">
                <a href="#" className="text-blue-400 hover:underline">Privacy Policy</a>
                {' · '}
                <a href="#" className="text-blue-400 hover:underline">Terms of Service</a>
                {' · '}
                <a href="#" className="text-blue-400 hover:underline">Complaints</a>
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-[#1a3260] pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-500 text-center sm:text-left">
            © {new Date().getFullYear()} ClaimAssist Ltd. All rights reserved. This website does not constitute legal advice.
          </p>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 text-xs text-gray-500">
              <Lock className="w-3 h-3" />
              256-bit SSL Encrypted
            </div>
            <span className="text-gray-600">·</span>
            <span className="text-xs text-gray-500">ICO Registered</span>
            <span className="text-gray-600">·</span>
            <span className="text-xs text-gray-500">FCA Authorised</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
