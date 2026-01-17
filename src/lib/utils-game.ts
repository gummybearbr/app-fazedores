// Funções de gamificação

export function calculateLevel(xp: number): number {
  // 100 XP por nível, progressão linear simples
  return Math.floor(xp / 100) + 1;
}

export function getXpForNextLevel(currentXp: number): number {
  const currentLevel = calculateLevel(currentXp);
  return currentLevel * 100;
}

export function getXpProgress(currentXp: number): number {
  const currentLevel = calculateLevel(currentXp);
  const xpForCurrentLevel = (currentLevel - 1) * 100;
  const xpForNextLevel = currentLevel * 100;
  const xpInCurrentLevel = currentXp - xpForCurrentLevel;
  const xpNeededForLevel = xpForNextLevel - xpForCurrentLevel;
  
  return (xpInCurrentLevel / xpNeededForLevel) * 100;
}

export function getStreakMessage(streak: number): string {
  if (streak === 0) return 'Comece sua jornada hoje!';
  if (streak === 1) return 'Primeiro dia! Continue assim!';
  if (streak < 7) return `${streak} dias seguidos! Você está no caminho!`;
  if (streak < 30) return `${streak} dias! Você é disciplinado!`;
  if (streak < 100) return `${streak} dias! Você é imparável!`;
  return `${streak} dias! Você é uma LENDA!`;
}

export function getLevelTitle(level: number): string {
  if (level === 1) return 'Iniciante';
  if (level < 5) return 'Aprendiz';
  if (level < 10) return 'Praticante';
  if (level < 20) return 'Profissional';
  if (level < 30) return 'Especialista';
  if (level < 50) return 'Mestre';
  return 'Lenda';
}

export function getProgressColor(progress: number): string {
  if (progress < 30) return 'from-red-500 to-orange-500';
  if (progress < 70) return 'from-yellow-500 to-orange-500';
  return 'from-green-500 to-emerald-500';
}
