import React from 'react';

const FinoHomeSimple: React.FC = () => {
  console.log('FinoHomeSimple component is loading...');
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h1 className="text-4xl font-bold text-center text-purple-600 mb-8">
            🏠 Fino Finance Chat - Home Simple Test
          </h1>
          <div className="text-center">
            <p className="text-lg text-gray-600 mb-4">
              This is a simplified version of the Fino home component to test if the issue is with component complexity.
            </p>
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
              ✅ FinoHomeSimple component is working!
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinoHomeSimple;
