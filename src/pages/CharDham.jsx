import React, { useState } from 'react';

import Description from '../components/CharDham/Description';
import Calendar from '../components/OneDayDoDham/Calander';
import SubmitSection from '../components/OneDayDoDham/SubmitSection';
import OneBanner from '../components/CharDham/OneBanner';

const DooDhamOneDay = () => {
  const [selectedDate, setSelectedDate] = useState(null);



  return (
    <>
      <OneBanner />
      <Description />
      {/* Calendar passes selected date and uses tripType "one-day" */}
      <Calendar onDateSelect={setSelectedDate} tripType="char-dham" />
      {/* SubmitSection uses the same selected date and tripType */}
      <SubmitSection 
        selectedDate={selectedDate} 
        onDateChange={setSelectedDate} 
        tripType="char-dham" 
      />
    </>
  );
};

export default DooDhamOneDay;