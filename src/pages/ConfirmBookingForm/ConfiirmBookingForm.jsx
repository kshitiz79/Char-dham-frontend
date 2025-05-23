import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { Summery } from './Summery';
import Header from './Header';
import TravelDetails from './TravelDetails';
import PassengerList from './PassengerList';
import SubmitButton from './SubmitButton';
import MessageDisplay from './MessageDisplay';

// Utility function to format date to YYYY-MM-DD in IST
const formatDateToYYYYMMDD = (dateInput) => {
  const offset = 5.5 * 60; // IST is UTC+05:30 (330 minutes)
  const utcDate = new Date(dateInput.getTime() + dateInput.getTimezoneOffset() * 60000);
  const istDate = new Date(utcDate.getTime() + offset * 60000);
  return format(istDate, 'yyyy-MM-dd');
};

const ConfirmBookingForm = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const passengers = state?.passengers || [];
  const travelDate = state?.travelDate || null;
  const tripType = state?.tripType || 'multi-day';
  const totalCost = tripType === 'one-day' ? 1100000 : tripType === 'char-dham' ? 1800000 : 1500000;

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

  // Check for successful payment redirect
  useEffect(() => {
    const pendingBooking = localStorage.getItem('pendingBooking');
    if (pendingBooking && window.location.pathname.includes('/booking-success')) {
      setMessage('Booking submitted successfully! Check your email or WhatsApp for confirmation.');
      localStorage.removeItem('pendingBooking'); // Clear pending booking
    }
  }, []);

  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000';

  const handleInputChange = (index, field, value) => {
    setFormData((prev) => {
      const copy = [...prev];
      copy[index] = { ...copy[index], [field]: value };
      return copy;
    });
  };

  const handleFileChange = (index, file) => {
    setFormData((prev) => {
      const copy = [...prev];
      copy[index] = { ...copy[index], idDocument: file };
      return copy;
    });
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
      const formattedBookingDate = formatDateToYYYYMMDD(travelDate);

      const bookingData = {
        bookingDate: formattedBookingDate,
        tripType,
        totalCost,
        passengers: formData.map((p) => ({
          name: p.name,
          weight: p.weight,
          phone: p.phone,
          email: p.email,
          date_of_birth: p.date_of_birth,
          gender: p.gender,
          idType: p.idType,
        })),
      };

      // Use ngrok URLs for local testing
      const baseUrl = import.meta.env.VITE_API_URL || 'https://abcd1234.ngrok.io'; // Backend ngrok URL
      const redirectUrl = import.meta.env.VITE_PUBLIC_URL
        ? `${import.meta.env.VITE_PUBLIC_URL}/chardham/booking-success`
        : 'https://efgh5678.ngrok.io/chardham/booking-success'; // Frontend ngrok URL

      const orderRes = await fetch(`${baseUrl}/create-phonepe-transaction`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: totalCost,
          redirectUrl,
          callbackUrl: `${baseUrl}/phonepe-callback`,
          mobileNumber: formData[0]?.phone || '9999999999',
          bookingData,
        }),
      });

      if (!orderRes.ok) {
        const contentType = orderRes.headers.get('content-type') || '';
        let errMsg = `PhonePe transaction failed (HTTP ${orderRes.status})`;
        if (contentType.includes('application/json')) {
          const errData = await orderRes.json();
          errMsg = errData.message || errMsg;
        } else {
          const errText = await orderRes.text();
          errMsg = errText || errMsg;
        }
        throw new Error(errMsg);
      }

      const { paymentUrl, transactionId } = await orderRes.json();
      if (!paymentUrl) throw new Error('No payment URL returned');

      localStorage.setItem('pendingBooking', JSON.stringify({
        formData,
        travelDate: formattedBookingDate,
        tripType,
        totalCost,
        transactionId,
      }));

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
          <div className="md:col-span-3 h-auto">
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