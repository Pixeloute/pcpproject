import { Clock } from 'lucide-react';

export default function DeadlineBanner() {
  return (
    <div className="bg-amber-500 text-white">
      <div className="max-w-6xl mx-auto px-4 py-2.5 flex items-center justify-center gap-2 text-center">
        <Clock className="w-4 h-4 flex-shrink-0" />
        <p className="text-sm font-medium">
          <strong>June 2026 deadline:</strong> Complaints submitted before 30 June 2026 receive compensation up to 14 months sooner — on the FCA priority track.
        </p>
      </div>
    </div>
  );
}
