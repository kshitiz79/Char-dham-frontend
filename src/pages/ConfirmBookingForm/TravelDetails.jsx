
import React from 'react';

const TravelDetails = ({ travelDate, totalCost }) => {
  return (
    <> 
      <div>
        <label className="block text-sm font-semibold text-gray-700 m">
          Travel Date
        </label>
        <input
          type="text"
          value={travelDate ? travelDate.toLocaleDateString() : 'Not Selected'}
          disabled
          className="w-full p-3 bg-gray-100 text-gray-600 rounded-lg border border-gray-200 shadow-sm cursor-not-allowed"
        />
      </div>
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Total Cost
        </label>
        <input
          type="text"
          value={`₹${totalCost.toLocaleString('en-IN')}`}
          disabled
          className="w-full p-3 bg-gray-100 text-gray-600 rounded-lg border border-gray-200 shadow-sm cursor-not-allowed"
        />
      </div>
    </>
  );
};

export default TravelDetails;
