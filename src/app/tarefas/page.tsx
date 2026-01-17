'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Plus, Trash2, CheckCircle2 } from 'lucide-react';
import Navbar from '@/components/custom/navbar';
import { trails, mockUser } from '@/lib/data';
import { Task } from '@/lib/types';

export default function TarefasPage() {
  const user = mockUser;
  
  // Gerar tarefas das aulas completadas
  const initialTasks: Task[] = trails
    .flatMap(trail => trail.lessons)
    .filter(lesson => lesson.taskGenerated)
    .map(lesson => lesson.taskGenerated!)
    .map(task => ({
      ...task,
      status: user.completedTasks.includes(task.id) ? 'done' : 'todo'
    }));

  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [showNewTaskForm, setShowNewTaskForm] = useState(false);

  const handleAddTask = () => {
    if (!newTaskTitle.trim()) return;

    const newTask: Task = {
      id: `task-custom-${Date.now()}`,
      title: newTaskTitle,
      description: '',
      status: 'todo',
      priority: 'medium',
      xpReward: 20,
      coinsReward: 5,
      createdAt: new Date()
    };

    setTasks([...tasks, newTask]);
    setNewTaskTitle('');
    setShowNewTaskForm(false);
  };

  const handleMoveTask = (taskId: string, newStatus: Task['status']) => {
    setTasks(tasks.map(task =>
      task.id === taskId ? { ...task, status: newStatus } : task
    ));
  };

  const handleDeleteTask = (taskId: string) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const todoTasks = tasks.filter(t => t.status === 'todo');
  const doingTasks = tasks.filter(t => t.status === 'doing');
  const doneTasks = tasks.filter(t => t.status === 'done');

  const TaskCard = ({ task }: { task: Task }) => {
    const priorityColors = {
      low: 'border-gray-300 dark:border-gray-600',
      medium: 'border-yellow-400 dark:border-yellow-600',
      high: 'border-red-400 dark:border-red-600'
    };

    return (
      <div className={`bg-white dark:bg-gray-800 rounded-lg p-4 border-l-4 ${priorityColors[task.priority]} shadow-sm hover:shadow-md transition-all`}>
        <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-2">
          {task.title}
        </h3>
        {task.description && (
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
            {task.description}
          </p>
        )}
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 text-xs">
            <span className="text-blue-600 dark:text-blue-400 font-medium">
              +{task.xpReward} XP
            </span>
            <span className="text-yellow-600 dark:text-yellow-400 font-medium">
              +{task.coinsReward} moedas
            </span>
          </div>

          <div className="flex items-center space-x-2">
            {task.status === 'todo' && (
              <button
                onClick={() => handleMoveTask(task.id, 'doing')}
                className="text-xs bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 transition-colors"
              >
                Iniciar
              </button>
            )}
            {task.status === 'doing' && (
              <button
                onClick={() => handleMoveTask(task.id, 'done')}
                className="text-xs bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600 transition-colors"
              >
                Concluir
              </button>
            )}
            {task.status === 'done' && (
              <CheckCircle2 className="w-5 h-5 text-green-600" />
            )}
            <button
              onClick={() => handleDeleteTask(task.id)}
              className="text-gray-400 hover:text-red-600 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <Link
              href="/"
              className="inline-flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 mb-4"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Voltar ao Dashboard</span>
            </Link>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-gray-100">
              Minhas Tarefas
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Execute o que você aprendeu e transforme conhecimento em ação
            </p>
          </div>

          <button
            onClick={() => setShowNewTaskForm(!showNewTaskForm)}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg font-medium hover:shadow-lg transition-all flex items-center space-x-2"
          >
            <Plus className="w-5 h-5" />
            <span className="hidden sm:inline">Nova Tarefa</span>
          </button>
        </div>

        {/* New Task Form */}
        {showNewTaskForm && (
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg mb-8 border-2 border-blue-500">
            <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-4">
              Criar Nova Tarefa
            </h3>
            <div className="flex space-x-3">
              <input
                type="text"
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
                placeholder="Digite o título da tarefa..."
                className="flex-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                onKeyPress={(e) => e.key === 'Enter' && handleAddTask()}
              />
              <button
                onClick={handleAddTask}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                Adicionar
              </button>
              <button
                onClick={() => setShowNewTaskForm(false)}
                className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-6 py-2 rounded-lg font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              >
                Cancelar
              </button>
            </div>
          </div>
        )}

        {/* Kanban Board */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* A Fazer */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                A Fazer
              </h2>
              <span className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-full text-sm font-bold">
                {todoTasks.length}
              </span>
            </div>
            <div className="space-y-3">
              {todoTasks.length === 0 ? (
                <p className="text-gray-500 dark:text-gray-400 text-sm text-center py-8">
                  Nenhuma tarefa pendente
                </p>
              ) : (
                todoTasks.map(task => <TaskCard key={task.id} task={task} />)
              )}
            </div>
          </div>

          {/* Fazendo */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                Fazendo
              </h2>
              <span className="bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-full text-sm font-bold">
                {doingTasks.length}
              </span>
            </div>
            <div className="space-y-3">
              {doingTasks.length === 0 ? (
                <p className="text-gray-500 dark:text-gray-400 text-sm text-center py-8">
                  Nenhuma tarefa em andamento
                </p>
              ) : (
                doingTasks.map(task => <TaskCard key={task.id} task={task} />)
              )}
            </div>
          </div>

          {/* Feito */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                Feito
              </h2>
              <span className="bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 px-3 py-1 rounded-full text-sm font-bold">
                {doneTasks.length}
              </span>
            </div>
            <div className="space-y-3">
              {doneTasks.length === 0 ? (
                <p className="text-gray-500 dark:text-gray-400 text-sm text-center py-8">
                  Nenhuma tarefa concluída
                </p>
              ) : (
                doneTasks.map(task => <TaskCard key={task.id} task={task} />)
              )}
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl p-6 text-white">
            <p className="text-sm opacity-90 mb-1">Total de Tarefas</p>
            <p className="text-3xl font-bold">{tasks.length}</p>
          </div>
          <div className="bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl p-6 text-white">
            <p className="text-sm opacity-90 mb-1">Em Andamento</p>
            <p className="text-3xl font-bold">{doingTasks.length}</p>
          </div>
          <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl p-6 text-white">
            <p className="text-sm opacity-90 mb-1">Concluídas</p>
            <p className="text-3xl font-bold">{doneTasks.length}</p>
          </div>
        </div>
      </main>
    </div>
  );
}
