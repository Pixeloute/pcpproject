import { CheckCircle, XCircle } from 'lucide-react';

const ELIGIBLE = [
  'PCP (Personal Contract Purchase)',
  'HP (Hire Purchase)',
  'Cars, vans, campervans, motorbikes',
  'Agreements: April 2007 – November 2024',
  'No prior FOS determination',
];

const NOT_ELIGIBLE = [
  'Lease / contract hire agreements',
  'Zero interest (0% APR) deals',
  'Agreements outside the date range',
  'If you\'ve already received a FOS ruling',
  'Caravans or static vehicles',
];

export default function EligibilityBar() {
  return (
    <section className="bg-white py-14 border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-[#0F1F3D] text-center mb-10">
          Who May Be Eligible?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-teal-50 border border-teal-200 rounded-2xl p-6">
            <h3 className="text-teal-800 font-bold text-lg mb-4 flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-teal-600" />
              Potentially Eligible
            </h3>
            <ul className="space-y-2.5">
              {ELIGIBLE.map((item) => (
                <li key={item} className="flex items-center gap-2.5 text-teal-900 text-sm">
                  <CheckCircle className="w-4 h-4 text-teal-500 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-red-50 border border-red-200 rounded-2xl p-6">
            <h3 className="text-red-800 font-bold text-lg mb-4 flex items-center gap-2">
              <XCircle className="w-5 h-5 text-red-500" />
              Not Covered by the Scheme
            </h3>
            <ul className="space-y-2.5">
              {NOT_ELIGIBLE.map((item) => (
                <li key={item} className="flex items-center gap-2.5 text-red-900 text-sm">
                  <XCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
