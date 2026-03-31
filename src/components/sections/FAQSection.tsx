'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const FAQS = [
  {
    q: 'What is the FCA motor finance redress scheme?',
    a: "The FCA established a formal redress scheme (Policy Statement PS26/3) on 30 March 2026. It covers PCP and HP agreements from April 2007 to November 2024 where undisclosed commission arrangements may have meant consumers were charged a higher interest rate than they should have been. Approximately 12.1 million agreements are potentially eligible.",
  },
  {
    q: 'Do I need a claims management company to make a claim?',
    a: "No. The FCA redress scheme is entirely free for consumers to use. You can submit a complaint directly to your lender, or escalate to the Financial Ombudsman Service, at no cost. If you'd prefer to have someone manage the process on your behalf — handling paperwork, correspondence with your lender, and keeping you updated — that's where we can assist, for a fee.",
  },
  {
    q: 'What types of agreement are covered?',
    a: "Only Personal Contract Purchase (PCP) and Hire Purchase (HP) agreements are covered. Lease or contract hire agreements, zero-interest deals, and agreements outside the April 2007 – November 2024 date range are not covered by the scheme.",
  },
  {
    q: 'How much compensation might I be eligible for?',
    a: "The FCA estimates an average of £830 per agreement, based on a total scheme value of approximately £7.5 billion. Individual amounts vary depending on the commission paid, your APR, loan amount, and agreement term. Some cases involving higher commission structures may receive significantly more. We cannot guarantee any specific outcome.",
  },
  {
    q: 'What is the June 2026 deadline about?',
    a: "If a complaint is submitted before 30 June 2026 (Scheme 2) or 31 August 2026 (Scheme 1), it goes onto the FCA 'priority track'. This means your lender must respond and pay compensation by November 2026 / January 2027. Those who don't complain before those dates go onto an 'opt-in track' and may not receive compensation until late 2027 or 2028.",
  },
  {
    q: 'What are your fees?',
    a: "Our fees are: 30% + VAT for redress up to £1,499; 28% + VAT for £1,500–£9,999; and 15% + VAT for £10,000 or more. These are capped under FCA regulations. You only pay if compensation is received. If no compensation is awarded, there is no charge.",
  },
  {
    q: 'What is a Discretionary Commission Arrangement (DCA)?',
    a: "A DCA was an arrangement where the dealer could adjust the interest rate on your finance deal, and earn a higher commission the higher the rate was set. This created a conflict of interest — the dealer had a financial incentive to charge you more. This was one of three triggers that can qualify an agreement for the scheme.",
  },
  {
    q: 'Can I cancel if I change my mind?',
    a: "Yes. You have a 14-day cooling-off period from the date you sign your agreement with us. If you cancel within that period, any termination fee must reflect only the work actually done on your case. If you cancel after the cooling-off period, a reasonable fee may apply for work completed up to that point.",
  },
];

export default function FAQSection() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="bg-[#F8F9FA] py-16 md:py-20">
      <div className="max-w-3xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-[#0F1F3D] text-center mb-10">
          Frequently Asked Questions
        </h2>

        <div className="space-y-3">
          {FAQS.map((faq, idx) => (
            <div key={idx} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <button
                className="w-full text-left px-6 py-4 flex items-center justify-between gap-4 hover:bg-gray-50 transition-colors"
                onClick={() => setOpen(open === idx ? null : idx)}
                aria-expanded={open === idx}
              >
                <span className="font-semibold text-[#0F1F3D] text-sm leading-snug">{faq.q}</span>
                <ChevronDown
                  className={`w-5 h-5 text-gray-400 flex-shrink-0 transition-transform duration-200 ${open === idx ? 'rotate-180' : ''}`}
                />
              </button>
              {open === idx && (
                <div className="px-6 pb-5 pt-0">
                  <p className="text-gray-600 text-sm leading-relaxed">{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
