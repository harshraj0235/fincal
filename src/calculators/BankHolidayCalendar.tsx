import React, { useState } from 'react';
import { Calendar, ChevronLeft, ChevronRight, Filter, MapPin } from 'lucide-react';

interface Holiday {
  date: string;
  day: string;
  name: string;
  type: 'national' | 'state' | 'rbi' | 'weekend';
  states: string[];
}

export const BankHolidayCalendar: React.FC = () => {
  const [selectedMonth, setSelectedMonth] = useState<number>(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear());
  const [selectedState, setSelectedState] = useState<string>('All States');
  const [holidayType, setHolidayType] = useState<string>('all');
  
  // Sample data for demonstration
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  
  const states = [
    'All States', 'Andhra Pradesh', 'Delhi', 'Gujarat', 'Karnataka', 
    'Kerala', 'Maharashtra', 'Tamil Nadu', 'Telangana', 'Uttar Pradesh', 'West Bengal'
  ];
  
  // Sample holidays data
  const sampleHolidays: Holiday[] = [
    {
      date: '2025-01-01',
      day: 'Wednesday',
      name: 'New Year\'s Day',
      type: 'national',
      states: ['All States']
    },
    {
      date: '2025-01-14',
      day: 'Tuesday',
      name: 'Makar Sankranti / Pongal',
      type: 'state',
      states: ['Andhra Pradesh', 'Karnataka', 'Tamil Nadu', 'Telangana']
    },
    {
      date: '2025-01-26',
      day: 'Sunday',
      name: 'Republic Day',
      type: 'national',
      states: ['All States']
    },
    {
      date: '2025-02-19',
      day: 'Wednesday',
      name: 'Chhatrapati Shivaji Maharaj Jayanti',
      type: 'state',
      states: ['Maharashtra']
    },
    {
      date: '2025-03-02',
      day: 'Sunday',
      name: 'Weekend',
      type: 'weekend',
      states: ['All States']
    },
    {
      date: '2025-03-10',
      day: 'Monday',
      name: 'Holi',
      type: 'national',
      states: ['All States']
    },
    {
      date: '2025-04-14',
      day: 'Monday',
      name: 'Dr. Ambedkar Jayanti',
      type: 'national',
      states: ['All States']
    },
    {
      date: '2025-05-01',
      day: 'Thursday',
      name: 'May Day / Labour Day',
      type: 'state',
      states: ['Karnataka', 'Tamil Nadu', 'West Bengal']
    },
    {
      date: '2025-06-17',
      day: 'Tuesday',
      name: 'Rath Yatra',
      type: 'state',
      states: ['Odisha']
    },
    {
      date: '2025-08-15',
      day: 'Friday',
      name: 'Independence Day',
      type: 'national',
      states: ['All States']
    },
    {
      date: '2025-10-02',
      day: 'Thursday',
      name: 'Gandhi Jayanti',
      type: 'national',
      states: ['All States']
    },
    {
      date: '2025-10-23',
      day: 'Thursday',
      name: 'Dussehra',
      type: 'national',
      states: ['All States']
    },
    {
      date: '2025-11-12',
      day: 'Wednesday',
      name: 'Diwali',
      type: 'national',
      states: ['All States']
    },
    {
      date: '2025-12-25',
      day: 'Thursday',
      name: 'Christmas',
      type: 'national',
      states: ['All States']
    }
  ];
  
  // Filter holidays based on selected month, year, state, and type
  const filteredHolidays = sampleHolidays.filter(holiday => {
    const holidayDate = new Date(holiday.date);
    const monthMatch = holidayDate.getMonth() === selectedMonth;
    const yearMatch = holidayDate.getFullYear() === selectedYear;
    const stateMatch = selectedState === 'All States' || holiday.states.includes(selectedState) || holiday.states.includes('All States');
    const typeMatch = holidayType === 'all' || holiday.type === holidayType;
    
    return monthMatch && yearMatch && stateMatch && typeMatch;
  });
  
  // Sort holidays by date
  filteredHolidays.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  
  // Navigate to previous month
  const prevMonth = () => {
    if (selectedMonth === 0) {
      setSelectedMonth(11);
      setSelectedYear(selectedYear - 1);
    } else {
      setSelectedMonth(selectedMonth - 1);
    }
  };
  
  // Navigate to next month
  const nextMonth = () => {
    if (selectedMonth === 11) {
      setSelectedMonth(0);
      setSelectedYear(selectedYear + 1);
    } else {
      setSelectedMonth(selectedMonth + 1);
    }
  };
  
  // Get holiday type badge color
  const getHolidayTypeColor = (type: Holiday['type']) => {
    switch (type) {
      case 'national':
        return 'bg-[--primary-100] text-[--primary-800]';
      case 'state':
        return 'bg-[--success-100] text-[--success-800]';
      case 'rbi':
        return 'bg-[--warning-100] text-[--warning-800]';
      case 'weekend':
        return 'bg-neutral-100 text-neutral-800';
      default:
        return 'bg-neutral-100 text-neutral-800';
    }
  };
  
  // Generate calendar days
  const generateCalendarDays = () => {
    const firstDay = new Date(selectedYear, selectedMonth, 1);
    const lastDay = new Date(selectedYear, selectedMonth + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay(); // 0 = Sunday, 1 = Monday, etc.
    
    const days = [];
    const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    
    // Add weekday headers
    for (let i = 0; i < 7; i++) {
      days.push(
        <div key={`header-${i}`} className="text-center font-medium text-neutral-700 py-2">
          {weekdays[i]}
        </div>
      );
    }
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(<div key={`empty-${i}`} className="p-2"></div>);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(selectedYear, selectedMonth, day);
      const dateString = date.toISOString().split('T')[0];
      const isHoliday = sampleHolidays.some(h => 
        h.date === dateString && 
        (selectedState === 'All States' || h.states.includes(selectedState) || h.states.includes('All States'))
      );
      const isWeekend = date.getDay() === 0 || date.getDay() === 6;
      const isToday = new Date().toDateString() === date.toDateString();
      
      const holiday = sampleHolidays.find(h => 
        h.date === dateString && 
        (selectedState === 'All States' || h.states.includes(selectedState) || h.states.includes('All States'))
      );
      
      days.push(
        <div 
          key={`day-${day}`} 
          className={`p-2 text-center relative ${
            isHoliday 
              ? 'bg-[--error-50]' 
              : isWeekend 
                ? 'bg-neutral-50' 
                : ''
          } ${
            isToday ? 'border-2 border-[--primary-500]' : ''
          }`}
        >
          <span className={`inline-block w-7 h-7 leading-7 rounded-full ${
            isHoliday 
              ? 'bg-[--error-100] text-[--error-800]' 
              : isWeekend 
                ? 'bg-neutral-100 text-neutral-800' 
                : ''
          }`}>
            {day}
          </span>
          {holiday && (
            <div className="mt-1 text-xs text-[--error-700] truncate" title={holiday.name}>
              {holiday.name}
            </div>
          )}
        </div>
      );
    }
    
    return days;
  };
  
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-neutral-900 mb-4">Bank Holiday Calendar</h2>
        <p className="text-neutral-600">
          Plan your banking activities with our comprehensive calendar of bank holidays across all Indian states. Find out when banks are closed to avoid last-minute rushes and plan your financial transactions accordingly.
        </p>
      </div>

      {/* Filters Section */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div className="flex items-center mb-4 md:mb-0">
            <button onClick={prevMonth} className="p-2 rounded-lg hover:bg-neutral-100">
              <ChevronLeft className="h-5 w-5 text-neutral-600" />
            </button>
            <h3 className="text-xl font-semibold text-neutral-900 mx-4">
              {months[selectedMonth]} {selectedYear}
            </h3>
            <button onClick={nextMonth} className="p-2 rounded-lg hover:bg-neutral-100">
              <ChevronRight className="h-5 w-5 text-neutral-600" />
            </button>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="input"
            >
              {states.map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
            
            <select
              value={holidayType}
              onChange={(e) => setHolidayType(e.target.value)}
              className="input"
            >
              <option value="all">All Holidays</option>
              <option value="national">National Holidays</option>
              <option value="state">State Holidays</option>
              <option value="rbi">RBI Holidays</option>
              <option value="weekend">Weekends</option>
            </select>
          </div>
        </div>
        
        {/* Calendar View */}
        <div className="mb-6">
          <div className="grid grid-cols-7 gap-1">
            {generateCalendarDays()}
          </div>
        </div>
        
        {/* Legend */}
        <div className="flex flex-wrap gap-3 text-sm">
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-[--error-500] mr-1"></div>
            <span>Holiday</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-neutral-300 mr-1"></div>
            <span>Weekend</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full border-2 border-[--primary-500] mr-1"></div>
            <span>Today</span>
          </div>
        </div>
      </div>

      {/* Holidays List */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h3 className="text-lg font-semibold text-neutral-900 mb-4">
          {filteredHolidays.length > 0 
            ? `Bank Holidays in ${selectedState} for ${months[selectedMonth]} ${selectedYear}` 
            : `No bank holidays in ${selectedState} for ${months[selectedMonth]} ${selectedYear}`
          }
        </h3>
        
        {filteredHolidays.length > 0 ? (
          <div className="space-y-4">
            {filteredHolidays.map((holiday, index) => {
              const holidayDate = new Date(holiday.date);
              const formattedDate = holidayDate.toLocaleDateString('en-IN', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
              });
              
              return (
                <div key={index} className="flex items-start p-4 border border-neutral-200 rounded-lg">
                  <div className="flex-shrink-0 w-12 h-12 bg-[--error-100] rounded-lg flex flex-col items-center justify-center mr-4">
                    <span className="text-[--error-800] font-bold">{holidayDate.getDate()}</span>
                    <span className="text-[--error-600] text-xs">{holiday.day.substring(0, 3)}</span>
                  </div>
                  
                  <div className="flex-grow">
                    <h4 className="text-lg font-medium text-neutral-900">{holiday.name}</h4>
                    <p className="text-neutral-600 text-sm">{formattedDate}</p>
                    
                    <div className="mt-2 flex items-center">
                      <span className={`text-xs px-2 py-0.5 rounded-full ${getHolidayTypeColor(holiday.type)}`}>
                        {holiday.type.charAt(0).toUpperCase() + holiday.type.slice(1)}
                      </span>
                      
                      {holiday.type === 'state' && (
                        <div className="ml-2 flex items-center text-xs text-neutral-500">
                          <MapPin className="h-3 w-3 mr-1" />
                          {holiday.states.filter(s => s !== 'All States').join(', ')}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-8 bg-neutral-50 rounded-lg">
            <Calendar className="h-12 w-12 text-neutral-400 mx-auto mb-3" />
            <p className="text-neutral-600">No bank holidays found for the selected filters.</p>
            <p className="text-neutral-500 text-sm mt-1">Try changing the month, state, or holiday type.</p>
          </div>
        )}
      </div>

      {/* Information Section */}
      <div className="bg-[--primary-50] rounded-lg p-6 mb-8">
        <h3 className="text-lg font-semibold text-[--primary-900] mb-4">About Bank Holidays</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-[--primary-800] mb-2">Types of Bank Holidays</h4>
            <ul className="list-disc list-inside text-sm text-[--primary-700] space-y-1">
              <li><strong>National Holidays:</strong> Observed by all banks across India</li>
              <li><strong>State Holidays:</strong> Specific to certain states based on local festivals</li>
              <li><strong>RBI Holidays:</strong> Days when the Reserve Bank of India is closed</li>
              <li><strong>Weekend Holidays:</strong> Second and fourth Saturdays, all Sundays</li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium text-[--primary-800] mb-2">Important Notes</h4>
            <ul className="list-disc list-inside text-sm text-[--primary-700] space-y-1">
              <li>Online banking services remain operational on holidays</li>
              <li>ATMs and cash deposit machines are available 24/7</li>
              <li>UPI and mobile banking transactions work on holidays</li>
              <li>Transactions initiated on holidays are processed on the next working day</li>
              <li>Bank holidays may vary slightly between different banks</li>
            </ul>
          </div>
        </div>
      </div>

      {/* FAQs */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-neutral-900 mb-4">Frequently Asked Questions</h3>
        
        <div className="space-y-4">
          <details className="group">
            <summary className="flex justify-between items-center cursor-pointer p-4 rounded-lg bg-neutral-50 hover:bg-neutral-100">
              <h4 className="text-neutral-900 font-medium">Are bank holidays the same across all states in India?</h4>
              <span className="transition-transform duration-300 group-open:rotate-180">
                <svg className="w-5 h-5 text-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </span>
            </summary>
            <div className="p-4 text-neutral-600 text-sm">
              <p>No, bank holidays vary across states in India. While some holidays like Republic Day, Independence Day, and Gandhi Jayanti are observed nationwide, many holidays are state-specific based on local festivals and events.</p>
              <p className="mt-2">For example, Ganesh Chaturthi is a major bank holiday in Maharashtra but might be a working day in states like Punjab or West Bengal. Similarly, Durga Puja holidays are observed in West Bengal but not in many other states.</p>
              <p className="mt-2">This is why it's important to check the bank holiday calendar specific to your state when planning financial transactions.</p>
            </div>
          </details>
          
          <details className="group">
            <summary className="flex justify-between items-center cursor-pointer p-4 rounded-lg bg-neutral-50 hover:bg-neutral-100">
              <h4 className="text-neutral-900 font-medium">Do all banks follow the same holiday calendar?</h4>
              <span className="transition-transform duration-300 group-open:rotate-180">
                <svg className="w-5 h-5 text-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </span>
            </summary>
            <div className="p-4 text-neutral-600 text-sm">
              <p>All scheduled commercial banks, regional rural banks, and cooperative banks generally follow the holiday list declared by the Reserve Bank of India (RBI) and respective State Governments.</p>
              <p className="mt-2">However, there might be slight variations:</p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Some private banks might have additional working days on select holidays</li>
                <li>Certain bank branches in commercial areas might operate on otherwise holidays</li>
                <li>Foreign banks might observe some additional holidays specific to their home country</li>
              </ul>
              <p className="mt-2">It's always advisable to check with your specific bank branch if you have an urgent transaction on or around a holiday.</p>
            </div>
          </details>
          
          <details className="group">
            <summary className="flex justify-between items-center cursor-pointer p-4 rounded-lg bg-neutral-50 hover:bg-neutral-100">
              <h4 className="text-neutral-900 font-medium">Are weekends considered bank holidays?</h4>
              <span className="transition-transform duration-300 group-open:rotate-180">
                <svg className="w-5 h-5 text-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </span>
            </summary>
            <div className="p-4 text-neutral-600 text-sm">
              <p>For banks in India, the weekend holiday schedule is as follows:</p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li><strong>Sundays:</strong> All banks are closed every Sunday</li>
                <li><strong>Saturdays:</strong> Banks are closed on the second and fourth Saturdays of every month</li>
                <li><strong>Working Saturdays:</strong> Banks are open on the first, third, and fifth (if applicable) Saturdays of the month</li>
              </ul>
              <p className="mt-2">This schedule was implemented by the RBI in 2015. Prior to this, banks were open on all Saturdays except the last Saturday of the month.</p>
              <p className="mt-2">Note that even on holidays, digital banking services, ATMs, and mobile banking remain operational.</p>
            </div>
          </details>
          
          <details className="group">
            <summary className="flex justify-between items-center cursor-pointer p-4 rounded-lg bg-neutral-50 hover:bg-neutral-100">
              <h4 className="text-neutral-900 font-medium">Will online banking services be available during bank holidays?</h4>
              <span className="transition-transform duration-300 group-open:rotate-180">
                <svg className="w-5 h-5 text-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </span>
            </summary>
            <div className="p-4 text-neutral-600 text-sm">
              <p>Yes, online banking services remain operational during bank holidays. This includes:</p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Internet banking</li>
                <li>Mobile banking apps</li>
                <li>UPI transactions</li>
                <li>ATM services</li>
                <li>Debit and credit card transactions</li>
              </ul>
              <p className="mt-2">However, there are some limitations during holidays:</p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>NEFT transactions initiated on holidays will be processed on the next working day</li>
                <li>RTGS is available 24/7 but might have processing delays on holidays</li>
                <li>Cheque clearances won't happen on holidays</li>
                <li>Customer service might be limited to automated systems</li>
              </ul>
              <p className="mt-2">For time-sensitive transactions, it's advisable to initiate them before holidays or use instant payment methods like IMPS or UPI.</p>
            </div>
          </details>
        </div>
      </div>
    </div>
  );
};

export default BankHolidayCalendar;