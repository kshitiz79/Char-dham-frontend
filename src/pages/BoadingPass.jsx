import React, { useRef } from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import { QRCodeCanvas as QRCode } from 'qrcode.react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const BoadingPass = () => {
  const { state } = useLocation();
  // Create refs for each boarding pass to capture them for PDF
  const boardingPassRefs = useRef([]);

  // Redirect to home if no state is provided
  if (!state) return <Navigate to="/" replace />;

  const { formData = [], travelDate, tripType, pnr, bookings = [] } = state;

  // Format the travel date for the boarding pass
  const formattedDate = travelDate
    ? new Date(travelDate).toLocaleString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      })
    : 'N/A';

    const itinerary = tripType === 'one-day'
    ? [
        { label: '09:30 AM', text: 'Report at Sahastradhara Helipad, Dehradun', icon: '🕤' },
        { label: '10:00 AM', text: 'Helicopter → Kedarnath → Temple Darshan', icon: '🚁' },
        { label: '01:00 PM', text: 'Kedarnath → Badrinath → Temple Darshan → Mana Village', icon: '🏞️' },
        { label: '04:30 PM', text: 'Return to Dehradun — Tour Concludes', icon: '🏁' },
      ]
    : [
        { label: 'Day 1', text: 'Arrival → Hotel Check-in → Evening Briefing', icon: '🏨' },
        { label: 'Day 2', text: 'Dehradun → Kedarnath (Helicopter) → Temple Darshan', icon: '🚁' },
        { label: 'Day 3', text: 'Kedarnath → Badrinath (Helicopter) → Temple Darshan → Mana Village', icon: '🏞️' },
        { label: 'Day 4', text: 'Badrinath → Dehradun (Helicopter) → Departure', icon: '✈️' },
      ];
  // Extract departure and arrival times from itinerary
  const departureTime = itinerary[0].label.includes('AM') || itinerary[0].label.includes('PM') ? itinerary[0].label : '09:00 AM';
  const arrivalTime = itinerary[itinerary.length - 1].label.includes('AM') || itinerary[itinerary.length - 1].label.includes('PM') ? itinerary[itinerary.length - 1].label : '03:00 PM';

  // Mock data for the boarding pass (adapted for helicopter tour context)
  const departureHelipad = 'SAH'; // Sahastradhara Helipad (Dehradun)
  const arrivalHelipad = 'KED'; // Kedarnath Helipad
  const departureCity = 'DEHRADUN';
  const arrivalCity = 'KEDARNATH';
  const flightNumber = `H ${pnr || '0123'}`; // Using PNR as part of the flight number
  const gate = 'H1'; // Helipad gate
  const terminal = '1H'; // Helipad terminal

  // Function to generate and download PDF
  const downloadPDF = async (index, passengerName) => {
    const boardingPassElement = boardingPassRefs.current[index];
    if (!boardingPassElement) return;

    try {
      // Capture the boarding pass as a canvas
      const canvas = await html2canvas(boardingPassElement, {
        scale: 2, // Increase resolution
        useCORS: true, // Handle cross-origin images (if any)
      });

      // Create a new jsPDF instance
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgData = canvas.toDataURL('image/png');
      const imgWidth = 210; // A4 width in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      // Add the image to the PDF
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);

      // Download the PDF
      pdf.save(`Boarding_Pass_${passengerName}_${pnr}.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Failed to generate PDF. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8 space-y-6">
      {formData.map((passenger, index) => {
        const passengerName = passenger.name.toUpperCase();
        const seat = `${passenger.weight}KG`; // Using weight as a placeholder for seat
        const qrData = `Name: ${passenger.name}, PNR: ${pnr}, Phone: ${passenger.phone}`; // Enhanced QR code data

        return (
          <div key={index} className="w-full max-w-4xl">
            {/* Download Button */}
            <div className="mb-4 flex justify-end">
              <button
                onClick={() => downloadPDF(index, passengerName)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
              >
                Download PDF
              </button>
            </div>

            {/* Boarding Pass */}
            <div
              ref={(el) => (boardingPassRefs.current[index] = el)} // Assign ref to capture this element
              className="bg-blue-600 rounded-3xl shadow-lg w-full flex flex-row items-stretch relative overflow-hidden border-4 border-blue-800"
            >
              {/* Left Section: Main Boarding Pass Content */}
              <div className="w-3/4 p-6 text-white flex flex-col justify-between">
                {/* Header */}
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-white rounded-full mr-2 flex items-center justify-center">
                      <span className="text-blue-600 text-xl">✈️</span>
                    </div>
                    <h1 className="text-2xl font-bold uppercase">Boarding Pass</h1>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold uppercase">FlyOla India</p>
                    <p className="text-sm">www.flyola.in</p>
                  </div>
                </div>

                {/* Passenger and Trip Info */}
                <div className="mb-4">
                  <p className="text-xl font-bold">{passengerName}</p>
                  <p className="text-sm uppercase">**{tripType === 'one-day' ? 'One-Day Tour' : 'Multi-Day Tour'}**</p>
                  <p className="text-sm mt-2">Destination: {departureCity} to {arrivalCity}</p>
                </div>

                {/* From/To Section with Helicopter Graphic */}
                <div className="relative flex items-center justify-between mb-4">
                  <div>
                    <p className="text-sm font-semibold uppercase">From</p>
                    <p className="text-3xl font-bold">{departureHelipad}</p>
                    <p className="text-sm">{departureCity}</p>
                    <p className="text-sm mt-2">{formattedDate}</p>
                    <p className="text-lg font-semibold">{departureTime}</p>
                  </div>
                  <div className="absolute left-1/4 right-1/4 top-1/2 transform -translate-y-1/2 flex items-center justify-center">
                    <div className="w-full h-px border-t-2 border-dashed border-white"></div>
                    <div className="absolute bg-blue-600 p-2 rounded-full">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14M12 5l7 7-7 7"></path>
                      </svg>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold uppercase">To</p>
                    <p className="text-3xl font-bold">{arrivalHelipad}</p>
                    <p className="text-sm">{arrivalCity}</p>
                    <p className="text-sm mt-2">{formattedDate}</p>
                    <p className="text-lg font-semibold">{arrivalTime}</p>
                  </div>
                </div>

                {/* Flight Details */}
                <div className="flex justify-between text-sm">
                  <div>
                    <p>Flight: <span className="font-semibold">{flightNumber}</span></p>
                    <p>Seat: <span className="font-semibold">{seat}</span></p>
                  </div>
                  <div className="text-right">
                    <p>Gate: <span className="font-semibold">{gate}</span></p>
                    <p>Terminal: <span className="font-semibold">{terminal}</span></p>
                  </div>
                </div>
              </div>

              {/* Right Section: QR Code and Additional Info */}
              <div className="w-1/4 bg-white text-blue-900 mt-10 mb-10 mr-10 rounded-3xl p-4 flex flex-col justify-between border-l-2 border-dashed border-white">
                <div>
                  <p className="text-sm font-semibold uppercase">Your Journey Starts Now</p>
                  <p className="text-xs mt-1">Helicopter Tour with FlyOla India</p>
                </div>
                <div className="flex justify-center my-4">
                  <div className="bg-white p-2 rounded">
                    <QRCode value={qrData} size={80} />
                  </div>
                </div>
                <div className="text-center">
                  <p className="text-sm font-semibold uppercase">Scan to Explore Now</p>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default BoadingPass;






  // Itinerary from Summery
