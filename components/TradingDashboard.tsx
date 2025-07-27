'use client';

import { useEffect, useRef, useState } from 'react';
import { useStore } from '@/lib/store';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Stock } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';

const ITEMS_PER_BATCH = 10;

export default function TradingDashboard() {
  const { stocks, user, addToWatchlist } = useStore();
  const [visibleCount, setVisibleCount] = useState(0);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Simulate initial data load
    const timeout = setTimeout(() => {
      setVisibleCount(ITEMS_PER_BATCH);
      setInitialLoading(false);
    }, 1000);

    return () => clearTimeout(timeout);
  }, []);

  const visibleStocks = stocks.slice(0, visibleCount);

  const handleAddToWatchList = (stock: Stock) => {
    addToWatchlist(stock);
  };

  const handleScroll = () => {
    if (!containerRef.current || isLoadingMore) return;

    const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
    const bottomReached = scrollTop + clientHeight >= scrollHeight - 50;

    if (bottomReached && visibleCount < stocks.length) {
      setIsLoadingMore(true);
      setTimeout(() => {
        setVisibleCount((prev) => prev + ITEMS_PER_BATCH);
        setIsLoadingMore(false);
      }, 800);
    }
  };

  useEffect(() => {
    const el = containerRef.current;
    if (el) el.addEventListener('scroll', handleScroll);
    return () => {
      if (el) el.removeEventListener('scroll', handleScroll);
    };
  }, [visibleCount, isLoadingMore]);

  if (!user) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Add to Watch List</CardTitle>
          <CardDescription>Please log in</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Available Stocks</CardTitle>
        <CardDescription>Select to add them to your watchlist</CardDescription>
      </CardHeader>

      <div>
        <div
          ref={containerRef}
          className="max-h-[500px] overflow-y-auto space-y-4 pr-2 custom-scroll"
        >
          {initialLoading
            ? Array.from({ length: ITEMS_PER_BATCH }).map((_, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-4 border rounded-xl"
                >
                  <div className="space-y-2 w-full">
                    <Skeleton className="h-4 w-1/3" />
                    <Skeleton className="h-3 w-1/4" />
                  </div>
                  <Skeleton className="h-8 w-28 ml-4" />
                </div>
              ))
            : visibleStocks.map((stock) => (
                <div
                  key={stock.symbol}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted transition"
                >
                  <div>
                    <h3 className="font-semibold text-base">{stock.symbol}</h3>
                    <p className="text-sm text-muted-foreground">
                      ${stock.price.toFixed(2)}
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    onClick={() => handleAddToWatchList(stock)}
                  >
                    Add to Watchlist
                  </Button>
                </div>
              ))}

          {isLoadingMore &&
            Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div className="space-y-2 w-full">
                  <Skeleton className="h-4 w-1/3" />
                  <Skeleton className="h-3 w-1/4" />
                </div>
                <Skeleton className="h-8 w-28 ml-4" />
              </div>
            ))}
        </div>
      </div>
    </Card>
  );
}
