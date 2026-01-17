'use client';

import Link from 'next/link';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { DailyMission } from '@/lib/types';

interface MissionCardProps {
  mission: DailyMission;
}

export default function MissionCard({ mission }: MissionCardProps) {
  return (
    <div className={`bg-white dark:bg-gray-800 rounded-xl p-4 border-2 transition-all ${
      mission.completed 
        ? 'border-green-500 bg-green-50 dark:bg-green-900/20' 
        : 'border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500'
    }`}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            {mission.completed ? (
              <CheckCircle2 className="w-5 h-5 text-green-600" />
            ) : (
              <div className="w-5 h-5 rounded-full border-2 border-gray-300 dark:border-gray-600" />
            )}
            <h3 className="font-bold text-gray-900 dark:text-gray-100">
              {mission.title}
            </h3>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 ml-7">
            {mission.description}
          </p>
          <div className="flex items-center space-x-3 mt-3 ml-7">
            <span className="text-xs font-medium text-blue-600 dark:text-blue-400">
              +{mission.xpReward} XP
            </span>
            <span className="text-xs font-medium text-yellow-600 dark:text-yellow-400">
              +{mission.coinsReward} moedas
            </span>
          </div>
        </div>
        {!mission.completed && (
          <Link
            href={mission.type === 'lesson' ? '/trilha' : '/tarefas'}
            className="ml-4 p-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-lg transition-all"
          >
            <ArrowRight className="w-5 h-5" />
          </Link>
        )}
      </div>
    </div>
  );
}
