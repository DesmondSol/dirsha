
import React, { useState } from 'react';
import type { Bond, Contract } from '../types';

interface TakeContractModalProps {
  bond: Bond;
  onClose: () => void;
  onFinalize: (bond: Bond, takerInfo: Contract['taker']) => void;
}

const CloseIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>;
const UploadIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>;


const TakeContractModal: React.FC<TakeContractModalProps> = ({ bond, onClose, onFinalize }) => {
  const [takerInfo, setTakerInfo] = useState({
    name: '',
    contact: '',
    bankDetails: '',
    idPhoto: null as File | null,
  });
  const [agreed, setAgreed] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTakerInfo(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
        setTakerInfo(prev => ({ ...prev, idPhoto: e.target.files[0] }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreed) {
        alert("You must agree to all terms to finalize the contract.");
        return;
    }
    if (!takerInfo.idPhoto) {
        alert("Please upload an ID photo.");
        return;
    }
    onFinalize(bond, takerInfo);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex justify-center items-center p-4">
      <div className="bg-gray-800 rounded-xl shadow-2xl w-full max-w-lg max-h-[90vh] flex flex-col border border-purple-500/50">
        <div className="flex justify-between items-center p-5 border-b border-gray-700">
          <h2 className="text-2xl font-bold text-white">Finalize Contract</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
            <CloseIcon />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4">
            <p className="text-gray-300 mb-4">You are about to take the contract for: <strong className="text-white">{bond.title}</strong>. Please provide your details to proceed.</p>
            
            <InputField label="Full Name" name="name" value={takerInfo.name} onChange={handleChange} placeholder="John Doe" required />
            <InputField label="Contact Information (Phone or Email)" name="contact" value={takerInfo.contact} onChange={handleChange} placeholder="john.doe@example.com" required />
            <InputField label="Bank Details (for payment)" name="bankDetails" value={takerInfo.bankDetails} onChange={handleChange} placeholder="Bank Name, Account Number" required />

            <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Upload ID Photo</label>
                <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-600 px-6 py-10">
                    <div className="text-center">
                        {takerInfo.idPhoto ? (
                             <p className="text-green-400">{takerInfo.idPhoto.name} uploaded successfully.</p>
                        ) : (
                            <>
                                <UploadIcon />
                                <div className="mt-4 flex text-sm leading-6 text-gray-400">
                                    <label htmlFor="file-upload" className="relative cursor-pointer rounded-md bg-gray-800 font-semibold text-purple-400 focus-within:outline-none focus-within:ring-2 focus-within:ring-purple-600 focus-within:ring-offset-2 focus-within:ring-offset-gray-900 hover:text-purple-500">
                                        <span>Upload a file</span>
                                        <input id="file-upload" name="idPhoto" type="file" className="sr-only" onChange={handleFileChange} accept="image/*" capture="environment" required/>
                                    </label>
                                    <p className="pl-1">or drag and drop</p>
                                </div>
                                <p className="text-xs leading-5 text-gray-400">PNG, JPG, GIF up to 10MB</p>
                            </>
                        )}
                    </div>
                </div>
            </div>

            <div className="flex items-start">
                <input id="final-terms" type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} className="h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-600 mt-1" />
                <label htmlFor="final-terms" className="ml-3 block text-sm text-gray-300">By checking this box, you confirm your details are correct and agree to all terms and conditions of this contract, understanding they are legally binding.</label>
            </div>
            
            <div className="pt-4 flex justify-end gap-4">
                <button type="button" onClick={onClose} className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-500 transition">Cancel</button>
                <button type="submit" disabled={!agreed} className="px-6 py-2 font-semibold text-white bg-gradient-to-r from-purple-500 to-green-500 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 transform transition-transform duration-300">Agree & Finalize</button>
            </div>
        </form>
      </div>
    </div>
  );
};

const InputField: React.FC<{label: string, name: string, value: string, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void, placeholder?: string, required?: boolean}> = ({ label, name, value, onChange, placeholder, required }) => (
    <div>
        <label htmlFor={name} className="block text-sm font-medium text-gray-300 mb-1">{label}</label>
        <input id={name} name={name} type="text" value={value} onChange={onChange} placeholder={placeholder} required={required} className="w-full bg-gray-900 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"/>
    </div>
);

export default TakeContractModal;
