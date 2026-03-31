import { ClipboardCheck, Search, Banknote } from 'lucide-react';

const STEPS = [
  {
    number: '01',
    icon: ClipboardCheck,
    title: 'Check Your Eligibility',
    desc: 'Complete our short eligibility checker — it takes around 3 minutes. We\'ll review your agreement details to see whether your case falls within the FCA scheme.',
    colour: 'bg-amber-50 text-amber-600',
  },
  {
    number: '02',
    icon: Search,
    title: 'We Handle the Process',
    desc: 'If you choose to proceed with us, our team contacts your lender, manages all correspondence, and keeps you updated throughout — so you don\'t need to chase anything.',
    colour: 'bg-blue-50 text-blue-600',
  },
  {
    number: '03',
    icon: Banknote,
    title: 'Receive Your Outcome',
    desc: 'Your lender assesses your case under the FCA scheme and issues a determination. If compensation is awarded and you used our service, our fee is deducted before the remainder is paid to you.',
    colour: 'bg-teal-50 text-teal-600',
  },
];

export default function HowItWorksSection() {
  return (
    <section className="bg-[#F8F9FA] py-16 md:py-20">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0F1F3D] mb-4">
            How It Works
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            A straightforward process — from checking eligibility to receiving your outcome.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {STEPS.map((step, idx) => (
            <div key={step.number} className="relative">
              {idx < STEPS.length - 1 && (
                <div className="hidden md:block absolute top-10 left-[60%] w-[80%] h-0.5 bg-gray-200 z-0" />
              )}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 relative z-10">
                <div className="flex items-center gap-4 mb-4">
                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 ${step.colour}`}>
                    <step.icon className="w-7 h-7" />
                  </div>
                  <span className="text-4xl font-black text-gray-100">{step.number}</span>
                </div>
                <h3 className="text-lg font-bold text-[#0F1F3D] mb-2">{step.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 p-5 bg-blue-50 border border-blue-200 rounded-xl max-w-3xl mx-auto">
          <p className="text-blue-800 text-sm text-center leading-relaxed">
            <strong>You are not required to use a claims management company.</strong> You can claim directly with your lender or through the Financial Ombudsman Service at no cost. Our service is available if you prefer to have expert support managing the process.
          </p>
        </div>
      </div>
    </section>
  );
}
