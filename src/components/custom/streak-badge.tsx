'use client';

import { Flame } from 'lucide-react';
import { getStreakMessage } from '@/lib/utils-game';

interface StreakBadgeProps {
  streak: number;
}

export default function StreakBadge({ streak }: StreakBadgeProps) {
  return (
    <div className="flex items-center space-x-3 bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-3 rounded-xl shadow-lg">
      <div className="relative">
        <Flame className="w-6 h-6" />
        {streak > 0 && (
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-white text-orange-600 rounded-full flex items-center justify-center text-xs font-bold">
            {streak}
          </div>
        )}
      </div>
      <div>
        <p className="font-bold text-lg">{streak} dias</p>
        <p className="text-xs opacity-90">{getStreakMessage(streak)}</p>
      </div>
    </div>
  );
}
