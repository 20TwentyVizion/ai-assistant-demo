import React, { useState } from 'react';
import { Task } from '../../types';
import { TaskItem } from './TaskItem';
import { TaskListHeader } from './TaskListHeader';
import { CollapsedTaskBar } from './CollapsedTaskBar';
import { ThemeType } from '../../types/settings';

interface TaskListProps {
  tasks: Task[];
  onToggleTask: (taskId: string) => void;
  onDeleteTask: (taskId: string) => void;
  onEditTask?: (task: Task) => void;
  theme?: ThemeType;
}

export const TaskList: React.FC<TaskListProps> = ({
  tasks,
  onToggleTask,
  onDeleteTask,
  onEditTask,
  theme = 'light',
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const isDark = theme === 'dark';
  
  const activeTasks = tasks.filter((task) => !task.completed).length;
  const completedTasks = tasks.length - activeTasks;

  return (
    <div className={`border-t ${isDark ? 'border-gray-700' : 'border-gray-100'}`}>
      {isCollapsed ? (
        <CollapsedTaskBar
          onExpand={() => setIsCollapsed(false)}
          activeTasks={activeTasks}
          theme={theme}
        />
      ) : (
        <div className="animate-expandVertical">
          <TaskListHeader
            isCollapsed={isCollapsed}
            onToggle={() => setIsCollapsed(true)}
            activeTasks={activeTasks}
            completedTasks={completedTasks}
            theme={theme}
          />
          
          <div className="max-h-[300px] overflow-y-auto">
            <div className="p-4 space-y-2">
              {tasks.length > 0 ? (
                tasks.map((task) => (
                  <TaskItem
                    key={task.id}
                    task={task}
                    onToggle={() => onToggleTask(task.id)}
                    onDelete={() => onDeleteTask(task.id)}
                    onEdit={() => onEditTask?.(task)}
                    theme={theme}
                  />
                ))
              ) : (
                <div className="text-center py-8">
                  <p className={isDark ? 'text-gray-400' : 'text-gray-500'}>
                    No tasks found
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};