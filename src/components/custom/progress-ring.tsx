'use client';

import { getLevelTitle, getXpProgress, getXpForNextLevel } from '@/lib/utils-game';
import { TrendingUp, Coins } from 'lucide-react';

interface ProgressRingProps {
  level: number;
  xp: number;
  coins: number;
}

export default function ProgressRing({ level, xp, coins }: ProgressRingProps) {
  const progress = getXpProgress(xp);
  const nextLevelXp = getXpForNextLevel(xp);
  const currentLevelXp = (level - 1) * 100;
  const xpInLevel = xp - currentLevelXp;
  const xpNeeded = nextLevelXp - currentLevelXp;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Nível {level}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {getLevelTitle(level)}
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-3 py-1.5 rounded-full">
            <TrendingUp className="w-4 h-4" />
            <span className="font-bold text-sm">{xp} XP</span>
          </div>
          <div className="flex items-center space-x-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-3 py-1.5 rounded-full">
            <Coins className="w-4 h-4" />
            <span className="font-bold text-sm">{coins}</span>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
          <span>{xpInLevel} XP</span>
          <span>{xpNeeded} XP para próximo nível</span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-xs text-center text-gray-500 dark:text-gray-500">
          {Math.round(progress)}% completo
        </p>
      </div>
    </div>
  );
}
