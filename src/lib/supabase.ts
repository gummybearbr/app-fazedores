import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Types para o banco de dados
export interface UserProfile {
  id: string;
  email: string;
  nome: string | null;
  xp_total: number;
  moedas_total: number;
  nivel: string;
  estagio: string;
  streak_dias: number;
  created_at: string;
  updated_at: string;
}

export interface MissaoDB {
  id: string;
  nome: string;
  gargalo: string;
  tipo: string;
  dificuldade: string;
  tempo: string;
  xp: number;
  moedas: number;
  impacto: number;
  risco: string;
  o_que_fazer: string;
  como_fazer: string[];
  pontos_atencao: string;
  quiz: any[];
  audio_url: string | null;
  ativo: boolean;
  created_at: string;
  updated_at: string;
}

export interface UserProgress {
  id: string;
  user_id: string;
  missao_id: string;
  status: 'nao_iniciada' | 'em_andamento' | 'concluida';
  respostas_quiz: any;
  acertos: number;
  data_inicio: string | null;
  data_conclusao: string | null;
  xp_ganho: number;
  moedas_ganhas: number;
  created_at: string;
  updated_at: string;
}

export interface UserActivity {
  id: string;
  user_id: string;
  tipo: string;
  descricao: string | null;
  metadata: any;
  created_at: string;
}

export interface Admin {
  id: string;
  email: string;
  nome: string;
  senha_hash: string;
  ativo: boolean;
  created_at: string;
}
