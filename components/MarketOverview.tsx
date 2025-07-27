'use client';

import { useEffect, useRef, useState } from 'react';
import { useStore, initializeStocks } from '@/lib/store';
import Watchlist from '@/components/Watchlist';
import { Stock } from '@/lib/types';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { ArrowUpIcon, ArrowDownIcon } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

const BATCH_SIZE = 5;

export default function MarketOverview() {
  const { stocks } = useStore();
  const [search, setSearch] = useState('');
  const [visibleCount, setVisibleCount] = useState(BATCH_SIZE);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const loaderRef = useRef<HTMLTableRowElement | null>(null);

  useEffect(() => {
    initializeStocks();
    const timeout = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timeout);
  }, []);

  const filtered = stocks.filter(
    (stock) =>
      stock.symbol.toLowerCase().includes(search.toLowerCase()) ||
      stock.name.toLowerCase().includes(search.toLowerCase())
  );

  const visibleStocks = filtered.slice(0, visibleCount);

  // Lazy load more on scroll
  useEffect(() => {
    if (!loaderRef.current || visibleCount >= filtered.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !loadingMore) {
          setLoadingMore(true);
          setTimeout(() => {
            setVisibleCount((prev) =>
              Math.min(prev + BATCH_SIZE, filtered.length)
            );
            setLoadingMore(false);
          }, 800);
        }
      },
      { rootMargin: '100px' }
    );

    observer.observe(loaderRef.current);

    return () => {
      if (loaderRef.current) observer.unobserve(loaderRef.current);
    };
  }, [visibleCount, filtered.length, loadingMore]);
useEffect(() => {
  if (visibleCount < filtered.length && !loading && !loadingMore) {
    // If the content height is not scrollable yet, manually load more
    const container = document.querySelector('.custom-scroll');
    if (container && container.scrollHeight <= container.clientHeight) {
      setLoadingMore(true);
      setTimeout(() => {
        setVisibleCount((prev) => Math.min(prev + BATCH_SIZE, filtered.length));
        setLoadingMore(false);
      }, 500);
    }
  }
}, [visibleCount, filtered.length, loading, loadingMore]);

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
  <Input
    placeholder="Search by symbol or name..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4"
  />
</div>

      <div className="rounded-xl border-2 bg-card max-h-[500px] overflow-y-auto custom-scroll">
        {loading ? (
          <div className="p-4 space-y-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="flex justify-between space-x-4">
                <Skeleton className="h-8 w-16" />
                <Skeleton className="h-8 w-48" />
                <Skeleton className="h-8 w-20" />
                <Skeleton className="h-8 w-20" />
                <Skeleton className="h-8 w-24" />
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="p-4">No matching stocks.</div>
        ) : (
          <div className="w-full overflow-x-auto">

          <Table>
            <TableHeader className="sticky top-0 bg-card z-10">
              <TableRow>
                <TableHead className="bg-card">Symbol</TableHead>
                <TableHead className="bg-card">Name</TableHead>
                <TableHead className="text-right bg-card">Price</TableHead>
                <TableHead className="text-right bg-card">Change</TableHead>
                <TableHead className="text-right bg-card">Volume</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {visibleStocks.map((stock: Stock) => (
                <TableRow key={stock.symbol}>
                  <TableCell className="font-medium">{stock.symbol}</TableCell>
                  <TableCell>{stock.name}</TableCell>
                  <TableCell className="text-right">
                    ${stock.price.toFixed(2)}
                  </TableCell>
                  <TableCell className="text-right">
                    <span
                      className={`flex items-center justify-end ${
                        stock.percentageChange >= 0
                          ? 'text-green-600'
                          : 'text-red-600'
                      }`}
                    >
                      {stock.percentageChange >= 0 ? (
                        <ArrowUpIcon className="h-4 w-4 mr-1" />
                      ) : (
                        <ArrowDownIcon className="h-4 w-4 mr-1" />
                      )}
                      {Math.abs(stock.percentageChange).toFixed(2)}%
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    {stock.volume.toLocaleString()}
                  </TableCell>
                </TableRow>
              ))}

              {/* Skeleton loader */}
              {loadingMore &&
                Array.from({ length: 3 }).map((_, i) => (
                  <TableRow key={`skeleton-${i}`}>
                    <TableCell>
                      <Skeleton className="h-8 w-16" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-8 w-48" />
                    </TableCell>
                    <TableCell className="text-right">
                      <Skeleton className="h-8 w-20 ml-auto" />
                    </TableCell>
                    <TableCell className="text-right">
                      <Skeleton className="h-8 w-20 ml-auto" />
                    </TableCell>
                    <TableCell className="text-right">
                      <Skeleton className="h-8 w-24 ml-auto" />
                    </TableCell>
                  </TableRow>
                ))}

              {/* Observer trigger */}
              <TableRow ref={loaderRef}>
                <TableCell colSpan={5}></TableCell>
              </TableRow>
            </TableBody>
          </Table>
          </div>
        )}
      </div>

      <Watchlist />
    </div>
  );
}
