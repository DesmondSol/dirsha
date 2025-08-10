
import React, { useState } from 'react';
import LandingPage from './components/LandingPage';
import Marketplace from './components/Marketplace';
import PredictionsPage from './components/PredictionsPage';
import ContactUsPage from './components/ContactUsPage';
import PricingPage from './components/PricingPage';
import type { Bond, Contract } from './types';
import { DUMMY_BONDS, DUMMY_CONTRACTS } from './constants';
import { useLanguage } from './components/LanguageContext';

type View = 'landing' | 'marketplace' | 'predictions' | 'contact' | 'pricing';

const App: React.FC = () => {
  const [view, setView] = useState<View>('landing');
  const [bonds, setBonds] = useState<Bond[]>(DUMMY_BONDS);
  const [myContracts, setMyContracts] = useState<Contract[]>(DUMMY_CONTRACTS);
  const [history, setHistory] = useState<Contract[]>([]);
  const { t } = useLanguage();


  const navigateToMarketplace = () => setView('marketplace');
  const navigateToLanding = () => setView('landing');
  const navigateToPredictions = () => setView('predictions');
  const navigateToContact = () => setView('contact');
  const navigateToPricing = () => setView('pricing');

  const handleCreateBond = (newBondData: Omit<Bond, 'id' | 'creator' | 'titleKey' | 'descriptionKey' | 'requirementsKey'> & { title:string, description:string, requirements:string }) => {
    // This is a simplified approach. In a real app, you'd save keys and translated content.
    // For this dummy app, we'll just add it with raw text.
    const newBond: Bond = {
      titleKey: newBondData.title,
      descriptionKey: newBondData.description,
      requirementsKey: newBondData.requirements,
      price: newBondData.price,
      itemPrice: newBondData.itemPrice,
      tags: newBondData.tags,
      executionTime: newBondData.executionTime,
      expires: newBondData.expires,
      id: `bond-${Date.now()}`,
      creator: 'My Company', // Placeholder for logged-in user
    };
    setBonds(prevBonds => [newBond, ...prevBonds]);
  };

  const handleTakeContract = (bond: Bond, takerInfo: Contract['taker']) => {
    const newContract: Contract = {
      ...bond,
      taker: takerInfo,
      status: 'active',
    };
    setMyContracts(prev => [newContract, ...prev]);
    setBonds(prev => prev.filter(b => b.id !== bond.id));
  };
  
  const handleContractAction = (contractId: string, action: 'finished' | 'failed' | 'disputed') => {
    const contract = myContracts.find(c => c.id === contractId);
    if(contract) {
        const updatedContract = {...contract, status: action};
        setHistory(prev => [updatedContract, ...prev]);
        setMyContracts(prev => prev.filter(c => c.id !== contractId));
    }
  };

  const renderView = () => {
    switch(view) {
      case 'marketplace':
        return <Marketplace
          onNavigateToLanding={navigateToLanding}
          bonds={bonds}
          myContracts={myContracts}
          history={history}
          onCreateBond={handleCreateBond}
          onTakeContract={handleTakeContract}
          onContractAction={handleContractAction}
        />;
      case 'predictions':
        return <PredictionsPage onNavigateToLanding={navigateToLanding} />;
      case 'contact':
        return <ContactUsPage onNavigateToLanding={navigateToLanding} />;
       case 'pricing':
        return <PricingPage onNavigateToLanding={navigateToLanding} />;
      case 'landing':
      default:
        return <LandingPage 
            onNavigateToMarketplace={navigateToMarketplace} 
            onNavigateToPredictions={navigateToPredictions} 
            onNavigateToContact={navigateToContact}
            onNavigateToPricing={navigateToPricing} 
        />;
    }
  }

  return (
    <div className="bg-gray-900 min-h-screen text-gray-100 font-sans">
      {renderView()}
    </div>
  );
};

export default App;