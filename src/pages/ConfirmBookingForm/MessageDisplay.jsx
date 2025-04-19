
import React from 'react';

const MessageDisplay = ({ message }) => {
  if (!message) return null;

  return (
    <p
      className={`mt-4 text-center font-medium ${
        message.includes('successful') ? 'text-green-600' : 'text-red-600'
      } animate-fade-in`}
    >
      {message}
    </p>
  );
};

export default MessageDisplay;
