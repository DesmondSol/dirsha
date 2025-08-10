
import React, { useState } from 'react';
import { useLanguage } from './LanguageContext';

const LanguageIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
      <path d="M10 2a8 8 0 015.545 13.593l-1.414-1.414A6 6 0 1010 4V2z" />
      <path fillRule="evenodd" d="M12.293 8.293a1 1 0 011.414 0L16.414 11l-2.707 2.707a1 1 0 01-1.414-1.414L13.586 11l-1.293-1.293a1 1 0 010-1.414z" clipRule="evenodd" />
      <path fillRule="evenodd" d="M3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
    </svg>
);

const LanguageToggle: React.FC = () => {
    const { language, setLanguage } = useLanguage();
    const [isOpen, setIsOpen] = useState(false);

    const languages = {
        en: 'English',
        am: 'አማርኛ',
    };

    const toggleLanguage = (lang: 'en' | 'am') => {
        setLanguage(lang);
        setIsOpen(false);
    };

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center space-x-2 text-gray-300 hover:text-white transition"
            >
                <LanguageIcon />
                <span>{languages[language]}</span>
                <svg className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-gray-800 rounded-md shadow-lg py-1 z-50 border border-gray-700">
                    <button
                        onClick={() => toggleLanguage('en')}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white"
                    >
                        English
                    </button>
                    <button
                        onClick={() => toggleLanguage('am')}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white"
                    >
                        አማርኛ (Amharic)
                    </button>
                </div>
            )}
        </div>
    );
};

export default LanguageToggle;
