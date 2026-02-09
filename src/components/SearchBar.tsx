import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X } from 'lucide-react';
import { getAllCalculators } from '../data/calculatorData';

interface SearchBarProps {
  onClose?: () => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState<Array<{id: string; name: string; category: string}>>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);
  
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setResults([]);
      return;
    }
    
    const allCalculators = getAllCalculators();
    const filteredResults = allCalculators.filter(calculator => 
      calculator.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      calculator.keywords.some(keyword => 
        keyword.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
    
    setResults(filteredResults);
  }, [searchTerm]);
  
  const handleSelect = (calculatorId: string) => {
    navigate(`/calculators/${calculatorId}`);
    if (onClose) onClose();
  };
  
  return (
    <div className="w-full">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-neutral-400" />
        </div>
        <input
          ref={inputRef}
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for calculators..."
          className="input pl-10 pr-10"
        />
        {searchTerm && (
          <button
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
            onClick={() => setSearchTerm('')}
          >
            <X className="h-5 w-5 text-neutral-400" />
          </button>
        )}
      </div>
      
      {results.length > 0 && (
        <div className="mt-2 bg-white rounded-lg shadow-lg max-h-80 overflow-y-auto">
          <ul>
            {results.map(result => (
              <li key={result.id}>
                <button
                  onClick={() => handleSelect(result.id)}
                  className="w-full text-left px-4 py-3 hover:bg-neutral-100 transition-colors border-b border-neutral-100 last:border-b-0"
                >
                  <span className="block font-medium text-neutral-800">{result.name}</span>
                  <span className="text-sm text-neutral-500">{result.category}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
      
      {searchTerm && results.length === 0 && (
        <div className="mt-2 p-4 text-center text-neutral-600 bg-neutral-50 rounded-lg">
          No calculators found for "{searchTerm}"
        </div>
      )}
    </div>
  );
};