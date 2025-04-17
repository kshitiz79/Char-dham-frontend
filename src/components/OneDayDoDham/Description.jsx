import React from 'react';

const Description = () => {
  const itinerary = [
    {
      time: "09:30 AM",
      title: "Departure from Dehradun",
      activities: [
        "Report at <span class='font-bold text-orange-600'>Sahastradhara Helipad, Dehradun</span>.",
        "Board <span class='font-bold text-orange-600'>Augusta 109 Power helicopter</span> for departure."
      ]
    },
    {
      time: "10:00 AM - 01:00 PM",
      title: "Kedarnath Darshan",
      activities: [
        "<span class='font-bold text-orange-600'>10:00 AM</span>: Helicopter departs for <span class='font-bold text-orange-600'>Kedarnath</span>.",
        "<span class='font-bold text-orange-600'>10:45 AM</span>: Arrive at <span class='font-bold text-orange-600'>Sersi Helipad</span>, followed by shuttle service to <span class='font-bold text-orange-600'>Kedarnath Temple</span>.",
        "<span class='font-bold text-orange-600'>VIP Darshan</span> at Kedarnath Ji (approx. 2 hours).",
        "<span class='font-bold text-orange-600'>01:00 PM</span>: Return to Sersi Helipad for next leg."
      ]
    },
    {
      time: "01:00 PM - 04:30 PM",
      title: "Badrinath Darshan",
      activities: [
        "<span class='font-bold text-orange-600'>01:00 PM</span>: Helicopter departs from Sersi to <span class='font-bold text-orange-600'>Badrinath</span>.",
        "<span class='font-bold text-orange-600'>01:45 PM</span>: Arrival at <span class='font-bold text-orange-600'>Badrinath Helipad</span>.",
        "Transfer to <span class='font-bold text-orange-600'>Badrinath Temple</span> for <span class='font-bold text-orange-600'>VIP Darshan</span> (approx. 1.5 hours).",
        "Visit <span class='font-bold text-orange-600'>Mana Village</span> – India’s last village near the Indo-China border (time permitting)."
      ]
    },
    {
      time: "04:30 PM - 05:30 PM",
      title: "Return to Dehradun",
      activities: [
        "<span class='font-bold text-orange-600'>04:30 PM</span>: Helicopter departs from Badrinath to <span class='font-bold text-orange-600'>Dehradun</span>.",
        "<span class='font-bold text-orange-600'>05:30 PM</span>: Arrival at <span class='font-bold text-orange-600'>Sahastradhara Helipad, Dehradun</span>.",
        "Tour Concludes."
      ]
    }
  ];

  return (
    <div className="container mx-auto px-4 py-12 font-sans">
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl p-8 shadow-xl relative overflow-hidden">
        {/* Subtle Background Overlay */}
        <div className="absolute inset-0 bg-orange-50 opacity-10 rounded-3xl"></div>

        <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-10 bg-gradient-to-r from-orange-600 to-amber-500 bg-clip-text text-transparent animate-fade-in">
          Do Dham Helicopter Yatra: Badrinath & Kedarnath (Same Day Return)
        </h2>
        <p className="text-center text-lg text-gray-600 mb-12 italic animate-fade-in delay-200">
          A <span className="font-semibold text-orange-600">swift and luxurious</span> spiritual journey with <span className="font-semibold text-orange-600">VIP access</span> and top-tier helicopter service.
        </p>

        {/* Package Overview */}
        <div className="mb-12">
          <h3 className="text-3xl font-bold text-gray-800 text-center mb-6 animate-slide-up">Package Overview</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { label: "Operator", value: "FlyOla India" },
              { label: "Duration", value: "Same Day Return" },
              { label: "Helicopter", value: "Augusta 109 Power (Twin Engine)" },
              { label: "Passenger Capacity", value: "Up to 5" },
              { label: "Weight Limit", value: "375 kg" },
              { label: "Package Cost", value: "₹11,00,000 per charter" },
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-white p-6 rounded-xl hover:shadow-lg transition-all duration-300 border border-gray-200 transform hover:-translate-y-2 animate-fade-in"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <h4 className="font-semibold text-xl text-gray-800 mb-2">{item.label}</h4>
                <p className="text-gray-600 text-lg">{item.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Time-Wise Itinerary */}
        <div className="mb-12">
          <h3 className="text-3xl font-bold text-gray-800 text-center mb-6 animate-slide-up">Time-Wise Itinerary</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {itinerary.map((item, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl  transition-all duration-300 border border-gray-200 animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <h4 className="text-2xl font-semibold text-gray-800 mb-4">
                  <span className="text-orange-600">{item.time}</span>: {item.title}
                </h4>
                <ul className="space-y-3">
                  {item.activities.map((activity, i) => (
                    <li key={i} className="flex items-start">
                      <span className="flex-shrink-0 w-2 h-2 bg-orange-600 rounded-full mt-2 mr-3"></span>
                      <p className="text-gray-600 text-lg" dangerouslySetInnerHTML={{ __html: activity }} />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Package Inclusions */}
        <div className="mb-12">
          <h3 className="text-3xl font-bold text-gray-800 text-center mb-6 animate-slide-up">Package Inclusions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              "Helicopter flights from <span class='font-bold text-orange-600'>Dehradun</span> to <span class='font-bold text-orange-600'>Kedarnath</span> & <span class='font-bold text-orange-600'>Badrinath</span> (same-day return).",
              "<span class='font-bold text-orange-600'>VIP Darshan</span> Assistance at both temples.",
              "Ground transfers at <span class='font-bold text-orange-600'>Sersi</span> and <span class='font-bold text-orange-600'>Badrinath</span>.",
              "Taxes & government levies included.",
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-white p-6 rounded-xl  transition-all duration-300 border border-gray-200 transform hover:-translate-y-2 animate-fade-in"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <p className="text-gray-600 text-lg flex items-start">
                  <span className="flex-shrink-0 w-2 h-2 bg-orange-600 rounded-full mt-2 mr-3"></span>
                  <span dangerouslySetInnerHTML={{ __html: item }} />
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Policies & Guidelines */}
        <div className="mb-12">
          <h3 className="text-3xl font-bold text-gray-800 text-center mb-6 animate-slide-up">Policies & Guidelines</h3>

          {/* Flight & Luggage Policies */}
          <div className="space-y-6">
            <h4 className="text-2xl font-semibold text-gray-800 mb-4 animate-fade-in">Flight & Luggage Policies</h4>
            <div className="grid grid-cols-1 gap-6">
              {[
                { text: "Luggage Allowance: <span class='font-bold text-orange-600'>5 kg</span> per passenger (no large suitcases allowed).", icon: "⚠️" },
                { text: "Weight Limit: Strictly enforced at <span class='font-bold text-orange-600'>375 kg</span>—exceeding may result in deboarding without refund.", icon: "⚠️" },
                { text: "Fixed Flight Timings: Report as per ETDs; timings may change due to weather or operations.", icon: null },
                { text: "Helicopter Weight Limitation: Pilots have final call on load management for safety.", icon: null },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200 transform hover:-translate-y-2 animate-fade-in"
                  style={{ animationDelay: `${idx * 100}ms` }}
                >
                  <p className="text-gray-600 text-lg flex items-start">
                    {item.icon && <span className="text-2xl text-red-600 mr-3 animate-pulse">{item.icon}</span>}
                    <span dangerouslySetInnerHTML={{ __html: item.text }} />
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Bad Weather & Force Majeure Policy */}
          <div className="space-y-6 mt-10">
            <h4 className="text-2xl font-semibold text-gray-800 mb-4 animate-fade-in">Bad Weather & Force Majeure Policy</h4>
            <div className="grid grid-cols-1 gap-6">
              {[
                "Flights may be delayed or canceled due to bad weather, technical issues, or government regulations.",
                "Full refund minus <span class='font-bold text-orange-600'>₹60,000</span> flight preparation charges if canceled before departure.",
                "Extra flying hours, if required, charged at <span class='font-bold text-orange-600'>₹300,000/hour</span> + taxes.",
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200 transform hover:-translate-y-2 animate-fade-in"
                  style={{ animationDelay: `${idx * 100}ms` }}
                >
                  <p className="text-gray-600 text-lg flex items-start">
                    <span className="flex-shrink-0 w-2 h-2 bg-orange-600 rounded-full mt-2 mr-3"></span>
                    <span dangerouslySetInnerHTML={{ __html: item }} />
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Payment & Cancellation Policy */}
          <div className="space-y-6 mt-10">
            <h4 className="text-2xl font-semibold text-gray-800 mb-4 animate-fade-in">Payment & Cancellation Policy</h4>
            <div className="grid grid-cols-1 gap-6">
              {[
                "<span class='font-bold text-orange-600'>50% deposit</span> at booking; balance due <span class='Hfont-bold text-orange-600'>14 days</span> before departure.",
                "Cancellation Charges:",
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200 transform hover:-translate-y-2 animate-fade-in"
                  style={{ animationDelay: `${idx * 100}ms` }}
                >
                  <p className="text-gray-600 text-lg flex items-start">
                    <span className="flex-shrink-0 w-2 h-2 bg-orange-600 rounded-full mt-2 mr-3"></span>
                    <span dangerouslySetInnerHTML={{ __html: item }} />
                  </p>
                </div>
              ))}
              <div className="ml-6 grid grid-cols-1 gap-6">
                {[
                  "More than <span class='font-bold text-orange-600'>15 days</span> before travel: <span class='font-bold text-orange-600'>30%</span> of total cost.",
                  "<span class='font-bold text-orange-600'>8-15 days</span> before travel: <span class='font-bold text-orange-600'>50%</span> of total cost.",
                  "Less than <span class='font-bold text-orange-600'>7 days</span> or No-show: <span class='font-bold text-orange-600'>No refund</span>.",
                  "After tour commencement: <span class='font-bold text-orange-600'>No refund</span>.",
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="bg-gray-50 p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200 transform hover:-translate-y-2 animate-fade-in"
                    style={{ animationDelay: `${idx * 100}ms` }}
                  >
                    <p className="text-gray-600 text-lg flex items-start">
                      <span className="flex-shrink-0 w-2 h-2 bg-orange-600 rounded-full mt-2 mr-3"></span>
                      <span dangerouslySetInnerHTML={{ __html: item }} />
                    </p>
                  </div>
                ))}
              </div>
              <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200 transform hover:-translate-y-2 animate-fade-in">
                <p className="text-gray-600 text-lg flex items-start">
                  <span className="flex-shrink-0 w-2 h-2 bg-orange-600 rounded-full mt-2 mr-3"></span>
                  Rescheduling: Allowed up to <span className="font-bold text-orange-600">7 days</span> before departure with a <span className="font-bold text-orange-600">10% fee</span>, subject to availability.
                </p>
              </div>
            </div>
          </div>

          {/* Additional Guidelines */}
          <div className="space-y-6 mt-10">
            <h4 className="text-2xl font-semibold text-gray-800 mb-4 animate-fade-in">Additional Guidelines</h4>
            <div className="grid grid-cols-1 gap-6">
              {[
                "Medical Fitness: Consult a doctor if you have health conditions.",
                "Clothing Advice: Carry <span class='font-bold text-orange-600'>warm clothing</span>, <span class='font-bold text-orange-600'>trekking shoes</span>, and medications.",
                "Valid ID: <span class='font-bold text-orange-600'>Aadhar Card</span> (Indian nationals) or <span class='font-bold text-orange-600'>Passport</span> (foreign nationals).",
                "<span class='font-bold text-orange-600'>COVID-19 Guidelines</span>: Adhere to government protocols.",
                "VIP Restrictions: Not available for certain high-profile officials or <span class='font-bold text-orange-600'>Z-category protectees</span>.",
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200 transform hover:-translate-y-2 animate-fade-in"
                  style={{ animationDelay: `${idx * 100}ms` }}
                >
                  <p className="text-gray-600 text-lg flex items-start">
                    <span className="flex-shrink-0 w-2 h-2 bg-orange-600 rounded-full mt-2 mr-3"></span>
                    <span dangerouslySetInnerHTML={{ __html: item }} />
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Closing Statement */}
        <div className="mt-12 text-center">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4 animate-slide-up">A Seamless Luxury Pilgrimage</h3>
          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 animate-fade-in-up">
            <p className="text-gray-600 text-lg">
              This itinerary ensures a <span className="font-bold text-orange-600">seamless luxury pilgrimage</span> with <span className="font-bold text-orange-600">VIP access</span> and top-tier helicopter service, completed in a <span className="font-bold text-orange-600">single day</span>.
            </p>
            <p className="text-gray-600 text-lg mt-4">
              For bookings, contact <span className="font-bold text-orange-600">FlyOla India</span> at [website/contact details].
            </p>
            <p className="text-gray-600 text-lg mt-2 italic">
              We assure you a <span className="font-bold text-orange-600">safe and memorable</span> pilgrimage experience!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Description;

// Custom Tailwind Animations (Add to your CSS or Tailwind config)
const customStyles = `
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes slideUp {
    from { opacity: 0; transform: translateY(30px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .animate-fade-in { animation: fadeIn 1s ease-in-out; }
  .animate-fade-in-up { animation: fadeInUp 1s ease-in-out; }
  .animate-slide-up { animation: slideUp 1s ease-in-out; }
  .delay-200 { animation-delay: 0.2s; }
`;