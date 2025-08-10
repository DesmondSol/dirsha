
import React, { useState } from 'react';
import ContactFormModal from './ContactFormModal';
import { useLanguage } from './LanguageContext';

interface ContactUsPageProps {
  onNavigateToLanding: () => void;
}

// Icons
const MailIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>;
const PhoneIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>;
const LocationIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>;

const ContactUsPage: React.FC<ContactUsPageProps> = ({ onNavigateToLanding }) => {
    const [isFormOpen, setFormOpen] = useState(false);
    const { t } = useLanguage();

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
                <div className="text-center">
                    <h2 className="text-4xl md:text-5xl font-extrabold text-white">{t('contact_title')}</h2>
                    <p className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto">
                        {t('contact_subtitle')}
                    </p>
                </div>

                <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                    <InfoCard 
                        icon={<MailIcon />} 
                        title={t('contact_email_us')}
                        content="soltig66@gmail.com"
                        link="mailto:soltig66@gmail.com"
                    />
                    <InfoCard 
                        icon={<PhoneIcon />}
                        title={t('contact_call_us')}
                        content="0923214663"
                        link="tel:0923214663"
                    />
                     <InfoCard 
                        icon={<LocationIcon />}
                        title={t('contact_our_location')}
                        content={t('contact_location_address')}
                    />
                </div>

                <div className="mt-20 text-center">
                    <button
                        onClick={() => setFormOpen(true)}
                        className="px-8 py-4 font-bold text-lg text-white bg-gradient-to-r from-purple-500 to-green-500 rounded-lg hover:scale-105 transform transition-transform duration-300 shadow-lg shadow-purple-500/20"
                    >
                        {t('contact_send_inquiry')}
                    </button>
                </div>
            </main>

             <footer className="text-center p-6 bg-gray-800 text-gray-400 text-sm mt-16">
                <p>{t('footer_text')}</p>
            </footer>

            {isFormOpen && <ContactFormModal onClose={() => setFormOpen(false)} />}
        </div>
    );
};

const InfoCard: React.FC<{icon: React.ReactNode, title: string, content: string, link?: string}> = ({ icon, title, content, link }) => (
    <div className="bg-gray-800 p-8 rounded-lg shadow-lg text-center flex flex-col items-center border border-gray-700 hover:border-purple-500 transition-colors duration-300">
        <div className="text-purple-400 mb-4">{icon}</div>
        <h3 className="text-xl font-bold mb-2 text-white">{title}</h3>
        {link ? (
            <a href={link} className="text-green-400 hover:underline">{content}</a>
        ) : (
            <p className="text-gray-300">{content}</p>
        )}
    </div>
);

export default ContactUsPage;