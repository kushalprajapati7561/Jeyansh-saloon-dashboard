
import React, { useState } from 'react';
import { Menu, X, Scissors } from 'lucide-react';

interface NavbarProps {
  onNavigate: (page: string) => void;
  onBookClick: () => void;
  activePage: string;
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigate, onBookClick, activePage }) => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Home', id: 'home' },
    { name: 'Services', id: 'services' },
    { name: 'Contact', id: 'contact' },
    { name: 'Admin', id: 'admin' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md z-50 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div 
            className="flex items-center cursor-pointer group"
            onClick={() => onNavigate('home')}
          >
            <div className="bg-stone-900 text-white p-2 rounded-lg mr-3 group-hover:rotate-12 transition-transform">
              <Scissors size={24} />
            </div>
            <span className="text-2xl font-bold tracking-tight serif uppercase">jeyansh</span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => onNavigate(link.id)}
                className={`text-sm font-medium tracking-wide uppercase transition-colors ${
                  activePage === link.id ? 'text-stone-900 font-bold' : 'text-stone-500 hover:text-stone-900'
                }`}
              >
                {link.name}
              </button>
            ))}
            <button
              onClick={onBookClick}
              className="bg-stone-900 text-white px-6 py-2 rounded-full text-sm font-semibold hover:bg-stone-800 transition-colors shadow-lg"
            >
              Book Now
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-stone-600 hover:text-stone-900"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-stone-100 animate-in slide-in-from-top duration-300">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => {
                  onNavigate(link.id);
                  setIsOpen(false);
                }}
                className={`block w-full text-left px-3 py-4 text-base font-medium rounded-md ${
                  activePage === link.id ? 'bg-stone-100 text-stone-900' : 'text-stone-500 hover:bg-stone-50'
                }`}
              >
                {link.name}
              </button>
            ))}
            <button
              onClick={() => {
                onBookClick();
                setIsOpen(false);
              }}
              className="w-full text-center bg-stone-900 text-white px-3 py-4 mt-4 font-semibold"
            >
              Book Now
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};
