import { Shield, Award, Lock, Users, Clock, Star } from 'lucide-react';

const SIGNALS = [
  {
    icon: Shield,
    title: 'FCA Authorised',
    desc: 'Regulated claims management company',
    colour: 'text-blue-600 bg-blue-50',
  },
  {
    icon: Award,
    title: 'No Win, No Fee',
    desc: 'You only pay if compensation is received',
    colour: 'text-amber-600 bg-amber-50',
  },
  {
    icon: Lock,
    title: '256-bit SSL',
    desc: 'Bank-grade encryption on all data',
    colour: 'text-teal-600 bg-teal-50',
  },
  {
    icon: Users,
    title: 'ICO Registered',
    desc: 'UK GDPR compliant data handling',
    colour: 'text-purple-600 bg-purple-50',
  },
  {
    icon: Clock,
    title: 'Fast Processing',
    desc: 'Priority track before June 2026 deadline',
    colour: 'text-orange-600 bg-orange-50',
  },
  {
    icon: Star,
    title: 'Expert Team',
    desc: 'Dedicated case managers throughout',
    colour: 'text-green-600 bg-green-50',
  },
];

export default function TrustSignals() {
  return (
    <section className="bg-white py-12 border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {SIGNALS.map((s) => (
            <div key={s.title} className="flex flex-col items-center text-center gap-2 p-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${s.colour}`}>
                <s.icon className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm font-semibold text-[#0F1F3D]">{s.title}</p>
                <p className="text-xs text-gray-500 leading-snug">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
