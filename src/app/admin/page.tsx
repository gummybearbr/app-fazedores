'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { syncMissionsToDatabase } from '@/lib/db-actions';
import { 
  Database, 
  Upload, 
  RefreshCw, 
  Settings, 
  Users, 
  BarChart3,
  FileAudio,
  CheckCircle2,
  XCircle,
  Loader2
} from 'lucide-react';

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<'missoes' | 'usuarios' | 'stats'>('missoes');
  const [missoes, setMissoes] = useState<any[]>([]);
  const [usuarios, setUsuarios] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [uploadingAudio, setUploadingAudio] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      loadData();
    }
  }, [activeTab, mounted]);

  const loadData = async () => {
    if (!mounted) return;
    
    setLoading(true);
    try {
      if (activeTab === 'missoes') {
        const { data } = await supabase
          .from('missoes')
          .select('*')
          .order('created_at', { ascending: true });
        setMissoes(data || []);
      } else if (activeTab === 'usuarios') {
        const { data } = await supabase
          .from('user_profiles')
          .select('*')
          .order('created_at', { ascending: false });
        setUsuarios(data || []);
      }
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSyncMissions = async () => {
    setSyncing(true);
    try {
      const result = await syncMissionsToDatabase();
      if (result.success) {
        alert('✅ Missões sincronizadas com sucesso!');
        loadData();
      } else {
        alert('❌ Erro ao sincronizar missões');
      }
    } catch (error) {
      console.error('Erro:', error);
      alert('❌ Erro ao sincronizar missões');
    } finally {
      setSyncing(false);
    }
  };

  const handleAudioUpload = async (missaoId: string, file: File) => {
    setUploadingAudio(missaoId);
    try {
      // Upload do arquivo para o Supabase Storage
      const fileExt = file.name.split('.').pop();
      const fileName = `${missaoId}.${fileExt}`;
      const filePath = `audios/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('mission-audios')
        .upload(filePath, file, { upsert: true });

      if (uploadError) throw uploadError;

      // Obter URL pública
      const { data: { publicUrl } } = supabase.storage
        .from('mission-audios')
        .getPublicUrl(filePath);

      // Atualizar missão com URL do áudio
      const { error: updateError } = await supabase
        .from('missoes')
        .update({ audio_url: publicUrl })
        .eq('id', missaoId);

      if (updateError) throw updateError;

      alert('✅ Áudio enviado com sucesso!');
      loadData();
    } catch (error) {
      console.error('Erro ao fazer upload:', error);
      alert('❌ Erro ao enviar áudio');
    } finally {
      setUploadingAudio(null);
    }
  };

  const toggleMissaoAtiva = async (missaoId: string, ativo: boolean) => {
    try {
      const { error } = await supabase
        .from('missoes')
        .update({ ativo: !ativo })
        .eq('id', missaoId);

      if (error) throw error;

      loadData();
    } catch (error) {
      console.error('Erro ao atualizar missão:', error);
      alert('❌ Erro ao atualizar missão');
    }
  };

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-blue-400 animate-spin" />
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
              <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
                <Settings className="w-8 h-8 text-blue-400" />
                Painel Administrativo
              </h1>
              <p className="text-slate-400">
                Gerencie missões, usuários e conteúdo do sistema
              </p>
            </div>
            <button
              onClick={handleSyncMissions}
              disabled={syncing}
              className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-xl font-semibold transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {syncing ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Sincronizando...
                </>
              ) : (
                <>
                  <RefreshCw className="w-5 h-5" />
                  Sincronizar Missões
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex gap-4 mb-8">
          <button
            onClick={() => setActiveTab('missoes')}
            className={`px-6 py-3 rounded-xl font-semibold transition-all flex items-center gap-2 ${
              activeTab === 'missoes'
                ? 'bg-blue-500 text-white'
                : 'bg-white/5 text-slate-400 hover:bg-white/10'
            }`}
          >
            <Database className="w-5 h-5" />
            Missões ({missoes.length})
          </button>
          <button
            onClick={() => setActiveTab('usuarios')}
            className={`px-6 py-3 rounded-xl font-semibold transition-all flex items-center gap-2 ${
              activeTab === 'usuarios'
                ? 'bg-blue-500 text-white'
                : 'bg-white/5 text-slate-400 hover:bg-white/10'
            }`}
          >
            <Users className="w-5 h-5" />
            Usuários ({usuarios.length})
          </button>
          <button
            onClick={() => setActiveTab('stats')}
            className={`px-6 py-3 rounded-xl font-semibold transition-all flex items-center gap-2 ${
              activeTab === 'stats'
                ? 'bg-blue-500 text-white'
                : 'bg-white/5 text-slate-400 hover:bg-white/10'
            }`}
          >
            <BarChart3 className="w-5 h-5" />
            Estatísticas
          </button>
        </div>

        {/* Conteúdo */}
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 text-blue-400 animate-spin" />
          </div>
        ) : (
          <>
            {/* Tab Missões */}
            {activeTab === 'missoes' && (
              <div className="space-y-4">
                {missoes.map((missao) => (
                  <div
                    key={`admin-missao-${missao.id}`}
                    className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-bold text-white">
                            {missao.nome}
                          </h3>
                          <span className={`text-xs px-3 py-1 rounded-full ${
                            missao.ativo
                              ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                              : 'bg-red-500/20 text-red-400 border border-red-500/30'
                          }`}>
                            {missao.ativo ? 'Ativa' : 'Inativa'}
                          </span>
                          <span className="text-xs px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30">
                            {missao.gargalo}
                          </span>
                          <span className="text-xs px-3 py-1 rounded-full bg-purple-500/20 text-purple-400 border border-purple-500/30">
                            {missao.tipo}
                          </span>
                        </div>
                        <p className="text-slate-400 text-sm mb-3">
                          {missao.o_que_fazer}
                        </p>
                        <div className="flex items-center gap-4 text-sm text-slate-500">
                          <span>⏱️ {missao.tempo}</span>
                          <span>⭐ {missao.xp} XP</span>
                          <span>🪙 {missao.moedas} moedas</span>
                        </div>
                      </div>

                      <div className="flex flex-col gap-2">
                        {/* Upload de Áudio */}
                        <div className="relative">
                          <input
                            type="file"
                            accept="audio/*"
                            id={`audio-${missao.id}`}
                            className="hidden"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) handleAudioUpload(missao.id, file);
                            }}
                            disabled={uploadingAudio === missao.id}
                          />
                          <label
                            htmlFor={`audio-${missao.id}`}
                            className={`px-4 py-2 rounded-lg font-semibold transition-all cursor-pointer flex items-center gap-2 ${
                              missao.audio_url
                                ? 'bg-green-500/20 text-green-400 border border-green-500/30 hover:bg-green-500/30'
                                : 'bg-amber-500/20 text-amber-400 border border-amber-500/30 hover:bg-amber-500/30'
                            } ${uploadingAudio === missao.id ? 'opacity-50 cursor-not-allowed' : ''}`}
                          >
                            {uploadingAudio === missao.id ? (
                              <>
                                <Loader2 className="w-4 h-4 animate-spin" />
                                Enviando...
                              </>
                            ) : missao.audio_url ? (
                              <>
                                <CheckCircle2 className="w-4 h-4" />
                                Áudio OK
                              </>
                            ) : (
                              <>
                                <Upload className="w-4 h-4" />
                                Upload Áudio
                              </>
                            )}
                          </label>
                        </div>

                        {/* Toggle Ativo/Inativo */}
                        <button
                          onClick={() => toggleMissaoAtiva(missao.id, missao.ativo)}
                          className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                            missao.ativo
                              ? 'bg-red-500/20 text-red-400 border border-red-500/30 hover:bg-red-500/30'
                              : 'bg-green-500/20 text-green-400 border border-green-500/30 hover:bg-green-500/30'
                          }`}
                        >
                          {missao.ativo ? 'Desativar' : 'Ativar'}
                        </button>
                      </div>
                    </div>

                    {/* Áudio Player (se existir) */}
                    {missao.audio_url && (
                      <div className="mt-4 pt-4 border-t border-white/10">
                        <audio controls className="w-full">
                          <source src={missao.audio_url} />
                        </audio>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Tab Usuários */}
            {activeTab === 'usuarios' && (
              <div className="space-y-4">
                {usuarios.map((usuario) => (
                  <div
                    key={`admin-usuario-${usuario.id}`}
                    className="bg-white/5 border border-white/10 rounded-xl p-6"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-bold text-white mb-1">
                          {usuario.nome || usuario.email}
                        </h3>
                        <p className="text-slate-400 text-sm">{usuario.email}</p>
                      </div>
                      <div className="flex gap-6 text-center">
                        <div>
                          <div className="text-2xl font-bold text-emerald-400">
                            {usuario.xp_total}
                          </div>
                          <div className="text-xs text-slate-500">XP Total</div>
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-amber-400">
                            {usuario.moedas_total}
                          </div>
                          <div className="text-xs text-slate-500">Moedas</div>
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-blue-400">
                            {usuario.nivel}
                          </div>
                          <div className="text-xs text-slate-500">Nível</div>
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-purple-400">
                            {usuario.streak_dias}
                          </div>
                          <div className="text-xs text-slate-500">Streak</div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Tab Estatísticas */}
            {activeTab === 'stats' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                  <div className="text-4xl font-bold text-blue-400 mb-2">
                    {missoes.length}
                  </div>
                  <div className="text-slate-400">Total de Missões</div>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                  <div className="text-4xl font-bold text-emerald-400 mb-2">
                    {missoes.filter(m => m.ativo).length}
                  </div>
                  <div className="text-slate-400">Missões Ativas</div>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                  <div className="text-4xl font-bold text-purple-400 mb-2">
                    {usuarios.length}
                  </div>
                  <div className="text-slate-400">Usuários Cadastrados</div>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                  <div className="text-4xl font-bold text-amber-400 mb-2">
                    {missoes.filter(m => m.audio_url).length}
                  </div>
                  <div className="text-slate-400">Missões com Áudio</div>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                  <div className="text-4xl font-bold text-pink-400 mb-2">
                    {usuarios.reduce((acc, u) => acc + u.xp_total, 0)}
                  </div>
                  <div className="text-slate-400">XP Total Distribuído</div>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                  <div className="text-4xl font-bold text-cyan-400 mb-2">
                    {usuarios.reduce((acc, u) => acc + u.moedas_total, 0)}
                  </div>
                  <div className="text-slate-400">Moedas Distribuídas</div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
