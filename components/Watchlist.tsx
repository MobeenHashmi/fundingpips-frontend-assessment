'use client';

import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { useStore } from '@/lib/store';
import { Stock } from '@/lib/types';
import { mockStocks, generateMockPriceUpdate } from '@/lib/mockData';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export default function Watchlist() {
  const { watchlist, user } = useStore();
  const [liveData, setLiveData] = useState<Stock[]>([]);
  const [loading, setLoading] = useState(true);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const initializeMockWebSocket = () => {
    const baseData: Stock[] =
      watchlist.length > 0
        ? watchlist
            .map((s) => mockStocks.find((m) => m.symbol === s.symbol))
            .filter(Boolean) as Stock[]
        : [];

    setLiveData(baseData);

    intervalRef.current = setInterval(() => {
      setLiveData((prev) => prev.map((stock) => generateMockPriceUpdate(stock)));
    }, 3000);
  };

  useEffect(() => {
    setLoading(true);
    initializeMockWebSocket();

    const timeout = setTimeout(() => {
      setLoading(false);
    }, 1000); // fake loading duration

    return () => {
      clearInterval(timeout);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [watchlist]);

  if (!user) return null;

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>Your Watchlist</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="max-h-[300px] overflow-y-auto custom-scroll pr-2">
          {loading ? (
            <ul className="space-y-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <li
                  key={i}
                  className="border p-2 rounded-md flex justify-between items-center"
                >
                  <Skeleton className="w-32 h-6" />
                  <Skeleton className="w-16 h-6" />
                </li>
              ))}
            </ul>
          ) : watchlist.length === 0 || liveData.length === 0 ? (
            <p className="text-sm text-muted-foreground">No data available.</p>
          ) : (
            <ul className="space-y-2">
              {liveData.map((stock) => (
                <li
                  key={stock.symbol}
                  className="border p-2 rounded-md flex justify-between hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer"
                >
                  <Link href={`/stock/${stock.symbol}`} className="flex justify-between w-full">
                    <span>
                      <strong>{stock.symbol}</strong> — {stock.name}
                    </span>
                    <span>${stock.price.toFixed(2)}</span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
