// Sistema de Pontuação e Maturidade Empresarial

export interface BlockWeight {
  id: string;
  name: string;
  weight: number; // Percentual (soma = 100%)
}

export interface MaturityLevel {
  id: string;
  name: string;
  minScore: number;
  maxScore: number;
  description: string;
  focus: string;
  tone: 'critical' | 'supportive' | 'encouraging' | 'strategic' | 'advanced';
  color: string;
  icon: string;
}

export interface Vulnerability {
  id: string;
  severity: 'critical' | 'warning' | 'opportunity';
  category: string;
  title: string;
  description: string;
  impact: string;
  recommendation: string;
}

// ========================================
// PESOS POR BLOCO (Total = 100%)
// ========================================
export const blockWeights: BlockWeight[] = [
  {
    id: 'block1',
    name: 'Identidade da Empresa',
    weight: 10, // Contexto base
  },
  {
    id: 'block2',
    name: 'Situação Atual & Dor Principal',
    weight: 15, // Diagnóstico crítico
  },
  {
    id: 'block3',
    name: 'Finanças Essenciais',
    weight: 25, // Maior impacto no resultado
  },
  {
    id: 'block4',
    name: 'Operação & Processos',
    weight: 20, // Escalabilidade
  },
  {
    id: 'block5',
    name: 'Pessoas & Liderança',
    weight: 15, // Gestão de equipe
  },
  {
    id: 'block6',
    name: 'Mentalidade & Planejamento Estratégico',
    weight: 15, // Visão de longo prazo
  },
];

// ========================================
// PONTUAÇÃO POR RESPOSTA
// ========================================
export const scoreMapping: Record<string, number> = {
  // Respostas Maduras/Positivas (100 pontos)
  'sim': 100,
  'delego': 100,
  'calculado': 100,
  'nao': 100, // Para perguntas negativas (ex: "mistura finanças?")
  'crescendo': 100,
  
  // Respostas Parciais/Intermediárias (50 pontos)
  'parcial': 50,
  'as-vezes': 50,
  'misto': 50,
  'mais-ou-menos': 50,
  'estavel': 50,
  
  // Respostas Críticas/Ausentes (0 pontos)
  'nao': 0, // Para perguntas positivas
  'centralizo': 0,
  'copiado': 0,
  'sim': 0, // Para perguntas negativas
  'endividada': 0,
  'sobrevivendo': 25,
};

// Mapeamento especial para perguntas invertidas
export const invertedQuestions = [
  'personal_business_mix', // "Mistura finanças?" - Não = bom
  'people_dependency', // "Depende de pessoas?" - Não = bom
  'frequent_failures', // "Falhas frequentes?" - Não = bom
];

// ========================================
// NÍVEIS DE MATURIDADE (0-100)
// ========================================
export const maturityLevels: MaturityLevel[] = [
  {
    id: 'survival',
    name: 'Sobrevivência',
    minScore: 0,
    maxScore: 20,
    description: 'Sua empresa está em modo sobrevivência. Falta estrutura básica e controle.',
    focus: 'Estabelecer controle financeiro mínimo e organizar o básico para não quebrar.',
    tone: 'critical',
    color: 'red',
    icon: '🚨',
  },
  {
    id: 'foundation',
    name: 'Fundação',
    minScore: 21,
    maxScore: 40,
    description: 'Você está construindo as bases. Tem consciência dos problemas, mas falta execução consistente.',
    focus: 'Criar rotinas básicas de gestão e separar finanças pessoais da empresa.',
    tone: 'supportive',
    color: 'orange',
    icon: '🏗️',
  },
  {
    id: 'organization',
    name: 'Organização',
    minScore: 41,
    maxScore: 60,
    description: 'Sua empresa está se organizando. Tem processos básicos, mas ainda depende muito de você.',
    focus: 'Documentar processos, delegar responsabilidades e criar previsibilidade.',
    tone: 'encouraging',
    color: 'yellow',
    icon: '📋',
  },
  {
    id: 'growth',
    name: 'Crescimento',
    minScore: 61,
    maxScore: 75,
    description: 'Sua empresa está crescendo de forma estruturada. Tem processos claros e equipe alinhada.',
    focus: 'Escalar operação, desenvolver lideranças e aumentar margem de lucro.',
    tone: 'strategic',
    color: 'blue',
    icon: '📈',
  },
  {
    id: 'scale',
    name: 'Escala',
    minScore: 76,
    maxScore: 85,
    description: 'Sua empresa está pronta para escalar. Processos rodando, equipe autônoma e finanças saudáveis.',
    focus: 'Expandir mercado, otimizar margens e construir vantagens competitivas.',
    tone: 'strategic',
    color: 'green',
    icon: '🚀',
  },
  {
    id: 'excellence',
    name: 'Excelência',
    minScore: 86,
    maxScore: 95,
    description: 'Sua empresa é referência. Opera com excelência, alta margem e visão estratégica clara.',
    focus: 'Inovação, expansão estratégica e construção de legado empresarial.',
    tone: 'advanced',
    color: 'purple',
    icon: '👑',
  },
  {
    id: 'mastery',
    name: 'Maestria',
    minScore: 96,
    maxScore: 100,
    description: 'Você domina a gestão empresarial. Sua empresa é uma máquina de resultados previsíveis.',
    focus: 'Multiplicar o modelo, mentorar outros empresários e criar impacto de longo prazo.',
    tone: 'advanced',
    color: 'indigo',
    icon: '💎',
  },
];

// ========================================
// REGRAS DE DETECÇÃO DE VULNERABILIDADES
// ========================================
export function detectVulnerabilities(answers: Record<string, any>): Vulnerability[] {
  const vulnerabilities: Vulnerability[] = [];

  // 🔴 CRÍTICAS - Risco direto de colapso
  
  // Fluxo de caixa ausente
  if (answers.cash_flow_control === 'nao') {
    vulnerabilities.push({
      id: 'no-cash-flow',
      severity: 'critical',
      category: 'Finanças',
      title: 'Sem Controle de Fluxo de Caixa',
      description: 'Você não tem controle do fluxo de caixa da empresa.',
      impact: 'Risco ALTO de quebrar sem perceber. Impossível tomar decisões financeiras seguras.',
      recommendation: 'URGENTE: Comece hoje a anotar todas as entradas e saídas. Use uma planilha simples ou app de gestão.',
    });
  }

  // Mistura finanças pessoais com empresa
  if (answers.personal_business_mix === 'sim') {
    vulnerabilities.push({
      id: 'mixed-finances',
      severity: 'critical',
      category: 'Governança',
      title: 'Finanças Pessoais e Empresariais Misturadas',
      description: 'Você mistura frequentemente dinheiro pessoal com da empresa.',
      impact: 'Impossível saber se a empresa é lucrativa. Risco de usar lucro da empresa para despesas pessoais.',
      recommendation: 'Separe AGORA: abra conta PJ exclusiva e defina um pró-labore fixo mensal.',
    });
  }

  // Não sabe margem de lucro
  if (answers.profit_margin === 'nao') {
    vulnerabilities.push({
      id: 'no-profit-margin',
      severity: 'critical',
      category: 'Finanças',
      title: 'Desconhece Margem de Lucro',
      description: 'Você não sabe calcular sua margem de lucro.',
      impact: 'Pode estar vendendo no prejuízo sem saber. Impossível precificar corretamente.',
      recommendation: 'Aprenda a calcular: (Preço de Venda - Custos) / Preço de Venda × 100. Meta mínima: 20%.',
    });
  }

  // Empresa endividada
  if (answers.company_status === 'endividada') {
    vulnerabilities.push({
      id: 'debt-crisis',
      severity: 'critical',
      category: 'Finanças',
      title: 'Empresa Endividada',
      description: 'Sua empresa está endividada.',
      impact: 'Risco de colapso financeiro. Juros corroem qualquer lucro. Estresse extremo.',
      recommendation: 'PRIORIDADE MÁXIMA: Negocie dívidas, corte custos não essenciais e aumente margem urgentemente.',
    });
  }

  // Tudo depende do dono
  if (answers.absence_impact === 'nao') {
    vulnerabilities.push({
      id: 'owner-dependency',
      severity: 'critical',
      category: 'Escala',
      title: 'Negócio Depende 100% de Você',
      description: 'O negócio para se você se ausentar.',
      impact: 'Você não tem uma empresa, tem um emprego sem férias. Impossível crescer ou vender.',
      recommendation: 'Documente processos, treine equipe e delegue pelo menos 30% das suas tarefas operacionais.',
    });
  }

  // 🟡 ATENÇÃO - Trava crescimento
  
  // Preço copiado do mercado
  if (answers.pricing === 'copiado') {
    vulnerabilities.push({
      id: 'copied-pricing',
      severity: 'warning',
      category: 'Finanças',
      title: 'Precificação Sem Cálculo',
      description: 'Você copia preços do mercado sem calcular seus custos.',
      impact: 'Pode estar perdendo dinheiro em cada venda ou deixando margem na mesa.',
      recommendation: 'Calcule seus custos reais (fixos + variáveis) e defina margem de lucro desejada.',
    });
  }

  // Processos não documentados
  if (answers.documented_processes === 'nao') {
    vulnerabilities.push({
      id: 'no-documentation',
      severity: 'warning',
      category: 'Processos',
      title: 'Processos Não Documentados',
      description: 'Processos estão apenas na cabeça das pessoas.',
      impact: 'Dependência de pessoas específicas. Difícil treinar novos funcionários. Qualidade inconsistente.',
      recommendation: 'Documente os 3 processos mais críticos da empresa em formato simples (passo a passo).',
    });
  }

  // Sem rotina de gestão
  if (answers.weekly_routine === 'nao') {
    vulnerabilities.push({
      id: 'no-management-routine',
      severity: 'warning',
      category: 'Gestão',
      title: 'Sem Rotina de Gestão',
      description: 'Você está sempre apagando incêndio, sem rotina estruturada.',
      impact: 'Trabalha MUITO, mas não evolui. Decisões reativas em vez de estratégicas.',
      recommendation: 'Reserve 2h por semana para revisar números, planejar semana e priorizar o que importa.',
    });
  }

  // Sem planejamento estratégico
  if (answers.strategic_planning === 'nao') {
    vulnerabilities.push({
      id: 'no-strategic-planning',
      severity: 'warning',
      category: 'Estratégia',
      title: 'Sem Planejamento Estratégico',
      description: 'Você toca o negócio conforme aparece, sem plano definido.',
      impact: 'Crescimento lento e desordenado. Dificuldade em priorizar investimentos.',
      recommendation: 'Defina 3 metas principais para os próximos 90 dias e revise semanalmente.',
    });
  }

  // Equipe não entende prioridades
  if (answers.team_priorities === 'nao') {
    vulnerabilities.push({
      id: 'team-misalignment',
      severity: 'warning',
      category: 'Pessoas',
      title: 'Equipe Desalinhada',
      description: 'Sua equipe não entende as prioridades do negócio.',
      impact: 'Retrabalho constante. Você precisa direcionar tudo. Baixa produtividade.',
      recommendation: 'Faça reunião semanal de 15min para alinhar prioridades da semana com toda equipe.',
    });
  }

  // 🟢 OPORTUNIDADES - Potencial de alavancagem
  
  // Tem controle financeiro mas pode melhorar
  if (answers.cash_flow_control === 'parcial' && answers.profit_margin === 'mais-ou-menos') {
    vulnerabilities.push({
      id: 'financial-optimization',
      severity: 'opportunity',
      category: 'Finanças',
      title: 'Oportunidade de Otimização Financeira',
      description: 'Você tem controle básico, mas pode profissionalizar a gestão financeira.',
      impact: 'Com controle mais rigoroso, pode aumentar margem em 5-10% sem vender mais.',
      recommendation: 'Implemente DRE mensal, analise custos por categoria e identifique desperdícios.',
    });
  }

  // Processos parcialmente documentados
  if (answers.documented_processes === 'parcial' && answers.execution_standard === 'parcial') {
    vulnerabilities.push({
      id: 'process-scaling',
      severity: 'opportunity',
      category: 'Processos',
      title: 'Pronto para Escalar Processos',
      description: 'Você já tem base de processos, pode estruturar para crescer.',
      impact: 'Documentação completa permite contratar e treinar mais rápido, reduzindo dependência.',
      recommendation: 'Complete documentação dos processos críticos e crie checklists de execução.',
    });
  }

  // Delega parcialmente
  if (answers.delegation === 'parcial' && answers.team_trust === 'parcial') {
    vulnerabilities.push({
      id: 'delegation-opportunity',
      severity: 'opportunity',
      category: 'Liderança',
      title: 'Oportunidade de Desenvolver Lideranças',
      description: 'Você já delega algumas coisas, pode desenvolver mais autonomia na equipe.',
      impact: 'Liberar 50% do seu tempo operacional para focar em estratégia e crescimento.',
      recommendation: 'Escolha 1 pessoa de confiança e delegue uma área completa com autonomia.',
    });
  }

  // Tem visão mas falta estrutura
  if (answers.long_term_vision === 'sim' && answers.strategic_planning === 'parcial') {
    vulnerabilities.push({
      id: 'strategic-execution',
      severity: 'opportunity',
      category: 'Estratégia',
      title: 'Transformar Visão em Execução',
      description: 'Você tem visão clara, mas falta estruturar a execução.',
      impact: 'Com planejamento estruturado, pode acelerar crescimento em 2-3x.',
      recommendation: 'Quebre sua visão de 3 anos em metas trimestrais e ações semanais concretas.',
    });
  }

  return vulnerabilities;
}

// ========================================
// CÁLCULO DE SCORE
// ========================================
export function calculateScore(answers: Record<string, any>): {
  totalScore: number;
  blockScores: Record<string, number>;
  maturityLevel: MaturityLevel;
  vulnerabilities: Vulnerability[];
} {
  const blockScores: Record<string, number> = {};
  
  // Mapear perguntas para blocos
  const questionToBlock: Record<string, string> = {
    // Bloco 1 - Identidade
    'business_type': 'block1',
    'segment': 'block1',
    'location': 'block1',
    'time_operating': 'block1',
    'company_size': 'block1',
    'revenue': 'block1',
    
    // Bloco 2 - Situação Atual
    'company_status': 'block2',
    'feelings': 'block2',
    'main_challenge': 'block2',
    
    // Bloco 3 - Finanças
    'cash_flow_control': 'block3',
    'profit_margin': 'block3',
    'pricing': 'block3',
    'personal_business_mix': 'block3',
    
    // Bloco 4 - Processos
    'clear_routines': 'block4',
    'documented_processes': 'block4',
    'execution_standard': 'block4',
    'people_dependency': 'block4',
    'frequent_failures': 'block4',
    
    // Bloco 5 - Pessoas
    'absence_impact': 'block5',
    'clear_responsibilities': 'block5',
    'team_priorities': 'block5',
    'team_trust': 'block5',
    'delegation': 'block5',
    
    // Bloco 6 - Planejamento
    'weekly_routine': 'block6',
    'prioritization': 'block6',
    'clear_objective': 'block6',
    'strategic_planning': 'block6',
    'goals_tracking': 'block6',
    'long_term_vision': 'block6',
  };

  // Calcular score por bloco
  const blockQuestionCounts: Record<string, number> = {};
  const blockTotalScores: Record<string, number> = {};

  Object.entries(answers).forEach(([questionId, answer]) => {
    const blockId = questionToBlock[questionId];
    if (!blockId) return;

    // Ignorar perguntas de contexto (bloco 1) no cálculo
    if (blockId === 'block1') return;

    // Inicializar contadores
    if (!blockQuestionCounts[blockId]) {
      blockQuestionCounts[blockId] = 0;
      blockTotalScores[blockId] = 0;
    }

    // Calcular pontuação da resposta
    let score = 0;
    
    if (Array.isArray(answer)) {
      // Perguntas múltiplas - quanto mais marcou, pior
      score = Math.max(0, 100 - (answer.length * 25));
    } else {
      // Perguntas invertidas (Não = bom)
      if (invertedQuestions.includes(questionId)) {
        if (answer === 'nao') score = 100;
        else if (answer === 'parcial' || answer === 'as-vezes') score = 50;
        else if (answer === 'sim') score = 0;
      } else {
        // Perguntas normais
        score = scoreMapping[answer] ?? 50; // Default 50 se não mapeado
      }
    }

    blockTotalScores[blockId] += score;
    blockQuestionCounts[blockId]++;
  });

  // Calcular média por bloco e aplicar pesos
  let weightedScore = 0;

  blockWeights.forEach(({ id, weight }) => {
    if (blockQuestionCounts[id] && blockQuestionCounts[id] > 0) {
      const blockAverage = blockTotalScores[id] / blockQuestionCounts[id];
      blockScores[id] = Math.round(blockAverage);
      weightedScore += (blockAverage * weight) / 100;
    }
  });

  const totalScore = Math.round(weightedScore);

  // Determinar nível de maturidade
  const maturityLevel = maturityLevels.find(
    level => totalScore >= level.minScore && totalScore <= level.maxScore
  ) || maturityLevels[0];

  // Detectar vulnerabilidades
  const vulnerabilities = detectVulnerabilities(answers);

  return {
    totalScore,
    blockScores,
    maturityLevel,
    vulnerabilities,
  };
}
