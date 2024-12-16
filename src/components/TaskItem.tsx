import React from 'react';
import { Task } from '../types';
import { Check, Trash2, Clock, Edit2 } from 'lucide-react';

interface TaskItemProps {
  task: Task;
  onToggle: () => void;
  onDelete: () => void;
  onEdit: () => void;
}

export const TaskItem: React.FC<TaskItemProps> = ({
  task,
  onToggle,
  onDelete,
  onEdit,
}) => {
  return (
    <div className="group animate-fadeIn transform transition-all duration-200 hover:scale-[1.01]">
      <div className="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <button
            onClick={onToggle}
            className={`w-5 h-5 rounded-full border transition-colors duration-200 ${
              task.completed
                ? 'bg-green-500 border-green-500 hover:bg-green-600'
                : 'border-gray-300 hover:border-green-500'
            } flex items-center justify-center`}
          >
            {task.completed && <Check className="w-3 h-3 text-white" />}
          </button>
          
          <div className="flex-1 min-w-0">
            <span
              className={`block truncate ${
                task.completed
                  ? 'line-through text-gray-400'
                  : 'text-gray-700'
              }`}
            >
              {task.title}
            </span>
            {task.dueDate && (
              <span className="flex items-center gap-1 text-xs text-gray-400 mt-1">
                <Clock className="w-3 h-3" />
                {new Date(task.dueDate).toLocaleDateString(undefined, {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={onEdit}
            className="p-1 text-gray-400 hover:text-blue-500 transition-colors"
            title="Edit task"
          >
            <Edit2 className="w-4 h-4" />
          </button>
          <button
            onClick={onDelete}
            className="p-1 text-gray-400 hover:text-red-500 transition-colors"
            title="Delete task"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};