import { Trail, Lesson, Task, DailyMission, User } from './types';

// TRILHA 1 — Fundamentos da Gestão Essencial (7 dias)
export const trail1: Trail = {
  id: 'trail-1',
  title: 'Fundamentos da Gestão Essencial',
  description: 'Aprenda os pilares fundamentais para transformar sua empresa em 7 dias',
  duration: '7 dias',
  icon: 'Target',
  color: 'from-blue-600 to-purple-600',
  difficulty: 'beginner',
  xpReward: 500,
  lessons: [
    {
      id: 'lesson-1-1',
      trailId: 'trail-1',
      title: 'Controle de Caixa',
      content: `# Controle de Caixa: O Coração da Sua Empresa

O controle de caixa é a base de tudo. Sem saber quanto entra e quanto sai, você está navegando às cegas.

## Por que é crítico?
- **Visibilidade total**: Você sabe exatamente onde está seu dinheiro
- **Decisões inteligentes**: Pode planejar investimentos e cortes
- **Evita surpresas**: Nunca mais ficar sem dinheiro para pagar fornecedor

## Como fazer (simples):
1. **Anote TUDO que entra** (vendas, recebimentos)
2. **Anote TUDO que sai** (compras, contas, salários)
3. **Faça isso DIARIAMENTE** (5 minutos por dia)
4. **Revise semanalmente** (30 minutos na sexta)

## Ferramenta mínima:
Uma planilha simples ou até um caderno. O importante é FAZER.

## Resultado esperado:
Em 7 dias você terá clareza total sobre seu fluxo de dinheiro.`,
      duration: '2 min',
      order: 1,
      xpReward: 50,
      coinsReward: 10,
      quiz: {
        questions: [
          {
            id: 'q1-1-1',
            question: 'Qual a frequência ideal para registrar entradas e saídas no caixa?',
            options: ['Uma vez por mês', 'Uma vez por semana', 'Diariamente', 'Só quando lembrar'],
            correctAnswer: 2,
            explanation: 'O controle diário garante que nenhuma movimentação seja esquecida e você tem visão em tempo real.'
          },
          {
            id: 'q1-1-2',
            question: 'O que deve ser registrado no controle de caixa?',
            options: ['Apenas vendas', 'Apenas despesas fixas', 'Tudo que entra e sai', 'Só valores acima de R$100'],
            correctAnswer: 2,
            explanation: 'TODO movimento financeiro deve ser registrado, independente do valor.'
          },
          {
            id: 'q1-1-3',
            question: 'Qual o principal benefício do controle de caixa?',
            options: ['Pagar menos impostos', 'Ter visibilidade e tomar decisões inteligentes', 'Impressionar investidores', 'Reduzir custos automaticamente'],
            correctAnswer: 1,
            explanation: 'A visibilidade financeira permite decisões baseadas em dados reais, não em achismos.'
          }
        ]
      },
      taskGenerated: {
        id: 'task-1-1',
        title: 'Criar planilha de controle de caixa',
        description: 'Monte uma planilha simples com colunas: Data | Descrição | Entrada | Saída | Saldo. Registre as movimentações dos últimos 3 dias.',
        lessonId: 'lesson-1-1',
        status: 'todo',
        priority: 'high',
        xpReward: 30,
        coinsReward: 5,
        createdAt: new Date()
      }
    },
    {
      id: 'lesson-1-2',
      trailId: 'trail-1',
      title: 'Margem e Preço',
      content: `# Margem e Preço: A Matemática do Lucro

Muitos empresários vendem muito mas não lucram. O problema? Não conhecem sua margem real.

## O que é margem?
É a diferença entre o que você vende e o que você gasta para vender.

**Fórmula simples:**
Margem = (Preço de Venda - Custo Total) / Preço de Venda × 100

## Exemplo prático:
- Você vende um produto por R$ 100
- Custou R$ 60 (produto + frete + embalagem)
- Margem = (100 - 60) / 100 = 40%

## Margem saudável:
- **Comércio**: 30-40%
- **Serviços**: 50-70%
- **Indústria**: 20-30%

## Ação imediata:
Calcule a margem dos seus 3 produtos/serviços principais. Se estiver abaixo do ideal, você tem 2 opções:
1. Aumentar o preço
2. Reduzir custos

## Verdade dura:
Vender muito com margem baixa = trabalhar de graça.`,
      duration: '3 min',
      order: 2,
      xpReward: 50,
      coinsReward: 10,
      quiz: {
        questions: [
          {
            id: 'q1-2-1',
            question: 'Se um produto custa R$50 e você vende por R$100, qual a margem?',
            options: ['25%', '50%', '75%', '100%'],
            correctAnswer: 1,
            explanation: 'Margem = (100-50)/100 = 50%. Metade do preço de venda é lucro bruto.'
          },
          {
            id: 'q1-2-2',
            question: 'Qual margem é considerada saudável para comércio?',
            options: ['10-20%', '30-40%', '60-70%', '80-90%'],
            correctAnswer: 1,
            explanation: 'Comércio geralmente trabalha com margens entre 30-40% para ser sustentável.'
          },
          {
            id: 'q1-2-3',
            question: 'O que fazer se sua margem está muito baixa?',
            options: ['Vender mais volume', 'Aumentar preço ou reduzir custos', 'Ignorar e continuar', 'Mudar de negócio'],
            correctAnswer: 1,
            explanation: 'As duas alavancas para melhorar margem são: aumentar receita (preço) ou diminuir custos.'
          }
        ]
      },
      taskGenerated: {
        id: 'task-1-2',
        title: 'Calcular margem dos 3 principais produtos/serviços',
        description: 'Liste seus 3 produtos/serviços mais vendidos. Para cada um, calcule: Custo Total, Preço de Venda e Margem (%). Identifique qual precisa de ajuste.',
        lessonId: 'lesson-1-2',
        status: 'todo',
        priority: 'high',
        xpReward: 30,
        coinsReward: 5,
        createdAt: new Date()
      }
    },
    {
      id: 'lesson-1-3',
      trailId: 'trail-1',
      title: 'Estoque que dá Lucro',
      content: `# Estoque que dá Lucro

Estoque parado é dinheiro parado. Estoque em excesso é prejuízo garantido.

## Os 3 erros fatais:
1. **Comprar demais** "porque estava em promoção"
2. **Não girar o estoque** (produtos parados há meses)
3. **Não saber o que tem** (falta controle)

## Regra de ouro:
**Giro de estoque = Vendas / Estoque médio**

Quanto maior o giro, melhor. Significa que você vende rápido e repõe.

## Estoque ideal:
- **Produtos A** (mais vendidos): 15-30 dias de estoque
- **Produtos B** (venda média): 30-45 dias
- **Produtos C** (venda baixa): 45-60 dias ou ELIMINAR

## Ação prática:
1. Faça um inventário rápido
2. Identifique produtos parados há +60 dias
3. Faça promoção agressiva para liberar capital
4. Reinvista em produtos que giram rápido

## Resultado:
Mais dinheiro em caixa, menos capital parado, mais lucro.`,
      duration: '2 min',
      order: 3,
      xpReward: 50,
      coinsReward: 10,
      quiz: {
        questions: [
          {
            id: 'q1-3-1',
            question: 'O que é "giro de estoque"?',
            options: ['Quantidade de produtos', 'Velocidade que o estoque é vendido e reposto', 'Valor total em estoque', 'Espaço físico ocupado'],
            correctAnswer: 1,
            explanation: 'Giro de estoque mede quantas vezes você vende e repõe seu estoque em um período.'
          },
          {
            id: 'q1-3-2',
            question: 'Produtos parados há mais de 60 dias devem:',
            options: ['Ser guardados para o futuro', 'Entrar em promoção agressiva', 'Ser descartados', 'Continuar no estoque'],
            correctAnswer: 1,
            explanation: 'Produtos parados prendem capital. Melhor vender com desconto e reinvestir em produtos que giram.'
          },
          {
            id: 'q1-3-3',
            question: 'Qual o estoque ideal para produtos mais vendidos (A)?',
            options: ['5-10 dias', '15-30 dias', '60-90 dias', '6 meses'],
            correctAnswer: 1,
            explanation: 'Produtos A devem ter estoque de 15-30 dias: suficiente para não faltar, mas sem excesso.'
          }
        ]
      },
      taskGenerated: {
        id: 'task-1-3',
        title: 'Fazer inventário e identificar produtos parados',
        description: 'Liste todos os produtos em estoque. Identifique quais estão parados há +60 dias. Calcule o valor total parado. Crie uma promoção para liberar esse capital.',
        lessonId: 'lesson-1-3',
        status: 'todo',
        priority: 'medium',
        xpReward: 30,
        coinsReward: 5,
        createdAt: new Date()
      }
    },
    {
      id: 'lesson-1-4',
      trailId: 'trail-1',
      title: 'Operação Eficiente',
      content: `# Operação Eficiente: Faça Mais com Menos

Eficiência operacional = fazer o mesmo (ou mais) gastando menos tempo e recursos.

## Os 3 pilares:
1. **Processos claros** - todo mundo sabe o que fazer
2. **Eliminação de desperdícios** - cortar o que não agrega valor
3. **Automação simples** - tecnologia básica que facilita

## Desperdícios comuns:
- Retrabalho (fazer 2x a mesma coisa)
- Espera (tempo parado esperando algo)
- Movimentação excessiva (ir e voltar sem necessidade)
- Estoque excessivo (já vimos isso)
- Processos confusos (ninguém sabe como fazer direito)

## Método prático:
1. **Mapeie** um processo crítico (ex: atendimento ao cliente)
2. **Identifique** os desperdícios
3. **Simplifique** - corte etapas desnecessárias
4. **Documente** - deixe claro como fazer
5. **Treine** a equipe

## Resultado:
Mais produtividade, menos custo, time mais feliz.`,
      duration: '3 min',
      order: 4,
      xpReward: 50,
      coinsReward: 10,
      quiz: {
        questions: [
          {
            id: 'q1-4-1',
            question: 'O que é eficiência operacional?',
            options: ['Trabalhar mais horas', 'Fazer mais com menos recursos', 'Contratar mais pessoas', 'Aumentar preços'],
            correctAnswer: 1,
            explanation: 'Eficiência é produzir o mesmo resultado (ou melhor) usando menos tempo, dinheiro e esforço.'
          },
          {
            id: 'q1-4-2',
            question: 'Qual NÃO é um desperdício operacional?',
            options: ['Retrabalho', 'Treinamento da equipe', 'Espera desnecessária', 'Movimentação excessiva'],
            correctAnswer: 1,
            explanation: 'Treinamento é investimento, não desperdício. Ele aumenta a eficiência no longo prazo.'
          },
          {
            id: 'q1-4-3',
            question: 'Primeiro passo para melhorar um processo:',
            options: ['Comprar software caro', 'Mapear como funciona hoje', 'Demitir pessoas', 'Aumentar metas'],
            correctAnswer: 1,
            explanation: 'Antes de melhorar, você precisa entender como o processo funciona atualmente.'
          }
        ]
      },
      taskGenerated: {
        id: 'task-1-4',
        title: 'Mapear e simplificar 1 processo crítico',
        description: 'Escolha 1 processo importante (ex: atendimento, produção, entrega). Desenhe como funciona hoje. Identifique 3 desperdícios. Proponha melhorias simples.',
        lessonId: 'lesson-1-4',
        status: 'todo',
        priority: 'medium',
        xpReward: 30,
        coinsReward: 5,
        createdAt: new Date()
      }
    },
    {
      id: 'lesson-1-5',
      trailId: 'trail-1',
      title: 'Produtividade do Time',
      content: `# Produtividade do Time: Pessoas Certas, Lugar Certo

Seu time é seu maior ativo. Mas só se estiver produzindo.

## Sinais de baixa produtividade:
- Tarefas não concluídas no prazo
- Retrabalho constante
- Falta de clareza sobre prioridades
- Desmotivação visível
- Você fazendo tudo sozinho

## As 3 alavancas:
1. **Clareza** - todo mundo sabe o que fazer e por quê
2. **Autonomia** - pessoas decidem sem precisar perguntar tudo
3. **Feedback** - reconhecimento do que está bom e correção do que não está

## Sistema simples:
**Segunda-feira**: Reunião de 15min - prioridades da semana
**Diariamente**: Check rápido de 5min - o que cada um vai fazer hoje
**Sexta-feira**: Revisão de 20min - o que foi feito, o que travou

## Regra de ouro:
Se você está fazendo tudo, você não tem um time. Você tem ajudantes.

## Ação prática:
Delegue 3 tarefas essa semana que você sempre faz. Ensine, acompanhe, mas NÃO faça.`,
      duration: '2 min',
      order: 5,
      xpReward: 50,
      coinsReward: 10,
      quiz: {
        questions: [
          {
            id: 'q1-5-1',
            question: 'Qual NÃO é uma alavanca de produtividade?',
            options: ['Clareza sobre o que fazer', 'Autonomia para decidir', 'Microgerenciamento constante', 'Feedback regular'],
            correctAnswer: 2,
            explanation: 'Microgerenciamento mata a produtividade. Pessoas precisam de autonomia para crescer.'
          },
          {
            id: 'q1-5-2',
            question: 'Com que frequência deve haver alinhamento de prioridades?',
            options: ['Uma vez por ano', 'Uma vez por mês', 'Semanalmente', 'Nunca, cada um sabe o que fazer'],
            correctAnswer: 2,
            explanation: 'Alinhamento semanal garante que todos estão focados no que realmente importa.'
          },
          {
            id: 'q1-5-3',
            question: 'Se você está fazendo tudo sozinho, significa que:',
            options: ['Você é muito competente', 'Você não tem um time, tem ajudantes', 'Seu time é ruim', 'Está tudo certo'],
            correctAnswer: 1,
            explanation: 'Líder que faz tudo não está liderando, está sendo gargalo. Time precisa de autonomia.'
          }
        ]
      },
      taskGenerated: {
        id: 'task-1-5',
        title: 'Implementar rotina semanal de alinhamento',
        description: 'Agende: Segunda (15min - prioridades), Daily check (5min), Sexta (20min - revisão). Delegue 3 tarefas que você sempre faz para membros do time.',
        lessonId: 'lesson-1-5',
        status: 'todo',
        priority: 'high',
        xpReward: 30,
        coinsReward: 5,
        createdAt: new Date()
      }
    },
    {
      id: 'lesson-1-6',
      trailId: 'trail-1',
      title: 'Indicadores Básicos',
      content: `# Indicadores Básicos: Os Números que Importam

Você não pode melhorar o que não mede.

## Os 5 indicadores essenciais:
1. **Faturamento mensal** - quanto você vendeu
2. **Margem de lucro** - quanto sobrou depois dos custos
3. **Ticket médio** - valor médio por venda
4. **Taxa de conversão** - % de clientes que compram
5. **Custo de aquisição** - quanto custa trazer 1 cliente

## Como acompanhar:
- **Diariamente**: Faturamento do dia
- **Semanalmente**: Margem e ticket médio
- **Mensalmente**: Todos os 5 indicadores

## Dashboard mínimo:
Uma planilha simples com:
- Mês atual vs mês anterior
- Meta vs realizado
- Tendência (subindo ou descendo)

## Regra prática:
Se você não olha seus números pelo menos 1x por semana, você não está gerenciando. Está improvisando.

## Ação imediata:
Crie uma planilha com os 5 indicadores. Preencha com dados dos últimos 3 meses. Defina metas para o próximo mês.`,
      duration: '3 min',
      order: 6,
      xpReward: 50,
      coinsReward: 10,
      quiz: {
        questions: [
          {
            id: 'q1-6-1',
            question: 'Qual a frequência mínima para revisar indicadores?',
            options: ['Diariamente', 'Semanalmente', 'Mensalmente', 'Anualmente'],
            correctAnswer: 1,
            explanation: 'Revisão semanal mínima garante que você identifica problemas cedo e pode corrigir rápido.'
          },
          {
            id: 'q1-6-2',
            question: 'O que é "ticket médio"?',
            options: ['Número de vendas', 'Valor médio por venda', 'Total de clientes', 'Margem de lucro'],
            correctAnswer: 1,
            explanation: 'Ticket médio = Faturamento total / Número de vendas. Mostra quanto cada cliente gasta em média.'
          },
          {
            id: 'q1-6-3',
            question: 'Por que medir indicadores é importante?',
            options: ['Para impressionar investidores', 'Porque é obrigatório', 'Você não pode melhorar o que não mede', 'Para pagar menos impostos'],
            correctAnswer: 2,
            explanation: 'Indicadores mostram onde você está e para onde está indo. Sem eles, você está no escuro.'
          }
        ]
      },
      taskGenerated: {
        id: 'task-1-6',
        title: 'Criar dashboard de indicadores essenciais',
        description: 'Monte planilha com os 5 indicadores: Faturamento, Margem, Ticket Médio, Taxa de Conversão, Custo de Aquisição. Preencha com dados dos últimos 3 meses.',
        lessonId: 'lesson-1-6',
        status: 'todo',
        priority: 'high',
        xpReward: 30,
        coinsReward: 5,
        createdAt: new Date()
      }
    },
    {
      id: 'lesson-1-7',
      trailId: 'trail-1',
      title: 'Construção da Rotina Semanal',
      content: `# Construção da Rotina Semanal: Disciplina que Transforma

Empresas que crescem têm rotinas. Empresas que improvisam, sobrevivem (quando sobrevivem).

## A rotina semanal ideal:
**Segunda-feira (30min)**
- Revisar números da semana anterior
- Definir 3 prioridades da semana
- Alinhar time

**Terça a Quinta (execução)**
- Foco total nas prioridades
- Check diário de 5min com time
- Resolver problemas rapidamente

**Sexta-feira (1h)**
- Revisar o que foi feito
- Analisar indicadores
- Planejar próxima semana
- Celebrar conquistas

## Rotina mensal:
**Última sexta do mês (2h)**
- Análise completa de indicadores
- Revisão de metas
- Ajustes de estratégia
- Planejamento do próximo mês

## Verdade dura:
Sem rotina, você está sempre apagando incêndio. Com rotina, você está construindo um negócio.

## Ação final:
Implemente essa rotina a partir de segunda-feira. Não negocie. Não pule. Faça por 4 semanas e veja a transformação.`,
      duration: '3 min',
      order: 7,
      xpReward: 50,
      coinsReward: 10,
      quiz: {
        questions: [
          {
            id: 'q1-7-1',
            question: 'Qual o principal objetivo da rotina de segunda-feira?',
            options: ['Fazer vendas', 'Definir prioridades da semana', 'Pagar contas', 'Atender clientes'],
            correctAnswer: 1,
            explanation: 'Segunda é dia de planejamento: revisar números e definir o que é mais importante fazer na semana.'
          },
          {
            id: 'q1-7-2',
            question: 'Com que frequência deve haver revisão completa de indicadores?',
            options: ['Diariamente', 'Semanalmente', 'Mensalmente', 'Anualmente'],
            correctAnswer: 2,
            explanation: 'Revisão mensal completa permite análise profunda e ajustes estratégicos.'
          },
          {
            id: 'q1-7-3',
            question: 'Empresas sem rotina geralmente:',
            options: ['Crescem mais rápido', 'Estão sempre apagando incêndio', 'São mais criativas', 'Têm mais lucro'],
            correctAnswer: 1,
            explanation: 'Sem rotina, você reage a problemas em vez de construir proativamente. É modo sobrevivência.'
          }
        ]
      },
      taskGenerated: {
        id: 'task-1-7',
        title: 'Implementar rotina semanal completa',
        description: 'Bloqueie na agenda: Segunda 30min (planejamento), Terça-Quinta 5min (check diário), Sexta 1h (revisão). Comprometa-se a fazer por 4 semanas consecutivas.',
        lessonId: 'lesson-1-7',
        status: 'todo',
        priority: 'high',
        xpReward: 30,
        coinsReward: 5,
        createdAt: new Date()
      }
    }
  ]
};

export const trails: Trail[] = [trail1];

// Dados mock do usuário
export const mockUser: User = {
  id: 'user-1',
  name: 'Empresário Fazedor',
  companyName: 'Minha Empresa',
  companyStage: 'micro',
  level: 1,
  xp: 0,
  coins: 0,
  streak: 0,
  currentTrailId: 'trail-1',
  completedLessons: [],
  completedTasks: [],
  onboardingCompleted: false,
  createdAt: new Date()
};

// Missões diárias - ORDEM REORGANIZADA: Tarefa primeiro, Aula segundo
export const dailyMissions: DailyMission[] = [
  {
    id: 'mission-2',
    title: 'Complete uma tarefa',
    description: 'Execute o que aprendeu',
    type: 'task',
    completed: false,
    xpReward: 30,
    coinsReward: 10
  },
  {
    id: 'mission-1',
    title: 'Complete uma aula',
    description: 'Aprenda algo novo hoje',
    type: 'lesson',
    completed: false,
    xpReward: 20,
    coinsReward: 5
  },
  {
    id: 'mission-3',
    title: 'Mantenha o streak',
    description: 'Acesse o app todos os dias',
    type: 'streak',
    completed: false,
    xpReward: 10,
    coinsReward: 5
  }
];
