import { CheckCircle, ArrowRight, TrendingUp } from 'lucide-react';

const ELIGIBILITY_BULLETS = [
  'PCP or HP agreements from April 2007 to November 2024',
  'Cars, vans, campervans and motorbikes covered',
  'Average FCA compensation estimate: £830 per agreement',
  'No Win, No Fee — you only pay if successful',
];

export default function HeroSection() {
  return (
    <section className="bg-gradient-to-br from-[#0F1F3D] via-[#1a3260] to-[#0F1F3D] text-white py-16 md:py-24 relative overflow-hidden">
      {/* Background texture */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-64 h-64 rounded-full bg-amber-400 blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-blue-400 blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left column — headline and CTA */}
          <div>
            <div className="inline-flex items-center gap-2 bg-amber-500/20 border border-amber-500/40 rounded-full px-4 py-1.5 text-amber-300 text-sm font-medium mb-6">
              <TrendingUp className="w-4 h-4" />
              FCA Redress Scheme — Now Active
            </div>

            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-5">
              Was Your Car Finance{' '}
              <span className="text-amber-400">Fairly Arranged?</span>
            </h1>

            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              Millions of UK consumers may not have been told that their dealer earned commission on their PCP or HP finance deal — which could have affected the rate they were offered. The FCA has established a formal redress scheme.
            </p>

            <p className="text-gray-400 text-sm leading-relaxed mb-8 p-4 bg-white/5 rounded-xl border border-white/10">
              If you'd prefer expert assistance navigating your enquiry, our team can manage the process on your behalf — handling correspondence with your lender and keeping you informed at every stage.
            </p>

            <ul className="space-y-3 mb-8">
              {ELIGIBILITY_BULLETS.map((bullet) => (
                <li key={bullet} className="flex items-start gap-3 text-sm text-gray-300">
                  <CheckCircle className="w-5 h-5 text-teal-400 flex-shrink-0 mt-0.5" />
                  {bullet}
                </li>
              ))}
            </ul>

            <a
              href="#check-eligibility"
              className="inline-flex items-center gap-3 bg-amber-500 hover:bg-amber-400 text-white font-bold px-8 py-4 rounded-xl text-lg transition-all duration-200 shadow-xl hover:shadow-amber-500/30 group"
            >
              Check Your Eligibility
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <p className="text-gray-500 text-xs mt-3">Takes approximately 3 minutes · No commitment required</p>
          </div>

          {/* Right column — compensation card */}
          <div className="hidden lg:block">
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8">
              <div className="text-center mb-6">
                <p className="text-gray-400 text-sm uppercase tracking-wide font-medium mb-2">FCA Estimated Average</p>
                <div className="text-6xl font-bold text-amber-400 mb-1">£830</div>
                <p className="text-gray-400 text-sm">per eligible agreement</p>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between items-center py-2 border-b border-white/10">
                  <span className="text-gray-400 text-sm">Total eligible UK agreements</span>
                  <span className="text-white font-semibold">12.1 million</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-white/10">
                  <span className="text-gray-400 text-sm">Estimated total redress pool</span>
                  <span className="text-white font-semibold">£7.5 billion</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-white/10">
                  <span className="text-gray-400 text-sm">Scheme 2 priority deadline</span>
                  <span className="text-amber-400 font-semibold">30 June 2026</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-400 text-sm">Coverage period</span>
                  <span className="text-white font-semibold text-sm">Apr 2007 – Nov 2024</span>
                </div>
              </div>

              <p className="text-gray-500 text-xs text-center leading-relaxed">
                Source: FCA Policy Statement PS26/3, March 2026. Individual outcomes vary. The scheme is free to use without a CMC.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
