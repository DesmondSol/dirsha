
import React, { useState } from 'react';

interface ContactFormModalProps {
  onClose: () => void;
}

const CloseIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>;

const ContactFormModal: React.FC<ContactFormModalProps> = ({ onClose }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [isSubmitted, setSubmitted] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({...prev, [name]: value}));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Here you would typically send the data to a server
        console.log('Form submitted:', formData);
        setSubmitted(true);
    };

    if (isSubmitted) {
        return (
             <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex justify-center items-center p-4">
                <div className="bg-gray-800 rounded-xl shadow-2xl w-full max-w-lg text-center p-8 border border-green-500/50">
                    <div className="text-5xl mb-4">✅</div>
                    <h2 className="text-2xl font-bold text-white mb-2">Thank You!</h2>
                    <p className="text-gray-300 mb-6">Your message has been sent successfully. We will get back to you shortly.</p>
                    <button onClick={onClose} className="px-6 py-2 font-semibold text-white bg-green-500 rounded-lg">
                        Close
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex justify-center items-center p-4">
            <div className="bg-gray-800 rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col border border-purple-500/50">
                <div className="flex justify-between items-center p-5 border-b border-gray-700">
                    <h2 className="text-2xl font-bold text-white">Send Us An Inquiry</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
                        <CloseIcon />
                    </button>
                </div>
                <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4">
                    <div className="flex flex-col md:flex-row gap-4">
                        <InputField label="Full Name" name="name" value={formData.name} onChange={handleChange} placeholder="Your Name" required className="flex-1" />
                        <InputField label="Email Address" name="email" type="email" value={formData.email} onChange={handleChange} placeholder="you@example.com" required className="flex-1" />
                    </div>
                    <InputField label="Subject" name="subject" value={formData.subject} onChange={handleChange} placeholder="What is this about?" required />
                    <div>
                        <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">Message</label>
                        <textarea id="message" name="message" value={formData.message} onChange={handleChange} rows={5} className="w-full bg-gray-900 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500" placeholder="Your detailed message..." required></textarea>
                    </div>
                    <div className="pt-4 flex justify-end gap-4">
                        <button type="button" onClick={onClose} className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-500 transition">Cancel</button>
                        <button type="submit" className="px-6 py-2 font-semibold text-white bg-gradient-to-r from-purple-500 to-green-500 rounded-lg hover:scale-105 transform transition-transform duration-300">Send Message</button>
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

export default ContactFormModal;
