'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Target, ArrowRight, Building2, TrendingUp, Users, DollarSign, 
  Store, Factory, Briefcase, MapPin, Calendar, AlertCircle,
  CheckCircle, XCircle, FileText, Settings, UserCheck, Clock,
  Droplets, Flame, Zap
} from 'lucide-react';

// BLOCO 1 - Informações Básicas da Empresa
const block1Questions = [
  {
    id: 'business_type',
    question: 'Qual o tipo do seu negócio?',
    options: [
      { value: 'servico', label: 'Serviço', icon: Briefcase },
      { value: 'varejo', label: 'Varejo', icon: Store },
      { value: 'industria', label: 'Indústria', icon: Factory },
      { value: 'hibrido', label: 'Híbrido', icon: Building2 },
    ]
  },
  {
    id: 'segment',
    question: 'Qual o segmento principal que atua?',
    type: 'text',
    placeholder: 'Ex: Restaurante, Consultoria, Confecção...',
    icon: Building2
  },
  {
    id: 'location',
    question: 'Cidade ou área de atuação',
    type: 'text',
    placeholder: 'Ex: São Paulo - SP, Todo Brasil...',
    icon: MapPin
  },
  {
    id: 'time_operating',
    question: 'Tempo de funcionamento da empresa',
    options: [
      { value: 'menos-1', label: 'Menos de 1 ano', icon: Calendar },
      { value: '1-3', label: '1 a 3 anos', icon: Calendar },
      { value: '3-5', label: '3 a 5 anos', icon: Calendar },
      { value: 'mais-5', label: 'Mais de 5 anos', icon: Calendar },
    ]
  },
  {
    id: 'company_size',
    question: 'Qual o porte da sua empresa?',
    options: [
      { value: 'mei', label: 'MEI / Microempreendedor Individual', icon: Users },
      { value: 'micro', label: 'Microempresa (até 5 funcionários)', icon: Users },
      { value: 'pequena', label: 'Pequena empresa (até 20 funcionários)', icon: Building2 },
      { value: 'media', label: 'Média empresa (acima de 20 funcionários)', icon: TrendingUp },
    ]
  },
  {
    id: 'revenue',
    question: 'Faturamento médio mensal',
    options: [
      { value: 'ate-10k', label: 'Até R$ 10 mil', icon: DollarSign },
      { value: '10k-50k', label: 'R$ 10 mil a R$ 50 mil', icon: DollarSign },
      { value: '50k-100k', label: 'R$ 50 mil a R$ 100 mil', icon: DollarSign },
      { value: '100k-200k', label: 'R$ 100 mil a R$ 200 mil', icon: DollarSign },
      { value: '200k-500k', label: 'R$ 200 mil a R$ 500 mil', icon: DollarSign },
      { value: '500k-1m', label: 'R$ 500 mil a R$ 1 milhão', icon: DollarSign },
      { value: 'mais-1m', label: 'Acima de R$ 1 milhão', icon: DollarSign },
    ]
  },
];

// BLOCO 2 - Situação Atual e Desafios
const block2Questions = [
  {
    id: 'company_status',
    question: 'Hoje sua empresa está:',
    options: [
      { value: 'endividada', label: 'Endividada', icon: AlertCircle },
      { value: 'sobrevivendo', label: 'Sobrevivendo', icon: Droplets },
      { value: 'estavel', label: 'Estável', icon: CheckCircle },
      { value: 'crescendo', label: 'Crescendo', icon: TrendingUp },
    ]
  },
  {
    id: 'feelings',
    question: 'Você sente que: (pode marcar mais de uma)',
    multiple: true,
    options: [
      { value: 'trabalha-demais', label: 'Trabalha demais e ganha pouco', icon: Clock },
      { value: 'falta-clareza', label: 'Falta clareza', icon: AlertCircle },
      { value: 'falta-controle', label: 'Falta controle', icon: Settings },
      { value: 'falta-equipe', label: 'Falta equipe', icon: Users },
    ]
  },
  {
    id: 'main_challenge',
    question: 'Qual seu maior desafio hoje?',
    options: [
      { value: 'trabalho-sem-lucro', label: 'Trabalho demais e o lucro não aparece', icon: Clock },
      { value: 'sem-controle', label: 'Não tenho controle do dinheiro da empresa', icon: DollarSign },
      { value: 'desorganizacao', label: 'Minha empresa é desorganizada / tudo depende de mim', icon: AlertCircle },
      { value: 'sem-previsibilidade', label: 'Tenho vendas, mas falta previsibilidade', icon: TrendingUp },
      { value: 'equipe-nao-entrega', label: 'Minha equipe não entrega como deveria', icon: Users },
      { value: 'crescer-sem-refem', label: 'Não consigo crescer sem virar refém do negócio', icon: Target },
      { value: 'apagando-incendio', label: 'Sinto que estou sempre apagando incêndio', icon: Flame },
      { value: 'nao-sei-comecar', label: 'Não sei exatamente por onde começar a melhorar', icon: AlertCircle },
    ]
  },
];

// BLOCO 3 - Controle Financeiro
const block3Questions = [
  {
    id: 'cash_flow_control',
    question: 'Você tem controle do seu fluxo de caixa?',
    options: [
      { value: 'sim', label: 'Sim, controlo diariamente', icon: CheckCircle },
      { value: 'parcial', label: 'Às vezes, mas não é consistente', icon: AlertCircle },
      { value: 'nao', label: 'Não, preciso começar', icon: XCircle },
    ]
  },
  {
    id: 'profit_margin',
    question: 'Você sabe sua margem de lucro?',
    options: [
      { value: 'sim', label: 'Sim, sei exatamente', icon: CheckCircle },
      { value: 'mais-ou-menos', label: 'Tenho uma ideia aproximada', icon: AlertCircle },
      { value: 'nao', label: 'Não sei calcular', icon: XCircle },
    ]
  },
  {
    id: 'pricing',
    question: 'Seu preço foi calculado ou "copiado do mercado"?',
    options: [
      { value: 'calculado', label: 'Calculado com base em custos', icon: CheckCircle },
      { value: 'misto', label: 'Parte calculado, parte mercado', icon: AlertCircle },
      { value: 'copiado', label: 'Copiado do mercado', icon: XCircle },
    ]
  },
  {
    id: 'personal_business_mix',
    question: 'Você mistura finanças pessoais com da empresa?',
    options: [
      { value: 'nao', label: 'Não, são totalmente separadas', icon: CheckCircle },
      { value: 'as-vezes', label: 'Às vezes misturo', icon: AlertCircle },
      { value: 'sim', label: 'Sim, misturo frequentemente', icon: XCircle },
    ]
  },
];

// BLOCO 4 - Processos e Operação
const block4Questions = [
  {
    id: 'clear_routines',
    question: 'Existem rotinas claras na empresa?',
    options: [
      { value: 'sim', label: 'Sim, bem definidas', icon: CheckCircle },
      { value: 'parcial', label: 'Algumas áreas sim, outras não', icon: AlertCircle },
      { value: 'nao', label: 'Não, cada dia é diferente', icon: XCircle },
    ]
  },
  {
    id: 'documented_processes',
    question: 'Os processos estão documentados?',
    options: [
      { value: 'sim', label: 'Sim, tudo documentado', icon: CheckCircle },
      { value: 'parcial', label: 'Alguns processos', icon: AlertCircle },
      { value: 'nao', label: 'Não, está na cabeça das pessoas', icon: XCircle },
    ]
  },
  {
    id: 'execution_standard',
    question: 'Há padrão de execução?',
    options: [
      { value: 'sim', label: 'Sim, todos seguem o padrão', icon: CheckCircle },
      { value: 'parcial', label: 'Depende da pessoa', icon: AlertCircle },
      { value: 'nao', label: 'Não, cada um faz de um jeito', icon: XCircle },
    ]
  },
  {
    id: 'people_dependency',
    question: 'Você depende demais de pessoas específicas?',
    options: [
      { value: 'nao', label: 'Não, processos são independentes', icon: CheckCircle },
      { value: 'parcial', label: 'Em algumas áreas sim', icon: AlertCircle },
      { value: 'sim', label: 'Sim, totalmente dependente', icon: XCircle },
    ]
  },
  {
    id: 'frequent_failures',
    question: 'Existem falhas frequentes?',
    options: [
      { value: 'nao', label: 'Não, operação é estável', icon: CheckCircle },
      { value: 'as-vezes', label: 'Às vezes acontecem', icon: AlertCircle },
      { value: 'sim', label: 'Sim, frequentemente', icon: XCircle },
    ]
  },
];

// BLOCO 5 - Gestão de Pessoas
const block5Questions = [
  {
    id: 'absence_impact',
    question: 'Você consegue se ausentar sem o negócio parar?',
    options: [
      { value: 'sim', label: 'Sim, tranquilamente', icon: CheckCircle },
      { value: 'parcial', label: 'Por pouco tempo', icon: AlertCircle },
      { value: 'nao', label: 'Não, tudo depende de mim', icon: XCircle },
    ]
  },
  {
    id: 'clear_responsibilities',
    question: 'Existem responsáveis claros por áreas?',
    options: [
      { value: 'sim', label: 'Sim, todos sabem suas áreas', icon: CheckCircle },
      { value: 'parcial', label: 'Algumas áreas sim', icon: AlertCircle },
      { value: 'nao', label: 'Não, tudo é meio confuso', icon: XCircle },
    ]
  },
  {
    id: 'team_priorities',
    question: 'Sua equipe entende as prioridades?',
    options: [
      { value: 'sim', label: 'Sim, todos sabem o que é importante', icon: CheckCircle },
      { value: 'parcial', label: 'Às vezes preciso reforçar', icon: AlertCircle },
      { value: 'nao', label: 'Não, sempre preciso direcionar', icon: XCircle },
    ]
  },
  {
    id: 'team_trust',
    question: 'Você confia na execução do time?',
    options: [
      { value: 'sim', label: 'Sim, confio plenamente', icon: CheckCircle },
      { value: 'parcial', label: 'Em algumas pessoas sim', icon: AlertCircle },
      { value: 'nao', label: 'Não, preciso conferir tudo', icon: XCircle },
    ]
  },
  {
    id: 'delegation',
    question: 'Você delega ou centraliza tudo?',
    options: [
      { value: 'delego', label: 'Delego e acompanho', icon: CheckCircle },
      { value: 'parcial', label: 'Delego algumas coisas', icon: AlertCircle },
      { value: 'centralizo', label: 'Centralizo tudo', icon: XCircle },
    ]
  },
];

// BLOCO 6 - Gestão Pessoal e Planejamento Estratégico
const block6Questions = [
  {
    id: 'weekly_routine',
    question: 'Você tem uma rotina de gestão semanal?',
    options: [
      { value: 'sim', label: 'Sim, tenho rotina estruturada', icon: CheckCircle },
      { value: 'parcial', label: 'Faço algumas coisas, mas não é consistente', icon: AlertCircle },
      { value: 'nao', label: 'Não, estou sempre apagando incêndio', icon: XCircle },
    ]
  },
  {
    id: 'prioritization',
    question: 'Consegue priorizar o que realmente importa?',
    options: [
      { value: 'sim', label: 'Sim, sei focar no essencial', icon: CheckCircle },
      { value: 'parcial', label: 'Às vezes me perco no operacional', icon: AlertCircle },
      { value: 'nao', label: 'Não, tudo parece urgente', icon: XCircle },
    ]
  },
  {
    id: 'clear_objective',
    question: 'Tem clareza do seu objetivo como empresário?',
    options: [
      { value: 'sim', label: 'Sim, sei exatamente onde quero chegar', icon: CheckCircle },
      { value: 'parcial', label: 'Tenho uma ideia, mas não é claro', icon: AlertCircle },
      { value: 'nao', label: 'Não, estou meio perdido', icon: XCircle },
    ]
  },
  {
    id: 'strategic_planning',
    question: 'Você tem um planejamento estratégico definido?',
    options: [
      { value: 'sim', label: 'Sim, com metas claras e prazos', icon: CheckCircle },
      { value: 'parcial', label: 'Tenho algumas metas, mas não formalizadas', icon: AlertCircle },
      { value: 'nao', label: 'Não, vou tocando conforme aparece', icon: XCircle },
    ]
  },
  {
    id: 'goals_tracking',
    question: 'Você acompanha suas metas regularmente?',
    options: [
      { value: 'sim', label: 'Sim, reviso semanalmente/mensalmente', icon: CheckCircle },
      { value: 'parcial', label: 'Às vezes olho, mas não é consistente', icon: AlertCircle },
      { value: 'nao', label: 'Não, não tenho esse hábito', icon: XCircle },
    ]
  },
  {
    id: 'long_term_vision',
    question: 'Você tem uma visão clara de onde quer estar em 1-3 anos?',
    options: [
      { value: 'sim', label: 'Sim, sei exatamente meu destino', icon: CheckCircle },
      { value: 'parcial', label: 'Tenho uma ideia geral', icon: AlertCircle },
      { value: 'nao', label: 'Não, penso mais no curto prazo', icon: XCircle },
    ]
  },
];

const allBlocks = [
  { title: 'Informações Básicas', questions: block1Questions },
  { title: 'Situação Atual', questions: block2Questions },
  { title: 'Controle Financeiro', questions: block3Questions },
  { title: 'Processos e Operação', questions: block4Questions },
  { title: 'Gestão de Pessoas', questions: block5Questions },
  { title: 'Gestão Pessoal e Planejamento', questions: block6Questions },
];

export default function OnboardingPage() {
  const router = useRouter();
  const [currentBlock, setCurrentBlock] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [companyName, setCompanyName] = useState('');
  const [userName, setUserName] = useState('');
  const [showFinal, setShowFinal] = useState(false);

  const totalQuestions = allBlocks.reduce((sum, block) => sum + block.questions.length, 0);
  const answeredQuestions = Object.keys(answers).length;
  const progress = (answeredQuestions / totalQuestions) * 100;

  const currentBlockData = allBlocks[currentBlock];
  const currentQuestionData = currentBlockData.questions[currentQuestion];

  const handleAnswer = (value: string | string[]) => {
    const questionId = currentQuestionData.id;
    
    // Para perguntas múltiplas, gerenciar array de respostas
    if (currentQuestionData.multiple) {
      const currentAnswers = (answers[questionId] as string[]) || [];
      if (Array.isArray(value)) {
        setAnswers({ ...answers, [questionId]: value });
      } else {
        const newAnswers = currentAnswers.includes(value)
          ? currentAnswers.filter(v => v !== value)
          : [...currentAnswers, value];
        setAnswers({ ...answers, [questionId]: newAnswers });
      }
      return; // Não avança automaticamente em perguntas múltiplas
    }

    setAnswers({ ...answers, [questionId]: value });
    
    // Avançar para próxima pergunta
    setTimeout(() => {
      if (currentQuestion < currentBlockData.questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else if (currentBlock < allBlocks.length - 1) {
        setCurrentBlock(currentBlock + 1);
        setCurrentQuestion(0);
      } else {
        setShowFinal(true);
      }
    }, 300);
  };

  const handleTextAnswer = (value: string) => {
    setAnswers({ ...answers, [currentQuestionData.id]: value });
  };

  const handleNext = () => {
    if (currentQuestion < currentBlockData.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else if (currentBlock < allBlocks.length - 1) {
      setCurrentBlock(currentBlock + 1);
      setCurrentQuestion(0);
    } else {
      setShowFinal(true);
    }
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    } else if (currentBlock > 0) {
      setCurrentBlock(currentBlock - 1);
      setCurrentQuestion(allBlocks[currentBlock - 1].questions.length - 1);
    }
  };

  const handleFinish = () => {
    if (!userName || !companyName) return;
    
    localStorage.setItem('fazedores_user', JSON.stringify({
      name: userName,
      companyName,
      answers,
      onboardingCompleted: true,
      completedAt: new Date().toISOString()
    }));
    
    router.push('/');
  };

  const canProceed = () => {
    const answer = answers[currentQuestionData.id];
    if (currentQuestionData.type === 'text') {
      return answer && answer.trim().length > 0;
    }
    if (currentQuestionData.multiple) {
      return answer && Array.isArray(answer) && answer.length > 0;
    }
    return !!answer;
  };

  // Key única para forçar remontagem quando pergunta muda
  const questionKey = `block-${currentBlock}-question-${currentQuestion}`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="w-full bg-white/20 rounded-full h-2 overflow-hidden">
            <div
              className="h-full bg-white rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-white text-sm mt-2 text-center">
            {showFinal 
              ? 'Finalizando seu perfil!' 
              : `Bloco ${currentBlock + 1} de ${allBlocks.length} - ${currentBlockData.title}`
            }
          </p>
        </div>

        {/* Card */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-8 sm:p-12">
          {showFinal ? (
            // Final Step - User Info
            <div className="space-y-6">
              <div className="text-center mb-8">
                <Target className="w-16 h-16 text-blue-600 mx-auto mb-4" />
                <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                  Vamos gerar seu perfil!
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Só precisamos de mais algumas informações
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Seu nome
                </label>
                <input
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder="Como você gostaria de ser chamado?"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Nome da sua empresa
                </label>
                <input
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="Qual o nome do seu negócio?"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <button
                onClick={handleFinish}
                disabled={!userName || !companyName}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-lg font-bold text-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                <span>Gerar Meu Perfil e Começar</span>
                <ArrowRight className="w-6 h-6" />
              </button>
            </div>
          ) : (
            // Questions - Com key única para forçar remontagem
            <div key={questionKey} className="space-y-8">
              <div className="text-center">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                  {currentQuestionData.question}
                </h2>
                {currentQuestionData.multiple && (
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Você pode selecionar mais de uma opção
                  </p>
                )}
              </div>

              <div className="space-y-3">
                {currentQuestionData.type === 'text' ? (
                  // Text Input
                  <div>
                    <input
                      type="text"
                      value={answers[currentQuestionData.id] || ''}
                      onChange={(e) => handleTextAnswer(e.target.value)}
                      placeholder={currentQuestionData.placeholder}
                      className="w-full px-4 py-4 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                ) : (
                  // Options
                  currentQuestionData.options?.map((option, optionIndex) => {
                    const Icon = option.icon;
                    const isSelected = currentQuestionData.multiple
                      ? ((answers[currentQuestionData.id] as string[]) || []).includes(option.value)
                      : answers[currentQuestionData.id] === option.value;
                    
                    return (
                      <button
                        key={`${questionKey}-${option.value}`}
                        onClick={() => handleAnswer(option.value)}
                        className={`w-full p-4 rounded-xl border-2 transition-all text-left flex items-center space-x-4 ${
                          isSelected
                            ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                            : 'border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-700'
                        }`}
                      >
                        <div className={`p-3 rounded-lg ${
                          isSelected
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
                        }`}>
                          <Icon className="w-6 h-6" />
                        </div>
                        <span className="font-medium text-gray-900 dark:text-gray-100">
                          {option.label}
                        </span>
                      </button>
                    );
                  })
                )}
              </div>

              {/* Navigation Buttons */}
              <div className="flex items-center justify-between pt-4">
                <button
                  onClick={handleBack}
                  disabled={currentBlock === 0 && currentQuestion === 0}
                  className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  ← Voltar
                </button>

                {(currentQuestionData.type === 'text' || currentQuestionData.multiple) && (
                  <button
                    onClick={handleNext}
                    disabled={!canProceed()}
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Próxima →
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
