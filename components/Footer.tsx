
import React from 'react';
import { Instagram, Facebook, Twitter, Mail, Phone, MapPin } from 'lucide-react';
import { SALON_ADDRESS, SALON_PHONE, SALON_EMAIL } from '../constants';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-stone-900 text-stone-400 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2">
            <h2 className="text-3xl font-bold text-white mb-6 serif uppercase tracking-widest">jeyansh</h2>
            <p className="max-w-sm mb-8">
              Experience the pinnacle of luxury grooming and hair artistry. Our master stylists blend tradition with modern techniques to reveal your unique brilliance.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="hover:text-white transition-colors"><Instagram size={24} /></a>
              <a href="#" className="hover:text-white transition-colors"><Facebook size={24} /></a>
              <a href="#" className="hover:text-white transition-colors"><Twitter size={24} /></a>
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-6 uppercase tracking-wider">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin size={18} className="mr-3 mt-1 flex-shrink-0" />
                <span>{SALON_ADDRESS}</span>
              </li>
              <li className="flex items-center">
                <Phone size={18} className="mr-3 flex-shrink-0" />
                <span>{SALON_PHONE}</span>
              </li>
              <li className="flex items-center">
                <Mail size={18} className="mr-3 flex-shrink-0" />
                <span>{SALON_EMAIL}</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-6 uppercase tracking-wider">Hours</h3>
            <ul className="space-y-2">
              <li className="flex justify-between">
                <span>Mon - Fri</span>
                <span className="text-stone-300">9am - 8pm</span>
              </li>
              <li className="flex justify-between">
                <span>Saturday</span>
                <span className="text-stone-300">10am - 6pm</span>
              </li>
              <li className="flex justify-between">
                <span>Sunday</span>
                <span className="text-stone-300">Closed</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-stone-800 mt-16 pt-8 text-center text-sm">
          <p>© {new Date().getFullYear()} jeyansh Salon & Spa. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
