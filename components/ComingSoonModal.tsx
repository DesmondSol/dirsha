
import React from 'react';
import { useLanguage } from './LanguageContext';

interface ComingSoonModalProps {
  featureName: string;
  onClose: () => void;
}

const CloseIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>;

const ComingSoonModal: React.FC<ComingSoonModalProps> = ({ featureName, onClose }) => {
  const { t } = useLanguage();
  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex justify-center items-center p-4" onClick={onClose}>
      <div 
        className="bg-gray-800 rounded-xl shadow-2xl w-full max-w-md text-center p-8 border border-purple-500/50" 
        onClick={e => e.stopPropagation()}
      >
        <div className="flex justify-end">
             <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors -mt-4 -mr-4">
                <CloseIcon />
            </button>
        </div>
        <div className="text-6xl mb-4">🚧</div>
        <h2 className="text-3xl font-bold text-white mb-2">{t('coming_soon_title')}</h2>
        <p className="text-lg text-gray-300">{t('coming_soon_feature_intro')} "{t(featureName.toLowerCase().replace(' ','_'))}" {t('coming_soon_feature_outro')}</p>
        <p className="text-gray-400 mt-2">{t('coming_soon_update_notice')}</p>
        <button 
            onClick={onClose} 
            className="mt-8 px-6 py-2 font-semibold text-white bg-gradient-to-r from-purple-500 to-green-500 rounded-lg hover:scale-105 transform transition-transform duration-300"
        >
            {t('button_got_it')}
        </button>
      </div>
    </div>
  );
};

export default ComingSoonModal;