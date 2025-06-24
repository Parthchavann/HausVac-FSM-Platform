"use client";

import { useState, useRef } from "react";
import { User, FileText, CalendarClock, Receipt } from "lucide-react";

const tabs = [
  { name: "CRM", label: "CRM", icon: <User className="inline mb-1 mr-1" size={18}/> },
  { name: "Quote", label: "Quoting", icon: <FileText className="inline mb-1 mr-1" size={18}/> },
  { name: "Schedule", label: "Scheduling", icon: <CalendarClock className="inline mb-1 mr-1" size={18}/> },
  { name: "Invoice", label: "Invoicing", icon: <Receipt className="inline mb-1 mr-1" size={18}/> },
];

export default function Home() {
  const [activeTab, setActiveTab] = useState("CRM");
  const [customers, setCustomers] = useState<string[]>([]);
  const [customerName, setCustomerName] = useState("");
  const [quoteInput, setQuoteInput] = useState("");
  const [quote, setQuote] = useState<string | null>(null);
  const [schedule, setSchedule] = useState<string | null>(null);
  const [invoicePaid, setInvoicePaid] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  function showToast(msg: string) {
    setToast(msg);
    setTimeout(() => setToast(null), 2000);
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-blue-100 px-2 font-inter">
      {/* Toast notification */}
      {toast && (
        <div className="fixed left-1/2 top-8 z-50 transform -translate-x-1/2 bg-blue-600 text-white px-8 py-3 rounded-2xl shadow-lg font-semibold animate-bounce text-base tracking-wide">
          {toast}
        </div>
      )}
      <div className="bg-white/95 backdrop-blur-md p-10 rounded-3xl shadow-2xl w-full max-w-2xl relative border border-blue-100">
        <h1 className="text-4xl font-extrabold mb-8 text-center text-gray-900 tracking-tight font-montserrat drop-shadow-lg">
          <span className="text-blue-700">HausVac</span> FSM Platform
        </h1>
        <div className="flex justify-center mb-8 gap-3 flex-wrap">
          {tabs.map((tab) => (
            <button
              key={tab.name}
              onClick={() => setActiveTab(tab.name)}
              className={`flex items-center px-5 py-2 rounded-xl font-semibold text-lg transition-all shadow-sm
                ${activeTab === tab.name
                  ? "bg-blue-700 text-white shadow-lg"
                  : "bg-white text-blue-800 border border-blue-100 hover:bg-blue-50"}
              `}
              style={{minWidth: 135}}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>

        {/* CRM TAB */}
        {activeTab === "CRM" && (
          <div className="text-center animate-fadeIn">
            <h2 className="text-2xl font-bold mb-4 font-montserrat text-blue-800">Customer Relationship Manager</h2>
            <div className="flex items-center justify-center gap-2 mb-4">
              <input
                type="text"
                value={customerName}
                onChange={e => setCustomerName(e.target.value)}
                placeholder="Add new customer"
                className="border rounded-xl px-4 py-2 focus:outline-none focus:ring focus:border-blue-400 transition bg-gray-50 text-gray-900"
                autoFocus
              />
              <button
                className="bg-blue-600 text-white px-5 py-2 rounded-xl hover:bg-blue-700 transition font-semibold"
                onClick={() => {
                  if (customerName) {
                    setCustomers([...customers, customerName]);
                    setCustomerName("");
                    showToast("Customer added!");
                  }
                }}
              >
                Add
              </button>
            </div>
            <ul className="mt-2 flex flex-col items-center gap-2">
              {customers.map((name, idx) => (
                <li key={idx} className="text-gray-800 bg-gray-100 px-5 py-2 rounded-xl w-full max-w-xs flex justify-between items-center shadow-sm font-medium">
                  {name}
                  <button
                    className="text-red-500 hover:underline text-xs"
                    onClick={() => {
                      setCustomers(customers.filter((_, i) => i !== idx));
                      showToast("Customer deleted");
                    }}
                  >Delete</button>
                </li>
              ))}
              {customers.length === 0 && <li className="text-gray-400 text-sm">No customers yet.</li>}
            </ul>
          </div>
        )}

        {/* QUOTING TAB */}
        {activeTab === "Quote" && (
          <div className="text-center animate-fadeIn">
            <h2 className="text-2xl font-bold mb-5 font-montserrat text-blue-800">Instant AI Quote Generator</h2>
            <div className="flex gap-2 items-center justify-center mb-5 flex-wrap">
              <input
                type="text"
                value={quoteInput}
                onChange={e => setQuoteInput(e.target.value)}
                placeholder="Describe your request (e.g. 3 bedrooms, AC fitting)"
                className="border rounded-xl px-4 py-2 w-full max-w-md focus:outline-none focus:ring focus:border-blue-400 transition bg-gray-50 text-gray-900"
                autoFocus
              />
              <button
                className="bg-green-600 text-white px-5 py-2 rounded-xl hover:bg-green-700 transition font-semibold disabled:opacity-60"
                disabled={loading}
                onClick={async () => {
                  setLoading(true);
                  setQuote(null);
                  const prompt =
                    quoteInput.trim().length > 0
                      ? quoteInput
                      : "Generate a quote for a central vacuum installation in a 4-bedroom house in the Hamptons.";
                  try {
                    const res = await fetch("/api/quote", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({ prompt }),
                    });
                    const data = await res.json();
                    if (data.quote) setQuote(data.quote);
                    else setQuote("Sorry, could not generate quote.");
                  } catch (e) {
                    setQuote("Error connecting to AI service.");
                  }
                  setLoading(false);
                  showToast("Quote generated!");
                }}
              >
                {loading ? "Generating..." : "Generate Quote"}
              </button>
            </div>
            <div className="flex justify-center">
              {quote && (
                <div
                  className="bg-green-50 border border-green-300 rounded-2xl shadow-lg p-8 mt-2 text-left w-full max-w-xl font-medium text-green-900 text-lg whitespace-pre-line leading-relaxed font-inter animate-fadeIn"
                  style={{
                    fontFamily: "Inter, Montserrat, Arial, sans-serif",
                    color: "#222",
                  }}
                >
                  {quote}
                </div>
              )}
            </div>
          </div>
        )}

        {/* SCHEDULING TAB */}
        {activeTab === "Schedule" && (
          <div className="text-center animate-fadeIn">
            <h2 className="text-2xl font-bold mb-4 font-montserrat text-blue-800">Smart Scheduling</h2>
            <button
              className="bg-purple-600 text-white px-5 py-2 rounded-xl hover:bg-purple-700 transition font-semibold disabled:opacity-60"
              disabled={loading}
              onClick={() => {
                setLoading(true);
                setTimeout(() => {
                  setSchedule("Next available: Thurs 3pm");
                  setLoading(false);
                  showToast("Slot found!");
                }, 800);
              }}
            >
              {loading ? "Finding..." : "Find Slot"}
            </button>
            {schedule && <div className="mt-4 text-lg text-purple-700 font-semibold">{schedule}</div>}
          </div>
        )}

        {/* INVOICING TAB */}
        {activeTab === "Invoice" && (
          <div className="text-center animate-fadeIn">
            <h2 className="text-2xl font-bold mb-4 font-montserrat text-blue-800">Invoicing & Payments</h2>
            <button
              className={`px-5 py-2 rounded-xl font-semibold ${invoicePaid ? "bg-gray-400" : "bg-yellow-500 hover:bg-yellow-600"} text-white transition`}
              disabled={invoicePaid}
              onClick={() => {
                setInvoicePaid(true);
                showToast("Invoice marked as paid!");
              }}
            >
              {invoicePaid ? "Invoice Paid" : "Mark as Paid"}
            </button>
            {invoicePaid && <div className="mt-4 text-lg text-green-700 font-semibold">Payment received. Thank you!</div>}
          </div>
        )}
      </div>
      {/* Animations + Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;900&family=Montserrat:wght@700;900&display=swap');
        .font-montserrat { font-family: 'Montserrat', Inter, Arial, sans-serif; }
        .font-inter { font-family: 'Inter', Arial, sans-serif; }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px);}
          to { opacity: 1; transform: none;}
        }
        .animate-fadeIn { animation: fadeIn 0.4s;}
      `}</style>
    </main>
  );
}
