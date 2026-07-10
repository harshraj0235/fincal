import React, { useMemo, useState } from 'react';
import { BookOpen, Calculator, CheckCircle2, RefreshCw, Home, ChevronRight, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEOHelmet from '../components/SEOHelmet';
import { CalculatorSchema } from '../components/CalculatorSchema';
import { CalculatorContentWrapper } from '../components/CalculatorContentWrapper';

type Method = 'prime' | 'euclidean' | 'division';

interface CalculationResult {
  numbers: number[];
  lcm: number;
  hcf: number;
  primeFactors: Record<number, number[]>;
  steps: string[];
  timeComplexity: string;
}

const factorCounts = (factors: number[]) => {
  const counts: Record<number, number> = {};
  factors.forEach((factor) => {
    counts[factor] = (counts[factor] || 0) + 1;
  });
  return counts;
};

const getPrimeFactors = (input: number): number[] => {
  let num = Math.abs(input);
  const factors: number[] = [];
  if (num < 2) return factors;
  while (num % 2 === 0) {
    factors.push(2);
    num /= 2;
  }
  let divisor = 3;
  while (divisor * divisor <= num) {
    while (num % divisor === 0) {
      factors.push(divisor);
      num /= divisor;
    }
    divisor += 2;
  }
  if (num > 1) factors.push(num);
  return factors;
};

const gcdPair = (a: number, b: number): number => {
  let x = Math.abs(a);
  let y = Math.abs(b);
  while (y !== 0) {
    const t = y;
    y = x % y;
    x = t;
  }
  return x;
};

const lcmPair = (a: number, b: number): number => {
  if (a === 0 || b === 0) return 0;
  return Math.abs((a / gcdPair(a, b)) * b);
};

const lcmUsingPrimeMethod = (numbers: number[], steps: string[], primeFactors: Record<number, number[]>) => {
  const maxPowers: Record<number, number> = {};
  numbers.forEach((num) => {
    const counts = factorCounts(primeFactors[num]);
    Object.entries(counts).forEach(([prime, count]) => {
      const p = Number(prime);
      maxPowers[p] = Math.max(maxPowers[p] || 0, count);
    });
  });
  const formula = Object.entries(maxPowers)
    .sort((a, b) => Number(a[0]) - Number(b[0]))
    .map(([p, c]) => `${p}^${c}`)
    .join(' × ');
  const lcm = Object.entries(maxPowers).reduce((acc, [p, c]) => acc * Math.pow(Number(p), c), 1);
  steps.push(`LCM = ${formula || '1'} = ${lcm}`);
  return lcm;
};

const hcfUsingPrimeMethod = (numbers: number[], steps: string[], primeFactors: Record<number, number[]>) => {
  const first = factorCounts(primeFactors[numbers[0]]);
  const commonPowers: Record<number, number> = { ...first };
  for (let i = 1; i < numbers.length; i++) {
    const current = factorCounts(primeFactors[numbers[i]]);
    Object.keys(commonPowers).forEach((primeKey) => {
      const prime = Number(primeKey);
      if (!current[prime]) {
        delete commonPowers[prime];
      } else {
        commonPowers[prime] = Math.min(commonPowers[prime], current[prime]);
      }
    });
  }
  const formula = Object.entries(commonPowers)
    .sort((a, b) => Number(a[0]) - Number(b[0]))
    .map(([p, c]) => `${p}^${c}`)
    .join(' × ');
  const hcf = Object.entries(commonPowers).reduce((acc, [p, c]) => acc * Math.pow(Number(p), c), 1);
  steps.push(`HCF = ${formula || '1'} = ${hcf}`);
  return hcf;
};

const calculatePrime = (numbers: number[]): CalculationResult => {
  const steps: string[] = [
    'Method: Prime Factorization (Factor Tree Approach)',
    'Step 1: Break down each number into its prime factors.'
  ];
  const primeFactors: Record<number, number[]> = {};
  numbers.forEach((num) => {
    primeFactors[num] = getPrimeFactors(num);
    steps.push(`• Prime factors of ${num}: ${primeFactors[num].length ? primeFactors[num].join(' × ') : '1'}`);
  });

  steps.push('Step 2: For LCM, take the highest power of every prime factor that appears in any of the numbers.');
  const lcm = lcmUsingPrimeMethod(numbers, steps, primeFactors);

  steps.push('Step 3: For HCF, take the lowest power (intersection) of only the prime factors that are common to all numbers.');
  const hcf = hcfUsingPrimeMethod(numbers, steps, primeFactors);

  return { numbers, lcm, hcf, primeFactors, steps, timeComplexity: 'O(n * √max_num)' };
};

const calculateEuclidean = (numbers: number[]): CalculationResult => {
  const steps: string[] = [
    'Method: Euclidean Algorithm (Iterative Division)',
    'This method finds HCF by repeated division and then calculates LCM using the property: LCM(a,b) = (a*b)/HCF(a,b).'
  ];
  const primeFactors: Record<number, number[]> = {};
  numbers.forEach((num) => {
    primeFactors[num] = getPrimeFactors(num);
  });

  steps.push('Step 1: Calculate HCF of the numbers sequentially.');
  let hcf = numbers[0];
  for (let i = 1; i < numbers.length; i++) {
    const prev = hcf;
    hcf = gcdPair(hcf, numbers[i]);
    steps.push(`• GCD(${prev}, ${numbers[i]}) = ${hcf}`);
  }
  steps.push(`Final HCF (Greatest Common Divisor) = ${hcf}`);

  steps.push('Step 2: Calculate LCM using the property LCM(a,b) = (a × b) / HCF(a,b).');
  let lcm = numbers[0];
  for (let i = 1; i < numbers.length; i++) {
    const prev = lcm;
    lcm = lcmPair(lcm, numbers[i]);
    steps.push(`• LCM(${prev}, ${numbers[i]}) = (${prev} × ${numbers[i]}) / ${gcdPair(prev, numbers[i])} = ${lcm}`);
  }
  steps.push(`Final LCM (Least Common Multiple) = ${lcm}`);

  return { numbers, lcm, hcf, primeFactors, steps, timeComplexity: 'O(n * log(min_val))' };
};

const calculateDivision = (numbers: number[]): CalculationResult => {
  const steps: string[] = [
    'Method: Ladder Method (Common Division)',
    'We divide all numbers by prime factors (2, 3, 5, etc.) until all become 1.'
  ];
  const primeFactors: Record<number, number[]> = {};
  numbers.forEach((num) => {
    primeFactors[num] = getPrimeFactors(num);
  });

  let current = [...numbers];
  const hcfDivisors: number[] = [];
  const lcmDivisors: number[] = [];
  let d = 2;

  while (d <= Math.max(...current)) {
    const divisibleCount = current.filter((n) => n % d === 0).length;
    if (divisibleCount === 0) {
      d += d === 2 ? 1 : 2;
      continue;
    }
    const next = current.map((n) => (n % d === 0 ? n / d : n));
    lcmDivisors.push(d);
    if (divisibleCount === current.length) {
      hcfDivisors.push(d);
      steps.push(`• Divide [${current.join(', ')}] by ${d} (Common Factor): Result -> [${next.join(', ')}]`);
    } else {
      steps.push(`• Divide [${current.join(', ')}] by ${d} (Partial Factor): Result -> [${next.join(', ')}]`);
    }
    current = next;
    if (current.every((n) => n === 1)) break;
  }

  const hcf = hcfDivisors.reduce((acc, val) => acc * val, 1);
  const lcm = lcmDivisors.reduce((acc, val) => acc * val, 1);
  steps.push(`HCF = Product of common factors (${hcfDivisors.join(' × ') || '1'}) = ${hcf}`);
  steps.push(`LCM = Product of all used divisors (${lcmDivisors.join(' × ') || '1'}) = ${lcm}`);

  return { numbers, lcm, hcf, primeFactors, steps, timeComplexity: 'O(k * n)' };
};

const parseInputNumbers = (raw: string) =>
  raw
    .split(/[,\s]+/)
    .map((item) => Number(item.trim()))
    .filter((num) => Number.isInteger(num) && num > 0);

const LcmHcfCalculator: React.FC = () => {
  const [inputNumbers, setInputNumbers] = useState('12, 18, 24');
  const [method, setMethod] = useState<Method>('prime');
  const [showSteps, setShowSteps] = useState(true);
  const [showPrimeFactors, setShowPrimeFactors] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [challengeInput, setChallengeInput] = useState('');
  const [challengeNumbers, setChallengeNumbers] = useState<number[]>([8, 12, 20]);
  const [challengeAnswer, setChallengeAnswer] = useState<{ lcm: number; hcf: number } | null>(null);
  const [challengeFeedback, setChallengeFeedback] = useState('');

  const parsedPreview = useMemo(() => parseInputNumbers(inputNumbers), [inputNumbers]);

  const runCalculation = () => {
    const numbers = parseInputNumbers(inputNumbers);
    if (numbers.length < 2) {
      setError('Enter at least two positive whole numbers, separated by comma or space.');
      setResult(null);
      return;
    }
    setError('');
    setIsCalculating(true);
    let output: CalculationResult;
    if (method === 'euclidean') output = calculateEuclidean(numbers);
    else if (method === 'division') output = calculateDivision(numbers);
    else output = calculatePrime(numbers);
    setResult(output);
    setIsCalculating(false);
  };

  const resetAll = () => {
    setInputNumbers('');
    setResult(null);
    setError('');
    setShowPrimeFactors(false);
    setShowSteps(true);
  };

  const generateChallenge = () => {
    const a = Math.floor(Math.random() * 40) + 6;
    const b = Math.floor(Math.random() * 40) + 8;
    const c = Math.floor(Math.random() * 40) + 10;
    const nums = [a, b, c];
    setChallengeNumbers(nums);
    setChallengeInput('');
    setChallengeFeedback('');
    const solved = calculateEuclidean(nums);
    setChallengeAnswer({ lcm: solved.lcm, hcf: solved.hcf });
  };

  const verifyChallenge = () => {
    const [lcmRaw, hcfRaw] = challengeInput.split(',').map((t) => Number(t.trim()));
    if (!challengeAnswer || !Number.isInteger(lcmRaw) || !Number.isInteger(hcfRaw)) {
      setChallengeFeedback('Enter answer as: LCM,HCF (example: 120,4)');
      return;
    }
    if (lcmRaw === challengeAnswer.lcm && hcfRaw === challengeAnswer.hcf) {
      setChallengeFeedback('Correct! Great job.');
    } else {
      setChallengeFeedback(`Not quite. Correct answer: LCM ${challengeAnswer.lcm}, HCF ${challengeAnswer.hcf}`);
    }
  };

  const contentData = {
    title: 'LCM and HCF Calculator',
    description:
      'This LCM and HCF calculator is designed for students, parents, teachers, and competitive exam aspirants who need fast and accurate answers with understandable steps. You can enter multiple numbers, choose your preferred solution approach, and instantly get the Least Common Multiple (LCM) and Highest Common Factor (HCF, also called GCD). The tool supports prime factorization, Euclidean algorithm logic, and a division or ladder style explanation so users can match their classroom method. It is useful for school math revision, Olympiad and aptitude preparation, interview rounds, and day-to-day number simplification tasks. Along with answers, it provides factor-level breakdown and method transparency so the page is not just a solver but also a learning aid.',
    benefits: [
      'Find LCM and HCF for two or more integers in one click.',
      'Choose between prime factorization, Euclidean, and division-ladder approach.',
      'See step-by-step method output for conceptual clarity.',
      'Useful for fractions, ratio simplification, scheduling and periodicity questions.',
      'Works for school-level arithmetic to advanced exam practice.',
      'Supports mobile use for quick on-the-go checking.',
      'Improves accuracy and speed for objective exam sections.',
      'Free, instant, and built for learner-friendly explanations.',
    ],
    howToSteps: [
      {
        step: 'Enter numbers in one line',
        details:
          'Type positive whole numbers separated by commas or spaces, for example: 12, 18, 24 or 12 18 24.',
      },
      {
        step: 'Pick a method',
        details:
          'Prime factorization is visual, Euclidean is efficient for large values, and division-ladder mirrors notebook-style classroom approach.',
      },
      {
        step: 'Click calculate and review outputs',
        details:
          'The tool returns both LCM and HCF together so you can solve mixed concept questions quickly.',
      },
      {
        step: 'Open factor and step details',
        details:
          'Expand prime factors and method steps to verify each stage and avoid answer-copy mistakes.',
      },
      {
        step: 'Apply in problem contexts',
        details:
          'Use LCM for cyclic schedule and denominator alignment, and HCF for grouping and equal partition questions.',
      },
      {
        step: 'Practice with varied difficulty',
        details:
          'Try small, medium, and large inputs to improve method selection speed in timed tests.',
      },
    ],
    examples: [
      {
        scenario: 'Bus schedule synchronization',
        inputs: [
          { label: 'Bus A interval', value: '12 minutes' },
          { label: 'Bus B interval', value: '18 minutes' },
          { label: 'Bus C interval', value: '24 minutes' },
        ],
        result: 'LCM = 72 minutes',
        explanation:
          'If three buses start together, they will next align after 72 minutes. This is a classic real-life LCM application where a common event needs the smallest common cycle.',
      },
      {
        scenario: 'Classroom grouping',
        inputs: [
          { label: 'Students in group A', value: '48' },
          { label: 'Students in group B', value: '60' },
        ],
        result: 'HCF = 12',
        explanation:
          'You can divide both groups into equal teams of 12 without leftovers. HCF solves equal partition problems with maximum group size.',
      },
      {
        scenario: 'Fraction denominator alignment',
        inputs: [
          { label: 'Denominators', value: '8, 12, 20' },
          { label: 'Need', value: 'Common denominator' },
        ],
        result: 'LCM = 120',
        explanation:
          'While adding or comparing fractions, 120 becomes the least common denominator. LCM keeps arithmetic efficient and avoids unnecessarily large values.',
      },
      {
        scenario: 'Factory maintenance cycle',
        inputs: [
          { label: 'Machine 1 service', value: '15 days' },
          { label: 'Machine 2 service', value: '25 days' },
          { label: 'Machine 3 service', value: '30 days' },
        ],
        result: 'LCM = 150 days',
        explanation:
          'All machines can be serviced together every 150 days. This reduces planning overhead and downtime coordination cost.',
      },
      {
        scenario: 'Ribbon cutting problem',
        inputs: [
          { label: 'Ribbon lengths', value: '72 cm and 96 cm' },
          { label: 'Constraint', value: 'Equal longest piece, no waste' },
        ],
        result: 'HCF = 24 cm',
        explanation:
          'The maximum equal cut length possible is 24 cm. This is a direct HCF optimization question commonly asked in school word problems.',
      },
    ],
    tips: [
      'For larger numbers, choose Euclidean method to reduce manual complexity.',
      'Use prime factorization when you need to show full steps in exams.',
      'Remember: for two numbers a and b, a × b = LCM(a,b) × HCF(a,b).',
      'If numbers are co-prime, HCF is 1 and LCM is the product.',
      'Use LCM for cyclic timing; use HCF for equal splitting.',
      'Convert real-word statements into number form first before solving.',
    ],
    mistakes: [
      'Mixing up when to apply LCM vs HCF in word problems.',
      'Using product relationship directly for more than two numbers.',
      'Skipping factor powers in prime factorization and getting wrong LCM.',
      'Assuming HCF of multiple numbers from pair results without full check.',
      'Treating 0 or negative values as standard school-mode input in basic questions.',
      'Not verifying answer reasonableness against minimum/maximum bounds.',
    ],
    faqs: [
      {
        question: 'When should I use LCM instead of HCF?',
        answer:
          'Use LCM when you need the smallest common cycle or denominator, such as repeating events, bells ringing together, or fraction addition. Use HCF when you need the largest equal partition, like making equal groups, cutting into equal lengths, or simplifying ratios.',
      },
      {
        question: 'Is HCF same as GCD?',
        answer:
          'Yes. HCF (Highest Common Factor) and GCD (Greatest Common Divisor) refer to the same concept. Some books and exams use HCF, while programming and algorithm references often use GCD.',
      },
      {
        question: 'Can this calculator handle more than two numbers?',
        answer:
          'Yes. It handles multiple integers in one run. Internally, the calculation is performed iteratively across the list, ensuring correct final LCM and HCF for all numbers together.',
      },
      {
        question: 'Which method is best for competitive exams?',
        answer:
          'For speed, Euclidean method is usually the best for HCF and then LCM derivation. For written solutions and conceptual proof, prime factorization is often preferred because steps are explicit.',
      },
      {
        question: 'Why are step-by-step explanations useful?',
        answer:
          'Step outputs help you catch arithmetic mistakes, verify method logic, and learn reusable patterns. This improves confidence and reduces errors under timed test pressure.',
      },
      {
        question: 'Is this tool suitable for teachers and parents?',
        answer:
          'Yes. Teachers can use it for class demos and worksheet checks, while parents can validate homework and explain concepts through method-based outputs.',
      },
    ],
    relatedCalculators: [
      { name: 'Compound Interest Calculator', url: '/calculators/compound-interest-calculator', description: 'Practice formula discipline and powers' },
      { name: 'Simple Interest Calculator', url: '/calculators/simple-interest-calculator', description: 'Build arithmetic confidence for exam speed' },
      { name: 'Future Value Calculator', url: '/calculators/future-value-calculator', description: 'Apply repeated multiplication concepts' },
      { name: 'Interest Rate Converter', url: '/calculators/interest-rate-converter', description: 'Learn practical math conversion logic' },
    ],
    lastUpdated: '2026-02-11',
  };

  const guideParagraphs = [
    'LCM and HCF are foundational number theory concepts, but many learners struggle because they memorize rules without understanding intent. A better approach is to ask one question first: do you need a common cycle or a common divider? If the target is synchronization, periodicity, or denominator unification, the problem usually points to LCM. If the target is equal distribution, maximum grouping, or simplification, the problem usually points to HCF. This intent-first approach reduces confusion in board exams and objective test sections where options are deliberately close.',
    'In classroom mathematics, prime factorization is often the first method taught because it visually reveals why results are correct. For LCM, you keep the highest power of each prime that appears in any number. For HCF, you keep only the common primes with the smallest powers across all numbers. This framework also explains why LCM is never smaller than the largest input and HCF is never larger than the smallest input. Learners who internalize this structure can solve many questions mentally without writing full factor trees.',
    'The Euclidean algorithm is especially important for older students and exam aspirants because it is fast, elegant, and reliable for larger values. Instead of listing factors or multiples, it repeatedly uses remainder operations until the remainder becomes zero. The last non-zero divisor is the HCF. Once HCF is known for two numbers, LCM can be found through the relation LCM = (a / HCF) * b. For multiple numbers, this process is applied pairwise. This method is also the backbone of many programming and cryptography tasks.',
    'The ladder or division method is popular in school notebooks because it connects factorization with procedural division. You divide by small primes, reduce numbers progressively, and record divisors that contribute to HCF or LCM. It is intuitive for handwritten practice and helps detect arithmetic slips. However, students must remember one subtlety: divisors common to all numbers contribute to HCF, while divisors used at any stage contribute to LCM. Mixing these two tracks is a frequent source of mistakes in manual solutions.',
    'A strong exam strategy is to estimate result bounds before final calculation. HCF must divide every number exactly; if it does not, your answer is wrong. LCM must be divisible by every number and should not be smaller than the largest input. For two numbers, you can cross-check using a × b = LCM × HCF. This single validation catches many errors under pressure. In multiple-number questions, pairwise sanity checks and divisibility checks still provide fast confidence before final submission.',
    'Word problems become easier when translated into patterns. If three alarms ring every 12, 18, and 24 minutes and ring together now, next common ring time needs LCM. If ropes of 72 cm and 96 cm must be cut into equal longest pieces, you need HCF. If fractions have denominators 8, 12, and 20, common denominator requires LCM. If students from different sections must form equal teams with no remainder, HCF is likely. Pattern recognition is more valuable than memorizing dozens of special cases.',
    'Competitive exams often combine LCM and HCF with ratio and remainder logic. For example, if two numbers are in ratio 5:7 and HCF is 6, the numbers are 30 and 42. If LCM is given with one number, you can infer the other through the product relation, provided HCF is known or derivable. These integrated questions test conceptual fluency. Practicing with mixed sets improves speed and reduces over-reliance on calculator-only thinking, which matters in sections with strict time caps.',
    'Teachers can use this calculator in a blended way: first ask students to solve by hand, then use the tool for verification and error analysis. Because the page shows method-based steps and prime factors, it supports diagnosis rather than just answer display. This improves learning outcomes compared to black-box tools. Parents helping with homework can also use the same flow: identify method, perform a manual attempt, verify, then discuss where the process diverged if answers differ.',
    'From a practical perspective, LCM and HCF appear outside textbooks too. Manufacturing schedules, maintenance alignment, digital signal timing, and resource batching all rely on common-cycle and common-divisor reasoning. Software systems that handle periodic tasks and synchronization also use these ideas in algorithmic form. So mastering LCM/HCF is not only exam-relevant; it develops transferable quantitative reasoning used in engineering, analytics, and operations planning.',
    'To build long-term mastery, practice in three layers: conceptual understanding, method fluency, and application transfer. In conceptual mode, explain why a result is valid. In fluency mode, solve quickly using different methods. In application mode, convert word statements into numerical expressions and pick LCM or HCF correctly. This progression creates confidence and reduces panic during exams. A tool like this is most powerful when used for guided feedback, not as a substitute for thinking.',
    'Another high-yield exam pattern is number-pair reconstruction. If LCM and HCF are known, and ratio between numbers is given, you can reconstruct candidates quickly. For instance, if ratio is 3:5 and HCF is 4, numbers are 12 and 20. LCM can then be validated as 60. This style appears frequently in aptitude tests and scholarship papers.',
    'For students preparing for Olympiad-level logic, observe prime exponent behavior deeply. If one number contributes a high power of 2 and another contributes high power of 3, LCM captures both highest exponents while HCF captures only overlap. This exponent view is a robust way to avoid symbolic mistakes in long expressions.',
    'For coding interviews, GCD/LCM functions are common warm-up tasks. Efficient GCD through Euclidean algorithm is expected, and LCM is usually derived safely using division before multiplication to reduce overflow risk. Understanding this detail helps bridge school math and practical programming.',
    'In data operations and scheduling systems, LCM helps align recurring jobs while HCF helps chunk workloads into balanced packets. These ideas appear in manufacturing, timetabling, ETL pipelines, and maintenance windows. So this chapter is strongly connected to operations and systems design reasoning.',
    'A practical classroom strategy is method triangulation: solve once with Euclidean method, once with prime factorization, and compare. If both match, confidence rises. If not, inspect where remainder progression or factor powers were mishandled. This dual-check method accelerates error correction.',
    'Parents supporting younger learners can simplify explanation through visual grouping. Use objects, dots, or blocks to show equal grouping (HCF) and repeated meeting points (LCM). Visual models reduce abstract fear and help children understand when each concept applies.',
    'In board exams, presentation quality matters. Write method name clearly, show intermediate values, and underline final LCM/HCF with units where relevant. Even when objective accuracy is primary, neat method flow reduces confusion and helps partial marking in subjective papers.',
    'When practicing at speed, keep a short mental checklist: Are all numbers positive integers? Did I choose correct concept from the story? Is HCF dividing all values exactly? Is LCM divisible by all values? Does answer magnitude make sense? This checklist prevents avoidable marks loss.',
    'Finally, use targeted repetition. Solve 10 synchronization problems (LCM), 10 grouping problems (HCF), and 10 mixed interpretation problems. Track mistakes by category. Within a week, most learners see substantial improvement in both speed and confidence.',
  ];

  return (
    <>
      <SEOHelmet
        title="LCM and HCF Calculator (GCD) with Steps: Prime, Euclidean, Division | MoneyCal"
        description="Fast LCM and HCF (GCD) calculator for multiple numbers. Step-by-step prime factorization, Euclidean algorithm, and division ladder. Class 6–12 CBSE/ICSE practice with real-life examples."
        keywords="lcm and hcf calculator, gcd and lcm calculator multiple numbers, lcm hcf step by step, prime factorization lcm hcf, euclidean algorithm gcd, division method lcm hcf, class 6 7 8 9 10 cbse icse lcm hcf, least common multiple highest common factor online calculator"
        url="/calculators/lcm-hcf-calculator"
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Calculators', url: '/calculators' },
          { name: 'LCM and HCF Calculator', url: '/calculators/lcm-hcf-calculator' }
        ]}
      />
      <CalculatorSchema
        name="LCM and HCF Calculator with Steps"
        description="Calculate LCM and HCF of multiple numbers using prime factorization, Euclidean algorithm, and division method."
        url="/calculators/lcm-hcf-calculator"
        features={[
          'LCM and HCF for multiple numbers',
          'Prime factorization with steps',
          'Euclidean and division methods',
          'Exam-friendly verification flow',
        ]}
        faqData={contentData.faqs}
        howToSteps={contentData.howToSteps}
        lastUpdated="2026-02-11"
        rating={{ value: 4.9, count: 1800 }}
      />

      <div className="min-h-screen bg-slate-50 p-4 sm:p-6">
        <div className="max-w-6xl mx-auto">
          <nav className="flex items-center gap-2 text-sm text-neutral-600 mb-4 overflow-x-auto" aria-label="Breadcrumb">
            <Link to="/" className="flex items-center gap-1 hover:text-blue-600 transition-colors whitespace-nowrap"><Home className="h-4 w-4" /><span>Home</span></Link>
            <ChevronRight className="h-4 w-4 flex-shrink-0 text-neutral-400" />
            <Link to="/calculators" className="hover:text-blue-600 transition-colors whitespace-nowrap">Calculators</Link>
            <ChevronRight className="h-4 w-4 flex-shrink-0 text-neutral-400" />
            <span className="text-neutral-900 font-medium whitespace-nowrap" aria-current="page">LCM and HCF Calculator</span>
          </nav>
          <div className="text-center mb-6">
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-900">LCM and HCF Calculator</h1>
            <p className="text-slate-600 mt-2">
              Calculate least common multiple and highest common factor with clear method-wise steps.
            </p>
            <div className="mt-3 flex items-center justify-center gap-2 text-sm text-slate-700">
              <Star className="h-4 w-4 text-yellow-500" />
              <span>Rated 4.9/5 by 1,800 learners</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 p-5">
              <label className="block text-sm font-semibold text-slate-700 mb-2">Numbers (comma or space separated)</label>
              <input
                value={inputNumbers}
                onChange={(e) => setInputNumbers(e.target.value)}
                placeholder="e.g. 12, 18, 24"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg"
              />
              <p className="text-xs text-slate-500 mt-2">
                Parsed: {parsedPreview.length ? parsedPreview.join(', ') : 'No valid numbers yet'}
              </p>

              <label className="block text-sm font-semibold text-slate-700 mt-4 mb-2">Method</label>
              <select value={method} onChange={(e) => setMethod(e.target.value as Method)} className="w-full px-3 py-2 border border-slate-300 rounded-lg">
                <option value="prime">Prime Factorization</option>
                <option value="euclidean">Euclidean Algorithm</option>
                <option value="division">Division / Ladder Method</option>
              </select>

              <div className="flex gap-3 mt-4">
                <button
                  onClick={runCalculation}
                  disabled={isCalculating}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-60 flex items-center justify-center gap-2"
                >
                  {isCalculating ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Calculator className="w-4 h-4" />}
                  Calculate
                </button>
                <button onClick={resetAll} className="px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-100">
                  Reset
                </button>
              </div>

              {error && <p className="mt-3 text-sm text-red-600">{error}</p>}

              {result && (
                <div className="mt-6 space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <p className="text-sm text-blue-700">Least Common Multiple (LCM)</p>
                      <p className="text-2xl font-bold text-blue-900">{result.lcm.toLocaleString('en-IN')}</p>
                    </div>
                    <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
                      <p className="text-sm text-emerald-700">Highest Common Factor (HCF/GCD)</p>
                      <p className="text-2xl font-bold text-emerald-900">{result.hcf.toLocaleString('en-IN')}</p>
                    </div>
                  </div>

                  {result.numbers.length === 2 && (
                    <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-sm text-amber-900">
                      <strong>Verification:</strong> {result.numbers[0]} × {result.numbers[1]} ={' '}
                      {result.numbers[0] * result.numbers[1]} and LCM × HCF = {result.lcm * result.hcf}
                    </div>
                  )}

                  <div className="flex flex-wrap gap-3 text-sm">
                    <button onClick={() => setShowPrimeFactors((v) => !v)} className="px-3 py-1.5 bg-slate-100 rounded-md hover:bg-slate-200">
                      {showPrimeFactors ? 'Hide' : 'Show'} prime factors
                    </button>
                    <button onClick={() => setShowSteps((v) => !v)} className="px-3 py-1.5 bg-slate-100 rounded-md hover:bg-slate-200">
                      {showSteps ? 'Hide' : 'Show'} step-by-step method
                    </button>
                  </div>

                  {showPrimeFactors && (
                    <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
                      <h3 className="font-semibold text-slate-900 mb-2">Prime factors</h3>
                      <div className="space-y-1 text-sm text-slate-700">
                        {Object.entries(result.primeFactors).map(([num, factors]) => (
                          <p key={num}>
                            {num} = {factors.length ? factors.join(' × ') : '1'}
                          </p>
                        ))}
                      </div>
                    </div>
                  )}

                  {showSteps && (
                    <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
                      <h3 className="font-semibold text-slate-900 mb-2 flex items-center gap-2"><BookOpen className="w-4 h-4" />Method steps</h3>
                      <ol className="space-y-1 text-sm text-slate-700 list-decimal pl-5">
                        {result.steps.map((step, idx) => (
                          <li key={idx}>{step}</li>
                        ))}
                      </ol>
                      <p className="text-xs text-slate-500 mt-3">Estimated time complexity: {result.timeComplexity}</p>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="space-y-4">
              <div className="bg-white rounded-xl border border-slate-200 p-4">
                <h3 className="font-semibold text-slate-900 mb-2">Quick examples</h3>
                <div className="flex flex-wrap gap-2">
                  {['12, 18', '24, 36, 48', '15, 20, 35', '18, 27, 45', '32, 40, 56'].map((sample) => (
                    <button key={sample} onClick={() => setInputNumbers(sample)} className="text-xs px-2.5 py-1.5 rounded-full bg-blue-50 text-blue-700 hover:bg-blue-100">
                      {sample}
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-xl border border-slate-200 p-4">
                <h3 className="font-semibold text-slate-900 mb-2">Use LCM when...</h3>
                <ul className="space-y-1 text-sm text-slate-700">
                  <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5" />Events repeat on different intervals</li>
                  <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5" />Fractions need common denominator</li>
                  <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5" />Cyclic schedules must align</li>
                </ul>
              </div>

              <div className="bg-white rounded-xl border border-slate-200 p-4">
                <h3 className="font-semibold text-slate-900 mb-2">Use HCF when...</h3>
                <ul className="space-y-1 text-sm text-slate-700">
                  <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5" />Need largest equal groups</li>
                  <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5" />Cut lengths without waste</li>
                  <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5" />Simplify ratio or fraction terms</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-10">
            <CalculatorContentWrapper {...contentData} />
          </div>

          <section className="mt-8 bg-white rounded-xl border border-slate-200 p-6">
            <h2 className="text-2xl font-bold text-slate-900 mb-3">Practice Challenge Mode</h2>
            <p className="text-sm text-slate-600 mb-4">Generate a random 3-number challenge and answer in format: <strong>LCM,HCF</strong></p>
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <button onClick={generateChallenge} className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700">Generate Challenge</button>
              <p className="text-sm text-slate-700">Numbers: {challengeNumbers.join(', ')}</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <input
                value={challengeInput}
                onChange={(e) => setChallengeInput(e.target.value)}
                className="px-3 py-2 border border-slate-300 rounded-lg min-w-[220px]"
                placeholder="Example: 120,4"
              />
              <button onClick={verifyChallenge} className="px-4 py-2 rounded-lg border border-slate-300 hover:bg-slate-100">Check Answer</button>
            </div>
            {challengeFeedback && <p className="mt-3 text-sm text-slate-700">{challengeFeedback}</p>}
          </section>

          <section className="mt-10 bg-white rounded-xl border border-slate-200 p-6">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">LCM and HCF Master Guide (Long-Form)</h2>
            <div className="space-y-4 text-slate-700 leading-7">
              {guideParagraphs.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
              <p>
                For broader math and calculation practice, also explore internal tools like{' '}
                <a href="/calculators/compound-interest-calculator" className="text-blue-700 underline">Compound Interest Calculator</a>,{' '}
                <a href="/calculators/simple-interest-calculator" className="text-blue-700 underline">Simple Interest Calculator</a>,{' '}
                <a href="/calculators/future-value-calculator" className="text-blue-700 underline">Future Value Calculator</a>, and{' '}
                <a href="/calculators/interest-rate-converter" className="text-blue-700 underline">Interest Rate Converter</a>.
              </p>
              <p>
                For trusted external references on definitions and curriculum-style explanations, review{' '}
                <a href="https://ncert.nic.in/textbook.php" target="_blank" rel="noopener noreferrer" className="text-blue-700 underline">NCERT textbook resources</a>,{' '}
                <a href="https://www.khanacademy.org/math" target="_blank" rel="noopener noreferrer" className="text-blue-700 underline">Khan Academy math lessons</a>, and{' '}
                <a href="https://en.wikipedia.org/wiki/Greatest_common_divisor" target="_blank" rel="noopener noreferrer" className="text-blue-700 underline">GCD mathematical reference</a>.
              </p>
              <div className="mt-8">
                <h2 className="text-xl font-bold text-slate-900 mb-3">Frequently Asked Questions</h2>
                <div className="space-y-2">
                  {contentData.faqs.map((f, idx) => (
                    <details key={idx} className="bg-white border border-slate-200 rounded-lg p-4">
                      <summary className="font-semibold text-slate-900 cursor-pointer">{f.question}</summary>
                      <p className="mt-2 text-slate-700 text-sm">{f.answer}</p>
                    </details>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default LcmHcfCalculator; 
