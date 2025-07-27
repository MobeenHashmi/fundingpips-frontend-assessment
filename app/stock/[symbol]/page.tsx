import { mockStocks } from '@/lib/mockData';
import StockDetailClient from '@/components/StockChart';
import { notFound } from 'next/navigation'; // ✅ Next.js way to handle 404

// `params` must be awaited inside an async function
export const dynamic = 'force-dynamic';
export default async function StockDetailPage({
  params,
}: {
  params: { symbol: string };
}) {
  const stock = mockStocks.find((s) => s.symbol === params.symbol);

  if (!stock) {
    notFound(); // ✅ triggers Next.js 404 page
  }

  return <StockDetailClient initialStock={stock} />;
}

// ✅ Used for static generation if desired
export async function generateStaticParams() {
  return mockStocks.map((stock) => ({
    symbol: stock.symbol,
  }));
}
