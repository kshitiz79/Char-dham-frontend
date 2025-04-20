
import React from 'react';

const PassengerForm = ({ passenger, index, onInputChange, onFileChange }) => {
  const idOptions = [
    { value: '', label: 'Select ID Type' },
    { value: 'aadhar', label: 'Aadhar Card' },
    { value: 'pan', label: 'PAN Card' },
    { value: 'passport', label: 'Passport' },
    { value: 'voterid', label: 'Voter ID' },
  ];

  return (
    <div className="bg-gradient-to-r from-orange-50 to-indigo-50 p-4 rounded-lg shadow-md hover:shadow-lg transition-all h-96">
      <h3 className="text-lg font-semibold text-indigo-700 mb-2">
        Passenger {index + 1}
      </h3>
      <div className="space-y-3">
        {/* Name & Weight */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-medium text-gray-600">Name</label>
            <input
              type="text"
              value={passenger.name}
              disabled
              className="w-full p-2 bg-gray-100 text-gray-500 rounded-lg border border-gray-200"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600">Weight (kg)</label>
            <input
              type="number"
              value={passenger.weight}
              disabled
              className="w-full p-2 bg-gray-100 text-gray-500 rounded-lg border border-gray-200"
            />
          </div>
        </div>
        {/* Phone & Email */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-medium text-gray-600">Phone</label>
            <input
              type="tel"
              placeholder="e.g. +919876543210"
              value={passenger.phone}
              onChange={(e) => onInputChange(index, 'phone', e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600">Email</label>
            <input
              type="email"
              placeholder="e.g. user@example.com"
              value={passenger.email}
              onChange={(e) => onInputChange(index, 'email', e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
            />
          </div>
        </div>
        {/* Age & ID Type */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-medium text-gray-600">Age</label>
            <input
              type="number"
              placeholder="30"
              min="1"
              value={passenger.age}
              onChange={(e) => onInputChange(index, 'age', e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600">ID Type</label>
            <select
              value={passenger.idType}
              onChange={(e) => onInputChange(index, 'idType', e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
            >
              {idOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>
        {/* File Upload */}
        {passenger.idType && (
          <div>
            <label className="block text-xs font-medium text-gray-600">Upload ID Document</label>
            <input
              type="file"
              accept="image/jpeg,image/png,application/pdf"
              onChange={(e) => onFileChange(index, e.target.files[0])}
              required
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
            />
            {passenger.idDocument && (
              <p className="text-sm text-gray-600 mt-1">
                Selected: {passenger.idDocument.name}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PassengerForm;
