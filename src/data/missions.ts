// BANCO DE MISSÕES - Sistema de Gestão Empresarial
// Versão 1.0 - 50 Missões Base

export type Gargalo = 'FIN' | 'OPS' | 'PEO' | 'SAL' | 'STR';
export type Estagio = 'S1' | 'S2' | 'S3' | 'S4' | 'S5';
export type Nivel = 'N1' | 'N2' | 'N3' | 'N4' | 'N5';
export type Dificuldade = 'D1' | 'D2' | 'D3' | 'D4';
export type TipoMissao = 'CRÍTICA' | 'TÁTICA' | 'BÔNUS';
export type Risco = 'ALTO' | 'MÉDIO' | 'BAIXO';

export interface QuizQuestion {
  pergunta: string;
  alternativas: {
    A: string;
    B: string;
    C: string;
  };
  correta: 'A' | 'B' | 'C';
  explicacao: string;
}

export interface Mission {
  id: string;
  nome: string;
  gargalo: Gargalo;
  estagio: Estagio[];
  nivel: Nivel[];
  dificuldade: Dificuldade;
  tempo: string;
  tipo: TipoMissao;
  impacto: number;
  xp: number;
  moedas: number;
  desbloqueio: string;
  risco: Risco;
  oQueFazer: string;
  comoFazer: string[];
  pontosAtencao: string;
  quiz: QuizQuestion[];
}

export const GARGALO_INFO = {
  FIN: { nome: 'Financeiro', emoji: '💰', cor: 'emerald' },
  OPS: { nome: 'Operação', emoji: '⚙️', cor: 'blue' },
  PEO: { nome: 'Pessoas', emoji: '👥', cor: 'purple' },
  SAL: { nome: 'Vendas', emoji: '📈', cor: 'orange' },
  STR: { nome: 'Estratégia', emoji: '🧠', cor: 'pink' },
};

export const MISSIONS: Mission[] = [
  // 💰 FINANCEIRO (FIN) - 15 MISSÕES
  {
    id: 'FIN_001',
    nome: 'Registrar o Caixa do Dia',
    gargalo: 'FIN',
    estagio: ['S1', 'S2', 'S3'],
    nivel: ['N1', 'N2', 'N3'],
    dificuldade: 'D1',
    tempo: '10 min',
    tipo: 'CRÍTICA',
    impacto: 3,
    xp: 20,
    moedas: 5,
    desbloqueio: 'Sempre disponível se FIN crítico',
    risco: 'ALTO',
    oQueFazer: 'Registre todas as entradas e saídas da empresa hoje.',
    comoFazer: [
      'Escolha um meio simples (papel, planilha ou app)',
      'Anote cada valor que entrou',
      'Anote cada valor que saiu',
    ],
    pontosAtencao: 'Não confie na memória. Pequenos valores causam grandes vazamentos.',
    quiz: [
      {
        pergunta: 'Por que o controle diário impacta o lucro?',
        alternativas: {
          A: 'Para pagar impostos',
          B: 'Para revelar perdas invisíveis',
          C: 'Para organizar documentos',
        },
        correta: 'B',
        explicacao: 'O lucro morre nos pequenos vazamentos que só o registro diário revela.',
      },
      {
        pergunta: 'Qual o primeiro passo correto?',
        alternativas: {
          A: 'Criar um sistema complexo',
          B: 'Escolher um meio simples e registrar tudo',
          C: 'Delegar para alguém depois',
        },
        correta: 'B',
        explicacao: 'Sistema só funciona se for usado.',
      },
      {
        pergunta: 'Frequência ideal dessa prática?',
        alternativas: {
          A: 'Semanal',
          B: 'Quando sobra tempo',
          C: 'Diária',
        },
        correta: 'C',
        explicacao: 'Gestão é rotina, não evento.',
      },
    ],
  },
  {
    id: 'FIN_002',
    nome: 'Separar Finanças Pessoais da Empresa',
    gargalo: 'FIN',
    estagio: ['S1', 'S2', 'S3', 'S4'],
    nivel: ['N1', 'N2', 'N3', 'N4'],
    dificuldade: 'D1',
    tempo: '15 min',
    tipo: 'CRÍTICA',
    impacto: 4,
    xp: 25,
    moedas: 8,
    desbloqueio: 'Após FIN_001',
    risco: 'ALTO',
    oQueFazer: 'Crie separação clara entre dinheiro pessoal e da empresa.',
    comoFazer: [
      'Defina uma conta ou caixa exclusivo da empresa',
      'Registre retiradas como "pró-labore"',
      'Nunca pague despesas pessoais com dinheiro da empresa',
    ],
    pontosAtencao: 'Misturar dinheiro distorce lucro e cria decisões erradas.',
    quiz: [
      {
        pergunta: 'Por que separar dinheiro é essencial?',
        alternativas: {
          A: 'Para facilitar a contabilidade',
          B: 'Para enxergar o lucro real',
          C: 'Para economizar impostos',
        },
        correta: 'B',
        explicacao: 'Sem separação, você não sabe se a empresa gera dinheiro ou consome o seu.',
      },
      {
        pergunta: 'Retirada pessoal correta é:',
        alternativas: {
          A: 'Qualquer valor quando precisar',
          B: 'Um valor definido como pró-labore',
          C: 'O que sobrar no caixa',
        },
        correta: 'B',
        explicacao: 'Retirada previsível mantém a empresa saudável.',
      },
      {
        pergunta: 'Com que frequência revisar isso?',
        alternativas: {
          A: 'Mensal',
          B: 'Semanal',
          C: 'Diária',
        },
        correta: 'C',
        explicacao: 'Separação precisa ser respeitada todo dia.',
      },
    ],
  },
  {
    id: 'FIN_003',
    nome: 'Calcular Margem de Lucro Básica',
    gargalo: 'FIN',
    estagio: ['S2', 'S3', 'S4'],
    nivel: ['N2', 'N3', 'N4'],
    dificuldade: 'D2',
    tempo: '30 min',
    tipo: 'TÁTICA',
    impacto: 4,
    xp: 30,
    moedas: 10,
    desbloqueio: 'FIN_001',
    risco: 'MÉDIO',
    oQueFazer: 'Descubra quanto sobra de cada venda.',
    comoFazer: [
      'Escolha um produto/serviço',
      'Liste todos os custos',
      'Subtraia do preço de venda',
    ],
    pontosAtencao: 'Custos invisíveis matam margem.',
    quiz: [
      {
        pergunta: 'Margem mostra:',
        alternativas: {
          A: 'Quanto você vende',
          B: 'Quanto você fatura',
          C: 'Quanto realmente sobra',
        },
        correta: 'C',
        explicacao: 'Receita não é lucro.',
      },
      {
        pergunta: 'Custos devem incluir:',
        alternativas: {
          A: 'Só matéria-prima',
          B: 'Só impostos',
          C: 'Tudo que envolve a venda',
        },
        correta: 'C',
        explicacao: 'Lucro vem depois de todos os custos.',
      },
      {
        pergunta: 'Quando revisar margem?',
        alternativas: {
          A: 'Uma vez por ano',
          B: 'Toda vez que custo muda',
          C: 'Nunca',
        },
        correta: 'B',
        explicacao: 'Custo muda, margem também.',
      },
    ],
  },
  {
    id: 'FIN_004',
    nome: 'Listar Dívidas e Compromissos',
    gargalo: 'FIN',
    estagio: ['S1', 'S2', 'S3'],
    nivel: ['N1', 'N2', 'N3'],
    dificuldade: 'D1',
    tempo: '15 min',
    tipo: 'CRÍTICA',
    impacto: 3,
    xp: 20,
    moedas: 5,
    desbloqueio: 'Sempre',
    risco: 'ALTO',
    oQueFazer: 'Liste todas as dívidas e compromissos financeiros.',
    comoFazer: [
      'Anote credor',
      'Valor',
      'Data de vencimento',
    ],
    pontosAtencao: 'O que não é visto, vira surpresa.',
    quiz: [
      {
        pergunta: 'Por que listar dívidas ajuda?',
        alternativas: {
          A: 'Para assustar',
          B: 'Para priorizar pagamentos',
          C: 'Para renegociar depois',
        },
        correta: 'B',
        explicacao: 'Prioridade evita juros e bloqueios.',
      },
      {
        pergunta: 'Informação mais importante?',
        alternativas: {
          A: 'Credor',
          B: 'Valor',
          C: 'Vencimento',
        },
        correta: 'C',
        explicacao: 'Vencimento define risco imediato.',
      },
      {
        pergunta: 'Revisar lista com que frequência?',
        alternativas: {
          A: 'Mensal',
          B: 'Diária',
          C: 'Anual',
        },
        correta: 'A',
        explicacao: 'Dívida muda, lista também.',
      },
    ],
  },
  {
    id: 'FIN_005',
    nome: 'Definir Pró-Labore do Dono',
    gargalo: 'FIN',
    estagio: ['S2', 'S3', 'S4'],
    nivel: ['N2', 'N3', 'N4'],
    dificuldade: 'D1',
    tempo: '10 min',
    tipo: 'TÁTICA',
    impacto: 2,
    xp: 15,
    moedas: 5,
    desbloqueio: 'FIN_002',
    risco: 'MÉDIO',
    oQueFazer: 'Defina valor fixo mensal para retirada pessoal.',
    comoFazer: [
      'Analise caixa médio',
      'Defina valor sustentável',
      'Registre como pró-labore',
    ],
    pontosAtencao: 'Retirada variável quebra previsibilidade.',
    quiz: [
      {
        pergunta: 'Pró-labore serve para:',
        alternativas: {
          A: 'Gastar o que sobra',
          B: 'Criar previsibilidade',
          C: 'Pagar impostos',
        },
        correta: 'B',
        explicacao: 'Previsibilidade mantém a empresa viva.',
      },
      {
        pergunta: 'Valor deve ser:',
        alternativas: {
          A: 'Fixo',
          B: 'Aleatório',
          C: 'Crescente',
        },
        correta: 'A',
        explicacao: 'Fixo gera controle.',
      },
      {
        pergunta: 'Revisão ideal:',
        alternativas: {
          A: 'Anual',
          B: 'Mensal',
          C: 'Nunca',
        },
        correta: 'B',
        explicacao: 'Caixa muda, retirada também.',
      },
    ],
  },

  // ⚙️ OPERAÇÃO (OPS) - 10 MISSÕES
  {
    id: 'OPS_001',
    nome: 'Mapear Rotina Diária da Empresa',
    gargalo: 'OPS',
    estagio: ['S1', 'S2', 'S3'],
    nivel: ['N1', 'N2', 'N3'],
    dificuldade: 'D1',
    tempo: '20 min',
    tipo: 'CRÍTICA',
    impacto: 3,
    xp: 20,
    moedas: 5,
    desbloqueio: 'Sempre',
    risco: 'ALTO',
    oQueFazer: 'Liste tudo que acontece em um dia normal.',
    comoFazer: [
      'Anote tarefas da abertura ao fechamento',
      'Marque quem faz cada uma',
      'Destaque atrasos e falhas',
    ],
    pontosAtencao: 'O que não é rotina vira caos.',
    quiz: [
      {
        pergunta: 'Rotina serve para:',
        alternativas: {
          A: 'Controlar pessoas',
          B: 'Criar previsibilidade',
          C: 'Diminuir vendas',
        },
        correta: 'B',
        explicacao: 'Previsibilidade reduz erros.',
      },
      {
        pergunta: 'Primeiro passo:',
        alternativas: {
          A: 'Documentar',
          B: 'Observar',
          C: 'Delegar',
        },
        correta: 'B',
        explicacao: 'Não se documenta o que não se conhece.',
      },
      {
        pergunta: 'Frequência de revisão:',
        alternativas: {
          A: 'Mensal',
          B: 'Semanal',
          C: 'Anual',
        },
        correta: 'B',
        explicacao: 'Rotina muda com operação.',
      },
    ],
  },
  {
    id: 'OPS_002',
    nome: 'Criar Padrão para Tarefa Crítica',
    gargalo: 'OPS',
    estagio: ['S2', 'S3', 'S4'],
    nivel: ['N2', 'N3', 'N4'],
    dificuldade: 'D2',
    tempo: '30 min',
    tipo: 'TÁTICA',
    impacto: 3,
    xp: 25,
    moedas: 8,
    desbloqueio: 'OPS_001',
    risco: 'MÉDIO',
    oQueFazer: 'Escolha uma tarefa e defina o jeito certo de fazer.',
    comoFazer: [
      'Escolha tarefa recorrente',
      'Escreva passos',
      'Teste com alguém',
    ],
    pontosAtencao: 'Padrão sem teste não funciona.',
    quiz: [
      {
        pergunta: 'Padrão serve para:',
        alternativas: {
          A: 'Engessar',
          B: 'Garantir qualidade',
          C: 'Diminuir responsabilidade',
        },
        correta: 'B',
        explicacao: 'Qualidade vem da repetição certa.',
      },
      {
        pergunta: 'Melhor tarefa para começar:',
        alternativas: {
          A: 'Rara',
          B: 'Recorrente',
          C: 'Complexa',
        },
        correta: 'B',
        explicacao: 'Impacto maior.',
      },
      {
        pergunta: 'Quando revisar padrão:',
        alternativas: {
          A: 'Quando falhar',
          B: 'Todo dia',
          C: 'Nunca',
        },
        correta: 'A',
        explicacao: 'Falha mostra melhoria.',
      },
    ],
  },

  // 👥 PESSOAS (PEO) - 10 MISSÕES
  {
    id: 'PEO_001',
    nome: 'Definir Responsáveis por Área',
    gargalo: 'PEO',
    estagio: ['S1', 'S2', 'S3', 'S4'],
    nivel: ['N1', 'N2', 'N3', 'N4'],
    dificuldade: 'D1',
    tempo: '15 min',
    tipo: 'CRÍTICA',
    impacto: 3,
    xp: 20,
    moedas: 5,
    desbloqueio: 'Sempre',
    risco: 'ALTO',
    oQueFazer: 'Defina quem responde por cada área.',
    comoFazer: [
      'Liste áreas',
      'Associe um nome',
      'Comunique o time',
    ],
    pontosAtencao: 'Sem dono, tudo vira problema seu.',
    quiz: [
      {
        pergunta: 'Responsável significa:',
        alternativas: {
          A: 'Culpar',
          B: 'Responder pelo resultado',
          C: 'Mandar nos outros',
        },
        correta: 'B',
        explicacao: 'Responsabilidade é entrega.',
      },
      {
        pergunta: 'Comunicar serve para:',
        alternativas: {
          A: 'Mostrar autoridade',
          B: 'Criar clareza',
          C: 'Criar medo',
        },
        correta: 'B',
        explicacao: 'Clareza reduz conflito.',
      },
      {
        pergunta: 'Revisar responsáveis quando:',
        alternativas: {
          A: 'Nunca',
          B: 'Equipe muda',
          C: 'Todo dia',
        },
        correta: 'B',
        explicacao: 'Estrutura acompanha pessoas.',
      },
    ],
  },

  // 📈 VENDAS (SAL) - 7 MISSÕES
  {
    id: 'SAL_001',
    nome: 'Mapear Origem dos Clientes',
    gargalo: 'SAL',
    estagio: ['S2', 'S3', 'S4'],
    nivel: ['N2', 'N3', 'N4'],
    dificuldade: 'D1',
    tempo: '20 min',
    tipo: 'TÁTICA',
    impacto: 2,
    xp: 15,
    moedas: 5,
    desbloqueio: 'Sempre',
    risco: 'MÉDIO',
    oQueFazer: 'Liste de onde vêm seus clientes.',
    comoFazer: [
      'Pergunte aos últimos 10 clientes',
      'Anote origem',
      'Conte repetições',
    ],
    pontosAtencao: 'Fonte única é risco.',
    quiz: [
      {
        pergunta: 'Por que mapear origem?',
        alternativas: {
          A: 'Para saber onde investir',
          B: 'Para agradar cliente',
          C: 'Para criar propaganda',
        },
        correta: 'A',
        explicacao: 'Marketing sem foco desperdiça dinheiro.',
      },
      {
        pergunta: 'Melhor amostra inicial:',
        alternativas: {
          A: '1 cliente',
          B: '10 clientes',
          C: '100 clientes',
        },
        correta: 'B',
        explicacao: 'Rápido e prático.',
      },
      {
        pergunta: 'Risco principal:',
        alternativas: {
          A: 'Fonte única',
          B: 'Muitas fontes',
          C: 'Sem clientes',
        },
        correta: 'A',
        explicacao: 'Dependência mata crescimento.',
      },
    ],
  },

  // 🧠 ESTRATÉGIA (STR) - 8 MISSÕES
  {
    id: 'STR_001',
    nome: 'Definir Objetivo de 12 Meses',
    gargalo: 'STR',
    estagio: ['S2', 'S3', 'S4', 'S5'],
    nivel: ['N2', 'N3', 'N4', 'N5'],
    dificuldade: 'D2',
    tempo: '30 min',
    tipo: 'TÁTICA',
    impacto: 3,
    xp: 25,
    moedas: 8,
    desbloqueio: 'Nível ≥ N2',
    risco: 'MÉDIO',
    oQueFazer: 'Escreva onde sua empresa deve estar em 12 meses.',
    comoFazer: [
      'Defina faturamento',
      'Defina estrutura',
      'Defina rotina do dono',
    ],
    pontosAtencao: 'Objetivo vago gera ação fraca.',
    quiz: [
      {
        pergunta: 'Objetivo bom é:',
        alternativas: {
          A: 'Inspirador',
          B: 'Mensurável',
          C: 'Bonito',
        },
        correta: 'B',
        explicacao: 'O que não se mede não se gerencia.',
      },
      {
        pergunta: 'Horizonte ideal:',
        alternativas: {
          A: '1 mês',
          B: '12 meses',
          C: '5 anos',
        },
        correta: 'B',
        explicacao: 'Longo o suficiente para mudar, curto para agir.',
      },
      {
        pergunta: 'Revisar quando:',
        alternativas: {
          A: 'Mensal',
          B: 'Anual',
          C: 'Nunca',
        },
        correta: 'A',
        explicacao: 'Estratégia é viva.',
      },
    ],
  },

  // ⚡ MISSÕES BÔNUS - 5
  {
    id: 'BONUS_001',
    nome: 'Criar Indicador Simples de Caixa',
    gargalo: 'FIN',
    estagio: ['S3', 'S4', 'S5'],
    nivel: ['N3', 'N4', 'N5'],
    dificuldade: 'D2',
    tempo: '20 min',
    tipo: 'BÔNUS',
    impacto: 2,
    xp: 15,
    moedas: 10,
    desbloqueio: 'Streak ≥ 3',
    risco: 'BAIXO',
    oQueFazer: 'Crie meta mínima de saldo semanal.',
    comoFazer: [
      'Veja média da semana passada',
      'Defina valor mínimo',
      'Registre em local visível',
    ],
    pontosAtencao: 'Meta impossível desmotiva.',
    quiz: [
      {
        pergunta: 'Indicador serve para:',
        alternativas: {
          A: 'Controlar pessoas',
          B: 'Guiar decisões',
          C: 'Fazer relatório',
        },
        correta: 'B',
        explicacao: 'Indicador mostra o caminho.',
      },
      {
        pergunta: 'Meta deve ser:',
        alternativas: {
          A: 'Alta',
          B: 'Impossível',
          C: 'Realista',
        },
        correta: 'C',
        explicacao: 'Realismo gera consistência.',
      },
      {
        pergunta: 'Revisar quando:',
        alternativas: {
          A: 'Diário',
          B: 'Semanal',
          C: 'Anual',
        },
        correta: 'B',
        explicacao: 'Indicador precisa de ritmo.',
      },
    ],
  },
];

// Funções auxiliares
export function getMissionById(id: string): Mission | undefined {
  return MISSIONS.find((m) => m.id === id);
}

export function getMissionsByGargalo(gargalo: Gargalo): Mission[] {
  return MISSIONS.filter((m) => m.gargalo === gargalo);
}

export function getMissionsByTipo(tipo: TipoMissao): Mission[] {
  return MISSIONS.filter((m) => m.tipo === tipo);
}

export function getMissionsByRisco(risco: Risco): Mission[] {
  return MISSIONS.filter((m) => m.risco === risco);
}
