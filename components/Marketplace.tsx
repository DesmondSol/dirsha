
import React, { useState, useCallback } from 'react';
import type { Bond, Contract } from '../types';
import CreateBondModal from './CreateBondModal';
import BondDetailsModal from './BondDetailsModal';
import TakeContractModal from './TakeContractModal';

// Icons
const MenuIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" /></svg>;
const CloseIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>;
const BondsIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 10h4.55a2 2 0 0 1 1.95 2.3l-1.5 6A2 2 0 0 1 18 20H5.21a2 2 0 0 1-1.95-1.7L2 6.75A2 2 0 0 1 4 5h2.79a2 2 0 0 1 1.95 1.7L9.5 10H15Z"/><path d="M12 5a2 2 0 0 1 2 2v3H10V7a2 2 0 0 1 2-2Z"/></svg>;
const ContractsIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>;
const HistoryIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>;
const SearchIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>;


interface MarketplaceProps {
  onNavigateToLanding: () => void;
  bonds: Bond[];
  myContracts: Contract[];
  history: Contract[];
  onCreateBond: (bondData: Omit<Bond, 'id' | 'creator'>) => void;
  onTakeContract: (bond: Bond, takerInfo: Contract['taker']) => void;
  onContractAction: (contractId: string, action: 'finished' | 'failed' | 'disputed') => void;
}

type ActiveSection = 'bonds' | 'my-contracts' | 'history';

const Marketplace: React.FC<MarketplaceProps> = ({ onNavigateToLanding, bonds, myContracts, history, onCreateBond, onTakeContract, onContractAction }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<ActiveSection>('bonds');

  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const [selectedBondForDetails, setSelectedBondForDetails] = useState<Bond | null>(null);
  const [selectedBondForTaking, setSelectedBondForTaking] = useState<Bond | null>(null);

  const handleOpenDetails = useCallback((bond: Bond) => setSelectedBondForDetails(bond), []);
  const handleCloseDetails = useCallback(() => setSelectedBondForDetails(null), []);

  const handleStartTaking = useCallback((bond: Bond) => {
    setSelectedBondForDetails(null);
    setSelectedBondForTaking(bond);
  }, []);
  
  const handleCloseTaking = useCallback(() => setSelectedBondForTaking(null), []);

  const handleFinalizeContract = useCallback((bond: Bond, takerInfo: Contract['taker']) => {
      onTakeContract(bond, takerInfo);
      handleCloseTaking();
  }, [onTakeContract, handleCloseTaking]);

  const renderContent = () => {
    switch (activeSection) {
      case 'my-contracts':
        return <MyContractsList contracts={myContracts} onAction={onContractAction} />;
      case 'history':
        return <HistoryList contracts={history} />;
      case 'bonds':
      default:
        return <BondsList bonds={bonds} onOpenCreate={() => setCreateModalOpen(true)} onSelectBond={handleOpenDetails} />;
    }
  };

  const navItems = [
      { id: 'bonds', label: 'Bonds Marketplace', icon: <BondsIcon /> },
      { id: 'my-contracts', label: 'My Contracts', icon: <ContractsIcon /> },
      { id: 'history', label: 'History', icon: <HistoryIcon /> },
  ];

  return (
    <div className="flex h-screen bg-gray-900">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 right-0 z-40 w-64 bg-gray-800 shadow-lg transform transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'} md:relative md:translate-x-0 md:flex md:flex-col`}>
        <div className="flex items-center justify-between md:justify-center p-4 border-b border-gray-700">
          <h1 onClick={onNavigateToLanding} className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-green-400 text-transparent bg-clip-text cursor-pointer">
            Dirsha
          </h1>
           <button onClick={() => setSidebarOpen(false)} className="md:hidden text-gray-400 hover:text-white">
            <CloseIcon />
          </button>
        </div>
        <nav className="flex-1 p-4 space-y-2">
            {navItems.map(item => (
                <button
                    key={item.id}
                    onClick={() => {
                        setActiveSection(item.id as ActiveSection);
                        setSidebarOpen(false);
                    }}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200 ${activeSection === item.id ? 'bg-gradient-to-r from-purple-600 to-green-600 text-white' : 'text-gray-300 hover:bg-gray-700'}`}
                >
                    {item.icon}
                    <span className="font-medium">{item.label}</span>
                </button>
            ))}
        </nav>
      </div>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        <div className="flex items-center justify-between p-4 md:hidden bg-gray-800 shadow-md">
            <h1 className="text-xl font-bold">{navItems.find(i => i.id === activeSection)?.label}</h1>
            <button onClick={() => setSidebarOpen(true)} className="text-gray-400 hover:text-white">
                <MenuIcon />
            </button>
        </div>
        <div className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          {renderContent()}
        </div>
      </main>

      {/* Modals */}
      {isCreateModalOpen && <CreateBondModal onClose={() => setCreateModalOpen(false)} onCreateBond={onCreateBond} />}
      {selectedBondForDetails && <BondDetailsModal bond={selectedBondForDetails} onClose={handleCloseDetails} onTakeContract={handleStartTaking} />}
      {selectedBondForTaking && <TakeContractModal bond={selectedBondForTaking} onClose={handleCloseTaking} onFinalize={handleFinalizeContract} />}
    </div>
  );
};


// Sub-components for Marketplace sections

const BondsList: React.FC<{ bonds: Bond[], onOpenCreate: () => void, onSelectBond: (bond: Bond) => void }> = ({ bonds, onOpenCreate, onSelectBond }) => {
    const popularTags = ['Avocado', 'Maize', 'Dairy', 'Organic', 'Export', 'Local'];
    return (
        <div>
            <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                <h2 className="text-3xl font-bold text-white">Bonds Marketplace</h2>
                <button onClick={onOpenCreate} className="w-full md:w-auto px-6 py-3 font-semibold text-white bg-gradient-to-r from-purple-500 to-green-500 rounded-lg hover:scale-105 transform transition-transform duration-300 flex items-center justify-center gap-2">
                    <span>+</span> Create a Bond
                </button>
            </div>
            <div className="relative mb-6">
                <input type="text" placeholder="Search for bonds (e.g., 'organic coffee')" className="w-full bg-gray-800 border-2 border-gray-700 rounded-lg py-3 pl-12 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"/>
                <div className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-500">
                    <SearchIcon />
                </div>
            </div>
            <div className="mb-6 flex flex-wrap gap-2">
                {popularTags.map(tag => <button key={tag} className="px-4 py-1 bg-gray-700 text-gray-300 rounded-full text-sm hover:bg-gray-600 transition">{tag}</button>)}
            </div>
            <div className="border-t border-gray-700 my-4"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {bonds.map(bond => <BondCard key={bond.id} bond={bond} onSelect={onSelectBond} />)}
            </div>
        </div>
    );
};

const BondCard: React.FC<{ bond: Bond, onSelect: (bond: Bond) => void }> = ({ bond, onSelect }) => (
  <div onClick={() => onSelect(bond)} className="bg-gray-800 rounded-lg shadow-lg p-5 cursor-pointer hover:shadow-purple-500/20 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between h-full border border-gray-700">
    <div>
        <h3 className="text-xl font-bold text-white mb-2">{bond.title}</h3>
        <p className="text-gray-400 text-sm mb-4 line-clamp-3">{bond.description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
            {bond.tags.map(tag => <span key={tag} className="px-3 py-1 bg-gray-700 text-xs text-green-400 rounded-full">{tag}</span>)}
        </div>
    </div>
    <div className="border-t border-gray-700 pt-3 mt-auto">
        <p className="text-lg font-semibold text-green-400">${bond.price.toLocaleString()}</p>
        <p className="text-xs text-gray-500">Expires: {bond.expires}</p>
    </div>
  </div>
);

const MyContractsList: React.FC<{ contracts: Contract[], onAction: (contractId: string, action: 'finished' | 'failed' | 'disputed') => void }> = ({ contracts, onAction }) => (
    <div>
        <h2 className="text-3xl font-bold text-white mb-6">My Active Contracts</h2>
        {contracts.length === 0 ? (
            <p className="text-gray-400">You have no active contracts. Visit the marketplace to take on a new bond.</p>
        ) : (
            <div className="space-y-4">
                {contracts.map(c => (
                    <div key={c.id} className="bg-gray-800 rounded-lg p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div>
                            <h3 className="font-bold text-lg text-white">{c.title}</h3>
                            <p className="text-sm text-gray-400">Due: {c.executionTime} | Value: ${c.price}</p>
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0">
                            <button onClick={() => onAction(c.id, 'finished')} className="px-4 py-2 text-sm font-semibold bg-green-600 text-white rounded-md hover:bg-green-700 transition">Finished</button>
                            <button onClick={() => onAction(c.id, 'failed')} className="px-4 py-2 text-sm font-semibold bg-red-600 text-white rounded-md hover:bg-red-700 transition">Failed</button>
                            <button onClick={() => onAction(c.id, 'disputed')} className="px-4 py-2 text-sm font-semibold bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition">Dispute</button>
                        </div>
                    </div>
                ))}
            </div>
        )}
    </div>
);

const HistoryList: React.FC<{ contracts: Contract[] }> = ({ contracts }) => (
    <div>
        <h2 className="text-3xl font-bold text-white mb-6">Contract History</h2>
        {contracts.length === 0 ? (
            <p className="text-gray-400">Your contract history is empty.</p>
        ) : (
            <div className="space-y-4">
                {contracts.map(c => (
                    <div key={c.id} className={`bg-gray-800 rounded-lg p-4 flex justify-between items-center border-l-4 ${c.status === 'finished' ? 'border-green-500' : 'border-red-500'}`}>
                        <div>
                            <h3 className="font-bold text-lg text-white">{c.title}</h3>
                            <p className="text-sm text-gray-400">Completed on: {new Date().toLocaleDateString()}</p>
                        </div>
                        <span className={`px-3 py-1 text-sm font-medium rounded-full ${c.status === 'finished' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                            {c.status.charAt(0).toUpperCase() + c.status.slice(1)}
                        </span>
                    </div>
                ))}
            </div>
        )}
    </div>
);

export default Marketplace;
