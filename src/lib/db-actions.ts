'use server';

import { supabase } from './supabase';
import { MISSIONS } from '@/data/missions';

// Sincronizar missões do código para o banco
export async function syncMissionsToDatabase() {
  try {
    for (const mission of MISSIONS) {
      const { error } = await supabase
        .from('missoes')
        .upsert({
          id: mission.id,
          nome: mission.nome,
          gargalo: mission.gargalo,
          tipo: mission.tipo,
          dificuldade: mission.dificuldade,
          tempo: mission.tempo,
          xp: mission.xp,
          moedas: mission.moedas,
          impacto: mission.impacto,
          risco: mission.risco,
          o_que_fazer: mission.oQueFazer,
          como_fazer: mission.comoFazer,
          pontos_atencao: mission.pontosAtencao,
          quiz: mission.quiz,
          ativo: true,
          updated_at: new Date().toISOString(),
        }, {
          onConflict: 'id'
        });

      if (error) {
        console.error(`Erro ao sincronizar missão ${mission.id}:`, error);
      }
    }

    return { success: true, message: 'Missões sincronizadas com sucesso!' };
  } catch (error) {
    console.error('Erro ao sincronizar missões:', error);
    return { success: false, message: 'Erro ao sincronizar missões' };
  }
}

// Buscar todas as missões do banco
export async function getMissionsFromDB() {
  const { data, error } = await supabase
    .from('missoes')
    .select('*')
    .eq('ativo', true)
    .order('created_at', { ascending: true });

  if (error) {
    console.error('Erro ao buscar missões:', error);
    return [];
  }

  return data || [];
}

// Buscar progresso do usuário
export async function getUserProgress(userId: string) {
  const { data, error } = await supabase
    .from('user_progress')
    .select('*')
    .eq('user_id', userId);

  if (error) {
    console.error('Erro ao buscar progresso:', error);
    return [];
  }

  return data || [];
}

// Iniciar missão
export async function startMission(userId: string, missaoId: string) {
  const { data, error } = await supabase
    .from('user_progress')
    .upsert({
      user_id: userId,
      missao_id: missaoId,
      status: 'em_andamento',
      data_inicio: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }, {
      onConflict: 'user_id,missao_id'
    })
    .select()
    .single();

  if (error) {
    console.error('Erro ao iniciar missão:', error);
    return { success: false, error };
  }

  // Registrar atividade
  await supabase.from('user_activity').insert({
    user_id: userId,
    tipo: 'missao_iniciada',
    descricao: `Iniciou a missão ${missaoId}`,
    metadata: { missao_id: missaoId },
  });

  return { success: true, data };
}

// Concluir missão
export async function completeMission(
  userId: string,
  missaoId: string,
  respostasQuiz: any,
  acertos: number,
  xpGanho: number,
  moedasGanhas: number
) {
  // Atualizar progresso da missão
  const { error: progressError } = await supabase
    .from('user_progress')
    .update({
      status: 'concluida',
      respostas_quiz: respostasQuiz,
      acertos,
      xp_ganho: xpGanho,
      moedas_ganhas: moedasGanhas,
      data_conclusao: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })
    .eq('user_id', userId)
    .eq('missao_id', missaoId);

  if (progressError) {
    console.error('Erro ao atualizar progresso:', progressError);
    return { success: false, error: progressError };
  }

  // Atualizar XP e moedas do usuário
  const { data: userData, error: userError } = await supabase
    .from('user_profiles')
    .select('xp_total, moedas_total')
    .eq('id', userId)
    .single();

  if (!userError && userData) {
    await supabase
      .from('user_profiles')
      .update({
        xp_total: userData.xp_total + xpGanho,
        moedas_total: userData.moedas_total + moedasGanhas,
        updated_at: new Date().toISOString(),
      })
      .eq('id', userId);
  }

  // Registrar atividade
  await supabase.from('user_activity').insert({
    user_id: userId,
    tipo: 'missao_concluida',
    descricao: `Concluiu a missão ${missaoId}`,
    metadata: {
      missao_id: missaoId,
      acertos,
      xp_ganho: xpGanho,
      moedas_ganhas: moedasGanhas,
    },
  });

  return { success: true };
}

// Buscar ou criar usuário
export async function getOrCreateUser(email: string, nome?: string) {
  // Tentar buscar usuário existente
  const { data: existingUser, error: fetchError } = await supabase
    .from('user_profiles')
    .select('*')
    .eq('email', email)
    .single();

  if (existingUser) {
    return { success: true, user: existingUser };
  }

  // Criar novo usuário
  const { data: newUser, error: createError } = await supabase
    .from('user_profiles')
    .insert({
      email,
      nome: nome || email.split('@')[0],
      xp_total: 0,
      moedas_total: 0,
      nivel: 'N1',
      estagio: 'S1',
      streak_dias: 0,
    })
    .select()
    .single();

  if (createError) {
    console.error('Erro ao criar usuário:', createError);
    return { success: false, error: createError };
  }

  return { success: true, user: newUser };
}

// Atualizar áudio da missão
export async function updateMissionAudio(missaoId: string, audioUrl: string) {
  const { error } = await supabase
    .from('missoes')
    .update({
      audio_url: audioUrl,
      updated_at: new Date().toISOString(),
    })
    .eq('id', missaoId);

  if (error) {
    console.error('Erro ao atualizar áudio:', error);
    return { success: false, error };
  }

  return { success: true };
}

// Buscar estatísticas do usuário
export async function getUserStats(userId: string) {
  const { data: user } = await supabase
    .from('user_profiles')
    .select('*')
    .eq('id', userId)
    .single();

  const { data: progress } = await supabase
    .from('user_progress')
    .select('*')
    .eq('user_id', userId);

  const { data: activities } = await supabase
    .from('user_activity')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .limit(10);

  const missoesConcluidas = progress?.filter(p => p.status === 'concluida').length || 0;
  const missoesEmAndamento = progress?.filter(p => p.status === 'em_andamento').length || 0;

  return {
    user,
    missoesConcluidas,
    missoesEmAndamento,
    activities: activities || [],
  };
}
