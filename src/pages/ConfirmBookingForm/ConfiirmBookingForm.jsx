import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { format } from 'date-fns';
import { Summery } from './Summery';
import Header from './Header';
import TravelDetails from './TravelDetails';
import PassengerList from './PassengerList';
import SubmitButton from './SubmitButton';
import MessageDisplay from './MessageDisplay';

const formatDateToYYYYMMDD = (dateInput) => {
  const offset = 5.5 * 60; // IST offset in minutes
  const utcDate = new Date(dateInput.getTime() + dateInput.getTimezoneOffset() * 60000);
  const istDate = new Date(utcDate.getTime() + offset * 60000);
  return format(istDate, 'yyyy-MM-dd');
};

const ConfirmBookingForm = () => {
  const { state } = useLocation();

  const passengers = state?.passengers || [];
  const travelDate = state?.travelDate || null;
  const tripType = state?.tripType || 'multi-day';

  const basePrice =
    tripType === 'one-day' ? 1350000
    : tripType === 'char-dham' ? 1800000
    : 1500000;

  const gstRate = 0.18;
  const totalCost = Math.round(basePrice * (1 + gstRate));

  const [formData, setFormData] = useState(
    passengers.map((p) => ({
      name: p.name,
      weight: p.weight,
      phone: '',
      email: '',
      date_of_birth: '',
      gender: '',
      idType: '',
      idDocument: null,
    }))
  );

  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const pendingBooking = localStorage.getItem('pendingBooking');
    if (pendingBooking && window.location.pathname.includes('/booking-success')) {
      setMessage(
        'Booking submitted successfully! Check your email or WhatsApp for confirmation.'
      );
      localStorage.removeItem('pendingBooking');
    }
  }, []);

  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000';
  const publicUrl = import.meta.env.VITE_PUBLIC_URL || 'http://localhost:5173';

  const handleInputChange = (index, field, value) => {
    setFormData((prev) =>
      prev.map((item, i) => (i === index ? { ...item, [field]: value } : item))
    );
  };

  const handleFileChange = (index, file) => {
    setFormData((prev) =>
      prev.map((item, i) => (i === index ? { ...item, idDocument: file } : item))
    );
  };

  const validateForm = () => {
    for (const p of formData) {
      if (!p.phone || !p.email || !p.date_of_birth || !p.idType || !p.idDocument) {
        setMessage('Please fill in all required fields and upload ID for each passenger.');
        return false;
      }
    }
    return true;
  };

  const handlePhonePePayment = async (e) => {
    e.preventDefault();
    setMessage('');
    if (!validateForm()) return;

    setLoading(true);

    try {
      if (!travelDate) throw new Error('Travel date is required');

      const formattedDate = formatDateToYYYYMMDD(travelDate);

      const bookingData = {
        bookingDate: formattedDate,
        tripType,
        totalCost,
        passengers: formData.map(({ name, weight, phone, email, date_of_birth, gender, idType }) => ({
          name,
          weight,
          phone,
          email,
          date_of_birth,
          gender,
          idType,
        })),
      };

      const response = await fetch(`${apiUrl}/create-phonepe-transaction`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: totalCost,
          redirectUrl: `${publicUrl}/chardham/booking-success`,
          callbackUrl: `${apiUrl}/phonepe-callback`,
          mobileNumber: formData[0]?.phone || '9999999999',
          bookingData,
        }),
      });

      if (!response.ok) {
        const isJson = response.headers.get('content-type')?.includes('application/json');
        const errorData = isJson ? await response.json() : await response.text();
        throw new Error(
          typeof errorData === 'string' ? errorData : errorData.message || 'Payment error'
        );
      }

      const { paymentUrl, transactionId } = await response.json();
      if (!paymentUrl) throw new Error('No payment URL returned from backend');

      localStorage.setItem(
        'pendingBooking',
        JSON.stringify({ formData, travelDate: formattedDate, tripType, totalCost, transactionId })
      );

      window.location.href = paymentUrl;
    } catch (err) {
      console.error('PhonePe error:', err);
      setMessage(`Payment error: ${err.message}`);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <Header />
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          <div className="md:col-span-3">
            <Summery travelDate={travelDate} tripType={tripType} passengers={passengers} />
          </div>
          <div className="md:col-span-2 bg-blue-50 rounded-xl shadow-lg p-6">
            <form onSubmit={handlePhonePePayment} className="space-y-7" encType="multipart/form-data">
              <TravelDetails travelDate={travelDate} totalCost={totalCost} />
              <PassengerList
                formData={formData}
                onInputChange={handleInputChange}
                onFileChange={handleFileChange}
              />
              <SubmitButton loading={loading} />
            </form>
            <MessageDisplay message={message} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmBookingForm;
