
import React, { useState } from 'react';
import type { Bond } from '../types';
import { useLanguage } from './LanguageContext';

interface CreateBondModalProps {
  onClose: () => void;
  onCreateBond: (bondData: Omit<Bond, 'id' | 'creator'| 'titleKey' | 'descriptionKey' | 'requirementsKey'> & {title: string, description: string, requirements: string}) => void;
}

const CloseIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>;

const CreateBondModal: React.FC<CreateBondModalProps> = ({ onClose, onCreateBond }) => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    requirements: '',
    price: '',
    itemPrice: '',
    tags: '',
    executionTime: '',
    expires: '',
  });
  const [agreed, setAgreed] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreed) {
        alert(t('error_agree_terms'));
        return;
    }
    const bondData = {
        ...formData,
        price: parseFloat(formData.price),
        itemPrice: parseFloat(formData.itemPrice),
        tags: formData.tags.split(',').map(tag => tag.trim()),
    };
    onCreateBond(bondData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex justify-center items-center p-4">
      <div className="bg-gray-800 rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col border border-purple-500/50">
        <div className="flex justify-between items-center p-5 border-b border-gray-700">
          <h2 className="text-2xl font-bold text-white">{t('create_bond_title')}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
            <CloseIcon />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4">
            <InputField label={t('form_bond_title')} name="title" value={formData.title} onChange={handleChange} placeholder={t('form_bond_title_placeholder')} required />
            <div className="flex gap-4">
                <InputField label={t('form_contract_value')} name="price" type="number" value={formData.price} onChange={handleChange} placeholder="1500" required className="flex-1" />
                <InputField label={t('form_price_per_item')} name="itemPrice" type="number" value={formData.itemPrice} onChange={handleChange} placeholder="1.5" required className="flex-1" />
            </div>
             <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-1">{t('form_description')}</label>
                <textarea id="description" name="description" value={formData.description} onChange={handleChange} rows={3} className="w-full bg-gray-900 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500" placeholder={t('form_description_placeholder')} required></textarea>
            </div>
            <div>
                <label htmlFor="requirements" className="block text-sm font-medium text-gray-300 mb-1">{t('form_requirements')}</label>
                <textarea id="requirements" name="requirements" value={formData.requirements} onChange={handleChange} rows={3} className="w-full bg-gray-900 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500" placeholder={t('form_requirements_placeholder')} required></textarea>
            </div>
            <InputField label={t('form_tags')} name="tags" value={formData.tags} onChange={handleChange} placeholder={t('form_tags_placeholder')} required />
            <div className="flex gap-4">
                <InputField label={t('form_execution_date')} name="executionTime" type="date" value={formData.executionTime} onChange={handleChange} required className="flex-1" />
                <InputField label={t('form_expiry_date')} name="expires" type="date" value={formData.expires} onChange={handleChange} required className="flex-1" />
            </div>
             <div className="flex items-center">
                <input id="terms" type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} className="h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-600" />
                <label htmlFor="terms" className="ml-2 block text-sm text-gray-300">
                    {t('form_agree_to')} <a href="#" className="font-medium text-purple-400 hover:underline">{t('form_terms')}</a>
                </label>
            </div>
            <div className="pt-4 flex justify-end gap-4">
                <button type="button" onClick={onClose} className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-500 transition">{t('button_cancel')}</button>
                <button type="submit" disabled={!agreed} className="px-6 py-2 font-semibold text-white bg-gradient-to-r from-purple-500 to-green-500 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 transform transition-transform duration-300">{t('create_bond_button')}</button>
            </div>
        </form>
      </div>
    </div>
  );
};

const InputField: React.FC<{label: string, name: string, value: string, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void, type?: string, placeholder?: string, required?: boolean, className?: string}> = ({ label, name, value, onChange, type = 'text', placeholder, required, className }) => (
    <div className={className}>
        <label htmlFor={name} className="block text-sm font-medium text-gray-300 mb-1">{label}</label>
        <input id={name} name={name} type={type} value={value} onChange={onChange} placeholder={placeholder} required={required} className="w-full bg-gray-900 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"/>
    </div>
);

export default CreateBondModal;