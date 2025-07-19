import React from 'react';
import { Link, useParams } from 'react-router-dom';

const ToolPlaceholder: React.FC = () => {
  const { toolId } = useParams<{ toolId: string }>();
  const toolName = toolId ? toolId.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()) : 'Tool';
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 to-blue-200 p-6">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
        <div className="text-5xl mb-4 animate-bounce">🚧</div>
        <h1 className="text-2xl font-bold text-blue-900 mb-2">{toolName}</h1>
        <p className="text-blue-700 mb-6">This tool is coming soon! We’re working hard to make it awesome and easy to use on all devices.</p>
        <Link to="/" className="btn bg-blue-600 text-white hover:bg-blue-700 px-6 py-2 rounded-xl shadow-md transition-all">Back to Tool Hub</Link>
      </div>
    </div>
  );
};

export default ToolPlaceholder; 