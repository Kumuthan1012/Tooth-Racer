
import React, { useState } from 'react';

const Contact: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-16">
      <h1 className="game-font text-4xl text-blue-600 mb-8 text-center">Contact Us</h1>
      
      {submitted ? (
        <div className="bg-green-50 border border-green-200 p-12 rounded-2xl text-center">
          <div className="text-6xl mb-4">📧</div>
          <h2 className="text-2xl font-bold text-green-800 mb-2">Message Received!</h2>
          <p className="text-green-700">Thanks for reaching out. Our team will get back to you soon.</p>
          <button 
            onClick={() => setSubmitted(false)}
            className="mt-6 text-green-600 font-bold hover:underline"
          >
            Send another message
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-3xl border border-gray-100 shadow-xl">
          <p className="text-gray-600 text-center mb-8">Have a business inquiry or just want to say hi? Use the form below!</p>
          
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Name</label>
            <input required type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all" placeholder="Your Name" />
          </div>
          
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Email Address</label>
            <input required type="email" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all" placeholder="you@example.com" />
          </div>
          
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Message</label>
            <textarea required rows={4} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all" placeholder="How can we help?"></textarea>
          </div>
          
          <button type="submit" className="w-full py-4 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-xl shadow-lg transition-all">
            Send Message
          </button>
        </form>
      )}
    </div>
  );
};

export default Contact;
