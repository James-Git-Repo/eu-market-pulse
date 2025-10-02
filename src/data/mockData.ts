export interface Post {
  id: string;
  slug: string;
  title: string;
  dek: string;
  tag: string;
  author: string;
  readTime: string;
  publishedAt: string;
  content: string;
  status: string;
}

export const MOCK_POSTS: Post[] = [
  {
    id: "1",
    slug: "eu-banks-nim-compression",
    title: "Earnings Pulse: EU Banks' NIM Compression vs. Resilient Fees",
    dek: "Why guidance beats beats: reading the spread between commentary and consensus.",
    tag: "Banks",
    readTime: "6 min",
    publishedAt: "2025-10-01",
    author: "TSN Desk",
    content: `# Earnings Pulse: EU Banks' NIM Compression vs. Resilient Fees

Net interest margin (NIM) compression has become the dominant narrative across European banking, but the real signal lies in fee income resilience and management guidance.

## Key Takeaways

- **NIM Compression**: Most major EU banks reported sequential NIM decline of 5-8 basis points
- **Fee Income**: Wealth management and transaction fees up 12-15% YoY
- **Management Guidance**: Forward-looking commentary more important than Q3 beats

## What This Means

The market is pricing in ECB rate cuts, but strong fee income provides a buffer. Watch for:
1. Asset quality metrics
2. Cost-income ratios
3. Capital return announcements

Investment banks with strong trading desks and wealth management arms are outperforming traditional retail-focused players.`,
    status: "published",
  },
  {
    id: "2",
    slug: "semis-cyclicals-growth",
    title: "Semis in Europe: Cyclicals Wearing Growth Clothing",
    dek: "Capex, export mix, and the FX tailwinds that actually matter.",
    tag: "Tech",
    readTime: "7 min",
    publishedAt: "2025-09-29",
    author: "TSN Desk",
    content: `# Semis in Europe: Cyclicals Wearing Growth Clothing

European semiconductor companies are navigating a complex landscape of cyclical demand patterns while maintaining growth narratives.

## Current State

- **Capex Cycles**: Major players increasing spending by 20-25%
- **Export Dynamics**: China exposure creating volatility
- **FX Impact**: Euro weakness providing 3-5% tailwind

## Investment Implications

The sector requires nuanced analysis beyond simple growth metrics. Key considerations:

1. **Supply Chain Position**: Companies with diversified manufacturing have outperformed
2. **End-Market Exposure**: Auto vs. industrial vs. consumer splits matter
3. **Technology Leadership**: R&D spend as % of revenue is critical

Watch for inventory normalization cycles and order book commentary in upcoming earnings.`,
    status: "published",
  },
  {
    id: "3",
    slug: "pharma-pricing-pressure",
    title: "Pharma Pricing Pressure: Reading Between Policy Lines",
    dek: "How European pharma navigates pricing reforms without headline drama.",
    tag: "Healthcare",
    readTime: "5 min",
    publishedAt: "2025-09-27",
    author: "TSN Desk",
    content: `# Pharma Pricing Pressure: Reading Between Policy Lines

European pharmaceutical companies face increasing pricing pressure from government reforms, but the impact varies significantly by company strategy.

## The Landscape

- **Generic Erosion**: Accelerating in key markets
- **Specialty Focus**: Companies with rare disease portfolios outperforming
- **Biosimilar Competition**: Reshaping the biologics market

## Strategic Responses

Leading companies are pivoting to:

1. Rare disease and orphan drugs
2. Innovative reimbursement models
3. Digital health integration

The key metric to watch: gross-to-net deductions as a percentage of list price. This reveals true pricing power.`,
    status: "published",
  },
  {
    id: "4",
    slug: "energy-transition-metals",
    title: "Energy Transition: The Metals Supply Bottleneck",
    dek: "Why copper, lithium, and nickel prices tell different stories.",
    tag: "Energy",
    readTime: "8 min",
    publishedAt: "2025-09-25",
    author: "TSN Desk",
    content: `# Energy Transition: The Metals Supply Bottleneck

The energy transition narrative focuses on EVs and renewables, but metals supply chains are the real constraint—and opportunity.

## Supply-Demand Dynamics

- **Copper**: Deficit projected through 2030
- **Lithium**: Oversupply concerns short-term, tight long-term
- **Nickel**: Class 1 vs. Class 2 spread widening

## Investment Framework

The transition metals thesis requires understanding:

1. Mine development timelines (7-10 years)
2. Permitting risk by jurisdiction
3. Processing capacity constraints

European mining companies with advanced-stage projects in stable jurisdictions trade at significant premiums for good reason.`,
    status: "published",
  },
  {
    id: "5",
    slug: "luxury-slowdown-signals",
    title: "Luxury Slowdown: Separating Noise from Signal",
    dek: "When aspirational demand shifts, high-end resilience becomes key.",
    tag: "Consumer",
    readTime: "6 min",
    publishedAt: "2025-09-23",
    author: "TSN Desk",
    content: `# Luxury Slowdown: Separating Noise from Signal

European luxury goods companies are experiencing a bifurcation between aspirational and ultra-high-net-worth customer segments.

## Current Trends

- **Aspirational Segment**: Down 15-20% YoY
- **UHNW Segment**: Flat to up 5%
- **Regional Divergence**: Asia weakness, US strength

## What to Watch

The key differentiation factors:

1. Brand heritage and exclusivity
2. Pricing power (ability to raise prices without volume impact)
3. Geographic diversification

Companies with 40%+ UHNW exposure are significantly outperforming mass-luxury plays.`,
    status: "published",
  },
  {
    id: "6",
    slug: "insurance-reinsurance-rates",
    title: "Insurance Reinsurance Rates: The Hidden Rate Cycle",
    dek: "Property cat rates up 30%, but casualty tells the real story.",
    tag: "Insurance",
    readTime: "7 min",
    publishedAt: "2025-09-21",
    author: "TSN Desk",
    content: `# Insurance Reinsurance Rates: The Hidden Rate Cycle

Reinsurance rate increases are accelerating, but the impact varies dramatically by line of business.

## Rate Environment

- **Property Catastrophe**: Up 25-35%
- **Casualty**: Up 10-15%
- **Specialty Lines**: Mixed picture

## Investment Implications

The hardening market benefits:

1. Well-capitalized reinsurers
2. Companies with disciplined underwriting
3. Specialized players in niche markets

Combined ratios below 95% are sustainable in this environment, supporting attractive returns.`,
    status: "published",
  },
];

export const TAGS = Array.from(new Set(MOCK_POSTS.map((post) => post.tag)));
