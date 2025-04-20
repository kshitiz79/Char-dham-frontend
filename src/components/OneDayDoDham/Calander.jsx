import React, { useEffect, useState } from 'react';

const Calendar = ({ onDateSelect, tripType = 'one-day' }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [view, setView] = useState('month');
  const [loading, setLoading] = useState(false);
  const [availability, setAvailability] = useState({});
  const [error, setError] = useState(null);

  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000';

  useEffect(() => {
    const month = currentDate.toISOString().slice(0, 7);
    setLoading(true);
    setError(null);
    fetch(`${apiUrl}/bookings?month=${month}&tripType=${tripType}`)
      .then(res => {
        if (!res.ok) throw new Error(`Failed to fetch bookings: ${res.statusText}`);
        return res.json();
      })
      .then(bookings => {
        const filtered = bookings.filter(b => b.trip_type === tripType);
        const map = {};
        filtered.forEach(({ booking_date, seats }) => {
          if (typeof seats === 'number' && seats >= 0) {
            map[booking_date] = seats;
          }
        });
        setAvailability(map);
      })
      .catch(err => {
        console.error('Error fetching bookings:', err);
        setError('Failed to load booking availability. Please try again.');
      })
      .finally(() => setLoading(false));
  }, [currentDate, tripType]);

  const timeSlots = Array.from({ length: 13 }, (_, i) => {
    const hour = i + 8;
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
    return `${hour12}:00 ${ampm}`;
  });

  const getWeekDates = () => {
    const start = new Date(currentDate);
    start.setDate(start.getDate() - start.getDay());
    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date(start);
      d.setDate(start.getDate() + i);
      return d;
    });
  };

  const getAvailabilityColor = (date) => {
    const iso = date.toISOString().split('T')[0];
    const seats = availability[iso];
    if (seats === 0) return 'bg-red-100'; // Fully booked
    if (typeof seats === 'number' && seats > 0) return 'bg-green-400'; // Available
    return 'bg-gray-200 opacity-50'; // Unavailable or no data
  };

  const isUnavailable = (date) => {
    const iso = date.toISOString().split('T')[0];
    const seats = availability[iso];
    return seats == null || seats <= 0;
  };

  const handleDateClick = (date) => {
    if (!isUnavailable(date)) {
      setSelectedDate(date);
      onDateSelect(date);
    }
  };

  const isSelected = (date) => selectedDate?.toDateString() === date.toDateString();
  const isCurrentMonth = (date) => date.getMonth() === currentDate.getMonth();

  const navigateMonth = (dir) => {
    const next = new Date(currentDate);
    next.setMonth(next.getMonth() + dir);
    setCurrentDate(next);
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const getMonthData = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const first = new Date(year, month, 1);
    const last = new Date(year, month + 1, 0);
    const start = new Date(first);
    start.setDate(first.getDate() - first.getDay());
    const end = new Date(last);
    end.setDate(last.getDate() + (6 - last.getDay()));
    const weeks = [];
    let day = new Date(start);
    while (day <= end) {
      const week = [];
      for (let i = 0; i < 7; i++) {
        week.push(new Date(day));
        day.setDate(day.getDate() + 1);
      }
      weeks.push(week);
    }
    return weeks;
  };

  const renderMonthView = () => (
    <div className="border border-gray-200 rounded-2xl shadow-xl bg-white overflow-hidden transform transition-all duration-500">
      {loading && (
        <div className="flex justify-center py-6">
          <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-blue-500"></div>
        </div>
      )}
      <div className="grid grid-cols-7 gap-px bg-gray-50">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div key={day} className="px-1 py-3 text-center text-xs font-semibold text-gray-700 bg-gradient-to-b from-gray-50 to-gray-100 sm:text-sm">
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-px bg-gray-100">
        {getMonthData().flat().map((date, idx) => {
          const unavailable = isUnavailable(date);
          const availabilityColor = getAvailabilityColor(date);
          return (
            <div
              key={idx}
              className={`
                p-1 min-h-[50px] sm:min-h-[70px] md:min-h-[90px] transition-all duration-300 ease-in-out transform hover:scale-105
                ${isCurrentMonth(date) ? 'text-gray-900' : 'text-gray-400'}
                ${availabilityColor}
                ${unavailable ? 'cursor-not-allowed' : 'cursor-pointer hover:shadow-md'}
                ${isSelected(date) ? 'ring-2 ring-indigo-500 ring-offset-2 bg-indigo-50' : ''}
              `}
              onClick={() => handleDateClick(date)}
              aria-label={`Date: ${date.toDateString()}, ${unavailable ? 'Unavailable' : 'Available'}`}
            >
              <span className={`
                w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center rounded-full mx-auto text-xs sm:text-sm font-semibold
                ${isSelected(date) ? 'bg-indigo-600 text-white' : 'text-gray-800'}
                ${unavailable ? 'opacity-60' : 'hover:bg-indigo-200 transition-colors duration-200'}
              `}>
                {date.getDate()}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );

  const renderWeekView = () => (
    <div className="border border-gray-200 rounded-2xl shadow-xl bg-white overflow-hidden transform transition-all duration-500">
      <div className="grid grid-cols-[50px_repeat(7,1fr)] sm:grid-cols-[80px_repeat(7,1fr)] divide-x divide-gray-100 bg-gradient-to-b from-gray-50 to-gray-100">
        <div className="px-1 py-2 text-xs font-semibold text-gray-700 sm:p-4 sm:text-sm">Time</div>
        {getWeekDates().map((date, i) => (
          <div key={i} className="px-1 py-2 text-center text-xs text-gray-900 font-semibold sm:p-4 sm:text-sm">
            <span className="hidden sm:inline">{date.toDateString().slice(0, 3)} </span>
            {date.getDate()}
          </div>
        ))}
      </div>
      <div className="divide-y divide-gray-100">
        {timeSlots.map((time) => (
          <div key={time} className="grid grid-cols-[50px_repeat(7,1fr)] sm:grid-cols-[80px_repeat(7,1fr)] divide-x divide-gray-100">
            <div className="px-1 py-2 text-xs text-gray-600 bg-gray-50 font-medium sm:p-4 sm:text-sm">{time}</div>
            {getWeekDates().map((date, i) => {
              const unavailable = isUnavailable(date);
              const availabilityColor = getAvailabilityColor(date);
              return (
                <div
                  key={i}
                  className={`
                    p-1 sm:p-4 transition-all duration-300 transform hover:scale-105 ${availabilityColor}
                    ${unavailable ? 'cursor-not-allowed opacity-60' : 'cursor-pointer hover:shadow-md'}
                    ${isSelected(date) ? 'ring-2 ring-indigo-500 ring-offset-2 bg-indigo-50' : ''}
                  `}
                  onClick={() => handleDateClick(date)}
                  aria-label={`Date: ${date.toDateString()} at ${time}, ${unavailable ? 'Unavailable' : 'Available'}`}
                />
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8 max-w-xl sm:max-w-3xl lg:max-w-7xl">
      <h1 className="text-2xl sm:text-3xl md:text-4xl text-center font-extrabold mb-6 sm:mb-8 bg-gradient-to-r from-indigo-600 to-teal-500 bg-clip-text text-transparent tracking-tight">
        Book Your Trip
      </h1>
      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-2 mb-4 rounded-r-lg text-center sm:p-4 sm:mb-6">
          {error}
        </div>
      )}
      <div className="bg-white rounded-2xl shadow-xl p-4 transform transition-all duration-500 hover:shadow-2xl sm:p-6 md:p-8">
        <div className="flex justify-between items-center mb-4 sm:mb-6">
          <div className="flex gap-2 sm:gap-4">
            <button
              className="px-3 py-1 text-xs bg-gradient-to-r from-indigo-600 to-indigo-700 text-white rounded-lg font-semibold hover:from-indigo-700 hover:to-indigo-800 transition-all duration-300 shadow-md hover:shadow-lg sm:px-5 sm:py-2 sm:text-sm"
              onClick={() => setCurrentDate(new Date())}
            >
              Today
            </button>
            <button
              className="p-2 hover:bg-gray-200 rounded-full transition-all duration-300 hover:shadow-md sm:p-3 hover:shadow-lg"
              onClick={() => navigateMonth(-1)}
              aria-label="Previous Month"
            >
              <svg className="w-5 h-5 text-gray-700 sm:w-7 sm:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              className="p-2 hover:bg-gray-200 rounded-full transition-all duration-300 hover:shadow-md sm:p-3 hover:shadow-lg"
              onClick={() => navigateMonth(1)}
              aria-label="Next Month"
            >
              <svg className="w-5 h-5 text-gray-700 sm:w-7 sm:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
          <h2 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-teal-500 bg-clip-text text-transparent sm:text-2xl md:text-3xl">
            {`${monthNames[currentDate.getMonth()]} ${currentDate.getFullYear()}`}
          </h2>
          <div className="flex gap-2 sm:gap-4">
            <button
              className={`
                px-3 py-1 text-xs rounded-lg font-semibold transition-all duration-300 shadow-md hover:shadow-lg
                ${view === 'month' ? 'bg-gradient-to-r from-indigo-600 to-indigo-700 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}
                sm:px-5 sm:py-2 sm:text-sm
              `}
              onClick={() => setView('month')}
            >
              Month
            </button>
            <button
              className={`
                px-3 py-1 text-xs rounded-lg font-semibold transition-all duration-300 shadow-md hover:shadow-lg
                ${view === 'week' ? 'bg-gradient-to-r from-indigo-600 to-indigo-700 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}
                sm:px-5 sm:py-2 sm:text-sm
              `}
              onClick={() => setView('week')}
            >
              Week
            </button>
          </div>
        </div>
        {view === 'month' ? renderMonthView() : renderWeekView()}
      </div>
    </div>
  );
};

export default Calendar;