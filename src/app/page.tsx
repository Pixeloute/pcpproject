import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import FreeRouteBanner from '@/components/sections/FreeRouteBanner';
import DeadlineBanner from '@/components/sections/DeadlineBanner';
import HeroSection from '@/components/sections/HeroSection';
import TrustSignals from '@/components/sections/TrustSignals';
import HowItWorksSection from '@/components/sections/HowItWorksSection';
import EligibilityBar from '@/components/sections/EligibilityBar';
import FAQSection from '@/components/sections/FAQSection';
import ClaimWizard from '@/components/form/ClaimWizard';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <FreeRouteBanner />
      <DeadlineBanner />

      <main className="flex-1">
        <HeroSection />
        <TrustSignals />

        {/* Claim form section */}
        <section
          id="check-eligibility"
          className="bg-gradient-to-b from-[#F8F9FA] to-white py-16 md:py-20 scroll-mt-16"
        >
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-start">
              {/* Form — takes 3/5 on large screens */}
              <div className="lg:col-span-3">
                <ClaimWizard />
              </div>

              {/* Sidebar — takes 2/5 on large screens */}
              <div className="lg:col-span-2 space-y-5 lg:sticky lg:top-24">
                <div className="bg-[#0F1F3D] text-white rounded-2xl p-6">
                  <h3 className="font-bold text-lg mb-4 text-amber-400">Why Use Expert Assistance?</h3>
                  <ul className="space-y-3 text-sm text-gray-300">
                    {[
                      'We handle all correspondence with your lender',
                      'We track FCA deadlines and submission windows',
                      'We explain your Provisional Redress Decision',
                      'We escalate to the Financial Ombudsman if needed',
                      'No paperwork for you to prepare or send',
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-2.5">
                        <span className="text-teal-400 mt-0.5">✓</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                  <p className="text-gray-500 text-xs mt-4 pt-4 border-t border-[#1a3260] leading-relaxed">
                    You can also claim for free directly with your lender or the Financial Ombudsman Service — no CMC needed.
                  </p>
                </div>

                <div className="bg-white border border-gray-200 rounded-2xl p-5">
                  <h4 className="font-bold text-[#0F1F3D] text-sm mb-3">Compensation Estimate</h4>
                  <div className="text-center py-3">
                    <div className="text-4xl font-black text-amber-500 mb-1">£830</div>
                    <p className="text-gray-500 text-xs">FCA average per eligible agreement</p>
                  </div>
                  <div className="text-xs text-gray-400 space-y-1 border-t border-gray-100 pt-3 mt-3">
                    <p>• Higher commissions → higher redress</p>
                    <p>• Multiple agreements = multiple claims</p>
                    <p>• Plus compensatory interest from overpayment date</p>
                  </div>
                  <p className="text-gray-400 text-xs mt-3">Source: FCA PS26/3. Individual results vary.</p>
                </div>

                <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5">
                  <p className="text-amber-800 font-bold text-sm mb-1">Priority Track Deadline</p>
                  <p className="text-amber-700 text-xs leading-relaxed">
                    Complaints submitted before <strong>30 June 2026</strong> go on the FCA priority track — compensation paid by November 2026, up to 14 months earlier.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <HowItWorksSection />
        <EligibilityBar />
        <FAQSection />
      </main>

      <Footer />
    </div>
  );
}
