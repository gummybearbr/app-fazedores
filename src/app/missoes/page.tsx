'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { GARGALO_INFO, Gargalo, TipoMissao } from '@/data/missions';
import { Clock, TrendingUp, Coins, Award, Filter, Search, Loader2 } from 'lucide-react';

export default function MissoesPage() {
  const [filtroGargalo, setFiltroGargalo] = useState<Gargalo | 'TODOS'>('TODOS');
  const [filtroTipo, setFiltroTipo] = useState<TipoMissao | 'TODOS'>('TODOS');
  const [busca, setBusca] = useState('');
  const [missoes, setMissoes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadMissoes();
  }, []);

  const loadMissoes = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('missoes')
        .select('*')
        .eq('ativo', true)
        .order('created_at', { ascending: true });

      if (error) throw error;
      setMissoes(data || []);
    } catch (error) {
      console.error('Erro ao carregar missões:', error);
    } finally {
      setLoading(false);
    }
  };

  // Filtrar missões
  const missoesFiltradas = missoes.filter((missao) => {
    const matchGargalo = filtroGargalo === 'TODOS' || missao.gargalo === filtroGargalo;
    const matchTipo = filtroTipo === 'TODOS' || missao.tipo === filtroTipo;
    const matchBusca = missao.nome.toLowerCase().includes(busca.toLowerCase());
    return matchGargalo && matchTipo && matchBusca;
  });

  // Estatísticas
  const totalMissoes = missoes.length;
  const totalXP = missoes.reduce((acc, m) => acc + m.xp, 0);
  const totalMoedas = missoes.reduce((acc, m) => acc + m.moedas, 0);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-blue-400 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Header */}
      <div className="border-b border-white/10 bg-black/20 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">
                🎯 Missões Disponíveis
              </h1>
              <p className="text-slate-400">
                Sistema de formação de empresários baseado em execução validada
              </p>
            </div>
            <div className="flex gap-4">
              <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl px-4 py-2">
                <div className="text-emerald-400 text-sm font-medium">Total XP</div>
                <div className="text-2xl font-bold text-white">{totalXP}</div>
              </div>
              <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl px-4 py-2">
                <div className="text-amber-400 text-sm font-medium">Moedas</div>
                <div className="text-2xl font-bold text-white">{totalMoedas}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Estatísticas Rápidas */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
          {Object.entries(GARGALO_INFO).map(([key, info]) => {
            const count = missoes.filter((m) => m.gargalo === key).length;
            return (
              <button
                key={`gargalo-filter-${key}`}
                onClick={() => setFiltroGargalo(filtroGargalo === key ? 'TODOS' : key as Gargalo)}
                className={`p-4 rounded-xl border transition-all ${
                  filtroGargalo === key
                    ? `bg-${info.cor}-500/20 border-${info.cor}-500/50`
                    : 'bg-white/5 border-white/10 hover:bg-white/10'
                }`}
              >
                <div className="text-2xl mb-2">{info.emoji}</div>
                <div className="text-white font-semibold text-sm">{info.nome}</div>
                <div className="text-slate-400 text-xs">{count} missões</div>
              </button>
            );
          })}
        </div>

        {/* Filtros e Busca */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Buscar missão..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            />
          </div>
          <select
            value={filtroTipo}
            onChange={(e) => setFiltroTipo(e.target.value as TipoMissao | 'TODOS')}
            className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
          >
            <option value="TODOS">Todos os Tipos</option>
            <option value="CRÍTICA">🔴 Críticas</option>
            <option value="TÁTICA">🟡 Táticas</option>
            <option value="BÔNUS">⚡ Bônus</option>
          </select>
        </div>

        {/* Lista de Missões */}
        <div className="space-y-4">
          {missoesFiltradas.length === 0 ? (
            <div className="text-center py-12 bg-white/5 rounded-xl border border-white/10">
              <p className="text-slate-400">Nenhuma missão encontrada com os filtros aplicados.</p>
            </div>
          ) : (
            missoesFiltradas.map((missao) => {
              const gargaloInfo = GARGALO_INFO[missao.gargalo as Gargalo];
              return (
                <Link
                  key={`missao-list-${missao.id}`}
                  href={`/missao/${missao.id}`}
                  className="block group"
                >
                  <div className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 hover:border-white/20 transition-all">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        {/* Header da Missão */}
                        <div className="flex items-center gap-3 mb-3">
                          <span className="text-2xl">{gargaloInfo.emoji}</span>
                          <div>
                            <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">
                              {missao.nome}
                            </h3>
                            <div className="flex items-center gap-2 mt-1">
                              <span className={`text-xs px-2 py-1 rounded-full bg-${gargaloInfo.cor}-500/20 text-${gargaloInfo.cor}-400 border border-${gargaloInfo.cor}-500/30`}>
                                {gargaloInfo.nome}
                              </span>
                              <span className={`text-xs px-2 py-1 rounded-full ${
                                missao.tipo === 'CRÍTICA' ? 'bg-red-500/20 text-red-400 border border-red-500/30' :
                                missao.tipo === 'TÁTICA' ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30' :
                                'bg-purple-500/20 text-purple-400 border border-purple-500/30'
                              }`}>
                                {missao.tipo}
                              </span>
                              <span className={`text-xs px-2 py-1 rounded-full ${
                                missao.risco === 'ALTO' ? 'bg-red-500/20 text-red-400 border border-red-500/30' :
                                missao.risco === 'MÉDIO' ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30' :
                                'bg-green-500/20 text-green-400 border border-green-500/30'
                              }`}>
                                Risco {missao.risco}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Descrição */}
                        <p className="text-slate-300 mb-4">{missao.o_que_fazer}</p>

                        {/* Métricas */}
                        <div className="flex flex-wrap items-center gap-4 text-sm">
                          <div className="flex items-center gap-2 text-slate-400">
                            <Clock className="w-4 h-4" />
                            <span>{missao.tempo}</span>
                          </div>
                          <div className="flex items-center gap-2 text-emerald-400">
                            <Award className="w-4 h-4" />
                            <span>+{missao.xp} XP</span>
                          </div>
                          <div className="flex items-center gap-2 text-amber-400">
                            <Coins className="w-4 h-4" />
                            <span>+{missao.moedas} moedas</span>
                          </div>
                          <div className="flex items-center gap-2 text-blue-400">
                            <TrendingUp className="w-4 h-4" />
                            <span>+{missao.impacto} impacto</span>
                          </div>
                        </div>
                      </div>

                      {/* Badge de Dificuldade */}
                      <div className={`px-4 py-2 rounded-xl text-center ${
                        missao.dificuldade === 'D1' ? 'bg-green-500/20 border border-green-500/30' :
                        missao.dificuldade === 'D2' ? 'bg-yellow-500/20 border border-yellow-500/30' :
                        missao.dificuldade === 'D3' ? 'bg-orange-500/20 border border-orange-500/30' :
                        'bg-red-500/20 border border-red-500/30'
                      }`}>
                        <div className="text-2xl font-bold text-white">{missao.dificuldade}</div>
                        <div className="text-xs text-slate-400">
                          {missao.dificuldade === 'D1' ? 'Básica' :
                           missao.dificuldade === 'D2' ? 'Tática' :
                           missao.dificuldade === 'D3' ? 'Estratégica' :
                           'Transform.'}
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })
          )}
        </div>

        {/* Footer com Estatísticas */}
        <div className="mt-8 p-6 bg-white/5 border border-white/10 rounded-xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-white mb-1">{missoesFiltradas.length}</div>
              <div className="text-slate-400 text-sm">Missões Disponíveis</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-emerald-400 mb-1">
                {missoesFiltradas.reduce((acc, m) => acc + m.xp, 0)}
              </div>
              <div className="text-slate-400 text-sm">XP Total Possível</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-amber-400 mb-1">
                {missoesFiltradas.reduce((acc, m) => acc + m.moedas, 0)}
              </div>
              <div className="text-slate-400 text-sm">Moedas Totais</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
