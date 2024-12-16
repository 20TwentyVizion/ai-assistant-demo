import React, { useState } from 'react';
import { addMonths, subMonths } from 'date-fns';
import { CalendarHeader } from './CalendarHeader';
import { CalendarGrid } from './CalendarGrid';
import { EventModal } from './EventModal';
import { EventsView } from './EventsView';
import { useCalendar } from '../../hooks/useCalendar';
import { useSettings } from '../../hooks/useSettings';
import { CalendarEvent } from '../../types/calendar';

interface CalendarProps {
  onClose?: () => void;
}

export const Calendar: React.FC<CalendarProps> = ({ onClose }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const [eventsViewMode, setEventsViewMode] = useState<'day' | 'month'>('day');
  
  const { settings } = useSettings();
  const { events, tasks, holidays, addEvent, syncWithGoogle } = useCalendar();

  const handlePrevMonth = () => setCurrentDate(subMonths(currentDate, 1));
  const handleNextMonth = () => setCurrentDate(addMonths(currentDate, 1));
  const handleToday = () => setCurrentDate(new Date());

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    setIsEventModalOpen(true);
  };

  const handleSaveEvent = async (event: Omit<CalendarEvent, 'id'>) => {
    await addEvent(event);
  };

  return (
    <div className="flex flex-col h-full bg-white dark:bg-gray-800">
      <CalendarHeader
        currentDate={currentDate}
        onPrevMonth={handlePrevMonth}
        onNextMonth={handleNextMonth}
        onToday={handleToday}
        onClose={onClose}
      />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-none">
          <CalendarGrid
            currentDate={currentDate}
            events={events}
            tasks={tasks}
            holidays={holidays}
            birthday={settings.profile.birthday}
            onSelectDate={handleDateSelect}
          />
        </div>

        <div className="flex items-center justify-between px-4 py-2 border-t border-gray-200 dark:border-gray-700">
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Events
          </h3>
          <div className="flex rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
            <button
              onClick={() => setEventsViewMode('day')}
              className={`px-3 py-1 text-sm ${
                eventsViewMode === 'day'
                  ? 'bg-blue-500 text-white'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300'
              }`}
            >
              Day
            </button>
            <button
              onClick={() => setEventsViewMode('month')}
              className={`px-3 py-1 text-sm ${
                eventsViewMode === 'month'
                  ? 'bg-blue-500 text-white'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300'
              }`}
            >
              Month
            </button>
          </div>
        </div>

        <EventsView
          currentDate={currentDate}
          events={events}
          tasks={tasks}
          holidays={holidays}
          viewMode={eventsViewMode}
        />
      </div>

      {selectedDate && (
        <EventModal
          isOpen={isEventModalOpen}
          onClose={() => setIsEventModalOpen(false)}
          onSave={handleSaveEvent}
          selectedDate={selectedDate}
        />
      )}
    </div>
  );
};