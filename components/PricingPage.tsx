
import React from 'react';
import { useLanguage } from './LanguageContext';

interface PricingPageProps {
  onNavigateToLanding: () => void;
}

const CheckIcon = () => <svg className="h-6 w-6 text-green-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>;

const PricingPage: React.FC<PricingPageProps> = ({ onNavigateToLanding }) => {
    const { t } = useLanguage();

    const plans = {
        basic: {
            plan: t('plan_basic'),
            price: t('price_free'),
            description: t('plan_basic_desc'),
            features: [
                t('feature_daily_updates'),
                t('feature_basic_news'),
                t('feature_one_watchlist'),
                t('feature_weekly_summaries')
            ],
            buttonText: t('button_choose_plan')
        },
        pro: {
            plan: t('plan_pro'),
            price: '$49',
            period: t('price_period_month'),
            description: t('plan_pro_desc'),
            features: [
                t('feature_pro_1'),
                t('feature_pro_2'),
                t('feature_pro_3'),
                t('feature_pro_4'),
                t('feature_pro_5'),
                t('feature_pro_6'),
                t('feature_pro_7'),
            ],
            isPopular: true,
            buttonText: t('button_choose_plan')
        },
        enterprise: {
            plan: t('plan_enterprise'),
            price: t('price_custom'),
            description: t('plan_enterprise_desc'),
            features: [
                t('feature_enterprise_1'),
                t('feature_enterprise_2'),
                t('feature_enterprise_3'),
                t('feature_enterprise_4'),
                t('feature_enterprise_5'),
                t('feature_enterprise_6'),
            ],
            buttonText: t('button_contact_sales')
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white">
            <header className="bg-gray-800/80 backdrop-blur-md">
                <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
                    <h1 onClick={onNavigateToLanding} className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-green-400 text-transparent bg-clip-text cursor-pointer">
                        {t('app_title')}
                    </h1>
                    <button
                        onClick={onNavigateToLanding}
                        className="text-gray-300 hover:text-white transition"
                    >
                        {t('button_back_home')}
                    </button>
                </nav>
            </header>

            <main className="container mx-auto px-6 py-16">
                <div className="text-center max-w-3xl mx-auto">
                    <h2 className="text-4xl md:text-5xl font-extrabold text-white">{t('pricing_title')}</h2>
                    <p className="mt-4 text-lg text-gray-300">
                        {t('pricing_subtitle')}
                    </p>
                </div>

                <div className="mt-16 grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto items-stretch">
                    <PricingCard {...plans.basic} />
                    <PricingCard {...plans.pro} />
                    <PricingCard {...plans.enterprise} />
                </div>

                <section id="faq" className="my-20 max-w-3xl mx-auto">
                    <h2 className="text-3xl font-bold text-center text-white mb-8">{t('faq_title')}</h2>
                    <div className="space-y-4">
                        <FAQItem
                            question={t('faq1_q')}
                            answer={t('faq1_a')}
                        />
                        <FAQItem
                            question={t('faq2_q')}
                            answer={t('faq2_a')}
                        />
                        <FAQItem
                            question={t('faq3_q')}
                            answer={t('faq3_a')}
                        />
                         <FAQItem
                            question={t('faq4_q')}
                            answer={t('faq4_a')}
                        />
                    </div>
                </section>
            </main>
            
            <footer className="text-center p-6 bg-gray-800 text-gray-400 text-sm">
                <p>{t('footer_text')}</p>
            </footer>
        </div>
    );
};

interface PricingCardProps {
    plan: string;
    price: string;
    period?: string;
    description: string;
    features: string[];
    isPopular?: boolean;
    buttonText?: string;
}

const PricingCard: React.FC<PricingCardProps> = ({ plan, price, period, description, features, isPopular = false, buttonText = "Choose Plan" }) => {
    const { t } = useLanguage();
    return (
    <div className={`relative bg-gray-800 rounded-xl shadow-lg p-8 border ${isPopular ? 'border-purple-500' : 'border-gray-700'} flex flex-col`}>
        {isPopular && (
            <div className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2">
                <span className="px-4 py-1 text-sm font-semibold text-white bg-purple-500 rounded-full">{t('most_popular')}</span>
            </div>
        )}
        <h3 className="text-2xl font-bold text-white text-center">{plan}</h3>
        <div className="mt-4 text-center">
            <span className="text-5xl font-extrabold text-white">{price}</span>
            {period && <span className="text-lg text-gray-400">{period}</span>}
        </div>
        <p className="mt-4 text-gray-400 text-center h-12">{description}</p>
        
        <ul className="mt-8 space-y-4 flex-grow">
            {features.map((feature, index) => (
                <li key={index} className="flex items-start">
                    <CheckIcon />
                    <span className="ml-3 text-gray-300">{feature}</span>
                </li>
            ))}
        </ul>

        <button className={`w-full mt-8 py-3 font-semibold rounded-lg transition-transform transform hover:scale-105 duration-300 ${isPopular ? 'bg-gradient-to-r from-purple-500 to-green-500 text-white' : 'bg-gray-700 hover:bg-gray-600 text-gray-200'}`}>
            {buttonText}
        </button>
    </div>
)};

interface FAQItemProps {
    question: string;
    answer: string;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer }) => (
    <details className="bg-gray-800 p-4 rounded-lg cursor-pointer">
        <summary className="font-semibold text-white text-lg list-none flex justify-between items-center">
            {question}
            <svg className="w-5 h-5 text-gray-400 transform transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
        </summary>
        <p className="mt-4 text-gray-300">{answer}</p>
    </details>
);


export default PricingPage;