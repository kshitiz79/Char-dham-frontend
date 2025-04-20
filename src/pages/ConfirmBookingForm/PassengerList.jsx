
import React from 'react';
import PassengerForm from './PassengerForm';

const PassengerList = ({ formData, onInputChange, onFileChange }) => {
  return (
    <div className="space-y-4  overflow-y-auto pr-2">
      {formData.map((passenger, index) => (
        <PassengerForm
          key={index}
          passenger={passenger}
          index={index}
          onInputChange={onInputChange}
          onFileChange={onFileChange}
        />
      ))}
    </div>
  );
};

export default PassengerList;
