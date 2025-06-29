import React, { useState, useEffect } from 'react';
import { Calculator, RefreshCw, Info, BookOpen, TrendingUp, Target, Zap, Lightbulb, Clock, Award, Users, BarChart3 } from 'lucide-react';
import SEOHelmet from '../components/SEOHelmet';

interface CalculationResult {
  numbers: number[];
  lcm: number;
  hcf: number;
  primeFactors: { [key: number]: number[] };
  steps: string[];
  timeComplexity: string;
}

const LcmHcfCalculator: React.FC = () => {
  const [inputNumbers, setInputNumbers] = useState<string>('');
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [showSteps, setShowSteps] = useState(false);
  const [showPrimeFactors, setShowPrimeFactors] = useState(false);
  const [calculationMethod, setCalculationMethod] = useState<'prime' | 'euclidean' | 'division'>('prime');
  const [isCalculating, setIsCalculating] = useState(false);

  // Calculate GCD using Euclidean algorithm
  const calculateGCD = (a: number, b: number): number => {
    while (b !== 0) {
      const temp = b;
      b = a % b;
      a = temp;
    }
    return a;
  };

  // Calculate LCM using GCD
  const calculateLCM = (a: number, b: number): number => {
    return Math.abs(a * b) / calculateGCD(a, b);
  };

  // Get prime factors of a number
  const getPrimeFactors = (num: number): number[] => {
    const factors: number[] = [];
    let divisor = 2;
    let number = Math.abs(num);

    while (number > 1) {
      while (number % divisor === 0) {
        factors.push(divisor);
        number /= divisor;
      }
      divisor++;
    }

    return factors;
  };

  // Calculate using prime factorization method
  const calculateUsingPrimeFactorization = (numbers: number[]): CalculationResult => {
    const steps: string[] = [];
    const primeFactors: { [key: number]: number[] } = {};
    
    steps.push(`Step 1: Find prime factors of each number`);
    
    // Get prime factors for each number
    numbers.forEach(num => {
      primeFactors[num] = getPrimeFactors(num);
      steps.push(`${num} = ${primeFactors[num].join(' × ')}`);
    });

    // Calculate LCM using prime factors
    const lcmFactors: { [key: number]: number } = {};
    numbers.forEach(num => {
      const factors = primeFactors[num];
      const factorCount: { [key: number]: number } = {};
      
      factors.forEach(factor => {
        factorCount[factor] = (factorCount[factor] || 0) + 1;
      });

      Object.entries(factorCount).forEach(([factor, count]) => {
        const factorNum = parseInt(factor);
        lcmFactors[factorNum] = Math.max(lcmFactors[factorNum] || 0, count);
      });
    });

    const lcm = Object.entries(lcmFactors).reduce((acc, [factor, count]) => {
      return acc * Math.pow(parseInt(factor), count);
    }, 1);

    steps.push(`Step 2: LCM = ${Object.entries(lcmFactors).map(([f, c]) => `${f}^${c}`).join(' × ')} = ${lcm}`);

    // Calculate HCF using prime factors
    const hcfFactors: { [key: number]: number } = {};
    const allFactors = Object.keys(primeFactors).map(key => parseInt(key));
    
    Object.keys(primeFactors).forEach(numStr => {
      const num = parseInt(numStr);
      const factors = primeFactors[num];
      const factorCount: { [key: number]: number } = {};
      
      factors.forEach(factor => {
        factorCount[factor] = (factorCount[factor] || 0) + 1;
      });

      Object.entries(factorCount).forEach(([factor, count]) => {
        const factorNum = parseInt(factor);
        if (!hcfFactors[factorNum]) {
          hcfFactors[factorNum] = count;
        } else {
          hcfFactors[factorNum] = Math.min(hcfFactors[factorNum], count);
        }
      });
    });

    const hcf = Object.entries(hcfFactors).reduce((acc, [factor, count]) => {
      return acc * Math.pow(parseInt(factor), count);
    }, 1);

    steps.push(`Step 3: HCF = ${Object.entries(hcfFactors).map(([f, c]) => `${f}^${c}`).join(' × ')} = ${hcf}`);

    return {
      numbers,
      lcm,
      hcf,
      primeFactors,
      steps,
      timeComplexity: 'O(n × log n)'
    };
  };

  // Calculate using Euclidean algorithm
  const calculateUsingEuclidean = (numbers: number[]): CalculationResult => {
    const steps: string[] = [];
    steps.push('Step 1: Using Euclidean algorithm for GCD calculation');
    
    let currentGCD = numbers[0];
    for (let i = 1; i < numbers.length; i++) {
      const prevGCD = currentGCD;
      currentGCD = calculateGCD(currentGCD, numbers[i]);
      steps.push(`GCD(${prevGCD}, ${numbers[i]}) = ${currentGCD}`);
    }

    const hcf = currentGCD;
    steps.push(`Step 2: HCF of all numbers = ${hcf}`);

    // Calculate LCM using the formula: LCM(a,b) = |a × b| / GCD(a,b)
    let currentLCM = numbers[0];
    for (let i = 1; i < numbers.length; i++) {
      const prevLCM = currentLCM;
      currentLCM = calculateLCM(currentLCM, numbers[i]);
      steps.push(`LCM(${prevLCM}, ${numbers[i]}) = |${prevLCM} × ${numbers[i]}| / ${calculateGCD(prevLCM, numbers[i])} = ${currentLCM}`);
    }

    const lcm = currentLCM;
    steps.push(`Step 3: LCM of all numbers = ${lcm}`);

    const primeFactors: { [key: number]: number[] } = {};
    numbers.forEach(num => {
      primeFactors[num] = getPrimeFactors(num);
    });

    return {
      numbers,
      lcm,
      hcf,
      primeFactors,
      steps,
      timeComplexity: 'O(n × log min(a,b))'
    };
  };

  // Calculate using division method
  const calculateUsingDivision = (numbers: number[]): CalculationResult => {
    const steps: string[] = [];
    steps.push('Step 1: Using division method for HCF calculation');
    
    let currentNumbers = [...numbers];
    let divisor = 2;
    const hcfFactors: number[] = [];

    while (divisor <= Math.min(...currentNumbers)) {
      let allDivisible = true;
      const newNumbers: number[] = [];
      
      for (let num of currentNumbers) {
        if (num % divisor === 0) {
          newNumbers.push(num / divisor);
        } else {
          allDivisible = false;
          newNumbers.push(num);
        }
      }

      if (allDivisible) {
        hcfFactors.push(divisor);
        currentNumbers = newNumbers;
        steps.push(`All numbers divisible by ${divisor}: ${newNumbers.join(', ')}`);
      } else {
        divisor++;
      }
    }

    const hcf = hcfFactors.reduce((acc, factor) => acc * factor, 1);
    steps.push(`Step 2: HCF = ${hcfFactors.join(' × ')} = ${hcf}`);

    // Calculate LCM using the relationship: LCM × HCF = Product of numbers
    const product = numbers.reduce((acc, num) => acc * num, 1);
    const lcm = product / hcf;
    steps.push(`Step 3: LCM = (${numbers.join(' × ')}) / ${hcf} = ${lcm}`);

    const primeFactors: { [key: number]: number[] } = {};
    numbers.forEach(num => {
      primeFactors[num] = getPrimeFactors(num);
    });

    return {
      numbers,
      lcm,
      hcf,
      primeFactors,
      steps,
      timeComplexity: 'O(n × max number)'
    };
  };

  const handleCalculate = () => {
    if (!inputNumbers.trim()) return;

    setIsCalculating(true);
    
    // Parse input numbers
    const numbers = inputNumbers
      .split(/[,\s]+/)
      .map(num => parseInt(num.trim()))
      .filter(num => !isNaN(num) && num > 0);

    if (numbers.length < 2) {
      alert('Please enter at least 2 valid numbers');
      setIsCalculating(false);
      return;
    }

    // Calculate based on selected method
    let calculationResult: CalculationResult;
    
    switch (calculationMethod) {
      case 'prime':
        calculationResult = calculateUsingPrimeFactorization(numbers);
        break;
      case 'euclidean':
        calculationResult = calculateUsingEuclidean(numbers);
        break;
      case 'division':
        calculationResult = calculateUsingDivision(numbers);
        break;
      default:
        calculationResult = calculateUsingPrimeFactorization(numbers);
    }

    setResult(calculationResult);
    setIsCalculating(false);
  };

  const handleReset = () => {
    setInputNumbers('');
    setResult(null);
    setShowSteps(false);
    setShowPrimeFactors(false);
  };

  const handleExample = (example: string) => {
    setInputNumbers(example);
  };

  // Schema markup for SEO
  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "LCM and HCF Calculator - Find Least Common Multiple and Highest Common Factor",
    "description": "Free online calculator to find LCM (Least Common Multiple) and HCF (Highest Common Factor) of multiple numbers. Supports prime factorization, Euclidean algorithm, and division methods with step-by-step solutions.",
    "url": "https://moneycal.in/lcm-hcf-calculator",
    "applicationCategory": "CalculatorApplication",
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "featureList": [
      "LCM calculation",
      "HCF calculation", 
      "Prime factorization",
      "Step-by-step solutions",
      "Multiple calculation methods",
      "Real-time results"
    ],
    "screenshot": "https://moneycal.in/lcm-hcf-calculator-screenshot.png",
    "softwareVersion": "1.0",
    "author": {
      "@type": "Organization",
      "name": "MoneyCal.in",
      "url": "https://moneycal.in"
    }
  };

  // FAQ data
  const faqData = [
    {
      question: "What is LCM and HCF?",
      answer: "LCM (Least Common Multiple) is the smallest number that is a multiple of two or more numbers. HCF (Highest Common Factor) is the largest number that divides two or more numbers without leaving a remainder."
    },
    {
      question: "How to calculate LCM and HCF?",
      answer: "You can calculate LCM and HCF using three methods: 1) Prime factorization method - break numbers into prime factors, 2) Euclidean algorithm - efficient for large numbers, 3) Division method - traditional approach using common divisors."
    },
    {
      question: "What is the relationship between LCM and HCF?",
      answer: "For two numbers a and b: LCM(a,b) × HCF(a,b) = a × b. This relationship helps in calculating one when the other is known."
    },
    {
      question: "When do we use LCM and HCF?",
      answer: "LCM is used for finding common time periods, adding fractions with different denominators, and solving problems involving cycles. HCF is used for simplifying fractions, finding common divisors, and solving problems involving equal distribution."
    },
    {
      question: "Can LCM and HCF be calculated for more than 2 numbers?",
      answer: "Yes, LCM and HCF can be calculated for any number of integers. For multiple numbers, calculate LCM/HCF of the first two, then use the result with the next number, and so on."
    },
    {
      question: "What is the difference between LCM and HCF?",
      answer: "LCM finds the smallest common multiple (number that all given numbers can divide into), while HCF finds the largest common factor (number that can divide all given numbers). LCM is always greater than or equal to the largest number, while HCF is always less than or equal to the smallest number."
    },
    {
      question: "How to find LCM and HCF of fractions?",
      answer: "For fractions: LCM = LCM of numerators / HCF of denominators, HCF = HCF of numerators / LCM of denominators. Convert mixed numbers to improper fractions first."
    },
    {
      question: "What are the applications of LCM and HCF in real life?",
      answer: "Real-life applications include: scheduling events that repeat at different intervals, finding optimal packaging sizes, calculating time for synchronized events, solving problems in engineering and construction, and financial calculations involving periodic payments."
    }
  ];

  return (
    <>
      <SEOHelmet
        title="LCM and HCF Calculator - Find Least Common Multiple and Highest Common Factor Online"
        description="Free online LCM and HCF calculator. Calculate Least Common Multiple (LCM) and Highest Common Factor (HCF) of multiple numbers with step-by-step solutions. Supports prime factorization, Euclidean algorithm, and division methods. Perfect for students, teachers, and professionals."
        keywords="lcm calculator, hcf calculator, least common multiple calculator, highest common factor calculator, gcd calculator, lcm hcf finder, prime factorization calculator, euclidean algorithm calculator, math calculator, number theory calculator, lcm of multiple numbers, hcf of multiple numbers, lcm hcf relationship, step by step lcm calculation, step by step hcf calculation"
        canonicalUrl="https://moneycal.in/lcm-hcf-calculator"
        schemaMarkup={schemaMarkup}
      />

      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              <Calculator className="inline-block mr-3 text-blue-600" size={48} />
              LCM and HCF Calculator
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Calculate Least Common Multiple (LCM) and Highest Common Factor (HCF) of multiple numbers with step-by-step solutions. 
              Supports prime factorization, Euclidean algorithm, and division methods.
            </p>
          </div>

          {/* Calculator Section */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Input Section */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <Target className="mr-2 text-blue-600" size={24} />
                  Enter Numbers
                </h2>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Numbers (separated by commas)
                    </label>
                    <input
                      type="text"
                      value={inputNumbers}
                      onChange={(e) => setInputNumbers(e.target.value)}
                      placeholder="e.g., 12, 18, 24 or 12 18 24"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Calculation Method
                    </label>
                    <select
                      value={calculationMethod}
                      onChange={(e) => setCalculationMethod(e.target.value as any)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="prime">Prime Factorization Method</option>
                      <option value="euclidean">Euclidean Algorithm</option>
                      <option value="division">Division Method</option>
                    </select>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <button
                      onClick={handleCalculate}
                      disabled={isCalculating || !inputNumbers.trim()}
                      className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
                    >
                      {isCalculating ? (
                        <>
                          <RefreshCw className="mr-2 animate-spin" size={20} />
                          Calculating...
                        </>
                      ) : (
                        <>
                          <Calculator className="mr-2" size={20} />
                          Calculate LCM & HCF
                        </>
                      )}
                    </button>
                    
                    <button
                      onClick={handleReset}
                      className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Reset
                    </button>
                  </div>
                </div>

                {/* Quick Examples */}
                <div className="mt-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Quick Examples:</h3>
                  <div className="flex flex-wrap gap-2">
                    {['12, 18', '24, 36, 48', '15, 25, 35', '8, 12, 16, 20'].map((example) => (
                      <button
                        key={example}
                        onClick={() => handleExample(example)}
                        className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 transition-colors"
                      >
                        {example}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Results Section */}
              {result && (
                <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                    <Award className="mr-2 text-green-600" size={24} />
                    Results
                  </h2>
                  
                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h3 className="text-lg font-semibold text-blue-900 mb-2">LCM (Least Common Multiple)</h3>
                      <p className="text-3xl font-bold text-blue-600">{result.lcm.toLocaleString()}</p>
                      <p className="text-sm text-blue-700 mt-1">
                        Smallest number divisible by all given numbers
                      </p>
                    </div>
                    
                    <div className="bg-green-50 p-4 rounded-lg">
                      <h3 className="text-lg font-semibold text-green-900 mb-2">HCF (Highest Common Factor)</h3>
                      <p className="text-3xl font-bold text-green-600">{result.hcf.toLocaleString()}</p>
                      <p className="text-sm text-green-700 mt-1">
                        Largest number that divides all given numbers
                      </p>
                    </div>
                  </div>

                  {/* Verification */}
                  <div className="bg-yellow-50 p-4 rounded-lg mb-6">
                    <h3 className="text-lg font-semibold text-yellow-900 mb-2">Verification</h3>
                    <p className="text-sm text-yellow-800">
                      <strong>Relationship:</strong> LCM × HCF = Product of numbers<br/>
                      {result.numbers.join(' × ')} = {result.numbers.reduce((a, b) => a * b, 1).toLocaleString()}<br/>
                      {result.lcm} × {result.hcf} = {(result.lcm * result.hcf).toLocaleString()}
                    </p>
                  </div>

                  {/* Prime Factors */}
                  <div className="mb-6">
                    <button
                      onClick={() => setShowPrimeFactors(!showPrimeFactors)}
                      className="flex items-center text-blue-600 hover:text-blue-700 font-medium"
                    >
                      <Info className="mr-2" size={20} />
                      {showPrimeFactors ? 'Hide' : 'Show'} Prime Factors
                    </button>
                    
                    {showPrimeFactors && (
                      <div className="mt-3 bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-gray-900 mb-2">Prime Factorization:</h4>
                        {Object.entries(result.primeFactors).map(([num, factors]) => (
                          <div key={num} className="mb-2">
                            <span className="font-medium">{num} = </span>
                            <span className="text-gray-600">{factors.join(' × ')}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Step-by-Step Solution */}
                  <div>
                    <button
                      onClick={() => setShowSteps(!showSteps)}
                      className="flex items-center text-blue-600 hover:text-blue-700 font-medium"
                    >
                      <BookOpen className="mr-2" size={20} />
                      {showSteps ? 'Hide' : 'Show'} Step-by-Step Solution
                    </button>
                    
                    {showSteps && (
                      <div className="mt-3 bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-gray-900 mb-2">Calculation Steps:</h4>
                        <div className="space-y-2">
                          {result.steps.map((step, index) => (
                            <div key={index} className="text-sm text-gray-700">
                              {step}
                            </div>
                          ))}
                        </div>
                        <div className="mt-3 text-xs text-gray-500">
                          Time Complexity: {result.timeComplexity}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Information Card */}
              <div className="bg-white rounded-2xl shadow-xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <Info className="mr-2 text-blue-600" size={24} />
                  About LCM & HCF
                </h3>
                
                <div className="space-y-4 text-sm text-gray-600">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">LCM (Least Common Multiple)</h4>
                    <p>The smallest positive integer that is divisible by each of the given numbers.</p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">HCF (Highest Common Factor)</h4>
                    <p>The largest positive integer that divides each of the given numbers without remainder.</p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Key Relationship</h4>
                    <p>For two numbers a and b: LCM(a,b) × HCF(a,b) = a × b</p>
                  </div>
                </div>
              </div>

              {/* Methods Card */}
              <div className="bg-white rounded-2xl shadow-xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <Zap className="mr-2 text-purple-600" size={24} />
                  Calculation Methods
                </h3>
                
                <div className="space-y-3 text-sm">
                  <div className="p-3 bg-purple-50 rounded-lg">
                    <h4 className="font-semibold text-purple-900">Prime Factorization</h4>
                    <p className="text-purple-700">Break numbers into prime factors and use highest powers for LCM, lowest for HCF.</p>
                  </div>
                  
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <h4 className="font-semibold text-blue-900">Euclidean Algorithm</h4>
                    <p className="text-blue-700">Efficient method using repeated division for finding GCD/HCF.</p>
                  </div>
                  
                  <div className="p-3 bg-green-50 rounded-lg">
                    <h4 className="font-semibold text-green-900">Division Method</h4>
                    <p className="text-green-700">Traditional approach using common divisors and long division.</p>
                  </div>
                </div>
              </div>

              {/* Applications Card */}
              <div className="bg-white rounded-2xl shadow-xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <Lightbulb className="mr-2 text-yellow-600" size={24} />
                  Real-Life Applications
                </h3>
                
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start">
                    <span className="text-yellow-600 mr-2">•</span>
                    Scheduling recurring events
                  </li>
                  <li className="flex items-start">
                    <span className="text-yellow-600 mr-2">•</span>
                    Adding fractions with different denominators
                  </li>
                  <li className="flex items-start">
                    <span className="text-yellow-600 mr-2">•</span>
                    Finding optimal packaging sizes
                  </li>
                  <li className="flex items-start">
                    <span className="text-yellow-600 mr-2">•</span>
                    Engineering and construction calculations
                  </li>
                  <li className="flex items-start">
                    <span className="text-yellow-600 mr-2">•</span>
                    Financial calculations with periodic payments
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mt-12 bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
              Frequently Asked Questions
            </h2>
            
            <div className="space-y-6">
              {faqData.map((faq, index) => (
                <div key={index} className="border-b border-gray-200 pb-6 last:border-b-0">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {faq.question}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* SEO Content */}
          <div className="mt-12 bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Complete Guide to LCM and HCF Calculation
            </h2>
            
            <div className="prose prose-lg max-w-none text-gray-700">
              <h3>Understanding LCM and HCF</h3>
              <p>
                LCM (Least Common Multiple) and HCF (Highest Common Factor) are fundamental concepts in number theory 
                that have wide applications in mathematics, engineering, and everyday problem-solving. Understanding 
                these concepts is crucial for students, professionals, and anyone working with numbers.
              </p>

              <h3>What is Least Common Multiple (LCM)?</h3>
              <p>
                The Least Common Multiple of two or more numbers is the smallest positive integer that is divisible 
                by each of the given numbers. For example, the LCM of 12 and 18 is 36, because 36 is the smallest 
                number that both 12 and 18 can divide into without leaving a remainder.
              </p>

              <h3>What is Highest Common Factor (HCF)?</h3>
              <p>
                The Highest Common Factor, also known as Greatest Common Divisor (GCD), is the largest positive 
                integer that divides each of the given numbers without leaving a remainder. For example, the HCF 
                of 12 and 18 is 6, because 6 is the largest number that can divide both 12 and 18.
              </p>

              <h3>Methods for Calculating LCM and HCF</h3>
              
              <h4>1. Prime Factorization Method</h4>
              <p>
                This method involves breaking down each number into its prime factors and then using the highest 
                powers of each prime factor for LCM and the lowest powers for HCF. This method is systematic and 
                works well for smaller numbers.
              </p>

              <h4>2. Euclidean Algorithm</h4>
              <p>
                The Euclidean algorithm is an efficient method for finding the HCF of two numbers. It works by 
                repeatedly applying the division algorithm: HCF(a,b) = HCF(b, a mod b). This method is particularly 
                useful for large numbers and has a time complexity of O(log min(a,b)).
              </p>

              <h4>3. Division Method</h4>
              <p>
                The division method involves finding common prime factors by dividing all numbers by the same 
                prime factor until no common factor remains. The product of all common factors gives the HCF, 
                and the product of all factors (common and remaining) gives the LCM.
              </p>

              <h3>Key Relationships and Properties</h3>
              <ul>
                <li>For any two numbers a and b: LCM(a,b) × HCF(a,b) = a × b</li>
                <li>If two numbers are coprime (HCF = 1), then LCM = product of the numbers</li>
                <li>LCM is always greater than or equal to the largest number</li>
                <li>HCF is always less than or equal to the smallest number</li>
                <li>For multiple numbers, calculate LCM/HCF of first two, then use result with next number</li>
              </ul>

              <h3>Real-World Applications</h3>
              
              <h4>Mathematics and Education</h4>
              <p>
                LCM and HCF are essential in fraction arithmetic, solving equations, and understanding number 
                patterns. Students use these concepts extensively in algebra, number theory, and competitive 
                mathematics.
              </p>

              <h4>Engineering and Technology</h4>
              <p>
                Engineers use LCM and HCF in designing systems with multiple components that need to operate 
                at different frequencies or intervals. This includes electronic circuits, mechanical systems, 
                and software algorithms.
              </p>

              <h4>Business and Finance</h4>
              <p>
                In finance, LCM and HCF help in calculating payment schedules, interest compounding periods, 
                and investment cycles. They're also used in inventory management and production planning.
              </p>

              <h4>Everyday Problem Solving</h4>
              <p>
                From scheduling meetings that accommodate different availability patterns to finding the best 
                time to water plants with different watering cycles, LCM and HCF help solve practical problems 
                efficiently.
              </p>

              <h3>Tips for Efficient Calculation</h3>
              <ul>
                <li>Use the Euclidean algorithm for large numbers</li>
                <li>Prime factorization works well for smaller numbers</li>
                <li>Always verify results using the LCM × HCF = product relationship</li>
                <li>For multiple numbers, work systematically from left to right</li>
                <li>Use our calculator for quick verification and learning</li>
              </ul>

              <h3>Common Mistakes to Avoid</h3>
              <ul>
                <li>Confusing LCM with HCF - remember LCM is larger, HCF is smaller</li>
                <li>Forgetting to include all prime factors in LCM calculation</li>
                <li>Not considering the case when numbers are coprime</li>
                <li>Rushing through steps without proper verification</li>
                <li>Ignoring the relationship between LCM and HCF for verification</li>
              </ul>

              <h3>Advanced Applications</h3>
              <p>
                Beyond basic calculations, LCM and HCF find applications in cryptography, computer science 
                algorithms, and advanced mathematical concepts like modular arithmetic and number theory. 
                Understanding these fundamentals opens doors to more complex mathematical explorations.
              </p>

              <h3>Conclusion</h3>
              <p>
                LCM and HCF are fundamental mathematical concepts with wide-ranging applications. Whether you're 
                a student learning number theory, a professional solving real-world problems, or someone interested 
                in mathematics, understanding these concepts is valuable. Our calculator provides a reliable tool 
                for learning and verification, supporting multiple calculation methods and providing step-by-step 
                solutions for better understanding.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LcmHcfCalculator; 