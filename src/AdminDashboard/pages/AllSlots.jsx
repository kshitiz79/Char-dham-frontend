import React, { useEffect, useState } from 'react';

const AllSlots = () => {
  const [tripType, setTripType] = useState('multi-day');
  const [slots, setSlots] = useState({});
  const [currentDate, setCurrentDate] = useState(new Date());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000';

  const fetchBookings = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${apiUrl}/bookings`);
      if (!response.ok) {
        throw new Error(`Failed to fetch bookings: ${response.statusText}`);
      }
      const bookings = await response.json();
      const filtered = bookings.filter(b => b.trip_type === tripType);
      const map = {};
      filtered.forEach(booking => {
        map[booking.booking_date] = booking;
      });
      setSlots(map);
    } catch (err) {
      console.error('Fetch error:', err);
      setError('Failed to load booking slots. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, [tripType]);

  const getMonthDates = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const first = new Date(year, month, 1);
    const start = new Date(first);
    start.setDate(start.getDate() - first.getDay());
    const dates = [];
    while (dates.length < 42) {
      dates.push(new Date(start));
      start.setDate(start.getDate() + 1);
    }
    return dates;
  };

  const formatCell = date => {
    const iso = date.toISOString().split('T')[0];
    const booking = slots[iso];
    if (!booking) return 'bg-gray-50';
    return booking.seats > 0 
      ? 'bg-green-100 hover:bg-green-200 border-green-300'
      : 'bg-red-50 hover:bg-red-100 border-red-200';
  };

  const navigateMonth = dir => {
    const next = new Date(currentDate);
    next.setMonth(next.getMonth() + dir);
    setCurrentDate(next);
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const handleDeleteSlot = async (bookingDate) => {
    const booking = slots[bookingDate];
    if (!booking) return;

    if (!window.confirm(`Delete booking slot for ${bookingDate}?`)) return;

    try {
      const response = await fetch(`${apiUrl}/bookings/${booking.id}`, {
        method: 'DELETE',
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || 'Unknown error');
      }

      // Optimistically update the UI
      setSlots(prev => {
        const newSlots = { ...prev };
        delete newSlots[bookingDate];
        return newSlots;
      });
    } catch (error) {
      console.error('Error deleting booking slot:', error);
      alert(`Could not delete booking slot: ${error.message}`);
      // Refetch to ensure UI consistency
      await fetchBookings();
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
        Available Trip Slots
      </h1>

      {/* Trip Type Buttons */}
      <div className="flex justify-center mb-8 space-x-4">
        {['multi-day', 'one-day', 'char-dham'].map(type => (
          <button
            key={type}
            className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105
              ${tripType === type 
                ? 'bg-blue-600 text-white shadow-lg' 
                : 'bg-white text-gray-600 border border-gray-300 hover:bg-gray-50'}`}
            onClick={() => setTripType(type)}
          >
            {type === 'multi-day' ? 'Multi-Day Trips' : type === 'one-day' ? 'One-Day Trips' : 'Char Dham Trips'}
          </button>
        ))}
      </div>

      {/* Error State */}
      {error && (
        <div className="text-center py-4 text-red-600">
          {error}
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="text-center py-4">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
          <span className="ml-2 text-gray-600">Loading availability...</span>
        </div>
      )}

      {/* Month Navigation */}
      <div className="flex justify-between items-center mb-6 bg-white rounded-lg shadow-md p-4">
        <button 
          onClick={() => navigateMonth(-1)}
          className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
        >
          <span className="text-2xl text-gray-600">‹</span>
        </button>
        <h2 className="text-2xl font-semibold text-gray-800">
          {`${monthNames[currentDate.getMonth()]} ${currentDate.getFullYear()}`}
        </h2>
        <button 
          onClick={() => navigateMonth(1)}
          className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
        >
          <span className="text-2xl text-gray-600">›</span>
        </button>
      </div>

      {/* Calendar Grid */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="grid grid-cols-7 gap-px bg-gray-200">
  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
    <div 
      key={day} 
      className="p-3 text-center font-semibold text-gray-600 bg-gray-50"
    >
      {day}
    </div>
  ))}
</div>

        <div className="grid grid-cols-7 gap-px bg-gray-200">
          {getMonthDates().map((date, i) => {
            const iso = date.toISOString().split('T')[0];
            return (
              <div
                key={i}
                className={`p-4 h-24 flex flex-col items-center justify-center transition-all duration-200 border
                  ${date.getMonth() === currentDate.getMonth() 
                    ? 'text-gray-800' 
                    : 'text-gray-400 bg-gray-100'}
                  ${formatCell(date)}`}
              >
                <span className="text-lg font-medium">{date.getDate()}</span>
                {slots[iso] && (
                  <button 
                    className="mt-2 text-xs text-red-600 hover:text-red-800"
                    onClick={() => handleDeleteSlot(iso)}
                  >
                    Delete Slot
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Legend */}
      <div className="flex justify-center mt-6 space-x-6 text-sm">
        <div className="flex items-center">
          <div className="w-4 h-4 bg-green-100 border border-green-300 mr-2"></div>
          <span>Available</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-red-50 border border-red-200 mr-2"></div>
          <span>Booked</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-gray-50 mr-2"></div>
          <span>No Data</span>
        </div>
      </div>
    </div>
  );
};

export default AllSlots;