import React, { useState } from 'react';

import Description from '../components/DoDham/Description';
import Calendar from '../components/DoDham/Calander'; // Ensure the filename matches exactly
import SubmitSection from '../components/DoDham/SubmitSection';
import MultiBanner from '../components/DoDham/MultiBanner';

const DooDham = () => {
  const [selectedDate, setSelectedDate] = useState(null);

  return (
    <div className="bg-gray-100">
      <MultiBanner />
      <Description />
      {/* Pass selected date and tripType "multi-day" to Calendar */}
      <Calendar onDateSelect={setSelectedDate} tripType="multi-day" />
      {/* Pass the same values to SubmitSection */}
      <SubmitSection 
        selectedDate={selectedDate} 
        onDateChange={setSelectedDate} 
        tripType="multi-day" 
      />
    </div>
  );
};

export default DooDham;