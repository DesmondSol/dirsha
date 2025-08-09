
import React from 'react';
import type { Bond } from '../types';

interface BondDetailsModalProps {
  bond: Bond;
  onClose: () => void;
  onTakeContract: (bond: Bond) => void;
}

const CloseIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>;

const DetailItem: React.FC<{ label: string; value: React.ReactNode; className?: string }> = ({ label, value, className }) => (
    <div className={className}>
        <p className="text-sm font-medium text-gray-400">{label}</p>
        <p className="text-lg text-white">{value}</p>
    </div>
);

const BondDetailsModal: React.FC<BondDetailsModalProps> = ({ bond, onClose, onTakeContract }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex justify-center items-center p-4">
      <div className="bg-gray-800 rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col border border-green-500/50">
        <div className="flex justify-between items-center p-5 border-b border-gray-700">
          <h2 className="text-2xl font-bold text-white line-clamp-1">{bond.title}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
            <CloseIcon />
          </button>
        </div>
        <div className="p-6 overflow-y-auto space-y-6">
            <p className="text-gray-300">{bond.description}</p>
            
            <div>
                <h3 className="text-lg font-semibold text-green-400 mb-2">Requirements</h3>
                <p className="text-gray-300 whitespace-pre-wrap">{bond.requirements}</p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-gray-900/50 p-4 rounded-lg">
                <DetailItem label="Contract Value" value={`$${bond.price.toLocaleString()}`} />
                <DetailItem label="Price per Item" value={`$${bond.itemPrice.toLocaleString()}`} />
                <DetailItem label="Execution By" value={new Date(bond.executionTime).toLocaleDateString()} />
                <DetailItem label="Expires On" value={new Date(bond.expires).toLocaleDateString()} />
            </div>

            <div>
                <h3 className="text-lg font-semibold text-green-400 mb-2">Tags</h3>
                <div className="flex flex-wrap gap-2">
                    {bond.tags.map(tag => (
                        <span key={tag} className="px-3 py-1 bg-gray-700 text-xs text-green-400 rounded-full">{tag}</span>
                    ))}
                </div>
            </div>
             <p className="text-xs text-gray-500">Created by: {bond.creator}</p>
        </div>
        <div className="mt-auto p-5 border-t border-gray-700 flex justify-end">
          <button onClick={() => onTakeContract(bond)} className="px-8 py-3 font-semibold text-white bg-gradient-to-r from-purple-500 to-green-500 rounded-lg hover:scale-105 transform transition-transform duration-300">
            Take Contract
          </button>
        </div>
      </div>
    </div>
  );
};

export default BondDetailsModal;
