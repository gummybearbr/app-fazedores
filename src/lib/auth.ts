import { supabase } from './supabase';

export async function getCurrentUser() {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) return null;

  const { data: userData } = await supabase
    .from('users')
    .select('*')
    .eq('id', user.id)
    .single();

  return userData;
}

export async function getUserProgress(userId: string) {
  const { data: completedLessons } = await supabase
    .from('completed_lessons')
    .select('lesson_id')
    .eq('user_id', userId);

  return completedLessons?.map(l => l.lesson_id) || [];
}

export async function completeLesson(userId: string, lessonId: string, xpReward: number, coinsReward: number) {
  // Adicionar lição completada
  await supabase.from('completed_lessons').insert({
    user_id: userId,
    lesson_id: lessonId,
  });

  // Atualizar XP e moedas do usuário
  const { data: user } = await supabase
    .from('users')
    .select('xp, coins, level')
    .eq('id', userId)
    .single();

  if (user) {
    const newXp = user.xp + xpReward;
    const newCoins = user.coins + coinsReward;
    const newLevel = Math.floor(newXp / 1000) + 1;

    await supabase
      .from('users')
      .update({
        xp: newXp,
        coins: newCoins,
        level: newLevel,
        updated_at: new Date().toISOString(),
      })
      .eq('id', userId);
  }
}

export async function getDailyMissions(userId: string) {
  const today = new Date().toISOString().split('T')[0];

  const { data: missions } = await supabase
    .from('daily_missions')
    .select('*')
    .eq('user_id', userId)
    .eq('date', today);

  return missions || [];
}

export async function completeMission(userId: string, missionId: string) {
  const today = new Date().toISOString().split('T')[0];

  await supabase
    .from('daily_missions')
    .update({
      completed: true,
      completed_at: new Date().toISOString(),
    })
    .eq('user_id', userId)
    .eq('mission_id', missionId)
    .eq('date', today);
}

export async function updateOnboarding(userId: string, answers: any) {
  await supabase
    .from('users')
    .update({
      onboarding_completed: true,
      onboarding_answers: answers,
      updated_at: new Date().toISOString(),
    })
    .eq('id', userId);
}

export async function signOut() {
  await supabase.auth.signOut();
}
