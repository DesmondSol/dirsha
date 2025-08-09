
import React, { useState } from 'react';
import ChartComponent from './ChartComponent';
import type { ChartConfiguration } from 'chart.js/auto';
import ComingSoonModal from './ComingSoonModal';

interface LandingPageProps {
  onNavigateToMarketplace: () => void;
  onNavigateToPredictions: () => void;
  onNavigateToContact: () => void;
  onNavigateToPricing: () => void;
}

// --- ICONS ---
const HamburgerIcon = () => <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-16 6h16" /></svg>;
const CloseIcon = () => <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>;


const Header: React.FC<Omit<LandingPageProps, 'onNavigateToMarketplace'> & { onNavigateToMarketplace: () => void; onShowComingSoon: (feature: string) => void; onMenuToggle: () => void; }> = ({ onNavigateToMarketplace, onNavigateToPredictions, onNavigateToContact, onNavigateToPricing, onShowComingSoon, onMenuToggle }) => (
  <header className="fixed top-0 left-0 right-0 bg-gray-900 bg-opacity-80 backdrop-blur-md z-50">
    <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
      <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-green-400 text-transparent bg-clip-text">
        Dirsha
      </h1>
      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center space-x-6">
        <button onClick={onNavigateToPredictions} className="text-gray-300 hover:text-white transition">Predictions</button>
        <button onClick={onNavigateToContact} className="text-gray-300 hover:text-white transition">Contact Us</button>
        <button onClick={onNavigateToPricing} className="text-gray-300 hover:text-white transition">Pricing</button>
        <button onClick={() => onShowComingSoon('Language Selection')} className="text-gray-300 hover:text-white transition">Language</button>
        <button
          onClick={onNavigateToMarketplace}
          className="ml-4 px-6 py-2 font-semibold text-white bg-gradient-to-r from-purple-500 to-green-500 rounded-full hover:scale-105 transform transition-transform duration-300"
        >
          Marketplace
        </button>
      </div>
       {/* Mobile Menu Button */}
      <div className="md:hidden">
        <button onClick={onMenuToggle} className="text-white p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
          <HamburgerIcon />
        </button>
      </div>
    </nav>
  </header>
);

interface MobileMenuProps extends LandingPageProps {
  onClose: () => void;
  onShowComingSoon: (feature: string) => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ onNavigateToMarketplace, onNavigateToPredictions, onNavigateToContact, onNavigateToPricing, onClose, onShowComingSoon }) => {
    
    const handleNavClick = (navFunction: () => void) => {
        navFunction();
        onClose();
    };

    const handleComingSoonClick = (feature: string) => {
        onShowComingSoon(feature);
        onClose();
    };
    
    return (
        <div className="fixed inset-0 z-[100] bg-gray-900/95 backdrop-blur-sm flex flex-col items-center justify-center">
            <button onClick={onClose} className="absolute top-6 right-6 p-2 text-gray-400 hover:text-white">
                <CloseIcon />
            </button>
            <nav className="flex flex-col items-center space-y-6 text-xl">
                <button onClick={() => handleNavClick(onNavigateToPredictions)} className="text-gray-300 hover:text-white transition">Predictions</button>
                <button onClick={() => handleNavClick(onNavigateToContact)} className="text-gray-300 hover:text-white transition">Contact Us</button>
                <button onClick={() => handleNavClick(onNavigateToPricing)} className="text-gray-300 hover:text-white transition">Pricing</button>
                <button onClick={() => handleComingSoonClick('Language Selection')} className="text-gray-300 hover:text-white transition">Language</button>
                <div className="pt-8">
                     <button
                        onClick={() => handleNavClick(onNavigateToMarketplace)}
                        className="px-8 py-3 text-lg font-semibold text-white bg-gradient-to-r from-purple-500 to-green-500 rounded-full hover:scale-105 transform transition-transform duration-300"
                    >
                        Enter Marketplace
                    </button>
                </div>
            </nav>
        </div>
    );
};


const chartColors = {
    purple: '#a855f7',
    lightPurple: '#d8b4fe',
    green: '#4ade80',
    background: '#1f2937',
    grid: 'rgba(255, 255, 255, 0.1)',
    text: '#e5e7eb',
};

const commonChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { labels: { color: chartColors.text }}},
    scales: {
        y: {
            beginAtZero: true,
            grid: { color: chartColors.grid },
            ticks: { color: chartColors.text },
             title: { display: true, color: chartColors.text },
        },
        x: {
            grid: { color: chartColors.grid },
            ticks: { color: chartColors.text },
        },
    },
};

const priceVolatilityChartConfig: ChartConfiguration = {
    type: 'line',
    data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
        datasets: [{
            label: 'Traditional Market Price',
            data: [120, 190, 150, 250, 180, 220, 160],
            borderColor: chartColors.lightPurple,
            backgroundColor: 'transparent',
            tension: 0.4,
            borderDash: [5, 5]
        }, {
            label: 'Dirsha Guaranteed Price',
            data: [180, 180, 180, 180, 180, 180, 180],
            borderColor: chartColors.green,
            backgroundColor: 'transparent',
            tension: 0.4,
            fill: false
        }]
    },
    options: { ...commonChartOptions, scales: { ...commonChartOptions.scales, y: {...commonChartOptions.scales.y, title: {...commonChartOptions.scales.y.title, text: 'Price (ETB)'}} }}
};

const farmerBenefitsChartConfig: ChartConfiguration = {
    type: 'doughnut',
    data: {
        labels: ['Upfront Capital', 'Guaranteed Price', 'AI Market Insights'],
        datasets: [{
            data: [45, 35, 20],
            backgroundColor: [chartColors.green, chartColors.purple, chartColors.lightPurple],
            borderColor: chartColors.background,
            borderWidth: 4
        }]
    },
    options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'bottom', labels: { color: chartColors.text } } } }
};

const investorReturnsChartConfig: ChartConfiguration = {
    type: 'bar',
    data: {
        labels: ['Traditional Agri-Investments', 'Dirsha Pre-Financing Bond'],
        datasets: [{
            data: [7, 12],
            backgroundColor: [chartColors.lightPurple, chartColors.green],
            borderWidth: 0,
            borderRadius: 5
        }]
    },
    options: { ...commonChartOptions, plugins: { ...commonChartOptions.plugins, legend: { display: false }}, scales: { ...commonChartOptions.scales, y: {...commonChartOptions.scales.y, max: 15, title: {...commonChartOptions.scales.y.title, text: 'Return %'}}}}
};

const supplyDemandChartConfig: ChartConfiguration = {
    type: 'line',
    data: {
        labels: ['Q1', 'Q2', 'Q3', 'Q4', 'Q1 (Proj.)', 'Q2 (Proj.)'],
        datasets: [{
            label: 'National Supply',
            data: [100, 110, 90, 120, 115, 118],
            borderColor: chartColors.green,
            backgroundColor: 'rgba(74, 222, 128, 0.2)',
            fill: true,
            tension: 0.3
        }, {
            label: 'National Demand',
            data: [105, 108, 95, 115, 112, 115],
            borderColor: chartColors.purple,
            backgroundColor: 'rgba(168, 85, 247, 0.2)',
            fill: true,
            tension: 0.3
        }]
    },
    options: { ...commonChartOptions, scales: { ...commonChartOptions.scales, y: {...commonChartOptions.scales.y, title: {...commonChartOptions.scales.y.title, text: 'Volume (k tons)'}}}}
};

const revenueModelChartConfig: ChartConfiguration = {
    type: 'pie',
    data: {
        labels: ['Contract Fees (1-3%)', 'Premium AI Subscriptions'],
        datasets: [{
            data: [70, 30],
            backgroundColor: [chartColors.green, chartColors.purple],
            borderColor: chartColors.background,
            borderWidth: 4
        }]
    },
    options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'bottom', labels: { color: chartColors.text } } } }
};


const LandingPage: React.FC<LandingPageProps> = ({ onNavigateToMarketplace, onNavigateToPredictions, onNavigateToContact, onNavigateToPricing }) => {
  const [comingSoonFeature, setComingSoonFeature] = useState<string | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="bg-gray-900">
      <Header 
        onNavigateToMarketplace={onNavigateToMarketplace} 
        onNavigateToPredictions={onNavigateToPredictions} 
        onNavigateToContact={onNavigateToContact}
        onNavigateToPricing={onNavigateToPricing}
        onShowComingSoon={setComingSoonFeature}
        onMenuToggle={() => setIsMenuOpen(true)}
      />

      {isMenuOpen && (
        <MobileMenu
            onNavigateToMarketplace={onNavigateToMarketplace}
            onNavigateToPredictions={onNavigateToPredictions}
            onNavigateToContact={onNavigateToContact}
            onNavigateToPricing={onNavigateToPricing}
            onClose={() => setIsMenuOpen(false)}
            onShowComingSoon={(feature) => {
                setComingSoonFeature(feature);
                setIsMenuOpen(false);
            }}
        />
      )}
      
      <div
        className="text-white text-center py-48 px-4 bg-gray-800 bg-blend-multiply"
        style={{
          backgroundImage: "url('https://images.pexels.com/photos/11798250/pexels-photo-11798250.jpeg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">Dirsha</h1>
        <p className="mt-4 text-xl md:text-2xl font-light max-w-3xl mx-auto">Cultivating Trust, Empowering Growth in Ethiopian Agriculture</p>
      </div>

      <main className="max-w-7xl mx-auto p-4 md:p-8">
        <section id="challenge" className="my-12">
            <div className="text-center mb-10">
                <h2 className="text-3xl md:text-4xl font-bold text-green-400">The Challenge in the Fields</h2>
                <p className="mt-2 max-w-2xl mx-auto text-lg text-gray-300">Ethiopia's agricultural backbone faces systemic inefficiencies that hold back its potential.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                    <div className="text-5xl mb-4 text-purple-500">📉</div>
                    <h3 className="text-xl font-bold mb-2">Price Volatility</h3>
                    <p className="text-gray-400">Farmers face unpredictable market prices, while buyers struggle with unstable costs for raw materials.</p>
                </div>
                <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                    <div className="text-5xl mb-4 text-purple-500">🏦</div>
                    <h3 className="text-xl font-bold mb-2">Limited Finance</h3>
                    <p className="text-gray-400">A lack of access to upfront capital for seeds and inputs stifles productivity and growth for smallholders.</p>
                </div>
                <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                    <div className="text-5xl mb-4 text-purple-500">🔗</div>
                    <h3 className="text-xl font-bold mb-2">Opaque Supply Chains</h3>
                    <p className="text-gray-400">Buyers, investors, and government lack transparent, reliable data, leading to risk and inefficiency.</p>
                </div>
            </div>
        </section>

        <section id="solution" className="my-16">
            <div className="text-center mb-10">
                <h2 className="text-3xl md:text-4xl font-bold text-green-400">Our Integrated Solution: The Dirsha Ecosystem</h2>
                <p className="mt-2 max-w-3xl mx-auto text-lg text-gray-300">Dirsha merges blockchain transparency with AI-driven intelligence to create a predictable and trustworthy agricultural marketplace.</p>
            </div>
            <div className="bg-gray-800 p-6 md:p-10 rounded-lg shadow-lg">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center text-center">
                    <div className="flex flex-col items-center"><div className="p-4 bg-gray-700 rounded-full text-4xl">🧑‍🌾</div><h4 className="text-xl font-bold mt-2">Farmers</h4><p className="text-sm text-gray-400">Gain financial stability & market insights</p></div>
                    <div className="hidden md:block relative w-full h-0.5 bg-purple-500"><span className="absolute right-[-10px] top-1/2 -translate-y-1/2 text-purple-500 text-xl">►</span></div>
                    <div className="block md:hidden relative w-0.5 h-16 bg-purple-500 mx-auto my-4"><span className="absolute bottom-[-18px] left-1/2 -translate-x-1/2 text-purple-500 text-xl">▼</span></div>
                    <div className="flex flex-col items-center"><div className="p-4 bg-gray-700 rounded-full text-4xl">🤝</div><h4 className="text-xl font-bold mt-2">Blockchain Marketplace</h4><p className="text-sm text-gray-400">Transparent, secure pre-financing contracts</p></div>
                    <div className="hidden md:block relative w-full h-0.5 bg-purple-500"><span className="absolute right-[-10px] top-1/2 -translate-y-1/2 text-purple-500 text-xl">►</span></div>
                    <div className="block md:hidden relative w-0.5 h-16 bg-purple-500 mx-auto my-4"><span className="absolute bottom-[-18px] left-1/2 -translate-x-1/2 text-purple-500 text-xl">▼</span></div>
                    <div className="flex flex-col items-center"><div className="p-4 bg-gray-700 rounded-full text-4xl">🏢</div><h4 className="text-xl font-bold mt-2">Buyers & Investors</h4><p className="text-sm text-gray-400">Secure future supply & predictable prices</p></div>
                </div>
                <div className="flex justify-center my-4 relative w-0.5 h-16 bg-purple-500 mx-auto"><span className="absolute bottom-[-18px] left-1/2 -translate-x-1/2 text-purple-500 text-xl">▼</span></div>
                <div className="flex flex-col items-center text-center"><div className="p-4 bg-gray-700 rounded-full text-4xl">🧠</div><h4 className="text-2xl font-bold mt-2">National AI Engine</h4><p className="text-md max-w-xl mx-auto text-gray-400">Aggregated data fuels predictive insights on supply, demand, and pricing for smarter national policy and food security strategies.</p></div>
            </div>
        </section>

        <section id="value-props" className="my-16">
             <div className="text-center mb-10">
                <h2 className="text-3xl md:text-4xl font-bold text-green-400">Transformative Value for Our Partners</h2>
                <p className="mt-2 max-w-2xl mx-auto text-lg text-gray-300">Dirsha delivers tangible, data-driven benefits that create a more efficient and profitable agricultural landscape.</p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-gray-800 p-6 rounded-lg shadow-lg flex flex-col"><h3 className="text-2xl font-bold mb-2">For Buyers: Price Predictability</h3><p className="mb-4 flex-grow text-gray-400">Lock in prices with smart contracts to mitigate market risk. Our model can reduce price volatility by an estimated 15%.</p><div className="h-80"><ChartComponent config={priceVolatilityChartConfig} /></div></div>
                <div className="bg-gray-800 p-6 rounded-lg shadow-lg flex flex-col"><h3 className="text-2xl font-bold mb-2">For Farmers: Empowered Growth</h3><p className="mb-4 flex-grow text-gray-400">Pre-financing ensures farmers can afford inputs, while guaranteed prices and market data empower them to grow their businesses.</p><div className="h-80"><ChartComponent config={farmerBenefitsChartConfig} /></div></div>
                <div className="bg-gray-800 p-6 rounded-lg shadow-lg flex flex-col"><h3 className="text-2xl font-bold mb-2">For Investors: A New Secure Asset</h3><p className="mb-4 flex-grow text-gray-400">Our pre-financing bonds offer a transparent, low-risk way to invest in Ethiopia's agricultural future with predictable returns.</p><div className="h-80"><ChartComponent config={investorReturnsChartConfig} /></div></div>
                <div className="bg-gray-800 p-6 rounded-lg shadow-lg flex flex-col"><h3 className="text-2xl font-bold mb-2">For Government: Data for Policy</h3><p className="mb-4 flex-grow text-gray-400">Our AI engine provides a macro view of the agricultural sector, enabling data-informed decisions on food security and logistics.</p><div className="h-80"><ChartComponent config={supplyDemandChartConfig} /></div></div>
            </div>
        </section>

        <section id="business-model" className="my-16">
            <div className="text-center mb-10">
                <h2 className="text-3xl md:text-4xl font-bold text-green-400">A Sustainable & Scalable Business Model</h2>
                 <p className="mt-2 max-w-2xl mx-auto text-lg text-gray-300">Our revenue model is designed for fairness and accessibility, ensuring long-term growth.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
                 <div className="bg-gray-800 p-6 rounded-lg shadow-lg flex flex-col">
                    <h3 className="text-2xl font-bold mb-2">Primary Revenue Streams</h3>
                    <p className="mb-4 flex-grow text-gray-400">Revenue is from a small fee on successful contracts and premium subscriptions for predictive analytics.</p>
                    <div className="h-80"><ChartComponent config={revenueModelChartConfig} /></div>
                </div>
                <div className="bg-gray-800 p-8 rounded-lg shadow-lg flex flex-col justify-center text-center">
                    <h3 className="text-2xl font-bold mb-4">Transaction Fees</h3>
                    <p className="text-6xl font-extrabold text-purple-400">1-3%</p>
                    <p className="mt-2 text-lg text-gray-400">A fair fee on the value of successful blockchain-backed contracts.</p>
                    <hr className="my-6 border-t-2 border-gray-700" />
                     <h3 className="text-2xl font-bold mb-2">AI Farmer App</h3>
                    <p className="text-4xl font-bold text-green-400">Free</p>
                     <p className="mt-2 text-lg text-gray-400">Core market prices and advice remain free to ensure maximum adoption.</p>
                </div>
            </div>
        </section>

        <section id="cta" className="my-16 bg-gradient-to-r from-purple-600 to-green-600 text-white rounded-lg shadow-xl p-8 md:p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold">Join Us in Reshaping Ethiopian Agriculture</h2>
            <p className="mt-4 max-w-3xl mx-auto text-lg font-light">We are seeking strategic partners to accelerate our mission. Collaborate with us to build a more prosperous, transparent, and predictable agricultural ecosystem for all.</p>
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-black/20 p-6 rounded-lg"><h3 className="text-xl font-bold">Large-Scale Buyers</h3><p className="mt-2">Secure your supply chain and eliminate price risk by issuing smart contracts on our platform.</p></div>
                <div className="bg-black/20 p-6 rounded-lg"><h3 className="text-xl font-bold">Financial Institutions</h3><p className="mt-2">Partner with us to integrate seamless mobile money solutions for frictionless transactions.</p></div>
                <div className="bg-black/20 p-6 rounded-lg"><h3 className="text-xl font-bold">Government Bodies</h3><p className="mt-2">Leverage our predictive AI data to inform national food security strategies and agricultural policy.</p></div>
            </div>
            <div className="mt-10">
                <a href="mailto:partners@dirsha.example.com" className="inline-block bg-white text-purple-600 font-bold py-3 px-8 rounded-lg text-lg hover:bg-gray-200 transition-colors">Become a Partner</a>
            </div>
        </section>
      </main>

      <footer className="text-center p-6 bg-gray-800 text-gray-400 text-sm">
        <p>&copy; 2025 Dirsha. All Rights Reserved.</p>
      </footer>

      {comingSoonFeature && (
        <ComingSoonModal 
            featureName={comingSoonFeature}
            onClose={() => setComingSoonFeature(null)}
        />
      )}
    </div>
  );
};

export default LandingPage;
