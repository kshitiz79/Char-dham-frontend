
import React, { useState } from 'react';
import Description from '../components/EkDham/Description';
import Calendar from '../components/OneDayDoDham/Calander';
import SubmitSection from '../components/OneDayDoDham/SubmitSection';
import OneBanner from '../components/EkDham/OneBanner';

const DooDhamOneDay = () => {
  const [selectedDate, setSelectedDate] = useState(null);



  return (
    <>
      <OneBanner />
      <Description />

      <Calendar onDateSelect={setSelectedDate} tripType="ek-dham" />

      <SubmitSection 
        selectedDate={selectedDate} 
        onDateChange={setSelectedDate} 
        tripType="ek-dham" 
      />
    </>
  );
};

export default DooDhamOneDay;