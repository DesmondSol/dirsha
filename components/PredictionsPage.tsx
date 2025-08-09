import React, { useState, useMemo } from 'react';
import { COMMODITY_PREDICTIONS, TRIGGERS, AI_RECOMMENDATIONS } from '../constants';
import type { CommodityPrediction } from '../types';
import ForecastDetailsModal from './ForecastDetailsModal';
import ChartComponent from './ChartComponent';
import type { ChartConfiguration } from 'chart.js/auto';


// --- ICONS ---
const MenuIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" /></svg>;
const CloseIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>;
const SearchIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>;
const ExportIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>;
const AlertIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>;
const DashboardIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="7" height="9" x="3" y="3" rx="1"/><rect width="7" height="5" x="14" y="3" rx="1"/><rect width="7" height="9" x="14" y="12" rx="1"/><rect width="7" height="5" x="3" y="16" rx="1"/></svg>;
const CommodityIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>;
const MapIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>;
const TriggersIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 14.899A7 7 0 1 1 15 8.708V15h2.9a2.4 2.4 0 0 0 1.9-4.3 2.4 2.4 0 0 0-2.3-3.6 2.4 2.4 0 0 0-2.3-3.6A7 7 0 0 0 4 14.9z"/><path d="m14 15-2 5"/></svg>;
const SettingsIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 0 2l-.15.08a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l-.22-.38a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1 0-2l.15-.08a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>;
const AiIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 8V4H8"/><rect width="16" height="12" x="4" y="8" rx="2"/><path d="M2 14h2"/><path d="M20 14h2"/><path d="M15 13v2"/><path d="M9 13v2"/></svg>;

// --- TYPE DEFINITIONS ---
interface RegionalCommodityInfo extends CommodityPrediction {
  recommendation: {
    title: string;
    text: string;
  };
}

interface DashboardViewProps {
    commodities: CommodityPrediction[];
    aiRecommendations: typeof AI_RECOMMENDATIONS;
    triggers: typeof TRIGGERS;
    onViewForecast: (commodity: CommodityPrediction) => void;
}

// --- SUB-COMPONENTS ---
const Header = ({ onNavToggle, onNavigateToLanding }) => (
    <div className="sticky top-0 z-20 flex items-center justify-between p-4 bg-gray-900/80 backdrop-blur-sm">
        <div className="flex items-center gap-4">
             <button onClick={onNavigateToLanding} className="text-2xl font-bold bg-gradient-to-r from-green-400 to-purple-500 text-transparent bg-clip-text">Dirsha AI</button>
            <div className='hidden md:block'>
                <p className="text-xs text-gray-400">Ethiopian Market AI – Price Forecasting</p>
                <p className="text-xs text-gray-500">Last updated: {new Date().toLocaleTimeString()} | Sources: ECX, NBE</p>
            </div>
        </div>
        <div className="flex items-center gap-2">
            <button className="p-2 rounded-full hover:bg-gray-700 transition"><SearchIcon /></button>
            <button className="p-2 rounded-full hover:bg-gray-700 transition"><ExportIcon /></button>
            <button className="p-2 rounded-full hover:bg-gray-700 transition"><AlertIcon /></button>
            <button onClick={onNavToggle} className="p-2 rounded-full hover:bg-gray-700 transition lg:hidden"><MenuIcon /></button>
        </div>
    </div>
);

const Sidebar = ({ isOpen, onClose, activeItem, onItemClick }) => {
    const navItems = [
        { id: 'dashboard', label: 'Dashboard', icon: <DashboardIcon/> },
        { id: 'commodity', label: 'Commodity View', icon: <CommodityIcon/> },
        { id: 'regional', label: 'Regional Market', icon: <MapIcon/> },
        { id: 'triggers', label: 'Trigger Analysis', icon: <TriggersIcon/> },
        { id: 'recommendations', label: 'AI Recommendations', icon: <AiIcon/> },
        { id: 'settings', label: 'Forecast Settings', icon: <SettingsIcon/> },
    ];
    return (
        <>
            <div className={`fixed inset-0 bg-black/60 z-30 lg:hidden transition-opacity ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={onClose}></div>
            <aside className={`fixed top-0 z-40 h-full bg-black/95 backdrop-blur-lg w-64 transition-transform duration-300 ease-in-out ${isOpen ? 'right-0' : '-right-full'} lg:relative lg:right-0 lg:translate-x-0 lg:w-60 flex flex-col border-r border-gray-800`}>
                <div className="p-4 flex justify-between items-center lg:justify-center border-b border-gray-800">
                    <h2 className="font-bold text-xl text-white">Prediction</h2>
                    <button onClick={onClose} className="lg:hidden p-1 text-gray-400"><CloseIcon/></button>
                </div>
                <nav className="flex-1 p-3 space-y-2">
                    {navItems.map(item => (
                        <button key={item.id} onClick={() => onItemClick(item.id)} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-all group ${activeItem === item.id ? 'bg-gradient-to-r from-green-500/20 to-purple-500/20 text-white shadow-lg shadow-purple-500/10' : 'text-gray-400 hover:bg-gray-800 hover:text-white'}`}>
                            <span className={`transition-transform duration-300 ${activeItem === item.id ? 'text-purple-400' : 'text-gray-500 group-hover:text-green-400'}`}>{item.icon}</span>
                            {item.label}
                        </button>
                    ))}
                </nav>
            </aside>
        </>
    );
};

const CommodityHighlightCard = ({ commodity, onSelect, onViewForecast, isSelected }) => {
    const isPositive = commodity.change >= 0;
    return (
        <div onClick={() => onSelect(commodity)} className={`bg-gray-800/50 rounded-lg p-4 border flex flex-col justify-between h-full flex-shrink-0 w-full snap-start transition-all cursor-pointer hover:border-purple-500/50 hover:shadow-2xl hover:shadow-purple-900/20 ${isSelected ? 'border-purple-500' : 'border-gray-700/50'}`}>
            <div>
                <div className="flex justify-between items-start">
                    <h3 className="font-bold text-xl bg-gradient-to-r from-green-300 to-purple-300 text-transparent bg-clip-text">{commodity.name}</h3>
                    <span className={`text-lg font-bold ${isPositive ? 'text-green-400' : 'text-purple-400'}`}>
                        {isPositive ? '▲' : '▼'} {Math.abs(commodity.change)}%
                    </span>
                </div>
                <p className="text-2xl font-light text-white my-2">{commodity.currentPrice.toLocaleString()} <span className="text-sm text-gray-400">{commodity.unit}</span></p>
                <div className='h-12 bg-black/20 rounded-md my-2'></div>
            </div>
            <div className="flex gap-2 mt-2">
                <button onClick={(e) => { e.stopPropagation(); onViewForecast(commodity); }} className="w-full text-xs bg-gray-700 py-1.5 rounded hover:bg-gray-600 transition">View Forecast</button>
                <button className="w-full text-xs bg-purple-600/50 py-1.5 rounded hover:bg-purple-600/80 transition">Set Alert</button>
            </div>
        </div>
    )
};

const ComingSoonView = ({ feature }) => (
    <div className="flex flex-col items-center justify-center h-full text-center p-8 bg-gray-800/50 rounded-lg border border-gray-700/50 min-h-[50vh]">
        <div className="text-6xl mb-4">🚧</div>
        <h3 className="text-3xl font-bold text-white mb-2">Coming Soon!</h3>
        <p className="text-lg text-gray-300">The "{feature.charAt(0).toUpperCase() + feature.slice(1)}" feature is under construction.</p>
        <p className="text-gray-400 mt-1">We are working hard to bring you these advanced insights. Stay tuned!</p>
    </div>
);

const DashboardView: React.FC<DashboardViewProps> = ({ commodities, aiRecommendations, triggers, onViewForecast }) => (
    <div className="space-y-8">
        <div>
            <h2 className="text-3xl font-bold text-white">Market Dashboard</h2>
            <p className="text-gray-400 mt-1">A high-level overview of the Ethiopian agricultural market.</p>
        </div>

        <section>
            <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <AiIcon /> AI-Powered Recommendations
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {aiRecommendations.map((rec, index) => (
                    <div key={index} className="bg-gray-800 p-4 rounded-lg border border-gray-700/50 hover:border-green-500/50 transition-colors">
                        <h4 className="font-bold text-green-400">{rec.title}</h4>
                        <p className="text-sm text-gray-300 mt-2">{rec.text}</p>
                    </div>
                ))}
            </div>
        </section>

        <section>
             <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <TriggersIcon /> Key Market Triggers
            </h3>
            <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700/50">
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {Object.entries(triggers).map(([category, triggerList]) => (
                        <div key={category}>
                            <h4 className="font-bold capitalize text-purple-400 mb-3 border-b border-gray-700 pb-2">{category}</h4>
                            <ul className="space-y-2">
                                {triggerList.map(trigger => (
                                    <li key={trigger.name} className="flex justify-between text-sm">
                                        <span className="text-gray-300">{trigger.name}</span>
                                        <span className={`font-mono font-semibold ${trigger.impact === 'high' ? 'text-red-400' : trigger.impact === 'medium' ? 'text-yellow-400' : 'text-gray-200'}`}>{trigger.value}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </section>

        <section>
            <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <CommodityIcon /> Top Movers
            </h3>
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {commodities.slice(0, 4).map(commodity => (
                    <CommodityHighlightCard 
                        key={commodity.name} 
                        commodity={commodity} 
                        onSelect={onViewForecast}
                        onViewForecast={onViewForecast}
                        isSelected={false}
                    />
                ))}
            </div>
        </section>
    </div>
);


const CommodityView = ({ commodities, onViewForecast }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const filteredCommodities = commodities.filter(c => c.name.toLowerCase().includes(searchTerm.toLowerCase()));

    return (
        <div className="space-y-6">
            <div className="relative">
                <input
                    type="text"
                    placeholder="Search for a commodity..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-gray-800 border-2 border-gray-700 rounded-lg py-3 pl-12 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <div className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-500 pointer-events-none">
                    <SearchIcon />
                </div>
            </div>
            <div className="border-t border-gray-700"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredCommodities.map(commodity => (
                     <CommodityHighlightCard
                        key={commodity.name}
                        commodity={commodity}
                        onSelect={onViewForecast}
                        onViewForecast={onViewForecast}
                        isSelected={false}
                    />
                ))}
            </div>
        </div>
    );
};

const regionalData = COMMODITY_PREDICTIONS.reduce((acc: Record<string, RegionalCommodityInfo[]>, commodity) => {
    commodity.regionalPrices.forEach(regionalPrice => {
        if (!acc[regionalPrice.region]) {
            acc[regionalPrice.region] = [];
        }
        const recommendation = AI_RECOMMENDATIONS[Math.floor(Math.random() * AI_RECOMMENDATIONS.length)];
        acc[regionalPrice.region].push({ ...commodity, recommendation });
    });
    return acc;
}, {} as Record<string, RegionalCommodityInfo[]>);

const RegionalMarketView = () => {
    const [expandedRegion, setExpandedRegion] = useState(Object.keys(regionalData)[0]);

    return (
        <div className="space-y-6">
            <h2 className="text-3xl font-bold text-white">Regional Markets</h2>
            <div className="flex flex-col lg:flex-row gap-6">
                <div className="lg:w-1/4">
                    <ul className="space-y-2">
                        {Object.keys(regionalData).map(region => (
                            <li key={region}>
                                <button
                                    onClick={() => setExpandedRegion(region)}
                                    className={`w-full text-left px-4 py-2 rounded-md transition ${expandedRegion === region ? 'bg-purple-600 text-white' : 'bg-gray-800 hover:bg-gray-700'}`}
                                >
                                    {region}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="lg:w-3/4 bg-gray-800/50 p-4 rounded-lg border border-gray-700/50 min-h-[50vh]">
                    <h3 className="text-xl font-bold mb-4 text-white">{expandedRegion} Market</h3>
                    {regionalData[expandedRegion] ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {regionalData[expandedRegion].map((item, index) => (
                                <div key={`${item.name}-${index}`} className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                                    <h4 className="font-bold text-lg text-green-400">{item.name}</h4>
                                    <p className="text-sm text-gray-300 mt-2">"{item.recommendation.text}"</p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-400">No data for this region.</p>
                    )}
                </div>
            </div>
        </div>
    )
};

const TRIGGER_HISTORY = {
    "Inflation Rate": {
        data: [{x: 'Jan', y: 15.1}, {x: 'Feb', y: 15.2}, {x: 'Mar', y: 15.0}, {x: 'Apr', y: 15.3}, {x: 'May', y: 15.25}, {x: 'Jun', y: 15.2}],
        unit: '%'
    },
    "ETB/USD Exchange Rate": {
        data: [{x: 'Jan', y: 53.8}, {x: 'Feb', y: 54.0}, {x: 'Mar', y: 54.1}, {x: 'Apr', y: 54.2}, {x: 'May', y: 54.25}, {x: 'Jun', y: 54.3}],
        unit: ''
    },
    "Transport Cost Index": {
        data: [{x: 'Jan', y: 100}, {x: 'Feb', y: 102}, {x: 'Mar', y: 103}, {x: 'Apr', y: 105}, {x: 'May', y: 107}, {x: 'Jun', y: 108}],
        unit: ' (Base 100)'
    },
    "Rainfall Anomaly": {
        data: [{x: 'Jan', y: 2}, {x: 'Feb', y: -5}, {x: 'Mar', y: 10}, {x: 'Apr', y: -8}, {x: 'May', y: -15}, {x: 'Jun', y: -12}],
        unit: '%'
    }
};

const TriggerAnalysisView = () => {
    const allTriggers = [...TRIGGERS.economic, ...TRIGGERS.weather];
    const [selectedTrigger, setSelectedTrigger] = useState(allTriggers[0]);

    const chartConfig: ChartConfiguration | null = useMemo(() => {
        const history = TRIGGER_HISTORY[selectedTrigger.name];
        if (!history) return null;

        return {
            type: 'line',
            data: {
                labels: history.data.map(d => d.x),
                datasets: [{
                    label: `${selectedTrigger.name} value`,
                    data: history.data.map(d => d.y),
                    borderColor: '#a855f7',
                    backgroundColor: 'rgba(168, 85, 247, 0.2)',
                    fill: true,
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        grid: { color: 'rgba(255, 255, 255, 0.1)'},
                        ticks: { color: '#e5e7eb' },
                        title: { display: true, text: `Value ${history.unit}`, color: '#e5e7eb' }
                    },
                    x: {
                        grid: { color: 'rgba(255, 255, 255, 0.1)'},
                        ticks: { color: '#e5e7eb' }
                    }
                },
                plugins: {
                    legend: {
                        position: 'top',
                        labels: { color: '#e5e7eb' }
                    }
                }
            }
        };
    }, [selectedTrigger]);

    return (
        <div className="space-y-6">
            <h2 className="text-3xl font-bold text-white">Trigger Analysis</h2>
            <div className="flex flex-col lg:flex-row gap-6">
                <div className="lg:w-1/3">
                    <ul className="space-y-2">
                        {allTriggers.map(trigger => (
                            <li key={trigger.name}>
                                <button
                                    onClick={() => setSelectedTrigger(trigger)}
                                    className={`w-full text-left px-4 py-2 rounded-md transition ${selectedTrigger.name === trigger.name ? 'bg-green-600 text-white' : 'bg-gray-800 hover:bg-gray-700'}`}
                                >
                                    <div className="flex justify-between items-center">
                                        <span>{trigger.name}</span>
                                        <span className="text-sm font-mono">{trigger.value}</span>
                                    </div>
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="lg:w-2/3 bg-gray-800/50 p-4 rounded-lg border border-gray-700/50 h-96">
                    {chartConfig ? (
                        <ChartComponent config={chartConfig} />
                    ) : (
                        <div className="flex items-center justify-center h-full">
                            <p className="text-gray-400">No historical data available for this trigger.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
};


// --- MAIN PAGE COMPONENT ---
interface PredictionsPageProps {
  onNavigateToLanding: () => void;
}

const PredictionsPage: React.FC<PredictionsPageProps> = ({ onNavigateToLanding }) => {
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [activeNavItem, setActiveNavItem] = useState('dashboard');
    const [selectedCommodity, setSelectedCommodity] = useState<CommodityPrediction | null>(null);
    const [isDetailsModalOpen, setDetailsModalOpen] = useState(false);

    const handleViewForecast = (commodity: CommodityPrediction) => {
        setSelectedCommodity(commodity);
        setDetailsModalOpen(true);
    };
    
    const handleCloseForecast = () => {
        setDetailsModalOpen(false);
        setSelectedCommodity(null);
    }

    const renderContent = () => {
        switch(activeNavItem) {
            case 'commodity':
                return <CommodityView commodities={COMMODITY_PREDICTIONS} onViewForecast={handleViewForecast} />;
            case 'regional':
                return <RegionalMarketView />;
            case 'triggers':
                return <TriggerAnalysisView />;
            case 'settings':
            case 'recommendations':
                return <ComingSoonView feature={activeNavItem} />;
            case 'dashboard':
            default:
                return <DashboardView 
                    commodities={COMMODITY_PREDICTIONS}
                    aiRecommendations={AI_RECOMMENDATIONS}
                    triggers={TRIGGERS}
                    onViewForecast={handleViewForecast}
                />;
        }
    }

    return (
        <div className="bg-black min-h-screen flex text-gray-200 font-sans">
            <Sidebar 
                isOpen={isSidebarOpen} 
                onClose={() => setSidebarOpen(false)} 
                activeItem={activeNavItem}
                onItemClick={(item) => {
                    setActiveNavItem(item);
                    setSidebarOpen(false);
                }}
            />

            <div className="flex-1 flex flex-col overflow-hidden">
                <Header onNavToggle={() => setSidebarOpen(true)} onNavigateToLanding={onNavigateToLanding} />
                
                <main className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6">
                    {renderContent()}
                </main>
            </div>
            {isDetailsModalOpen && selectedCommodity && (
                <ForecastDetailsModal
                    commodity={selectedCommodity}
                    onClose={handleCloseForecast}
                />
            )}
        </div>
    );
};

export default PredictionsPage;