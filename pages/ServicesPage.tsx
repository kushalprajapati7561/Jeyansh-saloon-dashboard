
import React, { useState } from 'react';
import { SERVICES } from '../constants';

interface ServicesPageProps {
  onBookClick: () => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({ onBookClick }) => {
  const [activeTab, setActiveTab] = useState<string>('all');
  
  const categories = [
    { id: 'all', name: 'All Services' },
    { id: 'haircut', name: 'Haircuts' },
    { id: 'coloring', name: 'Color' },
    { id: 'styling', name: 'Styling' },
    { id: 'spa', name: 'Treatments' },
    { id: 'grooming', name: 'Barbering' },
  ];

  const filteredServices = activeTab === 'all' 
    ? SERVICES 
    : SERVICES.filter(s => s.category === activeTab);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-16 space-y-4">
        <h1 className="text-5xl md:text-6xl font-bold uppercase">The Menu</h1>
        <p className="text-stone-500 max-w-2xl mx-auto text-lg">
          Explore our wide range of professional hair care and grooming services tailored just for you.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap justify-center gap-4 mb-16">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveTab(cat.id)}
            className={`px-6 py-2 rounded-full text-sm font-semibold transition-all ${
              activeTab === cat.id 
              ? 'bg-stone-900 text-white shadow-lg scale-105' 
              : 'bg-stone-200 text-stone-600 hover:bg-stone-300'
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Services List */}
      <div className="grid grid-cols-1 gap-12">
        {filteredServices.map((service) => (
          <div key={service.id} className="flex flex-col md:flex-row items-center gap-8 bg-white p-6 rounded-3xl border border-stone-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-full md:w-1/3 aspect-video md:aspect-square rounded-2xl overflow-hidden">
              <img src={service.image} alt={service.name} className="w-full h-full object-cover" />
            </div>
            <div className="flex-grow space-y-4">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
                <div>
                  <h3 className="text-3xl font-bold text-stone-900">{service.name}</h3>
                  <p className="text-stone-500 mt-2 max-w-xl text-lg">{service.description}</p>
                </div>
                <div className="text-right flex flex-col items-end">
                  <span className="text-3xl font-bold text-stone-900">₹{service.price}</span>
                  <span className="text-stone-400 text-sm uppercase tracking-widest">{service.duration} mins</span>
                </div>
              </div>
              <div className="pt-4 flex items-center gap-4">
                <button 
                  onClick={onBookClick}
                  className="bg-stone-900 text-white px-8 py-3 rounded-xl font-bold hover:bg-stone-800 transition-colors"
                >
                  Book This Service
                </button>
                <div className="flex items-center gap-2 text-sm font-medium text-stone-500 uppercase tracking-widest px-4 py-2 bg-stone-50 rounded-lg">
                  Category: {service.category}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-24 p-12 bg-stone-900 rounded-[3rem] text-center text-white">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 serif">Not sure what's best for you?</h2>
        <p className="text-stone-400 mb-8 max-w-lg mx-auto">
          Our experts are available for a complimentary 15-minute consultation to help you choose the perfect treatment.
        </p>
        <button className="bg-white text-stone-900 px-8 py-4 rounded-full font-bold hover:bg-stone-200 transition-colors">
          Schedule Consultation
        </button>
      </div>
    </div>
  );
};
