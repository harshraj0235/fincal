
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Calculator, TrendingUp, DollarSign, Clock, PiggyBank, Target, BookOpen, Lightbulb } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

interface CalculationResult {
  futureValue: number;
  totalContributions: number;
  totalInterest: number;
  yearlyBreakdown: Array<{
    year: number;
    principal: number;
    interest: number;
    total: number;
  }>;
}

export const CompoundInterestCalculator: React.FC = () => {
  const [principal, setPrincipal] = useState<string>('10000');
  const [monthlyContribution, setMonthlyContribution] = useState<string>('500');
  const [annualRate, setAnnualRate] = useState<string>('7');
  const [years, setYears] = useState<string>('10');
  const [compoundFrequency, setCompoundFrequency] = useState<string>('12');
  const [result, setResult] = useState<CalculationResult | null>(null);

  const calculateCompoundInterest = () => {
    const P = parseFloat(principal) || 0;
    const PMT = parseFloat(monthlyContribution) || 0;
    const r = (parseFloat(annualRate) || 0) / 100;
    const n = parseInt(compoundFrequency) || 12;
    const t = parseInt(years) || 1;

    const yearlyBreakdown: Array<{
      year: number;
      principal: number;
      interest: number;
      total: number;
    }> = [];

    let currentPrincipal = P;
    let totalContributions = P;

    for (let year = 1; year <= t; year++) {
      // Calculate compound interest for the year
      const yearlyContributions = PMT * 12;
      const avgPrincipal = currentPrincipal + (yearlyContributions / 2);
      const interestEarned = avgPrincipal * r;
      
      currentPrincipal += yearlyContributions + interestEarned;
      totalContributions += yearlyContributions;

      yearlyBreakdown.push({
        year,
        principal: totalContributions,
        interest: currentPrincipal - totalContributions,
        total: currentPrincipal
      });
    }

    const finalResult: CalculationResult = {
      futureValue: currentPrincipal,
      totalContributions,
      totalInterest: currentPrincipal - totalContributions,
      yearlyBreakdown
    };

    setResult(finalResult);
  };

  useEffect(() => {
    calculateCompoundInterest();
  }, [principal, monthlyContribution, annualRate, years, compoundFrequency]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatPercentage = (value: number) => {
    return `${value.toFixed(1)}%`;
  };

  const chartData = result?.yearlyBreakdown || [];
  const pieData = result ? [
    { name: 'Principal & Contributions', value: result.totalContributions, color: '#3b82f6' },
    { name: 'Interest Earned', value: result.totalInterest, color: '#10b981' }
  ] : [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* SEO Header Section */}
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4 bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
            Compound Interest Calculator
          </h1>
          <p className="text-xl text-gray-600 mb-6 max-w-3xl mx-auto">
            Free online compound interest calculator to calculate investment growth, retirement planning, and savings goals. 
            Discover the power of compound interest with our advanced financial calculator tool.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500">
            <span className="flex items-center gap-1">
              <Calculator className="w-4 h-4" />
              Financial Calculator
            </span>
            <span className="flex items-center gap-1">
              <TrendingUp className="w-4 h-4" />
              Investment Calculator
            </span>
            <span className="flex items-center gap-1">
              <PiggyBank className="w-4 h-4" />
              Savings Calculator
            </span>
            <span className="flex items-center gap-1">
              <Target className="w-4 h-4" />
              Retirement Planner
            </span>
          </div>
        </header>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Calculator Input Section */}
          <div className="lg:col-span-1">
            <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-2xl">
                  <Calculator className="w-6 h-6 text-blue-600" />
                  Calculator Settings
                </CardTitle>
                <CardDescription>
                  Enter your investment details to calculate compound interest growth
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="principal" className="text-sm font-medium">
                    Initial Investment (Principal)
                  </Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      id="principal"
                      type="number"
                      value={principal}
                      onChange={(e) => setPrincipal(e.target.value)}
                      className="pl-10 h-12 text-lg"
                      placeholder="10000"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="monthly" className="text-sm font-medium">
                    Monthly Contribution
                  </Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      id="monthly"
                      type="number"
                      value={monthlyContribution}
                      onChange={(e) => setMonthlyContribution(e.target.value)}
                      className="pl-10 h-12 text-lg"
                      placeholder="500"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="rate" className="text-sm font-medium">
                    Annual Interest Rate (%)
                  </Label>
                  <Input
                    id="rate"
                    type="number"
                    step="0.1"
                    value={annualRate}
                    onChange={(e) => setAnnualRate(e.target.value)}
                    className="h-12 text-lg"
                    placeholder="7"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="years" className="text-sm font-medium">
                    Investment Period (Years)
                  </Label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      id="years"
                      type="number"
                      value={years}
                      onChange={(e) => setYears(e.target.value)}
                      className="pl-10 h-12 text-lg"
                      placeholder="10"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="compound" className="text-sm font-medium">
                    Compounding Frequency
                  </Label>
                  <Select value={compoundFrequency} onValueChange={setCompoundFrequency}>
                    <SelectTrigger className="h-12 text-lg">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Annually</SelectItem>
                      <SelectItem value="2">Semi-annually</SelectItem>
                      <SelectItem value="4">Quarterly</SelectItem>
                      <SelectItem value="12">Monthly</SelectItem>
                      <SelectItem value="365">Daily</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button 
                  onClick={calculateCompoundInterest}
                  className="w-full h-12 text-lg bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700"
                >
                  Calculate Growth
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Results and Charts Section */}
          <div className="lg:col-span-2 space-y-8">
            {result && (
              <>
                {/* Key Results */}
                <div className="grid md:grid-cols-3 gap-4">
                  <Card className="shadow-lg border-0 bg-gradient-to-br from-blue-500 to-blue-600 text-white">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-blue-100 text-sm font-medium">Future Value</p>
                          <p className="text-2xl font-bold">{formatCurrency(result.futureValue)}</p>
                        </div>
                        <TrendingUp className="w-8 h-8 text-blue-200" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="shadow-lg border-0 bg-gradient-to-br from-green-500 to-green-600 text-white">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-green-100 text-sm font-medium">Total Interest</p>
                          <p className="text-2xl font-bold">{formatCurrency(result.totalInterest)}</p>
                        </div>
                        <DollarSign className="w-8 h-8 text-green-200" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="shadow-lg border-0 bg-gradient-to-br from-purple-500 to-purple-600 text-white">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-purple-100 text-sm font-medium">Total Contributions</p>
                          <p className="text-2xl font-bold">{formatCurrency(result.totalContributions)}</p>
                        </div>
                        <PiggyBank className="w-8 h-8 text-purple-200" />
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Growth Chart */}
                <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle>Investment Growth Over Time</CardTitle>
                    <CardDescription>
                      Visual representation of your compound interest growth
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80 w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={chartData}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#e0e7ff" />
                          <XAxis 
                            dataKey="year" 
                            stroke="#6b7280"
                            fontSize={12}
                          />
                          <YAxis 
                            stroke="#6b7280"
                            fontSize={12}
                            tickFormatter={(value) => formatCurrency(value)}
                          />
                          <Tooltip 
                            formatter={(value: number) => [formatCurrency(value), '']}
                            labelStyle={{ color: '#374151' }}
                            contentStyle={{ 
                              backgroundColor: 'white', 
                              border: '1px solid #e5e7eb',
                              borderRadius: '8px'
                            }}
                          />
                          <Line 
                            type="monotone" 
                            dataKey="total" 
                            stroke="#3b82f6" 
                            strokeWidth={3}
                            name="Total Value"
                            dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                          />
                          <Line 
                            type="monotone" 
                            dataKey="principal" 
                            stroke="#10b981" 
                            strokeWidth={2}
                            name="Contributions"
                            strokeDasharray="5 5"
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                {/* Breakdown Charts */}
                <div className="grid md:grid-cols-2 gap-8">
                  <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle>Investment Composition</CardTitle>
                      <CardDescription>Principal vs Interest Earned</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-64 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={pieData}
                              cx="50%"
                              cy="50%"
                              outerRadius={80}
                              dataKey="value"
                              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
                            >
                              {pieData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                              ))}
                            </Pie>
                            <Tooltip formatter={(value: number) => formatCurrency(value)} />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle>Annual Breakdown</CardTitle>
                      <CardDescription>Year-by-year growth analysis</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-64 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={chartData.slice(-5)}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#e0e7ff" />
                            <XAxis dataKey="year" stroke="#6b7280" fontSize={12} />
                            <YAxis stroke="#6b7280" fontSize={12} tickFormatter={(value) => formatCurrency(value)} />
                            <Tooltip formatter={(value: number) => formatCurrency(value)} />
                            <Bar dataKey="principal" stackId="a" fill="#10b981" name="Contributions" />
                            <Bar dataKey="interest" stackId="a" fill="#3b82f6" name="Interest" />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </>
            )}
          </div>
        </div>

        {/* SEO Content Section */}
        <div className="mt-16 space-y-12">
          <Separator className="my-8" />
          
          {/* Educational Content */}
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-blue-600" />
                  What is Compound Interest?
                </CardTitle>
              </CardHeader>
              <CardContent className="prose prose-sm text-gray-600">
                <p>
                  Compound interest is the interest calculated on the initial principal and the accumulated interest 
                  from previous periods. It's often called "interest on interest" and is one of the most powerful 
                  concepts in finance and investing.
                </p>
                <p>
                  Our compound interest calculator helps you understand how your investments can grow exponentially 
                  over time through the power of compounding. Whether you're planning for retirement, saving for 
                  a house, or building wealth, this financial calculator provides accurate projections.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="w-5 h-5 text-green-600" />
                  Tips for Maximizing Growth
                </CardTitle>
              </CardHeader>
              <CardContent className="prose prose-sm text-gray-600">
                <ul className="space-y-2">
                  <li>• Start investing early to take advantage of time</li>
                  <li>• Make regular monthly contributions to boost growth</li>
                  <li>• Choose investments with higher compound frequencies</li>
                  <li>• Reinvest dividends and interest payments</li>
                  <li>• Stay consistent with your investment strategy</li>
                  <li>• Use tax-advantaged accounts when possible</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* FAQ Section */}
          <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-2xl">Frequently Asked Questions</CardTitle>
              <CardDescription>Common questions about compound interest and investment calculations</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-lg mb-2">How does compound interest work?</h3>
                  <p className="text-gray-600 text-sm">
                    Compound interest works by adding earned interest back to the principal, so future interest 
                    calculations are based on both the original amount and previously earned interest.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-lg mb-2">What's the difference between simple and compound interest?</h3>
                  <p className="text-gray-600 text-sm">
                    Simple interest is calculated only on the principal amount, while compound interest is calculated 
                    on both principal and accumulated interest from previous periods.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-lg mb-2">How often should interest compound?</h3>
                  <p className="text-gray-600 text-sm">
                    More frequent compounding (daily vs. annually) results in higher returns. However, the difference 
                    becomes less significant as the frequency increases beyond monthly compounding.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-lg mb-2">Is this calculator accurate for all investments?</h3>
                  <p className="text-gray-600 text-sm">
                    This calculator provides estimates based on consistent returns. Real investments may have variable 
                    returns, so use this as a planning tool rather than a guarantee.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Keywords Section */}
          <Card className="shadow-lg border-0 bg-gradient-to-r from-blue-50 to-green-50">
            <CardContent className="p-8">
              <h2 className="text-xl font-semibold mb-4 text-center">Related Financial Calculators & Tools</h2>
              <div className="flex flex-wrap justify-center gap-2 text-sm">
                {[
                  'Investment Calculator', 'Retirement Calculator', 'Savings Calculator', 'Interest Calculator',
                  'Financial Planning Tool', 'ROI Calculator', 'Future Value Calculator', 'Present Value Calculator',
                  'Annuity Calculator', 'Mortgage Calculator', 'Loan Calculator', 'Budget Calculator',
                  'Tax Calculator', 'Inflation Calculator', 'Portfolio Calculator', 'Dividend Calculator'
                ].map((keyword, index) => (
                  <span key={index} className="px-3 py-1 bg-white rounded-full text-gray-600 shadow-sm">
                    {keyword}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CompoundInterestCalculator;
