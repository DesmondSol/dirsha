import React from 'react';
import type { CommodityPrediction } from '../types';

interface ForecastDetailsModalProps {
  commodity: CommodityPrediction;
  onClose: () => void;
}

const CloseIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>;

const InteractiveChart = ({ data, height = 320 }) => {
    const allData = [...data.historical, ...data.forecast];
    const yValues = allData.map(d => d.y);
    const yMin = Math.min(...yValues) * 0.95;
    const yMax = Math.max(...yValues) * 1.05;
    const xStep = 100 / (allData.length -1);

    const getCoords = (points) => {
        return points.map((p, i) => {
            const x = i * xStep;
            const y = 100 - ((p.y - yMin) / (yMax - yMin)) * 100;
            return `${x},${y}`;
        }).join(' ');
    };
    
    return (
        <svg width="100%" height={height} viewBox="0 0 100 100" preserveAspectRatio="none" className="bg-black/20 rounded-md">
            {/* Historical Data */}
            <polyline fill="none" stroke="#4ade80" strokeWidth="0.5" points={getCoords(data.historical)} />
            {/* Forecast Data */}
            <polyline fill="none" stroke="#a855f7" strokeWidth="0.5" strokeDasharray="1,1" points={getCoords(data.historical.slice(-1).concat(data.forecast))} />
             {/* Confidence Band */}
            <polygon fill="url(#confidenceGradientModal)" points={`${getCoords(data.historical.slice(-1).concat(data.forecast))} ${getCoords(data.historical.slice(-1).concat(data.forecast).reverse().map(p => ({y: p.y * 0.98, x: p.x})))}`} />
            <defs>
                <linearGradient id="confidenceGradientModal" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#a855f7" stopOpacity="0.2"/>
                    <stop offset="100%" stopColor="#a855f7" stopOpacity="0"/>
                </linearGradient>
            </defs>
        </svg>
    );
};


const ForecastDetailsModal: React.FC<ForecastDetailsModalProps> = ({ commodity, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex justify-center items-center p-4" onClick={onClose}>
      <div className="bg-gray-900/95 backdrop-blur-md rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col border border-purple-500/50" onClick={e => e.stopPropagation()}>
        <div className="flex justify-between items-center p-5 border-b border-gray-700">
          <h2 className="text-2xl font-bold text-white">
            Forecast Details: <span className="bg-gradient-to-r from-green-400 to-purple-400 text-transparent bg-clip-text">{commodity.name}</span>
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
            <CloseIcon />
          </button>
        </div>
        <div className="p-6 overflow-y-auto space-y-6">
            <div className="h-80 w-full">
                <InteractiveChart data={commodity} />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2 bg-gray-800/50 p-4 rounded-lg border border-gray-700">
                    <h3 className="font-bold text-lg text-purple-400 mb-2">AI Forecast Analysis</h3>
                    <p className="text-gray-300 text-sm leading-relaxed">{commodity.forecastDetails}</p>
                </div>
                 <div className="md:col-span-1 bg-gray-800/50 p-4 rounded-lg border border-gray-700 flex flex-col justify-center items-center">
                    <h3 className="font-bold text-lg text-green-400 mb-2">Trading Volume</h3>
                    <p className="text-3xl font-mono text-white">{commodity.volume.toLocaleString()}</p>
                    <p className="text-sm text-gray-400">{commodity.unit.startsWith('USD') ? 'lbs' : 'quintals'}</p>
                </div>
            </div>
        </div>
        <div className="mt-auto p-4 border-t border-gray-700 flex justify-end">
          <button onClick={onClose} className="px-6 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition">Close</button>
        </div>
      </div>
    </div>
  );
};

export default ForecastDetailsModal;