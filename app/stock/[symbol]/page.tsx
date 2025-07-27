import StockDetailClient from '@/components/StockChart';
import { notFound } from 'next/navigation';
import { fetchStocks } from '@/lib/mockData'; // ⬅️ Replace with your fetch function

export const dynamic = 'force-dynamic';

export default async function StockDetailPage({
  params,
}: {
  params: Promise<{ symbol: string }>; 
}) {
  const { symbol } = await params; // ✅ await the params
  const stocks = await fetchStocks();
  const stock = stocks.find((s) => s.symbol === symbol);

  if (!stock) {
    notFound();
  }

  return <StockDetailClient initialStock={stock} />;
}

export async function generateStaticParams() {
  const stocks = await fetchStocks();
  return stocks.map((stock) => ({
    symbol: stock.symbol,
  }));
}