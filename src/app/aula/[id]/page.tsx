'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, CheckCircle2, XCircle, ArrowRight, Trophy } from 'lucide-react';
import Navbar from '@/components/custom/navbar';
import { trails } from '@/lib/data';
import { Lesson, QuizQuestion } from '@/lib/types';
import ReactMarkdown from 'react-markdown';

export default function AulaPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [step, setStep] = useState<'content' | 'quiz' | 'result'>('content');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answers, setAnswers] = useState<boolean[]>([]);
  const [showExplanation, setShowExplanation] = useState(false);

  useEffect(() => {
    // Encontrar a lição
    const foundLesson = trails
      .flatMap(trail => trail.lessons)
      .find(l => l.id === params.id);
    
    if (foundLesson) {
      setLesson(foundLesson);
    }
  }, [params.id]);

  if (!lesson) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 dark:text-gray-400">Carregando aula...</p>
        </div>
      </div>
    );
  }

  const currentQuestion = lesson.quiz.questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === lesson.quiz.questions.length - 1;
  const correctAnswers = answers.filter(a => a).length;
  const totalQuestions = lesson.quiz.questions.length;
  const score = (correctAnswers / totalQuestions) * 100;

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null) return;

    const isCorrect = selectedAnswer === currentQuestion.correctAnswer;
    setAnswers([...answers, isCorrect]);
    setShowExplanation(true);
  };

  const handleNextQuestion = () => {
    if (isLastQuestion) {
      setStep('result');
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    }
  };

  const handleComplete = () => {
    // Aqui você salvaria o progresso do usuário
    // Por enquanto, apenas redireciona
    router.push('/trilha');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Navbar />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Link
          href="/trilha"
          className="inline-flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Voltar para Trilha</span>
        </Link>

        {/* Content Step */}
        {step === 'content' && (
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
            <div className="mb-6">
              <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                Aula {lesson.order} • {lesson.duration}
              </span>
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-gray-100 mt-2">
                {lesson.title}
              </h1>
            </div>

            <div className="prose prose-lg dark:prose-invert max-w-none mb-8">
              <ReactMarkdown>{lesson.content}</ReactMarkdown>
            </div>

            <button
              onClick={() => setStep('quiz')}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-lg font-bold text-lg hover:shadow-xl transition-all flex items-center justify-center space-x-2"
            >
              <span>Fazer Quiz</span>
              <ArrowRight className="w-6 h-6" />
            </button>
          </div>
        )}

        {/* Quiz Step */}
        {step === 'quiz' && (
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
            {/* Progress */}
            <div className="mb-8">
              <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
                <span>Pergunta {currentQuestionIndex + 1} de {totalQuestions}</span>
                <span>{answers.filter(a => a).length} corretas</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-500"
                  style={{ width: `${((currentQuestionIndex + 1) / totalQuestions) * 100}%` }}
                />
              </div>
            </div>

            {/* Question */}
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
              {currentQuestion.question}
            </h2>

            {/* Options */}
            <div className="space-y-3 mb-6">
              {currentQuestion.options.map((option, index) => {
                const isSelected = selectedAnswer === index;
                const isCorrect = index === currentQuestion.correctAnswer;
                const showResult = showExplanation;

                return (
                  <button
                    key={index}
                    onClick={() => !showExplanation && handleAnswerSelect(index)}
                    disabled={showExplanation}
                    className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
                      showResult
                        ? isCorrect
                          ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                          : isSelected
                          ? 'border-red-500 bg-red-50 dark:bg-red-900/20'
                          : 'border-gray-200 dark:border-gray-700'
                        : isSelected
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                        : 'border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-gray-900 dark:text-gray-100">
                        {option}
                      </span>
                      {showResult && isCorrect && (
                        <CheckCircle2 className="w-6 h-6 text-green-600" />
                      )}
                      {showResult && isSelected && !isCorrect && (
                        <XCircle className="w-6 h-6 text-red-600" />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Explanation */}
            {showExplanation && (
              <div className={`p-4 rounded-xl mb-6 ${
                selectedAnswer === currentQuestion.correctAnswer
                  ? 'bg-green-50 dark:bg-green-900/20 border-2 border-green-500'
                  : 'bg-red-50 dark:bg-red-900/20 border-2 border-red-500'
              }`}>
                <p className="font-medium text-gray-900 dark:text-gray-100 mb-2">
                  {selectedAnswer === currentQuestion.correctAnswer ? '✅ Correto!' : '❌ Incorreto'}
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  {currentQuestion.explanation}
                </p>
              </div>
            )}

            {/* Actions */}
            {!showExplanation ? (
              <button
                onClick={handleSubmitAnswer}
                disabled={selectedAnswer === null}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-lg font-bold text-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Confirmar Resposta
              </button>
            ) : (
              <button
                onClick={handleNextQuestion}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-lg font-bold text-lg hover:shadow-xl transition-all flex items-center justify-center space-x-2"
              >
                <span>{isLastQuestion ? 'Ver Resultado' : 'Próxima Pergunta'}</span>
                <ArrowRight className="w-6 h-6" />
              </button>
            )}
          </div>
        )}

        {/* Result Step */}
        {step === 'result' && (
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg text-center">
            <Trophy className={`w-20 h-20 mx-auto mb-6 ${
              score >= 70 ? 'text-yellow-500' : 'text-gray-400'
            }`} />
            
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
              {score >= 70 ? 'Parabéns! 🎉' : 'Continue Praticando! 💪'}
            </h2>
            
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
              Você acertou {correctAnswers} de {totalQuestions} perguntas
            </p>

            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white mb-8">
              <p className="text-sm opacity-90 mb-2">Recompensas</p>
              <div className="flex items-center justify-center space-x-6">
                <div>
                  <p className="text-3xl font-bold">+{lesson.xpReward}</p>
                  <p className="text-sm opacity-90">XP</p>
                </div>
                <div className="w-px h-12 bg-white/30" />
                <div>
                  <p className="text-3xl font-bold">+{lesson.coinsReward}</p>
                  <p className="text-sm opacity-90">Moedas</p>
                </div>
              </div>
            </div>

            {lesson.taskGenerated && (
              <div className="bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-500 rounded-xl p-6 mb-6 text-left">
                <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-2">
                  📋 Tarefa Liberada!
                </h3>
                <p className="text-gray-700 dark:text-gray-300 mb-1">
                  {lesson.taskGenerated.title}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {lesson.taskGenerated.description}
                </p>
              </div>
            )}

            <button
              onClick={handleComplete}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-lg font-bold text-lg hover:shadow-xl transition-all"
            >
              Continuar para Próxima Aula
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
