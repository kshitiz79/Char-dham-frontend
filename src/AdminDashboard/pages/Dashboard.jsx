import React, { useEffect, useState } from 'react';
import { Bar, Pie, Line } from 'react-chartjs-2';
import 'chart.js/auto';

const Dashboard = () => {
  const [bookingData, setBookingData] = useState([]);
  const [customerData, setCustomerData] = useState([]);
  const [summary, setSummary] = useState({
    totalSlots: 0,
    totalOneDay: 0,
    totalMultiDay: 0,
    totalCharDham: 0,
    totalCustomers: 0,
    totalWeight: 0,
    oneDayPayments: 0,
    multiDayPayments: 0,
    charDhamPayments: 0,
    totalPayments: 0,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000';

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [bookingResponse, customerResponse] = await Promise.all([
        fetch(`${apiUrl}/bookings`),
        fetch(`${apiUrl}/customers`),
      ]);

      if (!bookingResponse.ok) throw new Error(`Failed to fetch bookings: ${bookingResponse.statusText}`);
      if (!customerResponse.ok) throw new Error(`Failed to fetch customers: ${customerResponse.statusText}`);

      const bookings = await bookingResponse.json();
      const customers = await customerResponse.json();

      setBookingData(bookings);
      setCustomerData(customers);

      // Calculate summary
      let totalOneDay = 0,
        totalMultiDay = 0,
        totalCharDham = 0,
        totalWeight = 0,
        oneDayPayments = 0,
        multiDayPayments = 0,
        charDhamPayments = 0,
        totalPayments = 0;

      bookings.forEach((booking) => {
        if (booking.trip_type === 'one-day') totalOneDay += booking.seats;
        else if (booking.trip_type === 'multi-day') totalMultiDay += booking.seats;
        else if (booking.trip_type === 'char-dham') totalCharDham += booking.seats;
      });

      totalWeight = customers.reduce((sum, c) => sum + (c.passengers.reduce((acc, p) => acc + (p.weight || 0), 0)), 0);

      // Calculate payment summaries
      customers.forEach((customerGroup) => {
        const cost = customerGroup.passengers.reduce((acc, p) => acc + (p.total_cost || 0), 0); // Sum total_cost for all passengers in group
        if (customerGroup.trip_type === 'one-day') oneDayPayments += cost;
        else if (customerGroup.trip_type === 'multi-day') multiDayPayments += cost;
        else if (customerGroup.trip_type === 'char-dham') charDhamPayments += cost;
        totalPayments += cost;
      });

      setSummary({
        totalSlots: bookings.length,
        totalOneDay,
        totalMultiDay,
        totalCharDham,
        totalCustomers: customers.length,
        totalWeight: Math.round(totalWeight),
        oneDayPayments: Math.round(oneDayPayments),
        multiDayPayments: Math.round(multiDayPayments),
        charDhamPayments: Math.round(charDhamPayments),
        totalPayments: Math.round(totalPayments),
      });
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Failed to load dashboard data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Bar Chart Data
  const dateMap = {};
  bookingData.forEach((booking) => {
    const date = booking.booking_date;
    if (!dateMap[date]) dateMap[date] = { oneDay: 0, multiDay: 0, charDham: 0 };
    if (booking.trip_type === 'one-day') dateMap[date].oneDay += booking.seats;
    else if (booking.trip_type === 'multi-day') dateMap[date].multiDay += booking.seats;
    else if (booking.trip_type === 'char-dham') dateMap[date].charDham += booking.seats;
  });

  const barData = {
    labels: Object.keys(dateMap).sort(),
    datasets: [
      {
        label: 'One-Day Slots',
        data: Object.values(dateMap).map((d) => d.oneDay),
        backgroundColor: 'rgba(75, 192, 192, 0.8)',
        borderRadius: 4,
      },
      {
        label: 'Multi-Day Slots',
        data: Object.values(dateMap).map((d) => d.multiDay),
        backgroundColor: 'rgba(153, 102, 255, 0.8)',
        borderRadius: 4,
      },
      {
        label: 'Char Dham Slots',
        data: Object.values(dateMap).map((d) => d.charDham),
        backgroundColor: 'rgba(255, 159, 64, 0.8)',
        borderRadius: 4,
      },
    ],
  };

  // Pie Chart Data
  const pieData = {
    labels: ['One-Day', 'Multi-Day', 'Char Dham'],
    datasets: [
      {
        data: [summary.totalOneDay, summary.totalMultiDay, summary.totalCharDham],
        backgroundColor: ['#4BC0C0', '#9966FF', '#FF9F40'],
        hoverOffset: 4,
      },
    ],
  };

  // Line Chart Data for Customer Weight Trends
  const weightMap = {};
  customerData.forEach((c) => {
    const date = c.booking_date;
    weightMap[date] = (weightMap[date] || 0) + c.passengers.reduce((acc, p) => acc + (p.weight || 0), 0);
  });

  const lineData = {
    labels: Object.keys(weightMap).sort(),
    datasets: [
      {
        label: 'Total Weight (kg)',
        data: Object.values(weightMap),
        borderColor: '#FF6384',
        tension: 0.4,
        fill: true,
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: { legend: { position: 'top' } },
    animation: { duration: 1000, easing: 'easeOutQuart' },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-extrabold text-center mb-12 text-gray-800 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          Admin Dashboard
        </h1>

        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded-r-lg text-center">
            {error}
          </div>
        )}

        {loading ? (
          <div className="text-center text-xl text-gray-600 animate-pulse">Loading dashboard data...</div>
        ) : (
          <>
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 gap-6 mb-12">
              {[
                { title: 'Total Slots', value: summary.totalSlots, color: 'indigo' },
                { title: 'One-Day', value: summary.totalOneDay, color: 'cyan' },
                { title: 'Multi-Day', value: summary.totalMultiDay, color: 'purple' },
                { title: 'Char Dham', value: summary.totalCharDham, color: 'orange' },
                { title: 'Customers', value: summary.totalCustomers, color: 'pink' },
                { title: 'Total Weight (kg)', value: summary.totalWeight, color: 'rose' },
                { title: 'One-Day Payments', value: `₹${summary.oneDayPayments.toLocaleString('en-IN')}`, color: 'green' },
                { title: 'Multi-Day Payments', value: `₹${summary.multiDayPayments.toLocaleString('en-IN')}`, color: 'blue' },
                { title: 'Char Dham Payments', value: `₹${summary.charDhamPayments.toLocaleString('en-IN')}`, color: 'amber' },
                { title: 'Total Payments', value: `₹${summary.totalPayments.toLocaleString('en-IN')}`, color: 'yellow' },
              ].map((card) => (
                <div
                  key={card.title}
                  className={`p-6 bg-white rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300 border-t-4 border-${card.color}-500`}
                >
                  <h2 className="text-lg font-semibold text-gray-700">{card.title}</h2>
                  <p className={`text-3xl font-bold text-${card.color}-600`}>{card.value}</p>
                </div>
              ))}
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Bar Chart */}
              <div className="bg-white rounded-xl shadow-lg p-6 h-[30rem]">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Slots Availability</h2>
                <div className="mt-10">
                  <Bar data={barData} options={chartOptions} />
                </div>
              </div>

              {/* Pie Chart */}
              <div className="bg-white rounded-xl shadow-lg p-6 h-[30rem]">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Booking Distribution</h2>
                <Pie data={pieData} options={chartOptions} />
              </div>

              {/* Line Chart */}
              <div className="bg-white rounded-xl shadow-lg p-6 lg:col-span-2">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Weight Trends</h2>
                <Line data={lineData} options={chartOptions} />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;