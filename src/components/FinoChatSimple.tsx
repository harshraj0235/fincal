import React from 'react';

const FinoChatSimple: React.FC = () => {
  console.log('FinoChatSimple component is loading...');
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h1 className="text-3xl font-bold text-center text-blue-600 mb-8">
            🤖 Fino Finance Chat - Simple Test
          </h1>
          <div className="text-center">
            <p className="text-lg text-gray-600 mb-4">
              This is a simplified version of the Fino chat component to test if the issue is with component complexity.
            </p>
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
              ✅ FinoChatSimple component is working!
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinoChatSimple;
