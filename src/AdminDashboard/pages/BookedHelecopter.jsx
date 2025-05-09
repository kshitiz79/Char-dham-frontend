import React, { useState, useEffect } from "react";

const BookedHelicopter = () => {
  const [bookings, setBookings] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0]);
  const [tripType, setTripType] = useState("all");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000';

  // Fetch bookings whenever the date or trip type changes
  useEffect(() => {
    fetchBookings();
  }, [selectedDate, tripType]);

  const fetchBookings = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${apiUrl}/customers?date=${selectedDate}&tripType=${tripType}`, {
        headers: { 'Accept': 'application/json' },
        mode: 'cors'
      });
      if (!response.ok) {
        throw new Error(`Failed to fetch bookings: ${response.statusText}`);
      }
      const data = await response.json();
      // Ensure passengers array always exists
      const sanitizedData = data.map((b) => ({
        ...b,
        passengers: b.passengers || [],
      }));
      setBookings(sanitizedData);
    } catch (error) {
      console.error("Error fetching bookings:", error);
      setError("Failed to load bookings. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Delete a booking by customer (primary key id)
  const handleDeletePassenger = async (customerId) => {
    if (!customerId) {
      console.error("❌ ERROR: Missing customer ID!", customerId);
      setError("Invalid customer ID. Cannot delete.");
      return;
    }

    if (!window.confirm("Are you sure you want to delete this booking?")) {
      return;
    }

    try {
      const response = await fetch(`${apiUrl}/customers/${customerId}`, {
        method: "DELETE",
        headers: { 'Accept': 'application/json' },
        mode: 'cors'
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Failed to delete booking: ${response.statusText}`);
      }

      setBookings(prev => prev.map(booking => ({
        ...booking,
        passengers: booking.passengers.filter(p => p.id !== customerId)
      })).filter(booking => booking.passengers.length > 0));
      setError(null);
    } catch (error) {
      console.error("Error deleting booking:", error);
      setError(`Could not delete booking: ${error.message}`);
    }
  };

  // Determine if the file is an image
  const isImage = (filePath) => {
    if (!filePath) return false;
    const extension = filePath.split('.').pop().toLowerCase();
    return ['jpg', 'jpeg', 'png'].includes(extension);
  };

  // Format date_of_birth to a readable format (e.g., "DD-MM-YYYY")
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).split('/').join('-');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-7xl">
        {/* HEADER */}
        <header className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-blue-500">
            Booked Helicopter Trips
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Monitor and manage your helicopter bookings with ease
          </p>
        </header>

        {/* ERROR MESSAGE */}
        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded-r-lg">
            {error}
          </div>
        )}

        {/* FILTERS */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Select Date */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Select Date
              </label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full p-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-indigo-500 shadow-sm transition-all duration-200"
              />
            </div>
            {/* Trip Type */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Trip Type
              </label>
              <select
                value={tripType}
                onChange={(e) => setTripType(e.target.value)}
                className="w-full p-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-indigo-500 shadow-sm transition-all duration-200"
              >
                <option value="all">All Trips</option>
                <option value="one-day">One-Day</option>
                <option value="two-day">Two-Day</option>
                <option value="char-dham">Char Dham</option>
                <option value="do-dham">Do Dham</option>
              </select>
            </div>
          </div>
        </div>

        {/* LOADING SPINNER */}
        {loading && (
          <div className="flex justify-center items-center py-12 bg-white rounded-xl shadow-lg">
            <div className="animate-spin rounded-full h-10 w-10 border-t-3 border-indigo-600"></div>
            <span className="ml-4 text-gray-600 font-medium text-lg">
              Loading bookings...
            </span>
          </div>
        )}

        {/* BOOKINGS TABLE */}
        {!loading && bookings.length > 0 ? (
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr className="bg-gradient-to-r from-indigo-600 to-indigo-700 text-white">
                    <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">
                      Booking Date
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">
                      Trip Type
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">
                      PNR
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">
                      Passenger Details
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {bookings.map((booking, index) => (
                    <tr key={index} className="hover:bg-indigo-50 transition-colors duration-150">
                      {/* Booking Date */}
                      <td className="px-6 py-4 text-gray-800 font-medium">
                        {booking.booking_date}
                      </td>

                      {/* Trip Type */}
                      <td className="px-6 py-4">
                        <span className={`inline-flex px-3 py-1 rounded-full text-sm font-medium capitalize ${
                          booking.trip_type === "one-day"
                            ? "bg-green-100 text-green-800"
                            : booking.trip_type === "two-day"
                            ? "bg-blue-100 text-blue-800"
                            : booking.trip_type === "char-dham"
                            ? "bg-purple-100 text-purple-800"
                            : booking.trip_type === "do-dham"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-gray-100 text-gray-800"
                        }`}>
                          {booking.trip_type}
                        </span>
                      </td>

                      {/* PNR */}
                      <td className="px-6 py-4 text-indigo-700 font-bold">
                        {booking.pnr}
                      </td>

                      {/* Passenger Details */}
                      <td className="px-6 py-4">
                        {Array.isArray(booking.passengers) && booking.passengers.length > 0 ? (
                          <div className="space-y-4">
                            {booking.passengers.map((passenger) => (
                              <div key={passenger.id} className="bg-gray-50 p-4 rounded-lg border border-gray-100 shadow-sm transition-all hover:shadow-md relative">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                  <p className="text-gray-800 font-medium">
                                    <span className="text-indigo-600">Name:</span> {passenger.name}
                                  </p>
                                  <p className="text-gray-600">
                                    <span className="text-indigo-600">Phone:</span> {passenger.phone || "N/A"}
                                  </p>
                                  <p className="text-gray-600">
                                    <span className="text-indigo-600">Email:</span> {passenger.email || "N/A"}
                                  </p>
                                  <p className="text-gray-600">
                                    <span className="text-indigo-600">Date of Birth:</span> {formatDate(passenger.date_of_birth)}
                                  </p>
                                  <p className="text-gray-600">
                                    <span className="text-indigo-600">Weight:</span> {passenger.weight || "N/A"} kg
                                  </p>
                                  <p className="text-indigo-700 font-bold">
                                    Booking ID: {passenger.booking_id || "N/A"}
                                  </p>
                                  {passenger.id_document_path && (
                                    <p className="text-gray-600">
                                      <span className="text-indigo-600">ID Document:</span>{' '}
                                      {isImage(passenger.id_document_path) ? (
                                        <img
                                          src={`${apiUrl}/${passenger.id_document_path}`}
                                          alt="ID Document"
                                          className="mt-2 max-w-[100px] h-auto rounded"
                                        />
                                      ) : (
                                        <a
                                          href={`${apiUrl}/${passenger.id_document_path}`}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className="text-blue-600 hover:underline"
                                        >
                                          View PDF
                                        </a>
                                      )}
                                    </p>
                                  )}
                                </div>

                                {/* DELETE BUTTON: using customer.id (primary key) */}
                                <button
                                  className="absolute top-2 right-2 text-sm text-red-600 hover:text-red-800 font-semibold"
                                  onClick={() => handleDeletePassenger(passenger.id)}
                                >
                                  Delete
                                </button>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <span className="text-gray-500 italic">No Passengers</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (!loading && <p className="text-center py-16 text-gray-600">No bookings found</p>)}
      </div>
    </div>
  );
};

export default BookedHelicopter;