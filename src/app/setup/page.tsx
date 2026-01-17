'use client';

import { useState } from 'react';
import { syncMissionsToDatabase } from '@/lib/db-actions';
import { Loader2, CheckCircle2, XCircle } from 'lucide-react';
import Link from 'next/link';

export default function SetupPage() {
  const [syncing, setSyncing] = useState(false);
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null);

  const handleSync = async () => {
    setSyncing(true);
    setResult(null);
    try {
      const res = await syncMissionsToDatabase();
      setResult(res);
    } catch (error) {
      setResult({ success: false, message: 'Erro ao sincronizar' });
    } finally {
      setSyncing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white/5 border border-white/10 rounded-2xl p-8">
        <h1 className="text-3xl font-bold text-white mb-2 text-center">
          🚀 Configuração Inicial
        </h1>
        <p className="text-slate-400 text-center mb-8">
          Sincronize as missões com o banco de dados
        </p>

        <button
          onClick={handleSync}
          disabled={syncing}
          className="w-full px-6 py-4 bg-blue-500 hover:bg-blue-600 text-white rounded-xl font-semibold transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed mb-4"
        >
          {syncing ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Sincronizando...
            </>
          ) : (
            <>
              🔄 Sincronizar Missões
            </>
          )}
        </button>

        {result && (
          <div className={`p-4 rounded-xl border ${
            result.success 
              ? 'bg-green-500/10 border-green-500/30 text-green-400' 
              : 'bg-red-500/10 border-red-500/30 text-red-400'
          } flex items-center gap-3 mb-4`}>
            {result.success ? (
              <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
            ) : (
              <XCircle className="w-5 h-5 flex-shrink-0" />
            )}
            <span>{result.message}</span>
          </div>
        )}

        {result?.success && (
          <div className="space-y-2">
            <Link
              href="/missoes"
              className="block w-full px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-semibold transition-all text-center"
            >
              ✅ Ver Missões
            </Link>
            <Link
              href="/admin"
              className="block w-full px-6 py-3 bg-purple-500 hover:bg-purple-600 text-white rounded-xl font-semibold transition-all text-center"
            >
              ⚙️ Painel Admin
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
