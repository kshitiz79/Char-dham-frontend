
import React from 'react';

const SubmitButton = ({ loading }) => {
  return (
    <button
      type="submit"
      disabled={loading}
      className={`w-full py-3  bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-lg shadow-lg transition-all duration-300
        ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:from-indigo-700 hover:to-purple-700 transform hover:scale-105'}`}
    >
      {loading ? 'Processing...' : 'Confirm Booking'}
    </button>
  );
};

export default SubmitButton;