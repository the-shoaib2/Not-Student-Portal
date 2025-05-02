import React, { Suspense, useState, useEffect } from 'react';
import { Skeleton } from '../components/Skeleton';

// Calendar event type definition
interface CalendarEvent {
  id: number;
  title: string;
  date: string;
  type: 'academic' | 'exam' | 'holiday';
}

// Component to display calendar content
const CalendarContent: React.FC = () => {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [loading, setLoading] = useState(true);

  // Simulate data loading
  useEffect(() => {
    // Simulate API call delay
    const timer = setTimeout(() => {
      // Mock data
      const mockEvents: CalendarEvent[] = [
        { id: 1, title: 'Fall Semester Begins', date: '2023-09-01', type: 'academic' },
        { id: 2, title: 'Midterm Exams', date: '2023-10-15', type: 'exam' },
        { id: 3, title: 'Winter Break', date: '2023-12-20', type: 'holiday' },
        { id: 4, title: 'Spring Semester Begins', date: '2024-01-15', type: 'academic' },
        { id: 5, title: 'Final Exams', date: '2024-05-01', type: 'exam' },
      ];
      
      setEvents(mockEvents);
      setLoading(false);
    }, 1500); // 1.5 second delay to simulate loading

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <CalendarSkeleton />;
  }

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4 text-center">Academic Calendar</h2>
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="grid grid-cols-3 bg-gray-100 p-3 font-semibold text-gray-700">
          <div>Event</div>
          <div>Date</div>
          <div>Type</div>
        </div>
        {events.map((event) => (
          <div key={event.id} className="grid grid-cols-3 p-3 border-b hover:bg-gray-50">
            <div className="font-medium">{event.title}</div>
            <div>{event.date}</div>
            <div>
              <span 
                className={`px-2 py-1 rounded-full text-xs ${event.type === 'academic' ? 'bg-blue-100 text-blue-800' : 
                  event.type === 'exam' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}
              >
                {event.type}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Skeleton loader for calendar
const CalendarSkeleton: React.FC = () => (
  <div className="p-6">
    <Skeleton className="h-8 w-64 mx-auto mb-4" />
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="grid grid-cols-3 bg-gray-100 p-3">
        <Skeleton className="h-6 w-20" />
        <Skeleton className="h-6 w-20" />
        <Skeleton className="h-6 w-20" />
      </div>
      {[...Array(5)].map((_, index) => (
        <div key={index} className="grid grid-cols-3 p-3 border-b">
          <Skeleton className="h-6 w-40" />
          <Skeleton className="h-6 w-24" />
          <Skeleton className="h-6 w-16" />
        </div>
      ))}
    </div>
  </div>
);

// Main Calendar component with Suspense
const Calendar: React.FC = () => {
  return (
    <Suspense fallback={<CalendarSkeleton />}>
      <CalendarContent />
    </Suspense>
  );
};

export default Calendar;