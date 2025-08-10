
import React, { useState } from 'react';
import ChartComponent from './ChartComponent';
import type { ChartConfiguration } from 'chart.js/auto';
import ComingSoonModal from './ComingSoonModal';
import { useLanguage } from './LanguageContext';
import LanguageToggle from './LanguageToggle';


interface LandingPageProps {
  onNavigateToMarketplace: () => void;
  onNavigateToPredictions: () => void;
  onNavigateToContact: () => void;
  onNavigateToPricing: () => void;
}

// --- ICONS ---
const HamburgerIcon = () => <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-16 6h16" /></svg>;
const CloseIcon = () => <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>;


const Header: React.FC<Omit<LandingPageProps, 'onNavigateToMarketplace'> & { onNavigateToMarketplace: () => void; onMenuToggle: () => void; }> = ({ onNavigateToMarketplace, onNavigateToPredictions, onNavigateToContact, onNavigateToPricing, onMenuToggle }) => {
  const { t } = useLanguage();
  return (
  <header className="fixed top-0 left-0 right-0 bg-gray-900 bg-opacity-80 backdrop-blur-md z-50">
    <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
      <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-green-400 text-transparent bg-clip-text">
        {t('app_title')}
      </h1>
      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center space-x-6">
        <button onClick={onNavigateToPredictions} className="text-gray-300 hover:text-white transition">{t('header_predictions')}</button>
        <button onClick={onNavigateToContact} className="text-gray-300 hover:text-white transition">{t('header_contact')}</button>
        <button onClick={onNavigateToPricing} className="text-gray-300 hover:text-white transition">{t('header_pricing')}</button>
        <LanguageToggle />
        <button
          onClick={onNavigateToMarketplace}
          className="ml-4 px-6 py-2 font-semibold text-white bg-gradient-to-r from-purple-500 to-green-500 rounded-full hover:scale-105 transform transition-transform duration-300"
        >
          {t('header_marketplace')}
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
)};

interface MobileMenuProps extends LandingPageProps {
  onClose: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ onNavigateToMarketplace, onNavigateToPredictions, onNavigateToContact, onNavigateToPricing, onClose }) => {
    const { t } = useLanguage();
    const handleNavClick = (navFunction: () => void) => {
        navFunction();
        onClose();
    };
    
    return (
        <div className="fixed inset-0 z-[100] bg-gray-900/95 backdrop-blur-sm flex flex-col items-center justify-center">
            <button onClick={onClose} className="absolute top-6 right-6 p-2 text-gray-400 hover:text-white">
                <CloseIcon />
            </button>
            <nav className="flex flex-col items-center space-y-6 text-xl">
                <button onClick={() => handleNavClick(onNavigateToPredictions)} className="text-gray-300 hover:text-white transition">{t('header_predictions')}</button>
                <button onClick={() => handleNavClick(onNavigateToContact)} className="text-gray-300 hover:text-white transition">{t('header_contact')}</button>
                <button onClick={() => handleNavClick(onNavigateToPricing)} className="text-gray-300 hover:text-white transition">{t('header_pricing')}</button>
                <div className="pt-4">
                    <LanguageToggle />
                </div>
                <div className="pt-8">
                     <button
                        onClick={() => handleNavClick(onNavigateToMarketplace)}
                        className="px-8 py-3 text-lg font-semibold text-white bg-gradient-to-r from-purple-500 to-green-500 rounded-full hover:scale-105 transform transition-transform duration-300"
                    >
                        {t('mobile_menu_enter_marketplace')}
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

const getChartConfigs = (t: (key: string) => string) => ({
    priceVolatilityChartConfig: {
        type: 'line' as const,
        data: {
            labels: [t('month_jan'), t('month_feb'), t('month_mar'), t('month_apr'), t('month_may'), t('month_jun'), t('month_jul')],
            datasets: [{
                label: t('chart_traditional_price'),
                data: [120, 190, 150, 250, 180, 220, 160],
                borderColor: chartColors.lightPurple,
                backgroundColor: 'transparent',
                tension: 0.4,
                borderDash: [5, 5]
            }, {
                label: t('chart_dirsha_price'),
                data: [180, 180, 180, 180, 180, 180, 180],
                borderColor: chartColors.green,
                backgroundColor: 'transparent',
                tension: 0.4,
                fill: false
            }]
        },
        options: { ...commonChartOptions, scales: { ...commonChartOptions.scales, y: {...commonChartOptions.scales.y, title: {...commonChartOptions.scales.y.title, text: t('chart_price_etb')}}}}
    },

    farmerBenefitsChartConfig: {
        type: 'doughnut' as const,
        data: {
            labels: [t('chart_upfront_capital'), t('chart_guaranteed_price'), t('chart_ai_insights')],
            datasets: [{
                data: [45, 35, 20],
                backgroundColor: [chartColors.green, chartColors.purple, chartColors.lightPurple],
                borderColor: chartColors.background,
                borderWidth: 4
            }]
        },
        options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'bottom' as const, labels: { color: chartColors.text } } } }
    },

    investorReturnsChartConfig: {
        type: 'bar' as const,
        data: {
            labels: [t('chart_traditional_investment'), t('chart_dirsha_bond')],
            datasets: [{
                data: [7, 12],
                backgroundColor: [chartColors.lightPurple, chartColors.green],
                borderWidth: 0,
                borderRadius: 5
            }]
        },
        options: { ...commonChartOptions, plugins: { ...commonChartOptions.plugins, legend: { display: false }}, scales: { ...commonChartOptions.scales, y: {...commonChartOptions.scales.y, max: 15, title: {...commonChartOptions.scales.y.title, text: t('chart_return_percent')}}}}
    },

    supplyDemandChartConfig: {
        type: 'line' as const,
        data: {
            labels: [t('q1'), t('q2'), t('q3'), t('q4'), t('q1_proj'), t('q2_proj')],
            datasets: [{
                label: t('chart_national_supply'),
                data: [100, 110, 90, 120, 115, 118],
                borderColor: chartColors.green,
                backgroundColor: 'rgba(74, 222, 128, 0.2)',
                fill: true,
                tension: 0.3
            }, {
                label: t('chart_national_demand'),
                data: [105, 108, 95, 115, 112, 115],
                borderColor: chartColors.purple,
                backgroundColor: 'rgba(168, 85, 247, 0.2)',
                fill: true,
                tension: 0.3
            }]
        },
        options: { ...commonChartOptions, scales: { ...commonChartOptions.scales, y: {...commonChartOptions.scales.y, title: {...commonChartOptions.scales.y.title, text: t('chart_volume_ktons')}}}}
    },

    revenueModelChartConfig: {
        type: 'pie' as const,
        data: {
            labels: [t('chart_contract_fees'), t('chart_premium_subscriptions')],
            datasets: [{
                data: [70, 30],
                backgroundColor: [chartColors.green, chartColors.purple],
                borderColor: chartColors.background,
                borderWidth: 4
            }]
        },
        options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'bottom' as const, labels: { color: chartColors.text } } } }
    }
});


const MobileAppPromo = () => {
  const { t } = useLanguage();
  return (
    <section className="relative -mt-24 md:-mt-32 z-10">
       <div className="max-w-5xl mx-auto px-4">
        <div className="bg-gray-800 rounded-lg shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-8">
            {/* Text Content */}
            <div className="p-8 md:p-12 text-center md:text-left">
              <h2 className="text-3xl md:text-4xl font-bold text-green-400">{t('mobile_app_title')}</h2>
              <p className="mt-4 text-lg text-gray-300">{t('mobile_app_subtitle')}</p>
              <a
                href="https://dirsha.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-block bg-gradient-to-r from-purple-500 to-green-500 text-white font-bold py-3 px-8 rounded-full text-lg hover:scale-105 transition-transform duration-300"
              >
                {t('mobile_app_cta')}
              </a>
            </div>

            {/* Phone Mockup */}
            <div className="flex justify-center items-center p-8 md:p-0 md:h-full bg-gray-900/30">
              <div className="relative mx-auto border-gray-600 bg-gray-700 border-[10px] rounded-[2.5rem] h-[480px] w-[240px] shadow-xl">
                <div className="w-[120px] h-[18px] bg-gray-700 top-0 rounded-b-[1rem] left-1/2 -translate-x-1/2 absolute"></div>
                <div className="h-[35px] w-[3px] bg-gray-600 absolute -left-[13px] top-[60px] rounded-l-lg"></div>
                <div className="h-[35px] w-[3px] bg-gray-600 absolute -left-[13px] top-[105px] rounded-l-lg"></div>
                <div className="h-[55px] w-[3px] bg-gray-600 absolute -right-[13px] top-[120px] rounded-r-lg"></div>
                <div className="rounded-[2rem] overflow-hidden w-full h-full bg-gray-900">
                    {/* App Screen Content */}
                     <div className="p-3 text-white h-full flex flex-col">
                        <div className="text-center mb-3">
                            <h3 className="text-lg font-bold bg-gradient-to-r from-purple-400 to-green-400 text-transparent bg-clip-text">{t('app_title')}</h3>
                        </div>
                        <div className="flex-grow space-y-2.5 overflow-y-auto pr-1">
                            <div className="bg-gray-800 p-2.5 rounded-lg">
                                 <h4 className="font-bold text-green-400 text-xs">{t('mobile_app_feature_2')}</h4>
                                <p className="text-[11px] text-gray-300 mt-1">{t('rec_3_text')}</p>
                            </div>
                            <div className="bg-gray-800 p-2.5 rounded-lg">
                                <h4 className="font-bold text-green-400 text-xs">{t('mobile_app_feature_3')}</h4>
                                <p className="text-[11px] text-gray-300 mt-1">{t('rec_1_text')}</p>
                            </div>
                            <div className="bg-gray-800 p-2.5 rounded-lg flex items-center gap-2">
                                 <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                                     <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v3a3 3 0 01-3 3z" /></svg>
                                 </div>
                                 <div>
                                    <h4 className="font-bold text-green-400 text-xs">{t('mobile_app_feature_1')}</h4>
                                    <p className="text-[11px] text-gray-300">{t('mobile_app_connect_with')} FreshExporters Inc.</p>
                                </div>
                            </div>
                             <div className="bg-gray-800 p-2.5 rounded-lg">
                                 <h4 className="font-bold text-green-400 text-xs">{t('commodity_coffee')}</h4>
                                <p className="text-[11px] text-gray-300 mt-1">Price up 1.2%. View forecast.</p>
                            </div>
                             <div className="bg-gray-800 p-2.5 rounded-lg">
                                 <h4 className="font-bold text-green-400 text-xs">{t('commodity_teff')}</h4>
                                <p className="text-[11px] text-gray-300 mt-1">Market is stabilizing. Hold.</p>
                            </div>
                        </div>
                     </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};


const LandingPage: React.FC<LandingPageProps> = ({ onNavigateToMarketplace, onNavigateToPredictions, onNavigateToContact, onNavigateToPricing }) => {
  const [comingSoonFeature, setComingSoonFeature] = useState<string | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t } = useLanguage();
  const charts = getChartConfigs(t);


  return (
    <div className="bg-gray-900">
      <Header 
        onNavigateToMarketplace={onNavigateToMarketplace} 
        onNavigateToPredictions={onNavigateToPredictions} 
        onNavigateToContact={onNavigateToContact}
        onNavigateToPricing={onNavigateToPricing}
        onMenuToggle={() => setIsMenuOpen(true)}
      />

      {isMenuOpen && (
        <MobileMenu
            onNavigateToMarketplace={onNavigateToMarketplace}
            onNavigateToPredictions={onNavigateToPredictions}
            onNavigateToContact={onNavigateToContact}
            onNavigateToPricing={onNavigateToPricing}
            onClose={() => setIsMenuOpen(false)}
        />
      )}
      
      <main>
        <div
          className="text-white text-center py-48 px-4 bg-gray-800 bg-blend-multiply"
          style={{
            backgroundImage: "url('https://images.pexels.com/photos/11798250/pexels-photo-11798250.jpeg')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">{t('app_title')}</h1>
          <p className="mt-4 text-xl md:text-2xl font-light max-w-3xl mx-auto">{t('landing_subtitle')}</p>
        </div>

        <MobileAppPromo />

        <div className="max-w-7xl mx-auto p-4 md:p-8">
          <section id="challenge" className="my-12">
              <div className="text-center mb-10">
                  <h2 className="text-3xl md:text-4xl font-bold text-green-400">{t('challenge_title')}</h2>
                  <p className="mt-2 max-w-2xl mx-auto text-lg text-gray-300">{t('challenge_subtitle')}</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                  <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                      <div className="text-5xl mb-4 text-purple-500">📉</div>
                      <h3 className="text-xl font-bold mb-2">{t('challenge_1_title')}</h3>
                      <p className="text-gray-400">{t('challenge_1_text')}</p>
                  </div>
                  <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                      <div className="text-5xl mb-4 text-purple-500">🏦</div>
                      <h3 className="text-xl font-bold mb-2">{t('challenge_2_title')}</h3>
                      <p className="text-gray-400">{t('challenge_2_text')}</p>
                  </div>
                  <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                      <div className="text-5xl mb-4 text-purple-500">🔗</div>
                      <h3 className="text-xl font-bold mb-2">{t('challenge_3_title')}</h3>
                      <p className="text-gray-400">{t('challenge_3_text')}</p>
                  </div>
              </div>
          </section>

          <section id="solution" className="my-16">
              <div className="text-center mb-10">
                  <h2 className="text-3xl md:text-4xl font-bold text-green-400">{t('solution_title')}</h2>
                  <p className="mt-2 max-w-3xl mx-auto text-lg text-gray-300">{t('solution_subtitle')}</p>
              </div>
              <div className="bg-gray-800 p-6 md:p-10 rounded-lg shadow-lg">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center text-center">
                      <div className="flex flex-col items-center"><div className="p-4 bg-gray-700 rounded-full text-4xl">🧑‍🌾</div><h4 className="text-xl font-bold mt-2">{t('solution_actor_farmers')}</h4><p className="text-sm text-gray-400">{t('solution_actor_farmers_desc')}</p></div>
                      <div className="hidden md:block relative w-full h-0.5 bg-purple-500"><span className="absolute right-[-10px] top-1/2 -translate-y-1/2 text-purple-500 text-xl">►</span></div>
                      <div className="block md:hidden relative w-0.5 h-16 bg-purple-500 mx-auto my-4"><span className="absolute bottom-[-18px] left-1/2 -translate-x-1/2 text-purple-500 text-xl">▼</span></div>
                      <div className="flex flex-col items-center"><div className="p-4 bg-gray-700 rounded-full text-4xl">🤝</div><h4 className="text-xl font-bold mt-2">{t('solution_actor_marketplace')}</h4><p className="text-sm text-gray-400">{t('solution_actor_marketplace_desc')}</p></div>
                      <div className="hidden md:block relative w-full h-0.5 bg-purple-500"><span className="absolute right-[-10px] top-1/2 -translate-y-1/2 text-purple-500 text-xl">►</span></div>
                      <div className="block md:hidden relative w-0.5 h-16 bg-purple-500 mx-auto my-4"><span className="absolute bottom-[-18px] left-1/2 -translate-x-1/2 text-purple-500 text-xl">▼</span></div>
                      <div className="flex flex-col items-center"><div className="p-4 bg-gray-700 rounded-full text-4xl">🏢</div><h4 className="text-xl font-bold mt-2">{t('solution_actor_buyers')}</h4><p className="text-sm text-gray-400">{t('solution_actor_buyers_desc')}</p></div>
                  </div>
                  <div className="flex justify-center my-4 relative w-0.5 h-16 bg-purple-500 mx-auto"><span className="absolute bottom-[-18px] left-1/2 -translate-x-1/2 text-purple-500 text-xl">▼</span></div>
                  <div className="flex flex-col items-center text-center"><div className="p-4 bg-gray-700 rounded-full text-4xl">🧠</div><h4 className="text-2xl font-bold mt-2">{t('solution_ai_engine')}</h4><p className="text-md max-w-xl mx-auto text-gray-400">{t('solution_ai_engine_desc')}</p></div>
              </div>
          </section>

          <section id="value-props" className="my-16">
               <div className="text-center mb-10">
                  <h2 className="text-3xl md:text-4xl font-bold text-green-400">{t('value_title')}</h2>
                  <p className="mt-2 max-w-2xl mx-auto text-lg text-gray-300">{t('value_subtitle')}</p>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="bg-gray-800 p-6 rounded-lg shadow-lg flex flex-col"><h3 className="text-2xl font-bold mb-2">{t('value_1_title')}</h3><p className="mb-4 flex-grow text-gray-400">{t('value_1_text')}</p><div className="h-80"><ChartComponent config={charts.priceVolatilityChartConfig} /></div></div>
                  <div className="bg-gray-800 p-6 rounded-lg shadow-lg flex flex-col"><h3 className="text-2xl font-bold mb-2">{t('value_2_title')}</h3><p className="mb-4 flex-grow text-gray-400">{t('value_2_text')}</p><div className="h-80"><ChartComponent config={charts.farmerBenefitsChartConfig} /></div></div>
                  <div className="bg-gray-800 p-6 rounded-lg shadow-lg flex flex-col"><h3 className="text-2xl font-bold mb-2">{t('value_3_title')}</h3><p className="mb-4 flex-grow text-gray-400">{t('value_3_text')}</p><div className="h-80"><ChartComponent config={charts.investorReturnsChartConfig} /></div></div>
                  <div className="bg-gray-800 p-6 rounded-lg shadow-lg flex flex-col"><h3 className="text-2xl font-bold mb-2">{t('value_4_title')}</h3><p className="mb-4 flex-grow text-gray-400">{t('value_4_text')}</p><div className="h-80"><ChartComponent config={charts.supplyDemandChartConfig} /></div></div>
              </div>
          </section>

          <section id="business-model" className="my-16">
              <div className="text-center mb-10">
                  <h2 className="text-3xl md:text-4xl font-bold text-green-400">{t('business_title')}</h2>
                   <p className="mt-2 max-w-2xl mx-auto text-lg text-gray-300">{t('business_subtitle')}</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
                   <div className="bg-gray-800 p-6 rounded-lg shadow-lg flex flex-col">
                      <h3 className="text-2xl font-bold mb-2">{t('business_revenue_title')}</h3>
                      <p className="mb-4 flex-grow text-gray-400">{t('business_revenue_text')}</p>
                      <div className="h-80"><ChartComponent config={charts.revenueModelChartConfig} /></div>
                  </div>
                  <div className="bg-gray-800 p-8 rounded-lg shadow-lg flex flex-col justify-center text-center">
                      <h3 className="text-2xl font-bold mb-4">{t('business_fees_title')}</h3>
                      <p className="text-6xl font-extrabold text-purple-400">1-3%</p>
                      <p className="mt-2 text-lg text-gray-400">{t('business_fees_text')}</p>
                      <hr className="my-6 border-t-2 border-gray-700" />
                       <h3 className="text-2xl font-bold mb-2">{t('business_app_title')}</h3>
                      <p className="text-4xl font-bold text-green-400">{t('business_app_price')}</p>
                       <p className="mt-2 text-lg text-gray-400">{t('business_app_text')}</p>
                  </div>
              </div>
          </section>

          <section id="cta" className="my-16 bg-gradient-to-r from-purple-600 to-green-600 text-white rounded-lg shadow-xl p-8 md:p-12 text-center">
              <h2 className="text-3xl md:text-4xl font-bold">{t('cta_title')}</h2>
              <p className="mt-4 max-w-3xl mx-auto text-lg font-light">{t('cta_subtitle')}</p>
              <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="bg-black/20 p-6 rounded-lg"><h3 className="text-xl font-bold">{t('cta_1_title')}</h3><p className="mt-2">{t('cta_1_text')}</p></div>
                  <div className="bg-black/20 p-6 rounded-lg"><h3 className="text-xl font-bold">{t('cta_2_title')}</h3><p className="mt-2">{t('cta_2_text')}</p></div>
                  <div className="bg-black/20 p-6 rounded-lg"><h3 className="text-xl font-bold">{t('cta_3_title')}</h3><p className="mt-2">{t('cta_3_text')}</p></div>
              </div>
              <div className="mt-10">
                  <a href="mailto:partners@dirsha.example.com" className="inline-block bg-white text-purple-600 font-bold py-3 px-8 rounded-lg text-lg hover:bg-gray-200 transition-colors">{t('cta_button')}</a>
              </div>
          </section>
        </div>
      </main>


      <footer className="text-center p-6 bg-gray-800 text-gray-400 text-sm">
        <p>{t('footer_text')}</p>
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
