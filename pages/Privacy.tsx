
import React from 'react';

const Privacy: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <h1 className="game-font text-3xl text-blue-600 mb-8">Privacy Policy</h1>
      <div className="space-y-6 text-gray-700 leading-relaxed">
        <p>This Privacy Policy describes how your personal information is collected, used, and shared when you visit Tooth Racer.</p>
        
        <h2 className="font-bold text-xl">Google AdSense and DoubleClick Cookie</h2>
        <p>
          Google, as a third-party vendor, uses cookies to serve ads on our site. Google's use of the DoubleClick cookie enables it and its partners to serve ads to our users based on their visit to our site and/or other sites on the Internet.
          Users may opt-out of the use of the DoubleClick cookie for interest-based advertising by visiting Ad Settings.
        </p>

        <h2 className="font-bold text-xl">Log Files</h2>
        <p>
          Tooth Racer follows a standard procedure of using log files. These files log visitors when they visit websites. The information collected by log files include internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks.
        </p>

        <h2 className="font-bold text-xl">Local Storage</h2>
        <p>
          We use browser Local Storage to save your highest scores locally on your device. This data is not transmitted to our servers and is only used to display your personal records.
        </p>

        <h2 className="font-bold text-xl">Contact Us</h2>
        <p>If you have any questions about this Privacy Policy, please contact us via our contact page.</p>
      </div>
    </div>
  );
};

export default Privacy;
