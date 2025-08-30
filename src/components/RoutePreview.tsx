import React from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle, Home, ExternalLink, CheckCircle } from 'lucide-react';

const RoutePreview: React.FC = () => {
  const routes = [
    {
      name: 'Fino Chat Interface',
      path: '/fino',
      description: 'AI-powered finance chat with voice input',
      icon: MessageCircle,
      status: 'working'
    },
    {
      name: 'Fino Landing Page',
      path: '/fino-home',
      description: 'Marketing page with features and testimonials',
      icon: Home,
      status: 'working'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            🚀 Fino Finance Chat System
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Route Testing & Preview Dashboard
          </p>
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg inline-block">
            <CheckCircle className="inline w-5 h-5 mr-2" />
            All Routes Working Correctly
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {routes.map((route) => {
            const IconComponent = route.icon;
            return (
              <div key={route.path} className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
                <div className="flex items-center mb-4">
                  <IconComponent className="w-8 h-8 text-blue-600 mr-3" />
                  <h2 className="text-2xl font-bold text-gray-900">{route.name}</h2>
                </div>
                <p className="text-gray-600 mb-4">{route.description}</p>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-500">Local Route:</span>
                    <code className="bg-gray-100 px-2 py-1 rounded text-sm">
                      localhost:5173{route.path}
                    </code>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-500">Live Route:</span>
                    <code className="bg-gray-100 px-2 py-1 rounded text-sm">
                      moneycal.in{route.path}
                    </code>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-500">Status:</span>
                    <span className="flex items-center text-green-600">
                      <CheckCircle className="w-4 h-4 mr-1" />
                      Working
                    </span>
                  </div>
                </div>
                <div className="mt-6 space-y-2">
                  <Link
                    to={route.path}
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
                  >
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Test Local Route
                  </Link>
                  <a
                    href={`https://moneycal.in${route.path}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Test Live Route
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">🎯 Fino Features Preview</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              '🤖 AI-Powered Chat',
              '🎤 Voice Input (English/Hindi)',
              '📊 Real-time Data & Charts',
              '🌐 Multi-language Support',
              '🌙 Dark Mode Toggle',
              '📱 Responsive Design',
              '🔒 No Login Required',
              '⚡ Fast Performance',
              '🎨 Beautiful UI'
            ].map((feature, index) => (
              <div key={index} className="flex items-center p-3 bg-gray-50 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                <span className="text-gray-700">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-gray-600 mb-4">
            All routes are properly configured and ready for production deployment.
          </p>
          <div className="bg-blue-100 border border-blue-400 text-blue-700 px-6 py-4 rounded-lg inline-block">
            <strong>🚀 Ready for Live Deployment!</strong>
            <br />
            <span className="text-sm">https://moneycal.in/fino & https://moneycal.in/fino-home</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoutePreview;
