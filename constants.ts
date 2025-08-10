import type { Bond, Contract, CommodityPrediction } from './types';

export const DUMMY_BONDS: Bond[] = [
  {
    id: 'bond-1',
    titleKey: 'bond_1_title',
    descriptionKey: 'bond_1_desc',
    requirementsKey: 'bond_1_reqs',
    price: 1500,
    itemPrice: 1.5,
    tags: ['Avocado', 'Organic', 'Export', 'Fruit'],
    executionTime: '2024-09-30',
    expires: '2024-07-30',
    creator: 'FreshExporters Inc.'
  },
  {
    id: 'bond-2',
    titleKey: 'bond_2_title',
    descriptionKey: 'bond_2_desc',
    requirementsKey: 'bond_2_reqs',
    price: 2000,
    itemPrice: 400,
    tags: ['Maize', 'Cereal', 'Local', 'Milling'],
    executionTime: '2024-08-15',
    expires: '2024-07-20',
    creator: 'Unga Bora Millers'
  },
  {
    id: 'bond-3',
    titleKey: 'bond_3_title',
    descriptionKey: 'bond_3_desc',
    requirementsKey: 'bond_3_reqs',
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
        nameKey: "commodity_coffee",
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
        forecastDetailsKey: "forecast_details_coffee",
        volume: 7500000,
    },
    {
        nameKey: "commodity_teff",
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
        forecastDetailsKey: "forecast_details_teff",
        volume: 250000,
    },
    {
        nameKey: "commodity_wheat",
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
        forecastDetailsKey: "forecast_details_wheat",
        volume: 400000,
    },
     {
        nameKey: "commodity_onion",
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
        forecastDetailsKey: "forecast_details_onion",
        volume: 120000,
    }
];

export const TRIGGERS = {
    economic: [
        { nameKey: "trigger_inflation", value: "15.2%", impact: "high" },
        { nameKey: "trigger_exchange_rate", value: "54.3", impact: "medium" },
        { nameKey: "trigger_transport_cost", value: "+8%", impact: "high" },
    ],
    weather: [
        { nameKey: "trigger_rainfall", value: "-12%", impact: "high" },
        { nameKey: "trigger_drought", value: "Active in 3 regions", impact: "medium" },
    ],
    seasonal: [
        { nameKey: "trigger_harvest", value: "Peak for Wheat", impact: "low" },
        { nameKey: "trigger_fasting", value: "Upcoming", impact: "medium" },
    ]
};

export const AI_RECOMMENDATIONS = [
    { titleKey: "rec_1_title", textKey: "rec_1_text" },
    { titleKey: "rec_2_title", textKey: "rec_2_text" },
    { titleKey: "rec_3_title", textKey: "rec_3_text" },
];