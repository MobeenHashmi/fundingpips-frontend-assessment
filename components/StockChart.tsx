'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  CategoryScale,
  ArcElement,
} from 'chart.js';
import { Line, Doughnut } from 'react-chartjs-2';
import { useStore } from '@/lib/store';
import { generateMockPriceUpdate } from '@/lib/mockData';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import type { Stock } from '@/lib/types';

ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  CategoryScale,
  ArcElement
);

interface Props {
  initialStock: Stock;
}

interface ChartPoint {
  time: string;
  price: number;
  buy: number;
  sell: number;
  hold: number;
}

export default function StockDetailClient({ initialStock }: Props) {
  const router = useRouter();
  const { removeFromWatchlist } = useStore();

  const generatePoint = (price: number): ChartPoint => {
    const buy = 40 + Math.floor(Math.random() * 11);
    const sell = 20 + Math.floor(Math.random() * 11);
    const hold = 100 - buy - sell;
    return {
      time: new Date().toLocaleTimeString(),
      price,
      buy,
      sell,
      hold,
    };
  };

  const [stock, setStock] = useState<Stock>(initialStock);
  const [history, setHistory] = useState<ChartPoint[]>([
    generatePoint(initialStock.price - 2),
    generatePoint(initialStock.price),
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setStock((prev) => {
        const updated = generateMockPriceUpdate(prev);
        setHistory((prevHist) => [
          ...prevHist.slice(-19),
          generatePoint(updated.price),
        ]);
        return updated;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleRemove = () => {
    removeFromWatchlist(stock.symbol);
    router.push('/');
  };

  const latest = history.at(-1)!;

  const lineChartData = {
    labels: history.map((p) => p.time),
    datasets: [
      {
        label: 'Price',
        data: history.map((p) => p.price),
        borderColor: '#475569',
        backgroundColor: 'rgba(71, 85, 105, 0.1)',
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const doughnutData = {
    labels: ['Buy', 'Sell', 'Hold'],
    datasets: [
      {
        data: [latest.buy, latest.sell, latest.hold],
        backgroundColor: ['#4ade80', '#f87171', '#facc15'],
        borderColor: ['#bbf7d0', '#fecaca', '#fde68a'],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="max-w-4xl mx-auto mt-4 px-4 space-y-6">
      {/* Header Card */}
      <Card className="shadow-sm rounded-xl">
        <CardHeader className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 p-6">
          <div>
            <CardTitle className="text-xl sm:text-2xl font-semibold text-gray-800">
              {stock.symbol} — {stock.name}
            </CardTitle>
            <p className="text-sm text-gray-500 mt-1">
              Sector: {stock.sector || 'Technology'} • Market Cap: $
              {(stock.marketCap || 100_000_000).toLocaleString()}
            </p>
          </div>
          <Button variant="destructive" onClick={handleRemove} className="w-full sm:w-auto">
            Remove from Watchlist
          </Button>
        </CardHeader>
        <CardContent className="px-6 pb-4">
          <p className="text-base font-medium text-gray-700">
            Current Price:{' '}
            <span className="text-blue-500 font-semibold">
              ${stock.price.toFixed(2)}
            </span>
          </p>
        </CardContent>
      </Card>

      {/* Line Chart Card */}
      <Card className="p-4">
        <CardTitle className="text-base text-gray-600 mb-2">Price Trend</CardTitle>
        <div className="h-[320px]">
          <Line
            data={lineChartData}
            options={{
              responsive: true,
              plugins: {
                legend: { display: false },
                tooltip: { mode: 'index', intersect: false },
              },
              scales: {
                y: {
                  beginAtZero: false,
                  ticks: {
                    color: '#475569',
                  },
                },
                x: {
                  ticks: {
                    color: '#94a3b8',
                  },
                },
              },
            }}
          />
        </div>
      </Card>

      {/* Sentiment + Stats Card Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Doughnut */}
        <Card className="p-4">
          <CardTitle className="text-base text-gray-600 mb-2">Sentiment Distribution</CardTitle>
          <div className="h-[280px] flex items-center justify-center">
            <Doughnut
              data={doughnutData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: 'bottom',
                    labels: {
                      color: '#475569',
                      boxWidth: 12,
                      padding: 10,
                    },
                  },
                },
              }}
            />
          </div>
        </Card>

        {/* Stats */}
        <Card className="p-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm text-gray-600">
            <div>
              <p className="font-medium text-gray-800">Volume</p>
              <p>{stock.volume.toLocaleString()}</p>
            </div>
            <div>
              <p className="font-medium text-gray-800">Change</p>
              <p className={stock.percentageChange >= 0 ? 'text-green-600' : 'text-red-600'}>
                {stock.percentageChange.toFixed(2)}%
              </p>
            </div>
            <div>
              <p className="font-medium text-gray-800">Buy Ratio</p>
              <p>{latest.buy}%</p>
            </div>
            <div>
              <p className="font-medium text-gray-800">Hold Ratio</p>
              <p>{latest.hold}%</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
