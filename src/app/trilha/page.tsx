'use client';

import Link from 'next/link';
import { ArrowLeft, BookOpen, CheckCircle2, Lock, Play } from 'lucide-react';
import Navbar from '@/components/custom/navbar';
import { trails, mockUser } from '@/lib/data';

export default function TrilhaPage() {
  const currentTrail = trails[0]; // Por enquanto, apenas a primeira trilha
  const user = mockUser;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Navbar />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <Link
          href="/"
          className="inline-flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Voltar ao Dashboard</span>
        </Link>

        {/* Trail Header */}
        <div className={`bg-gradient-to-r ${currentTrail.color} rounded-2xl p-8 text-white mb-8 shadow-xl`}>
          <div className="flex items-start justify-between mb-4">
            <div>
              <div className="inline-block bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium mb-3">
                {currentTrail.duration}
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold mb-2">
                {currentTrail.title}
              </h1>
              <p className="text-white/90 text-lg">
                {currentTrail.description}
              </p>
            </div>
          </div>

          {/* Progress */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
            <div className="flex justify-between text-sm mb-2">
              <span>Seu Progresso</span>
              <span>{user.completedLessons.length} de {currentTrail.lessons.length} aulas</span>
            </div>
            <div className="w-full bg-white/20 rounded-full h-2 overflow-hidden">
              <div
                className="h-full bg-white rounded-full transition-all duration-500"
                style={{ width: `${(user.completedLessons.length / currentTrail.lessons.length) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Lessons List */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Aulas da Trilha
          </h2>

          {currentTrail.lessons.map((lesson, index) => {
            const isCompleted = user.completedLessons.includes(lesson.id);
            const isNext = !isCompleted && index === user.completedLessons.length;
            const isLocked = !isCompleted && index > user.completedLessons.length;

            return (
              <div
                key={lesson.id}
                className={`bg-white dark:bg-gray-800 rounded-xl p-6 border-2 transition-all ${
                  isCompleted
                    ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                    : isNext
                    ? 'border-blue-500 shadow-lg'
                    : 'border-gray-200 dark:border-gray-700'
                } ${isLocked ? 'opacity-50' : ''}`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4 flex-1">
                    {/* Icon */}
                    <div className={`p-3 rounded-lg ${
                      isCompleted
                        ? 'bg-green-500 text-white'
                        : isNext
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
                    }`}>
                      {isCompleted ? (
                        <CheckCircle2 className="w-6 h-6" />
                      ) : isLocked ? (
                        <Lock className="w-6 h-6" />
                      ) : (
                        <BookOpen className="w-6 h-6" />
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                          Aula {lesson.order}
                        </span>
                        {isNext && (
                          <span className="bg-blue-500 text-white text-xs px-2 py-0.5 rounded-full font-bold">
                            PRÓXIMA
                          </span>
                        )}
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                        {lesson.title}
                      </h3>
                      <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                        <span>{lesson.duration}</span>
                        <span>•</span>
                        <span>+{lesson.xpReward} XP</span>
                        <span>•</span>
                        <span>+{lesson.coinsReward} moedas</span>
                      </div>
                    </div>
                  </div>

                  {/* Action Button */}
                  {!isLocked && (
                    <Link
                      href={`/aula/${lesson.id}`}
                      className={`ml-4 px-6 py-3 rounded-lg font-bold transition-all flex items-center space-x-2 ${
                        isCompleted
                          ? 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                          : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-lg'
                      }`}
                    >
                      {isCompleted ? (
                        <>
                          <span>Revisar</span>
                        </>
                      ) : (
                        <>
                          <Play className="w-5 h-5" />
                          <span>Começar</span>
                        </>
                      )}
                    </Link>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Completion Reward */}
        {user.completedLessons.length === currentTrail.lessons.length && (
          <div className="mt-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl p-8 text-white text-center">
            <CheckCircle2 className="w-16 h-16 mx-auto mb-4" />
            <h2 className="text-3xl font-bold mb-2">
              Parabéns! Trilha Completa! 🎉
            </h2>
            <p className="text-white/90 mb-4">
              Você completou todos os fundamentos da gestão essencial
            </p>
            <div className="inline-block bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full font-bold">
              +{currentTrail.xpReward} XP de bônus
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
