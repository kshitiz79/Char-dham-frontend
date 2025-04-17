import React from 'react';

const Description = () => {
  const itinerary = [
    {
      day: "Day 1",
      title: "Arrival in Dehradun",
      activities: [
        "Arrival at <span class='font-bold text-orange-600'>Dehradun Airport</span> or <span class='font-bold text-orange-600'>Railway Station</span>.",
        "Private transfer to a premium hotel (<span class='font-bold text-orange-600'>Fairfield by Marriott</span> or equivalent).",
        "Evening briefing by the <span class='font-bold text-orange-600'>FlyOla India team</span> to outline your bespoke journey.",
        "Overnight stay in <span class='font-bold text-orange-600'>Dehradun</span>, inclusive of dinner and breakfast."
      ]
    },
    {
      day: "Day 2",
      title: "Kedarnath Dham",
      activities: [
        "<span class='font-bold text-orange-600'>05:30 AM</span>: Depart the hotel for <span class='font-bold text-orange-600'>Sahastradhara Helipad</span>.",
        "<span class='font-bold text-orange-600'>06:30 AM</span>: Helicopter departs from Sahastradhara to <span class='font-bold text-orange-600'>Sersi</span>.",
        "<span class='font-bold text-orange-600'>07:15 AM</span>: Arrival at Sersi Heli-Base, FlyOla’s dedicated <span class='font-bold text-orange-600'>Kedarnath</span> operations hub.",
        "Swift shuttle flight to <span class='font-bold text-orange-600'>Kedarnath Ji</span> (approximately 7 minutes).",
        "Exclusive <span class='font-bold text-orange-600'>VIP Darshan</span> at Kedarnath Temple (approximately 2 hours).",
        "Overnight stay in <span class='font-bold text-orange-600'>Sitapur, Kedarnath</span>, with all meals provided."
      ]
    },
    {
      day: "Day 3",
      title: "Badrinath Dham",
      activities: [
        "<span class='font-bold text-orange-600'>07:20 AM</span>: Helicopter departs from Sersi to <span class='font-bold text-orange-600'>Badrinath</span>.",
        "<span class='font-bold text-orange-600'>08:00 AM</span>: Arrival at <span class='font-bold text-orange-600'>Badrinath Helipad</span>.",
        "Private transfer to the temple for <span class='font-bold text-orange-600'>VIP Darshan</span>.",
        "Visit to <span class='font-bold text-orange-600'>Mana Village</span>, India’s last settlement near the Indo-China border.",
        "Optional: Participation in the <span class='font-bold text-orange-600'>Swarna/Chandi Aarti</span> at Badrinath Temple (additional cost applies).",
        "Overnight stay in <span class='font-bold text-orange-600'>Badrinath</span>, with all meals included."
      ]
    },
    {
      day: "Day 4",
      title: "Departure from Dehradun",
      activities: [
        "<span class='font-bold text-orange-600'>08:05 AM</span>: Helicopter departs from Badrinath to <span class='font-bold text-orange-600'>Dehradun</span>.",
        "<span class='font-bold text-orange-600'>09:00 AM</span>: Arrival in Dehradun, followed by breakfast at the hotel.",
        "Check-out and private transfer to <span class='font-bold text-orange-600'>Dehradun Airport</span> or <span class='font-bold text-orange-600'>Railway Station</span> for your onward journey."
      ]
    }
  ];

  return (
    <div className="container mx-auto px-4 py-12 font-sans">
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl p-8 shadow-xl relative overflow-hidden">
        {/* Subtle Background Overlay */}
        <div className="absolute inset-0 bg-orange-50 opacity-10 rounded-3xl"></div>

        <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-10 bg-gradient-to-r from-orange-600 to-amber-500 bg-clip-text text-transparent animate-fade-in">
          Do Dham Helicopter Yatra: Badrinath & Kedarnath
        </h2>
        <p className="text-center text-lg text-gray-600 mb-12 italic animate-fade-in delay-200">
          Embark on an <span className="font-semibold text-orange-600">exquisite spiritual journey</span> with unparalleled comfort and prestige.
        </p>

        {/* Package Overview */}
        <div className="mb-12">
          <h3 className="text-3xl font-bold text-gray-800 text-center mb-6 animate-slide-up">Package Overview</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { label: "Operator", value: "FlyOla India" },
              { label: "Duration", value: "4 Days / 3 Nights" },
              { label: "Helicopter", value: "Augusta 109 Power (Twin Engine)" },
              { label: "Passenger Capacity", value: "Up to 5" },
              { label: "Weight Limit", value: "375 kg" },
              { label: "Package Cost", value: "₹15,00,000 per charter" },
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-white p-6 rounded-xl  hover:shadow-lg transition-all duration-300 border border-gray-200 transform hover:-translate-y-2 animate-fade-in"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <h4 className="font-semibold text-xl text-gray-800 mb-2">{item.label}</h4>
                <p className="text-gray-600 text-lg">{item.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Day-Wise Itinerary */}
        <div className="mb-12">
          <h3 className="text-3xl font-bold text-gray-800 text-center mb-6 animate-slide-up">Day-Wise Itinerary</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {itinerary.map((item, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl transition-all duration-300 border border-gray-200 animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <h4 className="text-2xl font-semibold text-gray-800 mb-4">
                  <span className="text-orange-600">{item.day}</span>: {item.title}
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
              "Helicopter transfers from <span class='font-bold text-orange-600'>Dehradun</span> to <span class='font-bold text-orange-600'>Kedarnath</span> and <span class='font-bold text-orange-600'>Badrinath</span>.",
              "<span class='font-bold text-orange-600'>VIP Darshan</span> assistance at both sacred temples.",
              "Accommodation: 1 night in <span class='font-bold text-orange-600'>Sitapur, Kedarnath</span>; 1 night in <span class='font-bold text-orange-600'>Badrinath</span>; 1 night in <span class='font-bold text-orange-600'>Dehradun</span> (Fairfield by Marriott or similar).",
              "All meals provided (vegetarian options, including <span class='font-bold text-orange-600'>Jain cuisine</span>).",
              "Private ground transfers in <span class='font-bold text-orange-600'>Dehradun</span>, <span class='font-bold text-orange-600'>Sersi</span>, and <span class='font-bold text-orange-600'>Badrinath</span>.",
              "Guided visit to <span class='font-bold text-orange-600'>Mana Village</span> for an enriching cultural experience.",
              "All applicable taxes and government levies included.",
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
                { text: "Luggage Allowance: <span class='font-bold text-orange-600'>5 kg</span> per passenger; large suitcases are not permitted.", icon: "⚠️" },
                { text: "Weight Restriction: A strict <span class='font-bold text-orange-600'>375 kg</span> combined limit is enforced—exceeding this may result in deboarding without refund.", icon: "⚠️" },
                { text: "Flight Timings: Adherence to scheduled departure times is mandatory, though adjustments may occur due to weather or operational requirements.", icon: null },
                { text: "Load Management: The pilot retains sole discretion over weight distribution to ensure flight safety.", icon: null },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="bg-white p-6 rounded-xl  transition-all duration-300 border border-gray-200 transform hover:-translate-y-2 animate-fade-in"
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
                "Delays or cancellations due to inclement weather, technical issues, or regulatory mandates will be addressed per <span class='font-bold text-orange-600'>FlyOla India’s refund policy</span>.",
                "Pre-departure cancellation incurs a full refund, less <span class='font-bold text-orange-600'>₹60,000</span> for flight preparation costs.",
                "Mid-journey disruptions will prompt a revised itinerary, with no extension of the trip duration.",
                "Should weather strand passengers in <span class='font-bold text-orange-600'>Kedarnath</span> or <span class='font-bold text-orange-600'>Badrinath</span>, accommodation expenses will be the client’s responsibility.",
                "Additional flight hours, if required, are charged at <span class='font-bold text-orange-600'>₹300,000 per hour</span> plus applicable taxes.",
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="bg-white p-6 rounded-xl transition-all duration-300 border border-gray-200 transform hover:-translate-y-2 animate-fade-in"
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
                "Payment Terms: <span class='font-bold text-orange-600'>50% deposit</span> upon booking; the balance is due <span class='font-bold text-orange-600'>14 days</span> prior to departure.",
                "Cancellation Fees:",
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
              <div className="ml-6 grid grid-cols-1 gap-6">
                {[
                  "More than <span class='font-bold text-orange-600'>15 days</span> prior: <span class='font-bold text-orange-600'>30%</span> of the total cost.",
                  "<span class='font-bold text-orange-600'>8–15 days</span> prior: <span class='font-bold text-orange-600'>50%</span> of the total cost.",
                  "Less than <span class='font-bold text-orange-600'>7 days</span> or no-show: <span class='font-bold text-orange-600'>Non-refundable</span>.",
                  "Post-commencement cancellations: <span class='font-bold text-orange-600'>Non-refundable</span>.",
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="bg-gray-50 p-6 rounded-xl  transition-all duration-300 border border-gray-200 transform hover:-translate-y-2 animate-fade-in"
                    style={{ animationDelay: `${idx * 100}ms` }}
                  >
                    <p className="text-gray-600 text-lg flex items-start">
                      <span className="flex-shrink-0 w-2 h-2 bg-orange-600 rounded-full mt-2 mr-3"></span>
                      <span dangerouslySetInnerHTML={{ __html: item }} />
                    </p>
                  </div>
                ))}
              </div>
              <div className="bg-white p-6 rounded-xl  transition-all duration-300 border border-gray-200 transform hover:-translate-y-2 animate-fade-in">
                <p className="text-gray-600 text-lg flex items-start">
                  <span className="flex-shrink-0 w-2 h-2 bg-orange-600 rounded-full mt-2 mr-3"></span>
                  Rescheduling: Permitted up to <span className="font-bold text-orange-600">7 days</span> before departure for a <span className="font-bold text-orange-600">10% fee</span>, subject to availability.
                </p>
              </div>
            </div>
          </div>

          {/* Additional Guidelines */}
          <div className="space-y-6 mt-10">
            <h4 className="text-2xl font-semibold text-gray-800 mb-4 animate-fade-in">Additional Guidelines</h4>
            <div className="grid grid-cols-1 gap-6">
              {[
                "Medical Fitness: Guests with health concerns are advised to consult a physician prior to travel.",
                "Attire: <span class='font-bold text-orange-600'>Warm clothing</span>, <span class='font-bold text-orange-600'>sturdy trekking shoes</span>, and personal medications are recommended.",
                "Identification: Valid ID required—<span class='font-bold text-orange-600'>Aadhar Card</span> for Indian nationals; <span class='font-bold text-orange-600'>Passport</span> for foreign nationals.",
                "<span class='font-bold text-orange-600'>COVID-19 Compliance</span>: Adherence to prevailing government health protocols is mandatory.",
                "VIP Restrictions: This journey is not available to <span class='font-bold text-orange-600'>Speaker Lok Sabha</span>, <span class='font-bold text-orange-600'>Deputy Chairperson Rajya Sabha</span>, Cabinet Ministers, Chief Justice of India, State Governors, Chief Ministers, or Z-category SPG protectees.",
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
        </div>

        {/* Closing Statement */}
        <div className="mt-12 text-center">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4 animate-slide-up">A Seamless Luxury Pilgrimage</h3>
          <div className="bg-white p-6 rounded-xl  border border-gray-200 animate-fade-in-up">
            <p className="text-gray-600 text-lg">
              This meticulously curated itinerary ensures an extraordinary pilgrimage, blending <span className="font-bold text-orange-600">spiritual fulfillment</span> with unmatched convenience and exclusivity. <span className="font-bold text-orange-600">FlyOla India’s premium helicopter service</span> and <span className="font-bold text-orange-600">VIP access</span> elevate your experience to new heights.
            </p>
            <p className="text-gray-600 text-lg mt-4">
              For reservations or inquiries, please contact <span className="font-bold text-orange-600">FlyOla India</span> at [website/contact details].
            </p>
            <p className="text-gray-600 text-lg mt-2 italic">
              We are committed to delivering a <span className="font-bold text-orange-600">safe, memorable, and transcendent journey</span>.
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