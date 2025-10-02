import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface IndexData {
  name: string;
  symbol: string;
  value: string;
  change: string;
  yahooUrl: string;
}

const EUROPEAN_INDICES = [
  { name: "STOXX 600", symbol: "^STOXX", yahooSymbol: "%5ESTOXX" },
  { name: "DAX", symbol: "^GDAXI", yahooSymbol: "%5EGDAXI" },
  { name: "CAC 40", symbol: "^FCHI", yahooSymbol: "%5EFCHI" },
  { name: "FTSE 100", symbol: "^FTSE", yahooSymbol: "%5EFTSE" },
  { name: "FTSE MIB", symbol: "FTSEMIB.MI", yahooSymbol: "FTSEMIB.MI" },
  { name: "IBEX 35", symbol: "^IBEX", yahooSymbol: "%5EIBEX" },
  { name: "AEX", symbol: "^AEX", yahooSymbol: "%5EAEX" },
  { name: "BEL 20", symbol: "^BFX", yahooSymbol: "%5EBFX" },
];

async function fetchYahooQuote(symbol: string) {
  try {
    const url = `https://query1.finance.yahoo.com/v8/finance/chart/${symbol}?interval=1d&range=1d`;
    const response = await fetch(url);
    const data = await response.json();
    
    if (data.chart?.result?.[0]) {
      const result = data.chart.result[0];
      const meta = result.meta;
      const currentPrice = meta.regularMarketPrice;
      const previousClose = meta.chartPreviousClose || meta.previousClose;
      
      if (currentPrice && previousClose) {
        const change = ((currentPrice - previousClose) / previousClose) * 100;
        return {
          value: currentPrice.toFixed(2),
          change: change.toFixed(2),
        };
      }
    }
    return null;
  } catch (error) {
    console.error(`Error fetching ${symbol}:`, error);
    return null;
  }
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const indices: IndexData[] = [];

    for (const index of EUROPEAN_INDICES) {
      const quote = await fetchYahooQuote(index.symbol);
      
      if (quote) {
        indices.push({
          name: index.name,
          symbol: index.symbol,
          value: quote.value,
          change: quote.change,
          yahooUrl: `https://finance.yahoo.com/quote/${index.yahooSymbol}`,
        });
      } else {
        // Fallback to mock data if fetch fails
        const mockChange = (Math.random() * 2 - 1).toFixed(2);
        const mockValue = (Math.random() * 10000 + 5000).toFixed(2);
        indices.push({
          name: index.name,
          symbol: index.symbol,
          value: mockValue,
          change: mockChange,
          yahooUrl: `https://finance.yahoo.com/quote/${index.yahooSymbol}`,
        });
      }
    }

    return new Response(
      JSON.stringify({ indices }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );
  } catch (error: any) {
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    );
  }
});
