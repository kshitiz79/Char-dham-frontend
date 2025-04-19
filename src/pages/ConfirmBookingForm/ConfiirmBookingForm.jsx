import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Summery } from './Summery';
import Header from './Header';
import TravelDetails from './TravelDetails';
import PassengerList from './PassengerList';
import SubmitButton from './SubmitButton';
import MessageDisplay from './MessageDisplay';

const ConfirmBookingForm = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const passengers = state?.passengers || [];
  const travelDate = state?.travelDate || null;
  const tripType = state?.tripType || 'multi-day';
  const totalCost = tripType === 'one-day'
    ? 1100000
    : tripType === 'char-dham'
      ? 1800000
      : 1500000;

  const [formData, setFormData] = useState(
    passengers.map(p => ({
      name: p.name,
      weight: p.weight,
      phone: '',
      email: '',
      age: '',
      idType: '',
      idDocument: null,
    }))
  );
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000';

  const handleInputChange = (index, field, value) => {
    setFormData(prev => {
      const copy = [...prev];
      copy[index] = { ...copy[index], [field]: value };
      return copy;
    });
  };

  const handleFileChange = (index, file) => {
    setFormData(prev => {
      const copy = [...prev];
      copy[index] = { ...copy[index], idDocument: file };
      return copy;
    });
  };

  // Dynamically load Razorpay SDK
  const loadRazorpayScript = () => new Promise(resolve => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });

  const validateForm = () => {
    for (const p of formData) {
      if (!p.phone || !p.email || !p.age || !p.idType || !p.idDocument) {
        setMessage('Please fill in all required fields and upload ID for each passenger.');
        return false;
      }
    }
    return true;
  };

  const submitBooking = async () => {
    const payload = new FormData();
    payload.append('bookingDate', travelDate ? travelDate.toISOString().split('T')[0] : '');
    payload.append('tripType', tripType);
    payload.append('totalCost', totalCost);
    formData.forEach((p, i) => {
      payload.append(`passengers[${i}][name]`, p.name);
      payload.append(`passengers[${i}][weight]`, p.weight);
      payload.append(`passengers[${i}][phone]`, p.phone);
      payload.append(`passengers[${i}][email]`, p.email);
      payload.append(`passengers[${i}][age]`, p.age);
      payload.append(`passengers[${i}][idType]`, p.idType);
      if (p.idDocument) payload.append(`passengers[${i}][idDocument]`, p.idDocument);
    });

    try {
      const resp = await fetch(`${apiUrl}/customers`, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: payload,
      });

      if (!resp.ok) {
        const errText = await resp.text();
        throw new Error(errText || `Booking failed (HTTP ${resp.status})`);
      }

      const contentType = resp.headers.get('content-type') || '';
      if (!contentType.includes('application/json')) {
        const raw = await resp.text();
        throw new Error('Expected JSON but got: ' + raw);
      }

      const data = await resp.json();
      if (data.status !== 'success' || !data.data) {
        throw new Error(data.message || 'Unexpected server response');
      }

      const { pnr, bookings, email_sent, whatsapp_sent } = data.data;
      let msg = `Booking successful! PNR: ${pnr}. `;
      msg += email_sent ? 'Email sent. ' : 'Email failed. ';
      msg += whatsapp_sent ? 'WhatsApp sent.' : 'WhatsApp failed.';
      setMessage(msg);
      navigate('/booking-success', { state: { formData, travelDate, tripType, pnr, bookings, email_sent, whatsapp_sent } });

    } catch (err) {
      console.error(err);
      setMessage(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handlePayment = async e => {
    e?.preventDefault();
    setMessage('');
    if (!validateForm()) return;
    setLoading(true);

    try {
      const orderRes = await fetch(`${apiUrl}/create-order`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: totalCost }),
      });

      if (!orderRes.ok) {
        const errText = await orderRes.text();
        throw new Error(errText || `Order creation failed (HTTP ${orderRes.status})`);
      }

      const contentType = orderRes.headers.get('content-type') || '';
      if (!contentType.includes('application/json')) {
        const raw = await orderRes.text();
        throw new Error('Expected JSON but got: ' + raw);
      }

      const orderData = await orderRes.json();
      const loaded = await loadRazorpayScript();
      if (!loaded) throw new Error('Failed to load payment SDK');

      const options = {
        key: orderData.key,
        amount: orderData.amount,
        currency: orderData.currency,
        order_id: orderData.orderId,
        name: 'Lucky Medicals',
        description: 'Trip Booking',
        prefill: { email: formData[0].email, contact: formData[0].phone },
        handler: submitBooking,
        theme: { color: '#4f46e5' },
      };

      new window.Razorpay(options).open();

    } catch (err) {
      console.error(err);
      setMessage(`Error: ${err.message}`);
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
            <form onSubmit={handlePayment} className="space-y-7">
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