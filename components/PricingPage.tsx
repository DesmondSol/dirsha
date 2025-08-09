
import React from 'react';

interface PricingPageProps {
  onNavigateToLanding: () => void;
}

const CheckIcon = () => <svg className="h-6 w-6 text-green-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>;

const PricingPage: React.FC<PricingPageProps> = ({ onNavigateToLanding }) => {
    return (
        <div className="min-h-screen bg-gray-900 text-white">
            <header className="bg-gray-800/80 backdrop-blur-md">
                <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
                    <h1 onClick={onNavigateToLanding} className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-green-400 text-transparent bg-clip-text cursor-pointer">
                        Dirsha
                    </h1>
                    <button
                        onClick={onNavigateToLanding}
                        className="text-gray-300 hover:text-white transition"
                    >
                        Back to Home
                    </button>
                </nav>
            </header>

            <main className="container mx-auto px-6 py-16">
                <div className="text-center max-w-3xl mx-auto">
                    <h2 className="text-4xl md:text-5xl font-extrabold text-white">Find the Plan That's Right for You</h2>
                    <p className="mt-4 text-lg text-gray-300">
                        Unlock powerful AI-driven insights with our flexible and transparent pricing plans. Choose a plan to supercharge your agricultural decisions.
                    </p>
                </div>

                <div className="mt-16 grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto items-stretch">
                    {/* Basic Plan */}
                    <PricingCard
                        plan="Basic"
                        price="Free"
                        description="For individuals and small-scale farmers getting started."
                        features={[
                            "Daily Market Price Updates",
                            "Basic Commodity News",
                            "1 Saved Watchlist",
                            "Weekly Email Summaries"
                        ]}
                    />

                    {/* Pro Plan */}
                    <PricingCard
                        plan="Pro"
                        price="$49"
                        period="/ month"
                        description="For active traders, co-ops, and businesses needing an edge."
                        features={[
                            "Everything in Basic, plus:",
                            "Real-time Price Alerts",
                            "Full AI Price Forecasts (3-month)",
                            "Regional Price Analysis",
                            "Market Trigger Monitoring",
                            "Unlimited Watchlists",
                            "Priority Email Support"
                        ]}
                        isPopular={true}
                    />

                    {/* Enterprise Plan */}
                    <PricingCard
                        plan="Enterprise"
                        price="Custom"
                        description="For large organizations, exporters, and government agencies."
                        features={[
                            "Everything in Pro, plus:",
                            "Extended AI Forecasts (12+ months)",
                            "Direct API Access",
                            "Customizable Data Dashboards",
                            "Dedicated Account Manager",
                            "On-demand Data Reports"
                        ]}
                        buttonText="Contact Sales"
                    />
                </div>

                <section id="faq" className="my-20 max-w-3xl mx-auto">
                    <h2 className="text-3xl font-bold text-center text-white mb-8">Frequently Asked Questions</h2>
                    <div className="space-y-4">
                        <FAQItem
                            question="Can I change my plan later?"
                            answer="Yes, you can upgrade, downgrade, or cancel your plan at any time from your account settings. Changes will be prorated for the current billing cycle."
                        />
                        <FAQItem
                            question="What payment methods do you accept?"
                            answer="We accept all major credit cards (Visa, Mastercard, American Express) and mobile money payments for your convenience."
                        />
                        <FAQItem
                            question="Is there a free trial for the Pro plan?"
                            answer="We currently do not offer a free trial, but our Basic plan is free forever and provides a great introduction to our platform's capabilities."
                        />
                         <FAQItem
                            question="What kind of support is included?"
                            answer="All plans include email support. The Pro plan offers priority email support, and the Enterprise plan includes a dedicated account manager for personalized assistance."
                        />
                    </div>
                </section>
            </main>
            
            <footer className="text-center p-6 bg-gray-800 text-gray-400 text-sm">
                <p>&copy; 2025 Dirsha. All Rights Reserved.</p>
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

const PricingCard: React.FC<PricingCardProps> = ({ plan, price, period, description, features, isPopular = false, buttonText = "Choose Plan" }) => (
    <div className={`relative bg-gray-800 rounded-xl shadow-lg p-8 border ${isPopular ? 'border-purple-500' : 'border-gray-700'} flex flex-col`}>
        {isPopular && (
            <div className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2">
                <span className="px-4 py-1 text-sm font-semibold text-white bg-purple-500 rounded-full">MOST POPULAR</span>
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
);

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