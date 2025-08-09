import type { Bond, Contract, CommodityPrediction } from './types';

export const DUMMY_BONDS: Bond[] = [
  {
    id: 'bond-1',
    title: '1000kg of Organic Hass Avocados',
    description: 'Seeking a certified organic farmer to supply 1000kg of premium Hass avocados for export. Must meet Grade A quality standards.',
    requirements: 'Organic certification required. Must be able to deliver to Nairobi logistics hub. Packaging must be export-grade.',
    price: 1500,
    itemPrice: 1.5,
    tags: ['Avocado', 'Organic', 'Export', 'Fruit'],
    executionTime: '2024-09-30',
    expires: '2024-07-30',
    creator: 'FreshExporters Inc.'
  },
  {
    id: 'bond-2',
    title: '5 Tonnes of Maize for Milling',
    description: 'We need 5 tonnes of high-quality maize for our local milling operations. Moisture content must be below 13%.',
    requirements: 'Delivery to Eldoret. Sample must be provided for quality testing before contract finalization.',
    price: 2000,
    itemPrice: 400,
    tags: ['Maize', 'Cereal', 'Local', 'Milling'],
    executionTime: '2024-08-15',
    expires: '2024-07-20',
    creator: 'Unga Bora Millers'
  },
  {
    id: 'bond-3',
    title: '200 Liters of Fresh Goat Milk Weekly',
    description: 'Weekly supply of 200 liters of fresh, pasteurized goat milk for cheese production. Continuous contract for 6 months.',
    requirements: 'Consistent weekly delivery every Monday. Health certifications for the herd are mandatory.',
    price: 500,
    itemPrice: 1.2,
    tags: ['Dairy', 'Goat Milk', 'Weekly', 'Cheese'],
    executionTime: '2024-12-31',
    expires: '2024-07-25',
    creator: 'Nanyuki Cheese Co.'
  }
];

export const DUMMY_CONTRACTS: Contract[] = [];

export const COMMODITY_PREDICTIONS: CommodityPrediction[] = [
    {
        name: "Coffee",
        currentPrice: 180.50,
        change: 1.2,
        unit: "USD/lb",
        sparkline: [178, 179, 178.5, 180, 181, 180.2, 180.5],
        historical: [{x: 'Jan', y: 160}, {x: 'Feb', y: 165}, {x: 'Mar', y: 170}, {x: 'Apr', y: 172}, {x: 'May', y: 178}, {x: 'Jun', y: 180.5}],
        forecast: [{x: 'Jul', y: 182}, {x: 'Aug', y: 185}, {x: 'Sep', y: 183}],
        regionalPrices: [
            { region: "Addis Ababa", price: 185.0, coords: { x: '46%', y: '49%' } },
            { region: "Jimma", price: 178.5, coords: { x: '34%', y: '64%' } },
            { region: "Sidama", price: 182.2, coords: { x: '42%', y: '74%' } },
            { region: "Harar", price: 181.0, coords: { x: '63%', y: '48%' } },
        ],
        forecastDetails: "Forecast based on strong international demand, favorable weather conditions in key growing regions (Jimma, Sidama), and stable government export policies. A slight increase is expected as the harvest season concludes and supplies tighten before the next cycle.",
        volume: 7500000,
    },
    {
        name: "Teff",
        currentPrice: 4800,
        change: -2.5,
        unit: "ETB/quintal",
        sparkline: [5000, 4950, 4900, 4850, 4820, 4810, 4800],
        historical: [{x: 'Jan', y: 4500}, {x: 'Feb', y: 4600}, {x: 'Mar', y: 4750}, {x: 'Apr', y: 4900}, {x: 'May', y: 5000}, {x: 'Jun', y: 4800}],
        forecast: [{x: 'Jul', y: 4700}, {x: 'Aug', y: 4650}, {x: 'Sep', y: 4750}],
        regionalPrices: [
            { region: "Addis Ababa", price: 4850, coords: { x: '46%', y: '49%' } },
            { region: "Gondar", price: 4750, coords: { x: '38%', y: '28%' } },
            { region: "Mekelle", price: 4900, coords: { x: '51%', y: '20%' } },
            { region: "Adama", price: 4800, coords: { x: '50%', y: '55%' } },
        ],
        forecastDetails: "The current price drop is attributed to the peak harvest season flooding the market. Our AI predicts prices will stabilize and slightly decrease further in the short term before rising again as the demand for the upcoming holiday season picks up.",
        volume: 250000,
    },
    {
        name: "Wheat",
        currentPrice: 3200,
        change: 3.1,
        unit: "ETB/quintal",
        sparkline: [3050, 3080, 3100, 3120, 3150, 3180, 3200],
        historical: [{x: 'Jan', y: 2800}, {x: 'Feb', y: 2900}, {x: 'Mar', y: 3000}, {x: 'Apr', y: 3050}, {x: 'May', y: 3100}, {x: 'Jun', y: 3200}],
        forecast: [{x: 'Jul', y: 3250}, {x: 'Aug', y: 3300}, {x: 'Sep', y: 3280}],
        regionalPrices: [
            { region: "Addis Ababa", price: 3250, coords: { x: '46%', y: '49%' } },
            { region: "Bale", price: 3150, coords: { x: '55%', y: '68%' } },
            { region: "Arsi", price: 3180, coords: { x: '51%', y: '60%' } },
        ],
        forecastDetails: "Increased prices are driven by higher transport costs and a dependency on international imports. The forecast indicates continued upward pressure, though this may be slightly offset by government subsidies and upcoming local harvests in the Arsi-Bale zones.",
        volume: 400000,
    },
     {
        name: "Onion",
        currentPrice: 25,
        change: 8.0,
        unit: "ETB/kg",
        sparkline: [22, 22.5, 23, 23.5, 24, 24.5, 25],
        historical: [{x: 'Jan', y: 18}, {x: 'Feb', y: 20}, {x: 'Mar', y: 19}, {x: 'Apr', y: 22}, {x: 'May', y: 23}, {x: 'Jun', y: 25}],
        forecast: [{x: 'Jul', y: 28}, {x: 'Aug', y: 30}, {x: 'Sep', y: 27}],
        regionalPrices: [
            { region: "Addis Ababa", price: 26, coords: { x: '46%', y: '49%' } },
            { region: "Dire Dawa", price: 28, coords: { x: '65%', y: '43%' } },
            { region: "Bahir Dar", price: 24, coords: { x: '37%', y: '36%' } },
        ],
        forecastDetails: "A significant price spike is anticipated due to seasonal shortages and irrigation issues in primary cultivation areas. Demand remains consistently high, putting further upward pressure on prices. The forecast suggests this trend will continue until the next major harvest.",
        volume: 120000,
    }
];

export const TRIGGERS = {
    economic: [
        { name: "Inflation Rate", value: "15.2%", impact: "high" },
        { name: "ETB/USD Exchange Rate", value: "54.3", impact: "medium" },
        { name: "Transport Cost Index", value: "+8%", impact: "high" },
    ],
    weather: [
        { name: "Rainfall Anomaly", value: "-12%", impact: "high" },
        { name: "Regional Drought", value: "Active in 3 regions", impact: "medium" },
    ],
    seasonal: [
        { name: "Harvest Season", value: "Peak for Wheat", impact: "low" },
        { name: "Fasting Period (Filseta)", value: "Upcoming", impact: "medium" },
    ]
};

export const AI_RECOMMENDATIONS = [
    { title: "Buy Onions Now", text: "Prices predicted to rise 25% in 2 weeks due to harvest delays in key regions. Secure your supply before the spike." },
    { title: "Hold on Coffee", text: "Market is stabilizing. Forecasts suggest a slight dip next month before the next rally. Wait for a better entry point." },
    { title: "Sell Wheat Stock", text: "Current prices are at a 6-month high. Our AI predicts a slight correction as new harvests enter the market." },
];