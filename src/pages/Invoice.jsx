import React, { useRef } from "react";
import html2pdf from "html2pdf.js";

const Invoice = () => {
  const invoiceRef = useRef();

  const downloadPDF = () => {
    const element = invoiceRef.current;
    const opt = {
      margin:       0.5,
      filename:     'Flyola_Invoice.pdf',
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { scale: 2 },
      jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
    };
    html2pdf().set(opt).from(element).save();
  };

  const invoiceData = {
    invoiceNo: "FLY-CHD-00123",
    date: new Date().toLocaleDateString(),
    passengers: ["Arpit", "Shubham", "Pratham"],
    totalAmount: 1800000,
    tripType: "Char Dham Yatra (Helicopter)",
    travelDate: "2025-05-10",
    company: {
      name: "Flyola Aviation Services",
      address: "Benipatti, Madhubani, Bihar - 847223",
      phone: "+91 9876543210",
      email: "support@flyola.in",
      gstin: "10AABCU9603R1ZM",
    },
  };

  const passengerWeights = {
    Arpit: 80,
    Shubham: 75,
    Pratham: 85,
  };

  const totalWeight = Object.values(passengerWeights).reduce((sum, weight) => sum + weight, 0);

  return (
    <div className="max-w-5xl mx-auto px-6 my-12">
      <div className="flex justify-end mb-4">
        <button
          onClick={downloadPDF}
          className="px-6 py-2 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 transition"
        >
          Download PDF
        </button>
      </div>

      <div ref={invoiceRef} className="p-8 bg-white shadow-lg border border-gray-300 rounded-lg font-sans">
        <h1 className="text-3xl font-bold text-center text-indigo-700 mb-6">INVOICE</h1>

        <div className="flex justify-between mb-4">
          <div>
            <p className="text-sm font-semibold">Invoice No: {invoiceData.invoiceNo}</p>
            <p className="text-sm">Date: {invoiceData.date}</p>
            <p className="text-sm">Trip Type: {invoiceData.tripType}</p>
            <p className="text-sm">Travel Date: {invoiceData.travelDate}</p>
          </div>
          <div className="text-right">
            <p className="text-sm font-semibold">{invoiceData.company.name}</p>
            <p className="text-sm">{invoiceData.company.address}</p>
            <p className="text-sm">Phone: {invoiceData.company.phone}</p>
            <p className="text-sm">Email: {invoiceData.company.email}</p>
            <p className="text-sm">GSTIN: {invoiceData.company.gstin}</p>
          </div>
        </div>

        <table className="w-full border border-gray-300 my-6">
          <thead>
            <tr className="bg-indigo-100">
              <th className="border px-4 py-2 text-left">#</th>
              <th className="border px-4 py-2 text-left">Passenger Name</th>
              <th className="border px-4 py-2 text-left">Trip Type</th>
              <th className="border px-4 py-2 text-right">Weight (kg)</th>
              <th className="border px-4 py-2 text-right">Cost (₹)</th>
            </tr>
          </thead>
          <tbody>
            {invoiceData.passengers.map((name, idx) => (
              <tr key={idx} className="bg-white hover:bg-gray-50">
                <td className="border px-4 py-2">{idx + 1}</td>
                <td className="border px-4 py-2">{name}</td>
                <td className="border px-4 py-2">{invoiceData.tripType}</td>
                <td className="border px-4 py-2 text-right">{passengerWeights[name]}</td>
                <td className="border px-4 py-2 text-right">₹6,00,000</td>
              </tr>
            ))}
            <tr className="bg-indigo-100 font-semibold">
              <td className="border px-4 py-2 text-right" colSpan={3}>
                Total
              </td>
              <td className="border px-4 py-2 text-right">{totalWeight} kg</td>
              <td className="border px-4 py-2 text-right">₹{invoiceData.totalAmount.toLocaleString("en-IN")}</td>
            </tr>
          </tbody>
        </table>

        <p className="text-sm text-gray-600 mt-6">
          * This invoice reflects the total cost of ₹18,00,000 for the helicopter booking. For queries, contact support@flyola.in.
        </p>
      </div>
    </div>
  );
};

export default Invoice;
