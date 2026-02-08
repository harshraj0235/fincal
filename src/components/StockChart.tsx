import React, { useEffect, useRef, useState } from 'react';
import { getChartJs } from '../lib/clientOnlyLibs';
import { TrendingUp, TrendingDown, Calendar, DollarSign } from 'lucide-react';

interface StockChartProps {
  symbol: string;
  data: {
    labels: string[];
    prices: number[];
    volumes: number[];
  };
  currentPrice: number;
  changePercent: number;
  isLoading?: boolean;
}

const StockChart: React.FC<StockChartProps> = ({
  symbol,
  data,
  currentPrice,
  changePercent,
  isLoading = false
}) => {
  const [timeframe, setTimeframe] = useState<'1D' | '1W' | '1M' | '3M' | '1Y'>('1M');
  const [showVolume, setShowVolume] = useState(false);
  const [ChartLib, setChartLib] = useState<Awaited<ReturnType<typeof getChartJs>> | null>(null);

  const chartRef = useRef<any>(null);

  useEffect(() => {
    getChartJs().then((lib) => {
      lib.ChartJS.register(
        lib.CategoryScale,
        lib.LinearScale,
        lib.PointElement,
        lib.LineElement,
        lib.Title,
        lib.Tooltip,
        lib.Legend,
        lib.Filler
      );
      setChartLib(lib);
    });
  }, []);

  const isPositive = changePercent >= 0;
  const chartColor = isPositive ? '#10B981' : '#EF4444';
  const backgroundColor = isPositive ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)';

  const chartData = {
    labels: data.labels,
    datasets: [
      {
        label: 'Price',
        data: data.prices,
        borderColor: chartColor,
        backgroundColor: backgroundColor,
        borderWidth: 2,
        fill: true,
        tension: 0.4,
        pointRadius: 0,
        pointHoverRadius: 6,
        pointHoverBackgroundColor: chartColor,
        pointHoverBorderColor: '#ffffff',
        pointHoverBorderWidth: 2,
      },
      ...(showVolume ? [{
        label: 'Volume',
        data: data.volumes,
        borderColor: '#6B7280',
        backgroundColor: 'rgba(107, 114, 128, 0.1)',
        borderWidth: 1,
        fill: false,
        tension: 0.1,
        pointRadius: 0,
        yAxisID: 'volume',
      }] : [])
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index' as const,
      intersect: false,
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#ffffff',
        bodyColor: '#ffffff',
        borderColor: chartColor,
        borderWidth: 1,
        cornerRadius: 8,
        displayColors: false,
        callbacks: {
          title: (context: any) => {
            return `${symbol} - ${context[0].label}`;
          },
          label: (context: any) => {
            if (context.dataset.label === 'Price') {
              return `Price: ₹${context.parsed.y.toLocaleString()}`;
            }
            if (context.dataset.label === 'Volume') {
              return `Volume: ${context.parsed.y.toLocaleString()}`;
            }
            return context.dataset.label;
          },
        },
      },
    },
    scales: {
      x: {
        display: true,
        grid: {
          display: false,
        },
        ticks: {
          color: '#6B7280',
          font: {
            size: 12,
          },
        },
      },
      y: {
        display: true,
        position: 'left' as const,
        grid: {
          color: 'rgba(107, 114, 128, 0.1)',
        },
        ticks: {
          color: '#6B7280',
          font: {
            size: 12,
          },
          callback: (value: any) => {
            return `₹${value.toLocaleString()}`;
          },
        },
      },
      volume: {
        display: showVolume,
        position: 'right' as const,
        grid: {
          display: false,
        },
        ticks: {
          color: '#6B7280',
          font: {
            size: 10,
          },
          callback: (value: any) => {
            if (value >= 1000000) {
              return `${(value / 1000000).toFixed(1)}M`;
            }
            if (value >= 1000) {
              return `${(value / 1000).toFixed(1)}K`;
            }
            return value.toLocaleString();
          },
        },
      },
    },
    elements: {
      point: {
        hoverRadius: 6,
      },
    },
  };

  const timeframes = [
    { label: '1D', value: '1D' },
    { label: '1W', value: '1W' },
    { label: '1M', value: '1M' },
    { label: '3M', value: '3M' },
    { label: '1Y', value: '1Y' },
  ];

  if (!ChartLib && !isLoading) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="h-64 flex items-center justify-center text-gray-500">Loading chart...</div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="h-64 bg-gray-200 rounded mb-4"></div>
          <div className="flex space-x-2">
            {timeframes.map((tf) => (
              <div key={tf.value} className="h-8 bg-gray-200 rounded w-12"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold text-gray-900">{symbol}</h3>
          <div className="flex items-center mt-1">
            <span className="text-2xl font-bold text-gray-900">
              ₹{currentPrice.toLocaleString()}
            </span>
            <div className={`flex items-center ml-3 ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
              {isPositive ? (
                <TrendingUp className="w-4 h-4 mr-1" />
              ) : (
                <TrendingDown className="w-4 h-4 mr-1" />
              )}
              <span className="font-medium">
                {isPositive ? '+' : ''}{changePercent.toFixed(2)}%
              </span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setShowVolume(!showVolume)}
            className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
              showVolume
                ? 'bg-blue-100 text-blue-700'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Volume
          </button>
        </div>
      </div>

      {/* Chart */}
      <div className="h-64 mb-6">
        {ChartLib && <ChartLib.Line data={chartData} options={options} ref={chartRef} />}
      </div>

      {/* Timeframe Selector */}
      <div className="flex items-center justify-between">
        <div className="flex space-x-2">
          {timeframes.map((tf) => (
            <button
              key={tf.value}
              onClick={() => setTimeframe(tf.value as any)}
              className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                timeframe === tf.value
                  ? 'bg-green-100 text-green-700'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {tf.label}
            </button>
          ))}
        </div>
        
        <div className="flex items-center text-sm text-gray-500">
          <Calendar className="w-4 h-4 mr-1" />
          Last updated: {new Date().toLocaleTimeString()}
        </div>
      </div>

      {/* Chart Info */}
      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div>
            <div className="text-gray-500">Open</div>
            <div className="font-medium text-gray-900">
              ₹{data.prices[0]?.toLocaleString() || 'N/A'}
            </div>
          </div>
          <div>
            <div className="text-gray-500">High</div>
            <div className="font-medium text-gray-900">
              ₹{Math.max(...data.prices).toLocaleString()}
            </div>
          </div>
          <div>
            <div className="text-gray-500">Low</div>
            <div className="font-medium text-gray-900">
              ₹{Math.min(...data.prices).toLocaleString()}
            </div>
          </div>
          <div>
            <div className="text-gray-500">Volume</div>
            <div className="font-medium text-gray-900">
              {data.volumes[data.volumes.length - 1]?.toLocaleString() || 'N/A'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StockChart;
