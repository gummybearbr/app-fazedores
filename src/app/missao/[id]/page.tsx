'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { completeMission, startMission, getOrCreateUser } from '@/lib/db-actions';
import { GARGALO_INFO } from '@/data/missions';
import { 
  ArrowLeft, 
  Clock, 
  TrendingUp, 
  Coins, 
  Award, 
  CheckCircle2, 
  XCircle,
  Lightbulb,
  Target,
  AlertTriangle,
  Volume2,
  Loader2
} from 'lucide-react';
import Link from 'next/link';

export default function MissaoPage() {
  const params = useParams();
  const router = useRouter();
  const [missao, setMissao] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);

  const [respostas, setRespostas] = useState<{ [key: number]: 'A' | 'B' | 'C' | null }>({
    0: null,
    1: null,
    2: null,
  });

  const [mostrarExplicacao, setMostrarExplicacao] = useState<{ [key: number]: boolean }>({
    0: false,
    1: false,
    2: false,
  });

  useEffect(() => {
    loadMissao();
    initUser();
  }, [params.id]);

  const initUser = async () => {
    // Simular usuário demo (em produção, usar autenticação real)
    const demoEmail = 'usuario@demo.com';
    const result = await getOrCreateUser(demoEmail, 'Usuário Demo');
    if (result.success && result.user) {
      setUserId(result.user.id);
    }
  };

  const loadMissao = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('missoes')
        .select('*')
        .eq('id', params.id)
        .single();

      if (error) throw error;
      setMissao(data);
    } catch (error) {
      console.error('Erro ao carregar missão:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-blue-400 animate-spin" />
      </div>
    );
  }

  if (!missao) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Missão não encontrada</h1>
          <Link 
            href="/missoes"
            className="text-blue-400 hover:text-blue-300 transition-colors"
          >
            ← Voltar para missões
          </Link>
        </div>
      </div>
    );
  }

  const gargaloInfo = GARGALO_INFO[missao.gargalo];

  const handleResposta = (questaoIndex: number, alternativa: 'A' | 'B' | 'C') => {
    // Se já respondeu essa questão, não permite mudar
    if (respostas[questaoIndex] !== null) return;

    setRespostas({ ...respostas, [questaoIndex]: alternativa });
    setMostrarExplicacao({ ...mostrarExplicacao, [questaoIndex]: true });
  };

  const todasRespondidas = Object.values(respostas).every((r) => r !== null);

  const handleConcluir = async () => {
    if (!userId) {
      alert('Erro: Usuário não identificado');
      return;
    }

    // Calcular acertos
    const acertos = missao.quiz.filter((q: any, i: number) => 
      respostas[i] === q.correta
    ).length;

    // Salvar progresso no banco
    const result = await completeMission(
      userId,
      missao.id,
      respostas,
      acertos,
      missao.xp,
      missao.moedas
    );

    if (result.success) {
      alert(`🎉 Missão concluída!\n\n✅ ${acertos}/3 acertos\n⭐ +${missao.xp} XP\n🪙 +${missao.moedas} moedas`);
      router.push('/missoes');
    } else {
      alert('❌ Erro ao salvar progresso. Tente novamente.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Header */}
      <div className="border-b border-white/10 bg-black/20 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link 
            href="/missoes"
            className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar para missões
          </Link>
          
          <div className="flex items-start gap-4">
            <span className="text-4xl">{gargaloInfo.emoji}</span>
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-white mb-2">
                {missao.nome}
              </h1>
              <div className="flex flex-wrap items-center gap-2">
                <span className={`text-xs px-3 py-1 rounded-full bg-${gargaloInfo.cor}-500/20 text-${gargaloInfo.cor}-400 border border-${gargaloInfo.cor}-500/30`}>
                  {gargaloInfo.nome}
                </span>
                <span className={`text-xs px-3 py-1 rounded-full ${
                  missao.tipo === 'CRÍTICA' ? 'bg-red-500/20 text-red-400 border border-red-500/30' :
                  missao.tipo === 'TÁTICA' ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30' :
                  'bg-purple-500/20 text-purple-400 border border-purple-500/30'
                }`}>
                  {missao.tipo}
                </span>
                <span className={`text-xs px-3 py-1 rounded-full ${
                  missao.risco === 'ALTO' ? 'bg-red-500/20 text-red-400 border border-red-500/30' :
                  missao.risco === 'MÉDIO' ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30' :
                  'bg-green-500/20 text-green-400 border border-green-500/30'
                }`}>
                  Risco {missao.risco}
                </span>
                <span className={`text-xs px-3 py-1 rounded-full ${
                  missao.dificuldade === 'D1' ? 'bg-green-500/20 text-green-400 border border-green-500/30' :
                  missao.dificuldade === 'D2' ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30' :
                  missao.dificuldade === 'D3' ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30' :
                  'bg-red-500/20 text-red-400 border border-red-500/30'
                }`}>
                  {missao.dificuldade}
                </span>
              </div>
            </div>
          </div>

          {/* Métricas */}
          <div className="flex flex-wrap items-center gap-6 mt-6 text-sm">
            <div className="flex items-center gap-2 text-slate-400">
              <Clock className="w-5 h-5" />
              <span>{missao.tempo}</span>
            </div>
            <div className="flex items-center gap-2 text-emerald-400">
              <Award className="w-5 h-5" />
              <span>+{missao.xp} XP</span>
            </div>
            <div className="flex items-center gap-2 text-amber-400">
              <Coins className="w-5 h-5" />
              <span>+{missao.moedas} moedas</span>
            </div>
            <div className="flex items-center gap-2 text-blue-400">
              <TrendingUp className="w-5 h-5" />
              <span>+{missao.impacto} impacto</span>
            </div>
          </div>
        </div>
      </div>

      {/* Conteúdo */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Áudio (se existir) */}
        {missao.audio_url && (
          <section className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <Volume2 className="w-6 h-6 text-purple-400" />
              <h2 className="text-xl font-bold text-white">Áudio da Missão</h2>
            </div>
            <audio controls className="w-full">
              <source src={missao.audio_url} />
              Seu navegador não suporta o elemento de áudio.
            </audio>
          </section>
        )}

        {/* O Que Fazer */}
        <section className="bg-white/5 border border-white/10 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <Target className="w-6 h-6 text-blue-400" />
            <h2 className="text-2xl font-bold text-white">O Que Fazer</h2>
          </div>
          <p className="text-lg text-slate-300">{missao.o_que_fazer}</p>
        </section>

        {/* Como Fazer */}
        <section className="bg-white/5 border border-white/10 rounded-xl p-6">
          <h2 className="text-2xl font-bold text-white mb-4">Como Fazer (Passo a Passo)</h2>
          <ol className="space-y-3">
            {missao.como_fazer.map((passo: string, index: number) => (
              <li key={`passo-${missao.id}-${index}`} className="flex items-start gap-3">
                <span className="flex-shrink-0 w-8 h-8 bg-blue-500/20 border border-blue-500/30 rounded-full flex items-center justify-center text-blue-400 font-bold">
                  {index + 1}
                </span>
                <span className="text-slate-300 pt-1">{passo}</span>
              </li>
            ))}
          </ol>
        </section>

        {/* Pontos de Atenção */}
        <section className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-3">
            <AlertTriangle className="w-6 h-6 text-amber-400" />
            <h2 className="text-xl font-bold text-amber-400">Pontos de Atenção</h2>
          </div>
          <p className="text-slate-300">{missao.pontos_atencao}</p>
        </section>

        {/* Quiz de Validação */}
        <section className="bg-white/5 border border-white/10 rounded-xl p-6">
          <h2 className="text-2xl font-bold text-white mb-6">Quiz de Validação</h2>
          <div className="space-y-6">
            {missao.quiz.map((questao: any, qIndex: number) => {
              const respostaUsuario = respostas[qIndex];
              const respostaCorreta = questao.correta;
              const mostrarExp = mostrarExplicacao[qIndex];

              return (
                <div key={`quiz-${missao.id}-q${qIndex}`} className="bg-white/5 border border-white/10 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">
                    {qIndex + 1}. {questao.pergunta}
                  </h3>
                  <div className="space-y-3">
                    {(['A', 'B', 'C'] as const).map((alt) => {
                      const isSelected = respostaUsuario === alt;
                      const isCorrect = alt === respostaCorreta;
                      const isWrong = isSelected && !isCorrect;
                      const showCorrect = mostrarExp && isCorrect;

                      return (
                        <button
                          key={`quiz-${missao.id}-q${qIndex}-alt${alt}`}
                          onClick={() => handleResposta(qIndex, alt)}
                          disabled={respostaUsuario !== null}
                          className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                            isWrong
                              ? 'bg-red-500/10 border-red-500/50 cursor-not-allowed'
                              : showCorrect
                              ? 'bg-green-500/10 border-green-500/50'
                              : isSelected
                              ? 'bg-blue-500/20 border-blue-500/50'
                              : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
                          } ${respostaUsuario !== null ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-slate-300">
                              <span className="font-bold text-white mr-2">{alt})</span>
                              {questao.alternativas[alt]}
                            </span>
                            {isWrong && <XCircle className="w-5 h-5 text-red-400 flex-shrink-0" />}
                            {showCorrect && <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0" />}
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {/* Explicação */}
                  {mostrarExp && (
                    <div className="mt-4 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                      <div className="flex items-start gap-3">
                        <Lightbulb className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                        <div>
                          <div className="font-semibold text-blue-400 mb-1">
                            💡 Resposta Correta: {respostaCorreta}
                          </div>
                          <p className="text-slate-300 text-sm">{questao.explicacao}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* Botão de Conclusão */}
        <div className="flex justify-center">
          <button
            onClick={handleConcluir}
            disabled={!todasRespondidas}
            className={`px-8 py-4 rounded-xl font-bold text-lg transition-all ${
              todasRespondidas
                ? 'bg-gradient-to-r from-emerald-500 to-green-600 text-white hover:from-emerald-600 hover:to-green-700 shadow-lg shadow-emerald-500/25'
                : 'bg-white/5 text-slate-500 cursor-not-allowed border border-white/10'
            }`}
          >
            {todasRespondidas ? '✅ Confirmar Conclusão' : '⏳ Responda todas as questões'}
          </button>
        </div>
      </div>
    </div>
  );
}
