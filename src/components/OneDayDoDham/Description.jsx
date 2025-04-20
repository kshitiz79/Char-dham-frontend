import React from 'react';


const Description = () => {
  const itinerary = [
    {
      time: "05:00 AM",
      title: "Report at Dehradun Airport",
      activities: [
        "Report at <span class='font-bold text-orange-600'>Dehradun Airport</span> with same-day return yatri."
      ]
    },
    {
      time: "06:00 AM - 06:35 AM",
      title: "Helicopter to Sersi/Phata/Guptkashi",
      activities: [
        "<span class='font-bold text-orange-600'>06:00 AM</span>: Helicopter departs for <span class='font-bold text-orange-600'>Sersi/Phata/Guptkashi</span> with same-day Do Dham yatri.",
        "<span class='font-bold text-orange-600'>06:35 AM</span>: Arrival at <span class='font-bold text-orange-600'>Sersi/Phata/Guptkashi Helipad</span>."
      ]
    },
    {
      time: "06:35 AM - 08:35 AM",
      title: "Kedarnath Darshan",
      activities: [
        "Shuttle service to <span class='font-bold text-orange-600'>Kedarnath Temple</span> for <span class='font-bold text-orange-600'>VIP Darshan</span> (approx. 2 hours)."
      ]
    },
    {
      time: "09:20 AM - 09:50 AM",
      title: "Helicopter to Badrinath",
      activities: [
        "<span class='font-bold text-orange-600'>09:20 AM</span>: Helicopter departs from <span class='font-bold text-orange-600'>Sersi/Phata/Guptkashi</span> to <span class='font-bold text-orange-600'>Badrinath</span> with same-day package yatris.",
        "<span class='font-bold text-orange-600'>09:50 AM</span>: Arrival at <span class='font-bold text-orange-600'>Badrinath Helipad</span> with same-day package yatris."
      ]
    },
    {
      time: "09:50 AM - 12:00 PM",
      title: "Badrinath Darshan",
      activities: [
        "Transfer to <span class='font-bold text-orange-600'>Badrinath Temple</span> for <span class='font-bold text-orange-600'>VIP Darshan</span> (approx. 2 hours)."
      ]
    },
    {
      time: "12:00 PM - 12:55 PM",
      title: "Return to Dehradun",
      activities: [
        "<span class='font-bold text-orange-600'>12:00 PM</span>: Helicopter departs from <span class='font-bold text-orange-600'>Badrinath</span> to <span class='font-bold text-orange-600'>Dehradun</span> with same-day package yatris.",
        "<span class='font-bold text-orange-600'>12:55 PM</span>: Arrival at <span class='font-bold text-orange-600'>Dehradun Airport</span> with same-day package yatris.",
        "Drop-off at <span class='font-bold text-orange-600'>Dehradun Airport/Railway Station</span>.",
        "Tour Concludes."
      ]
    }
  ];
  return (
    <div className="container mx-auto px-4 py-12 font-sans">
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl p-6 md:p-8 shadow-xl relative overflow-hidden">
        {/* Subtle Background Overlay */}
        <div className="absolute inset-0 bg-orange-50 opacity-10 rounded-3xl"></div>

        <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-8 bg-gradient-to-r from-orange-600 to-amber-500 bg-clip-text text-transparent animate-fade-in">
          Do Dham Helicopter Yatra: Badrinath & Kedarnath (Same Day Return)
        </h2>
        <p className="text-center text-lg text-gray-600 mb-10 italic animate-fade-in delay-200">
          A <span className="font-semibold text-orange-600">swift and luxurious</span> spiritual journey with <span className="font-semibold text-orange-600">VIP access</span> and top-tier helicopter service.
        </p>

        {/* Package Overview */}
        <div className="mb-10">
          <h3 className="text-2xl md:text-3xl font-bold text-gray-800 text-center mb-4 animate-slide-up">Package Overview</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
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
                className="bg-white p-4 md:p-6 rounded-xl hover:shadow-lg transition-all duration-300 border border-gray-200 transform hover:-translate-y-2 animate-fade-in"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <h4 className="font-semibold text-lg md:text-xl text-gray-800 mb-2">{item.label}</h4>
                <p className="text-gray-600 text-base md:text-lg">{item.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Time-Wise Itinerary */}
        <div className="mb-10">
          <h3 className="text-2xl md:text-3xl font-bold text-gray-800 text-center mb-4 animate-slide-up">Time-Wise Itinerary</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {itinerary.map((item, index) => (
              <div
                key={index}
                className="bg-white p-4 md:p-6 rounded-xl  transition-all duration-300 border border-gray-200 animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <h4 className="text-xl md:text-2xl font-semibold text-gray-800 mb-3 md:mb-4">
                  <span className="text-orange-600">{item.time}</span> <br/>
                  <span className='text-lg md:text-xl'>{item.title}</span>
                </h4>
                <ul className="space-y-2 md:space-y-3">
                  {item.activities.map((activity, i) => (
                    <li key={i} className="flex items-start">
                      <span className="flex-shrink-0 w-2 h-2 bg-orange-600 rounded-full mt-1 mr-2 md:mt-2 md:mr-3"></span>
                      <p className="text-gray-600 text-base md:text-lg" dangerouslySetInnerHTML={{ __html: activity }} />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Package Inclusions */}
        <div className="mb-10">
          <h3 className="text-2xl md:text-3xl font-bold text-gray-800 text-center mb-4 animate-slide-up">Package Inclusions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {[
              "Helicopter flights from <span class='font-bold text-orange-600'>Dehradun</span> to <span class='font-bold text-orange-600'>Kedarnath</span> & <span class='font-bold text-orange-600'>Badrinath</span> (same-day return).",
              "<span class='font-bold text-orange-600'>VIP Darshan</span> Assistance at both temples.",
              "Ground transfers at <span class='font-bold text-orange-600'>Sersi</span> and <span class='font-bold text-orange-600'>Badrinath</span>.",
              "Taxes & government levies included.",
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-white p-4 md:p-6 rounded-xl  transition-all duration-300 border border-gray-200 transform hover:-translate-y-2 animate-fade-in"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <p className="text-gray-600 text-base md:text-lg flex items-start">
                  <span className="flex-shrink-0 w-2 h-2 bg-orange-600 rounded-full mt-1 mr-2 md:mt-2 md:mr-3"></span>
                  <span dangerouslySetInnerHTML={{ __html: item }} />
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Policies & Guidelines */}
        <div className="mb-10">
          <h3 className="text-2xl md:text-3xl font-bold text-gray-800 text-center mb-4 animate-slide-up">Policies & Guidelines</h3>

          {/* Flight & Luggage Policies */}
          <div className="space-y-4 md:space-y-6">
            <h4 className="text-xl md:text-2xl font-semibold text-gray-800 mb-3 animate-fade-in">Flight & Luggage Policies</h4>
            <div className="grid grid-cols-1 gap-4 md:gap-6">
              {[
                { text: "Luggage Allowance: <span class='font-bold text-orange-600'>5 kg</span> per passenger (no large suitcases allowed).", icon: "⚠️" },
                { text: "Weight Limit: Strictly enforced at <span class='font-bold text-orange-600'>375 kg</span>—exceeding may result in deboarding without refund.", icon: "⚠️" },
                { text: "Fixed Flight Timings: Report as per ETDs; timings may change due to weather or operations.", icon: null },
                { text: "Helicopter Weight Limitation: Pilots have final call on load management for safety.", icon: null },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="bg-white p-4 md:p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200 transform hover:-translate-y-2 animate-fade-in"
                  style={{ animationDelay: `${idx * 100}ms` }}
                >
                  <p className="text-gray-600 text-base md:text-lg flex items-start">
                    {item.icon && <span className="text-xl md:text-2xl text-red-600 mr-2 md:mr-3 animate-pulse">{item.icon}</span>}
                    <span dangerouslySetInnerHTML={{ __html: item.text }} />
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Bad Weather & Force Majeure Policy */}
          <div className="space-y-4 md:space-y-6 mt-8 md:mt-10">
            <h4 className="text-xl md:text-2xl font-semibold text-gray-800 mb-3 animate-fade-in">Bad Weather & Force Majeure Policy</h4>
            <div className="grid grid-cols-1 gap-4 md:gap-6">
              {[
                "Flights may be delayed or canceled due to bad weather, technical issues, or government regulations.",
                "Full refund minus <span class='font-bold text-orange-600'>₹60,000</span> flight preparation charges if canceled before departure.",
                "Extra flying hours, if required, charged at <span class='font-bold text-orange-600'>₹300,000/hour</span> + taxes.",
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="bg-white p-4 md:p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200 transform hover:-translate-y-2 animate-fade-in"
                  style={{ animationDelay: `${idx * 100}ms` }}
                >
                  <p className="text-gray-600 text-base md:text-lg flex items-start">
                    <span className="flex-shrink-0 w-2 h-2 bg-orange-600 rounded-full mt-1 mr-2 md:mt-2 md:mr-3"></span>
                    <span dangerouslySetInnerHTML={{ __html: item }} />
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Payment & Cancellation Policy */}
          <div className="space-y-4 md:space-y-6 mt-8 md:mt-10">
            <h4 className="text-xl md:text-2xl font-semibold text-gray-800 mb-3 animate-fade-in">Payment & Cancellation Policy</h4>
            <div className="grid grid-cols-1 gap-4 md:gap-6">
              {[
                "<span class='font-bold text-orange-600'>50% deposit</span> at booking; balance due <span class='font-bold text-orange-600'>14 days</span> before departure.",
                "Cancellation Charges:",
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="bg-white p-4 md:p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200 transform hover:-translate-y-2 animate-fade-in"
                  style={{ animationDelay: `${idx * 100}ms` }}
                >
                  <p className="text-gray-600 text-base md:text-lg flex items-start">
                    <span className="flex-shrink-0 w-2 h-2 bg-orange-600 rounded-full mt-1 mr-2 md:mt-2 md:mr-3"></span>
                    <span dangerouslySetInnerHTML={{ __html: item }} />
                  </p>
                </div>
              ))}
              <div className="ml-4 md:ml-6 grid grid-cols-1 gap-4 md:gap-6">
                {[
                  "More than <span class='font-bold text-orange-600'>15 days</span> before travel: <span class='font-bold text-orange-600'>30%</span> of total cost.",
                  "<span class='font-bold text-orange-600'>8-15 days</span> before travel: <span class='font-bold text-orange-600'>50%</span> of total cost.",
                  "Less than <span class='font-bold text-orange-600'>7 days</span> or No-show: <span class='font-bold text-orange-600'>No refund</span>.",
                  "After tour commencement: <span class='font-bold text-orange-600'>No refund</span>.",
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="bg-gray-50 p-4 md:p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200 transform hover:-translate-y-2 animate-fade-in"
                    style={{ animationDelay: `${idx * 100}ms` }}
                  >
                    <p className="text-gray-600 text-base md:text-lg flex items-start">
                      <span className="flex-shrink-0 w-2 h-2 bg-orange-600 rounded-full mt-1 mr-2 md:mt-2 md:mr-3"></span>
                      <span dangerouslySetInnerHTML={{ __html: item }} />
                    </p>
                  </div>
                ))}
              </div>
              <div className="bg-white p-4 md:p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200 transform hover:-translate-y-2 animate-fade-in">
                <p className="text-gray-600 text-base md:text-lg flex items-start">
                  <span className="flex-shrink-0 w-2 h-2 bg-orange-600 rounded-full mt-1 mr-2 md:mt-2 md:mr-3"></span>
                  Rescheduling : Allowed up to    7 days before departure with a 10% fee , subject to availability.
                </p>
              </div>
            </div>
          </div>

          {/* Additional Guidelines */}
          <div className="space-y-4 md:space-y-6 mt-8 md:mt-10">
            <h4 className="text-xl md:text-2xl font-semibold text-gray-800 mb-3 animate-fade-in">Additional Guidelines</h4>
            <div className="grid grid-cols-1 gap-4 md:gap-6">
              {[
                "Medical Fitness: Consult a doctor if you have health conditions.",
                "Clothing Advice: Carry <span class='font-bold text-orange-600'>warm clothing</span>, <span class='font-bold text-orange-600'>trekking shoes</span>, and medications.",
                "Valid ID: <span class='font-bold text-orange-600'>Aadhar Card</span> (Indian nationals) or <span class='font-bold text-orange-600'>Passport</span> (foreign nationals).",
                "<span class='font-bold text-orange-600'>COVID-19 Guidelines</span>: Adhere to government protocols.",
                "VIP Restrictions: Not available for certain high-profile officials or <span class='font-bold text-orange-600'>Z-category protectees</span>.",
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="bg-white p-4 md:p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200 transform hover:-translate-y-2 animate-fade-in"
                  style={{ animationDelay: `${idx * 100}ms` }}
                >
                  <p className="text-gray-600 text-base md:text-lg flex items-start">
                    <span className="flex-shrink-0 w-2 h-2 bg-orange-600 rounded-full mt-1 mr-2 md:mt-2 md:mr-3"></span>
                    <span dangerouslySetInnerHTML={{ __html: item }} />
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Closing Statement */}
        <div className="mt-10 md:mt-12 text-center">
          <h3 className="text-xl md:text-2xl font-semibold text-gray-800 mb-3 animate-slide-up">A Seamless Luxury Pilgrimage</h3>
          <div className="bg-white p-4 md:p-6 rounded-xl shadow-md border border-gray-200 animate-fade-in-up">
            <p className="text-gray-600 text-base md:text-lg">
              This itinerary ensures a <span className="font-bold text-orange-600">seamless luxury pilgrimage</span> with <span className="font-bold text-orange-600">VIP access</span> and top-tier helicopter service, completed in a <span className="font-bold text-orange-600">single day</span>.
            </p>
            <p className="text-gray-600 text-base md:text-lg mt-3 md:mt-4">
              For bookings, contact <span className="font-bold text-orange-600">FlyOla India</span> at [website/contact details].
            </p>
            <p className="text-gray-600 text-base md:text-lg mt-1 md:mt-2 italic">
              We assure you a <span className="font-bold text-orange-600">safe and memorable</span> pilgrimage experience!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Description;