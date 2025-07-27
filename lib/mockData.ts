import axios from 'axios';
import { Stock } from './types';

const API_KEY = process.env.NEXT_PUBLIC_TWELVE_DATA_API_KEY;
const symbols = [
  'AAPL', 'GOOGL', 'MSFT', 'AMZN', 'TSLA',
  'NVDA', 'META', 'NFLX', 'BABA', 'INTC',
  'ORCL', 'IBM', 'ADBE', 'CRM', 'CSCO',
  'PYPL', 'PEP', 'KO', 'NKE', 'MCD',
  'V', 'MA', 'BA', 'GE', 'WMT',
  'ZQWS', 'UFCT', 'MHJX', 'KLRP', 'NXAO',
  'QPBE', 'BWMC', 'OJAI', 'GZEP', 'TVRS',
  'EYKB', 'DJME', 'RLNU', 'CVHX', 'XAGI',
  'LZTP', 'AVEN', 'WQRO', 'KFBD', 'NCSL',
  'BMEJ', 'ITRC', 'PXUT', 'SDQA', 'RQPF'
];


export const mockStocks: Stock[] = [
  {
    symbol: 'AAPL',
    name: 'Apple Inc.',
    price: 1320.4,
    previousPrice: 1291.99,
    percentageChange: 2.2,
    volume: 360137,
  },
  {
    symbol: 'GOOGL',
    name: 'Alphabet Inc.',
    price: 1254.36,
    previousPrice: 1240.6,
    percentageChange: 1.11,
    volume: 327181,
  },
  {
    symbol: 'MSFT',
    name: 'Microsoft Corporation',
    price: 934.97,
    previousPrice: 960.5,
    percentageChange: -2.66,
    volume: 481050,
  },
  {
    symbol: 'AMZN',
    name: 'Amazon.com Inc.',
    price: 328.57,
    previousPrice: 325.5,
    percentageChange: 0.94,
    volume: 719366,
  },
  {
    symbol: 'TSLA',
    name: 'Tesla Inc.',
    price: 697.66,
    previousPrice: 687.6,
    percentageChange: 1.46,
    volume: 986017,
  },
  {
    symbol: 'NVDA',
    name: 'NVIDIA Corporation',
    price: 716.06,
    previousPrice: 732.94,
    percentageChange: -2.31,
    volume: 324892,
  },
  {
    symbol: 'META',
    name: 'Meta Platforms Inc.',
    price: 1355.96,
    previousPrice: 1351.47,
    percentageChange: 0.33,
    volume: 886025,
  },
  {
    symbol: 'NFLX',
    name: 'Netflix Inc.',
    price: 1240.27,
    previousPrice: 1276.38,
    percentageChange: -2.83,
    volume: 702740,
  },
  {
    symbol: 'BABA',
    name: 'Alibaba Group Holding Ltd.',
    price: 1183.91,
    previousPrice: 1174.17,
    percentageChange: 0.83,
    volume: 538318,
  },
  {
    symbol: 'INTC',
    name: 'Intel Corporation',
    price: 969.55,
    previousPrice: 1000.29,
    percentageChange: -3.07,
    volume: 343742,
  },
  {
    symbol: 'ORCL',
    name: 'Oracle Corporation',
    price: 744.62,
    previousPrice: 723.52,
    percentageChange: 2.91,
    volume: 404962,
  },
  {
    symbol: 'ADBE',
    name: 'Adobe Inc.',
    price: 623.08,
    previousPrice: 611.19,
    percentageChange: 1.95,
    volume: 827961,
  },
  {
    symbol: 'CRM',
    name: 'Salesforce.com Inc.',
    price: 469.65,
    previousPrice: 454.42,
    percentageChange: 3.34,
    volume: 937538,
  },
  {
    symbol: 'CSCO',
    name: 'Cisco Systems Inc.',
    price: 130.18,
    previousPrice: 133.51,
    percentageChange: -2.49,
    volume: 751923,
  },
  {
    symbol: 'AVGO',
    name: 'Broadcom Inc.',
    price: 722.17,
    previousPrice: 722.93,
    percentageChange: -0.11,
    volume: 999994,
  },
  {
    symbol: 'TXN',
    name: 'Texas Instruments Inc.',
    price: 491.01,
    previousPrice: 497.96,
    percentageChange: -1.4,
    volume: 305173,
  },
  {
    symbol: 'AMD',
    name: 'Advanced Micro Devices Inc.',
    price: 1146.91,
    previousPrice: 1119.27,
    percentageChange: 2.47,
    volume: 394411,
  },
  {
    symbol: 'QCOM',
    name: 'QUALCOMM Incorporated',
    price: 117.95,
    previousPrice: 114.81,
    percentageChange: 2.73,
    volume: 860381,
  },
  {
    symbol: 'PYPL',
    name: 'PayPal Holdings Inc.',
    price: 402.62,
    previousPrice: 403.48,
    percentageChange: -0.21,
    volume: 154615,
  },
  {
    symbol: 'SHOP',
    name: 'Shopify Inc.',
    price: 702.91,
    previousPrice: 707.02,
    percentageChange: -0.58,
    volume: 926201,
  },
  {
    symbol: 'UBER',
    name: 'Uber Technologies Inc.',
    price: 603.37,
    previousPrice: 586.25,
    percentageChange: 2.92,
    volume: 487400,
  },
  {
    symbol: 'LYFT',
    name: 'Lyft Inc.',
    price: 469.18,
    previousPrice: 470.02,
    percentageChange: -0.18,
    volume: 228679,
  },
  {
    symbol: 'SNAP',
    name: 'Snap Inc.',
    price: 137.61,
    previousPrice: 136.5,
    percentageChange: 0.81,
    volume: 324648,
  },
  {
    symbol: 'TWTR',
    name: 'Twitter Inc.',
    price: 582.87,
    previousPrice: 566.57,
    percentageChange: 2.88,
    volume: 185489,
  },
  {
    symbol: 'ZM',
    name: 'Zoom Video Communications Inc.',
    price: 662.48,
    previousPrice: 648.5,
    percentageChange: 2.15,
    volume: 829012,
  },
  {
    symbol: 'ROKU',
    name: 'Roku Inc.',
    price: 380.2,
    previousPrice: 385.38,
    percentageChange: -1.34,
    volume: 315289,
  },
  {
    symbol: 'DOCU',
    name: 'DocuSign Inc.',
    price: 665.12,
    previousPrice: 674.91,
    percentageChange: -1.45,
    volume: 610037,
  },
  {
    symbol: 'PLTR',
    name: 'Palantir Technologies Inc.',
    price: 823.66,
    previousPrice: 844.63,
    percentageChange: -2.48,
    volume: 176870,
  },
  {
    symbol: 'SQ',
    name: 'Block Inc.',
    price: 669.15,
    previousPrice: 650.46,
    percentageChange: 2.87,
    volume: 340626,
  },
  {
    symbol: 'SPOT',
    name: 'Spotify Technology S.A.',
    price: 117.36,
    previousPrice: 120.53,
    percentageChange: -2.63,
    volume: 141142,
  },
  {
    symbol: 'NET',
    name: 'Cloudflare Inc.',
    price: 255.53,
    previousPrice: 250.02,
    percentageChange: 2.2,
    volume: 576473,
  },
  {
    symbol: 'DDOG',
    name: 'Datadog Inc.',
    price: 135.29,
    previousPrice: 136.17,
    percentageChange: -0.65,
    volume: 909471,
  },
  {
    symbol: 'FSLY',
    name: 'Fastly Inc.',
    price: 93.23,
    previousPrice: 96.28,
    percentageChange: -3.17,
    volume: 847900,
  },
  {
    symbol: 'CRWD',
    name: 'CrowdStrike Holdings Inc.',
    price: 151.69,
    previousPrice: 147.0,
    percentageChange: 3.19,
    volume: 740070,
  },
  {
    symbol: 'OKTA',
    name: 'Okta Inc.',
    price: 608.4,
    previousPrice: 599.01,
    percentageChange: 1.57,
    volume: 681344,
  },
  {
    symbol: 'ZS',
    name: 'Zscaler Inc.',
    price: 232.31,
    previousPrice: 229.65,
    percentageChange: 1.16,
    volume: 902734,
  },
  {
    symbol: 'MDB',
    name: 'MongoDB Inc.',
    price: 677.5,
    previousPrice: 687.59,
    percentageChange: -1.47,
    volume: 486827,
  },
  {
    symbol: 'SNOW',
    name: 'Snowflake Inc.',
    price: 1411.38,
    previousPrice: 1373.4,
    percentageChange: 2.77,
    volume: 711662,
  },
  {
    symbol: 'BIDU',
    name: 'Baidu Inc.',
    price: 892.0,
    previousPrice: 865.62,
    percentageChange: 3.05,
    volume: 186740,
  },
  {
    symbol: 'JD',
    name: 'JD.com Inc.',
    price: 271.71,
    previousPrice: 277.76,
    percentageChange: -2.18,
    volume: 205894,
  },
  {
    symbol: 'PDD',
    name: 'Pinduoduo Inc.',
    price: 1096.02,
    previousPrice: 1111.63,
    percentageChange: -1.41,
    volume: 705191,
  },
  {
    symbol: 'TCEHY',
    name: 'Tencent Holdings Ltd.',
    price: 402.42,
    previousPrice: 397.47,
    percentageChange: 1.25,
    volume: 649820,
  },
  {
    symbol: 'NTES',
    name: 'NetEase Inc.',
    price: 1153.96,
    previousPrice: 1127.61,
    percentageChange: 2.34,
    volume: 187420,
  },
  {
    symbol: 'XPEV',
    name: 'XPeng Inc.',
    price: 833.07,
    previousPrice: 823.16,
    percentageChange: 1.21,
    volume: 615578,
  },
  {
    symbol: 'LI',
    name: 'Li Auto Inc.',
    price: 839.43,
    previousPrice: 848.49,
    percentageChange: -1.07,
    volume: 144428,
  },
  {
    symbol: 'NIO',
    name: 'NIO Inc.',
    price: 1013.6,
    previousPrice: 987.86,
    percentageChange: 2.6,
    volume: 415778,
  },
  {
    symbol: 'BA',
    name: 'The Boeing Company',
    price: 541.41,
    previousPrice: 552.92,
    percentageChange: -2.09,
    volume: 225689,
  },
  {
    symbol: 'GE',
    name: 'General Electric Company',
    price: 719.82,
    previousPrice: 738.45,
    percentageChange: -2.52,
    volume: 200799,
  },
  {
    symbol: 'F',
    name: 'Ford Motor Company',
    price: 326.49,
    previousPrice: 330.26,
    percentageChange: -1.14,
    volume: 474542,
  },
  {
    symbol: 'GM',
    name: 'General Motors Company',
    price: 225.6,
    previousPrice: 218.8,
    percentageChange: 3.11,
    volume: 784601,
  },
];



export async function fetchStocks(): Promise<Stock[]> {
  if (!API_KEY) {
    console.error('❌ Twelve Data API key not defined in environment variables.');
    return mockStocks;
  }

  try {
    const url = `https://api.twelvedata.com/quote?symbol=${symbols.join(',')}&apikey=${API_KEY}`;
    const response = await axios.get(url);
    const data = response.data;

    // Handle TwelveData-specific error message with 429 code
    if (data.status === "error" && data.code === 429) {
      console.warn('⚠️ API limit reached (429). Showing mock data.');
      return mockStocks;
    }

    if (!data || Object.keys(data).length === 0) {
      throw new Error('❌ Received empty response from Twelve Data API.');
    }

    const stocks: Stock[] = Object.values(data)
      .filter((s: any) => s && s.symbol && !s.code)
      .map((s: any) => ({
        symbol: s.symbol,
        name: s.name,
        price: parseFloat(s.close),
        previousPrice: parseFloat(s.previous_close),
        percentageChange:
          ((parseFloat(s.close) - parseFloat(s.previous_close)) / parseFloat(s.previous_close)) * 100,
        volume: Number(s.volume) || 0,
      }));

    return stocks;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 429) {
        console.warn('⚠️ HTTP 429 Too Many Requests. Showing mock data.');
        return mockStocks;
      }
      console.error('❌ Axios error:', error.response?.data || error.message);
    } else {
      console.error('❌ Unexpected error:', error);
    }
   return Promise.resolve(mockStocks);
  }
}


export function generateMockPriceUpdate(stock: Stock): Stock {
  const priceChange = (Math.random() - 0.5) * (stock.price * 0.02);
  const newPrice = stock.price + priceChange;
  const percentageChange = ((newPrice - stock.previousPrice) / stock.previousPrice) * 100;

  return {
    ...stock,
    previousPrice: stock.price,
    price: Number(newPrice.toFixed(2)),
    percentageChange: Number(percentageChange.toFixed(2)),
    volume: stock.volume + Math.floor(Math.random() * 10000),
  };
}
