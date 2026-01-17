'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Target, BookOpen, CheckSquare, TrendingUp, ArrowRight, AlertTriangle, CheckCircle, Clock } from 'lucide-react';
import Navbar from '@/components/custom/navbar';
import StreakBadge from '@/components/custom/streak-badge';
import ProgressRing from '@/components/custom/progress-ring';
import MissionCard from '@/components/custom/mission-card';
import { dailyMissions, trails } from '@/lib/data';
import { User, DailyMission } from '@/lib/types';
import { calculateScore } from '@/lib/scoring';

export default function Home() {
  const [missions, setMissions] = useState<DailyMission[]>(dailyMissions);

  // Mock user data - substitua com dados reais do Supabase depois
  const user: User = {
    id: '1',
    name: 'João Silva',
    email: 'joao@example.com',
    level: 5,
    xp: 1250,
    coins: 450,
    streak: 7,
    currentTrailId: 'trail-1',
    completedLessons: ['lesson-1', 'lesson-2'],
    onboardingCompleted: true,
  };

  // Mock onboarding answers para demonstração
  const mockOnboardingAnswers = {
    businessStage: 'growth',
    teamSize: '11-50',
    hasFinancialControl: true,
    hasProcesses: false,
    hasSalesProcess: true,
    hasMarketingStrategy: false,
    hasGoals: true,
    trackMetrics: false,
    hasCashFlow: true,
    hasInventoryControl: false,
  };

  const maturityData = calculateScore(mockOnboardingAnswers);

  const currentTrail = trails.find(t => t.id === user.currentTrailId);
  const completedLessonsCount = user.completedLessons.length;
  const totalLessons = currentTrail?.lessons.length || 0;
  const trailProgress = totalLessons > 0 ? (completedLessonsCount / totalLessons) * 100 : 0;

  const nextLesson = currentTrail?.lessons.find(
    lesson => !user.completedLessons.includes(lesson.id)
  );

  // TOP 3 GARGALOS CRÍTICOS - ordem de criticidade
  const topVulnerabilities = [
    {
      id: 'critical-1',
      severity: 'critical' as const,
      icon: '🔴',
      title: 'Controle de Caixa Frágil',
      impact: 'Você não acompanha entradas e saídas diariamente.',
      description: 'Isso pode causar falta de dinheiro mesmo com vendas acontecendo.',
      bg: 'bg-red-50 dark:bg-red-900/20',
      border: 'border-red-200 dark:border-red-800'
    },
    {
      id: 'warning-1',
      severity: 'warning' as const,
      icon: '🟡',
      title: 'Dependência do Dono',
      impact: 'Sem você, decisões travam e problemas se acumulam.',
      description: 'Isso limita crescimento e liberdade.',
      bg: 'bg-yellow-50 dark:bg-yellow-900/20',
      border: 'border-yellow-200 dark:border-yellow-800'
    },
    {
      id: 'opportunity-1',
      severity: 'opportunity' as const,
      icon: '🟢',
      title: 'Equipe com Potencial',
      impact: 'Sua equipe entende prioridades, mas falta padrão de execução.',
      description: 'Aqui existe oportunidade rápida de ganho.',
      bg: 'bg-green-50 dark:bg-green-900/20',
      border: 'border-green-200 dark:border-green-800'
    }
  ];

  // Definir os níveis da jornada
  const journeyLevels = [
    { name: 'Sobrevivência', minScore: 0 },
    { name: 'Organização', minScore: 20 },
    { name: 'Estruturação', minScore: 40 },
    { name: 'Crescimento', minScore: 60 },
    { name: 'Escala', minScore: 80 }
  ];

  // Encontrar nível atual e próximo
  const currentJourneyLevel = journeyLevels.reduce((prev, curr) => {
    return (maturityData?.totalScore || 0) >= curr.minScore ? curr : prev;
  });

  const currentLevelIndex = journeyLevels.findIndex(l => l.name === currentJourneyLevel.name);
  const nextJourneyLevel = journeyLevels[currentLevelIndex + 1];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            Olá, {user.name}! 👋
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-1">
            Bem-vindo ao seu painel de transformação empresarial
          </p>
          <p className="text-gray-700 dark:text-gray-300 font-medium">
            Com base nas suas respostas, seu Diagnóstico Empresarial está pronto.
          </p>
        </div>

        {/* 1. Score de Maturidade + Nível (UNIFICADO) */}
        {maturityData && (
          <div className="mb-8">
            <div className="bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-2xl p-8 text-white shadow-2xl">
              <div className="flex flex-col lg:flex-row items-center justify-between gap-6 mb-8">
                {/* Score Principal */}
                <div className="text-center lg:text-left">
                  <div className="flex items-center justify-center lg:justify-start space-x-3 mb-4">
                    <span className="text-6xl">{maturityData.maturityLevel.icon}</span>
                    <div>
                      <h2 className="text-3xl font-bold">{maturityData.maturityLevel.name}</h2>
                      <p className="text-white/80 text-sm">Nível de Maturidade</p>
                    </div>
                  </div>
                  <div className="mb-4">
                    <div className="text-5xl font-bold mb-2">{maturityData.totalScore}/100</div>
                    <p className="text-white/90 text-lg max-w-md">
                      {maturityData.maturityLevel.description}
                    </p>
                  </div>
                </div>
              </div>

              {/* Trilha Visual Horizontal */}
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <h3 className="text-xl font-bold mb-6 flex items-center space-x-2">
                  <Target className="w-6 h-6" />
                  <span>Próximo Nível</span>
                </h3>
                
                <div className="mb-6 pb-8">
                  <div className="relative">
                    {/* Linha de conexão */}
                    <div className="absolute top-4 left-0 right-0 h-0.5 bg-white/30" />
                    
                    <div className="flex items-start justify-between relative">
                      {journeyLevels.map((level, index) => {
                        const isCurrentLevel = level.name === currentJourneyLevel.name;
                        const isPastLevel = (maturityData?.totalScore || 0) > level.minScore;
                        const isNextLevel = nextJourneyLevel && level.name === nextJourneyLevel.name;
                        
                        return (
                          <div key={level.name} className="flex flex-col items-center relative z-10 flex-1">
                            {/* Nome do nível (em cima) */}
                            <span className={`text-xs font-medium text-center whitespace-nowrap mb-2 ${
                              isCurrentLevel ? 'text-white font-bold' : 'text-white/70'
                            }`}>
                              {level.name}
                            </span>
                            
                            {/* Círculo do nível */}
                            <div 
                              className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                                isCurrentLevel 
                                  ? 'bg-white text-purple-600 ring-4 ring-white/30 scale-125' 
                                  : isPastLevel
                                  ? 'bg-white text-purple-600'
                                  : isNextLevel
                                  ? 'bg-white/20 text-white border-2 border-white border-dashed'
                                  : 'bg-white/10 text-white/50'
                              }`}
                            >
                              {isPastLevel || isCurrentLevel ? (
                                <CheckCircle className="w-5 h-5" />
                              ) : (
                                <div className="w-2 h-2 rounded-full bg-current" />
                              )}
                            </div>
                            
                            {/* Seta "Você está aqui" */}
                            {isCurrentLevel && (
                              <div className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
                                <div className="text-2xl text-white">▲</div>
                                <span className="text-xs font-bold whitespace-nowrap text-white">Você está aqui</span>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Barra de Progresso */}
                {maturityData && maturityData.totalScore < 100 ? (
                  <div className="mt-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-white/90">Progresso para o próximo nível</span>
                      <span className="text-sm font-bold text-white">
                        {maturityData.totalScore}% → {nextJourneyLevel ? nextJourneyLevel.minScore : 100}%
                      </span>
                    </div>
                    <div className="w-full bg-white/20 rounded-full h-2">
                      <div
                        className="h-full bg-white rounded-full transition-all duration-500"
                        style={{ 
                          width: `${((maturityData.totalScore - currentJourneyLevel.minScore) / 
                            ((nextJourneyLevel?.minScore || 100) - currentJourneyLevel.minScore)) * 100}%` 
                        }}
                      />
                    </div>
                    <p className="text-sm text-white/80 mt-3">
                      Continue implementando as ações recomendadas para evoluir para o próximo estágio.
                    </p>
                  </div>
                ) : (
                  <p className="text-sm text-white/80 mt-4">
                    Parabéns! Você atingiu o nível máximo de maturidade empresarial. 🎉
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* 2. Vulnerabilidades e Oportunidades */}
        <div className="mb-8">
          <div className="bg-white dark:bg-gray-800 border-2 border-orange-200 dark:border-orange-800 rounded-2xl p-6 shadow-lg">
            <div className="flex items-center space-x-3 mb-4">
              <AlertTriangle className="w-8 h-8 text-orange-600" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                Vulnerabilidades e Oportunidades
              </h2>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              TOP 3 gargalos críticos identificados no seu diagnóstico, por ordem de urgência.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {topVulnerabilities.map((vuln) => (
                <div 
                  key={vuln.id} 
                  className={`${vuln.bg} border-2 ${vuln.border} rounded-xl p-6 transition-all hover:shadow-xl hover:scale-105`}
                >
                  <div className="flex items-start space-x-3 mb-4">
                    <span className="text-4xl">{vuln.icon}</span>
                    <h3 className="font-bold text-gray-900 dark:text-gray-100 text-lg flex-1 leading-tight">
                      {vuln.title}
                    </h3>
                  </div>
                  
                  <div className="space-y-3">
                    <div>
                      <p className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">
                        Impacto
                      </p>
                      <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                        {vuln.impact}
                      </p>
                    </div>
                    
                    <div>
                      <p className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">
                        Consequência Prática
                      </p>
                      <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                        {vuln.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Progress Ring */}
          <div className="lg:col-span-2">
            <ProgressRing level={user.level} xp={user.xp} coins={user.coins} />
          </div>

          {/* Streak Badge */}
          <div className="flex items-center justify-center">
            <StreakBadge streak={user.streak} />
          </div>
        </div>

        {/* 3. Missão de Hoje - NOVO MODELO */}
        {nextLesson && (
          <div className="mb-8">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 sm:p-8 border-2 border-blue-200 dark:border-blue-800 shadow-xl">
              {/* Cabeçalho da Missão */}
              <div className="flex items-center space-x-3 mb-6">
                <Target className="w-8 h-8 text-blue-600" />
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100">Missão de Hoje</h2>
              </div>

              {/* Descrição da Missão */}
              <div className="mb-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3">{nextLesson.title}</h3>
                <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                  <Clock className="w-5 h-5" />
                  <span className="font-medium">Tempo estimado: {nextLesson.duration}</span>
                </div>
              </div>

              {/* Separador */}
              <div className="border-t border-gray-200 dark:border-gray-700 my-6" />

              {/* Guia de Execução */}
              <div className="mb-6">
                <div className="flex items-center space-x-3 mb-3">
                  <BookOpen className="w-6 h-6 text-purple-600" />
                  <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">Guia de Execução</h3>
                </div>
                <p className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">{currentTrail?.title}</p>
                <p className="text-gray-600 dark:text-gray-400 italic">
                  "Esse guia vai te mostrar exatamente como executar sua missão."
                </p>
              </div>

              {/* Botão Começar */}
              <Link
                href={`/missao/${nextLesson.id}`}
                className="inline-flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-bold hover:shadow-2xl hover:scale-105 transition-all w-full sm:w-auto"
              >
                <span>Começar</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        )}

        {/* Missões Diárias */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              Missões Diárias
            </h2>
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {missions.filter(m => m.completed).length} de {missions.length} completas
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {missions.map(mission => (
              <MissionCard key={mission.id} mission={mission} />
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link
            href="/trilha"
            className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 transition-all group"
          >
            <BookOpen className="w-8 h-8 text-blue-600 mb-3 group-hover:scale-110 transition-transform" />
            <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-1">
              Minha Trilha
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Continue aprendendo
            </p>
          </Link>

          <Link
            href="/tarefas"
            className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:border-purple-500 dark:hover:border-purple-500 transition-all group"
          >
            <CheckSquare className="w-8 h-8 text-purple-600 mb-3 group-hover:scale-110 transition-transform" />
            <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-1">
              Tarefas
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Execute o que aprendeu
            </p>
          </Link>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 opacity-50 cursor-not-allowed">
            <TrendingUp className="w-8 h-8 text-green-600 mb-3" />
            <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-1">
              Indicadores
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Em breve
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 opacity-50 cursor-not-allowed">
            <Target className="w-8 h-8 text-orange-600 mb-3" />
            <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-1">
              Comunidade
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Em breve
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
