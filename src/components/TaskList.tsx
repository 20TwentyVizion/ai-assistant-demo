import React, { useState } from 'react';
import { Task } from '../types';
import { TaskItem } from './TaskItem';
import { ClipboardList, Plus } from 'lucide-react';

interface TaskListProps {
  tasks: Task[];
  onToggleTask: (taskId: string) => void;
  onDeleteTask: (taskId: string) => void;
  onEditTask?: (task: Task) => void;
}

export const TaskList: React.FC<TaskListProps> = ({
  tasks,
  onToggleTask,
  onDeleteTask,
  onEditTask,
}) => {
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');
  
  const filteredTasks = tasks.filter((task) => {
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  });

  const activeTasks = tasks.filter((task) => !task.completed).length;
  const completedTasks = tasks.length - activeTasks;

  return (
    <div className="border-t border-gray-100 bg-gray-50">
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <ClipboardList className="w-5 h-5 text-blue-500" />
            <h2 className="text-lg font-semibold text-gray-800">Tasks</h2>
            <span className="text-sm text-gray-500">
              ({activeTasks} active, {completedTasks} completed)
            </span>
          </div>
          
          <div className="flex gap-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1 text-sm rounded-full transition-colors ${
                filter === 'all'
                  ? 'bg-blue-500 text-white'
                  : 'text-gray-600 hover:bg-gray-200'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilter('active')}
              className={`px-3 py-1 text-sm rounded-full transition-colors ${
                filter === 'active'
                  ? 'bg-blue-500 text-white'
                  : 'text-gray-600 hover:bg-gray-200'
              }`}
            >
              Active
            </button>
            <button
              onClick={() => setFilter('completed')}
              className={`px-3 py-1 text-sm rounded-full transition-colors ${
                filter === 'completed'
                  ? 'bg-blue-500 text-white'
                  : 'text-gray-600 hover:bg-gray-200'
              }`}
            >
              Completed
            </button>
          </div>
        </div>

        <div className="space-y-2">
          {filteredTasks.length > 0 ? (
            filteredTasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onToggle={() => onToggleTask(task.id)}
                onDelete={() => onDeleteTask(task.id)}
                onEdit={() => onEditTask?.(task)}
              />
            ))
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500">No tasks found</p>
              {filter !== 'all' && (
                <button
                  onClick={() => setFilter('all')}
                  className="text-blue-500 hover:text-blue-600 text-sm mt-2"
                >
                  Show all tasks
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};