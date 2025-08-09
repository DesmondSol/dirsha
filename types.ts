
export interface Bond {
  id: string;
  title: string;
  description: string;
  requirements: string;
  price: number;
  itemPrice: number;
  tags: string[];
  executionTime: string;
  expires: string;
  creator: string;
}

export interface Contract extends Bond {
  taker: {
    name: string;
    contact: string;
    bankDetails: string;
    idPhoto: File | null;
  };
  status: 'active' | 'finished' | 'failed' | 'disputed';
}

export interface RegionalPrice {
  region: string;
  price: number;
  coords: { x: string; y: string };
}

export interface DataPoint {
    x: string;
    y: number;
}

export interface CommodityPrediction {
  name: string;
  currentPrice: number;
  change: number;
  unit: string;
  sparkline: number[];
  historical: DataPoint[];
  forecast: DataPoint[];
  regionalPrices: RegionalPrice[];
  forecastDetails: string;
  volume: number;
}
