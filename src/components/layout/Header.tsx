'use client';

import { Shield, Phone } from 'lucide-react';

export default function Header() {
  return (
    <header className="bg-[#0F1F3D] text-white sticky top-0 z-50 shadow-lg">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-amber-500 rounded-lg flex items-center justify-center flex-shrink-0">
            <Shield className="w-5 h-5 text-white" />
          </div>
          <div>
            <span className="font-bold text-lg leading-none block">ClaimAssist</span>
            <span className="text-xs text-gray-400 leading-none">FCA Authorised Claims Management</span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <a
            href="tel:08001234567"
            className="hidden sm:flex items-center gap-2 text-sm font-medium text-amber-400 hover:text-amber-300 transition-colors"
          >
            <Phone className="w-4 h-4" />
            0800 123 4567
          </a>
          <a
            href="#check-eligibility"
            className="bg-amber-500 hover:bg-amber-400 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
          >
            Check Eligibility
          </a>
        </div>
      </div>
    </header>
  );
}
