
import React from 'react';
import { ArrowRight, Star, Clock, ShieldCheck } from 'lucide-react';
import { SERVICES } from '../constants';

interface HomeProps {
  onBookClick: () => void;
  onNavigateServices: () => void;
}

export const Home: React.FC<HomeProps> = ({ onBookClick, onNavigateServices }) => {
  return (
    <div className="space-y-24">
      {/* Hero Section */}
      <section className="relative h-[85vh] min-h-[600px] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&q=80&w=2000"
            alt="Salon Interior"
            className="w-full h-full object-cover brightness-[0.4]"
          />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
          <div className="max-w-2xl space-y-8 animate-in fade-in slide-in-from-left-8 duration-1000">
            <div className="inline-flex items-center space-x-2 px-4 py-1 rounded-full border border-stone-400/50 bg-stone-900/40 backdrop-blur-md">
              <Star size={16} className="text-yellow-400" />
              <span className="text-sm font-medium">India's Top Rated Salon</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-bold leading-tight">
              Elegance is an <span className="italic serif text-stone-300">Art.</span>
            </h1>
            <p className="text-xl text-stone-300 leading-relaxed">
              Step into a realm of luxury where every cut is a masterpiece and every service is tailored to your essence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button 
                onClick={onBookClick}
                className="bg-white text-stone-900 px-10 py-4 rounded-full font-bold text-lg hover:bg-stone-200 transition-all transform hover:scale-105 shadow-xl flex items-center justify-center"
              >
                Book Appointment <ArrowRight className="ml-2" size={20} />
              </button>
              <button 
                onClick={onNavigateServices}
                className="bg-transparent border-2 border-white/50 text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-white/10 transition-all backdrop-blur-sm"
              >
                Our Services
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold uppercase tracking-tight">Curated Services</h2>
          <div className="h-1 w-20 bg-stone-900 mx-auto"></div>
          <p className="text-stone-500 max-w-xl mx-auto">
            From classic tailoring to avant-garde coloring, our suite of services is designed for the discerning individual.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {SERVICES.slice(0, 3).map((service) => (
            <div key={service.id} className="group cursor-pointer">
              <div className="relative overflow-hidden rounded-2xl aspect-[4/5] mb-6">
                <img 
                  src={service.image} 
                  alt={service.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900/80 via-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-8">
                  <button 
                    onClick={onBookClick}
                    className="w-full bg-white text-stone-900 py-3 rounded-lg font-bold"
                  >
                    Quick Book
                  </button>
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-2 group-hover:text-stone-600 transition-colors">{service.name}</h3>
              <p className="text-stone-500 mb-4 line-clamp-2">{service.description}</p>
              <div className="flex justify-between items-center font-semibold text-lg">
                <span>From ₹{service.price}</span>
                <span className="text-sm text-stone-400">{service.duration} mins</span>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <button 
            onClick={onNavigateServices}
            className="inline-flex items-center space-x-2 text-stone-900 font-bold border-b-2 border-stone-900 pb-1 hover:text-stone-500 hover:border-stone-500 transition-all"
          >
            <span>View All Services</span>
            <ArrowRight size={18} />
          </button>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-stone-100 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1621605815844-8310170aa408?auto=format&fit=crop&q=80&w=800"
                alt="Stylist working"
                className="rounded-3xl shadow-2xl relative z-10"
              />
              <div className="absolute -bottom-6 -right-6 bg-white p-8 rounded-2xl shadow-xl z-20 max-w-[240px]">
                <p className="text-4xl font-bold text-stone-900 mb-1">15+</p>
                <p className="text-stone-500 font-medium">Years of Luxury Experience</p>
              </div>
            </div>
            
            <div className="space-y-8">
              <h2 className="text-4xl font-bold uppercase">The Jeyansh Experience</h2>
              <div className="space-y-6">
                {[
                  { icon: <Clock className="text-stone-900" />, title: "Precision Timing", desc: "Your time is precious. We guarantee punctual appointments and efficient mastery." },
                  { icon: <ShieldCheck className="text-stone-900" />, title: "Premium Products", desc: "Only the finest organic and scientifically advanced hair care products touch your skin." },
                  { icon: <Star className="text-stone-900" />, title: "Expert Stylists", desc: "Our team members are world-class professionals with a passion for perfection." },
                ].map((item, idx) => (
                  <div key={idx} className="flex space-x-4">
                    <div className="mt-1">{item.icon}</div>
                    <div>
                      <h4 className="font-bold text-xl mb-1">{item.title}</h4>
                      <p className="text-stone-600">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <button 
                onClick={onBookClick}
                className="bg-stone-900 text-white px-8 py-4 rounded-xl font-bold hover:bg-stone-800 transition-colors shadow-lg"
              >
                Experience It Now
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24 text-center">
        <h2 className="text-4xl font-bold uppercase mb-16">What Our Clients Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { name: "Sophia Miller", text: "The only place I trust with my balayage. The attention to detail is unmatched.", role: "Creative Director" },
            { name: "Marcus Thorne", text: "Best royal shave in the city. Truly a relaxing experience from start to finish.", role: "Attorney" },
            { name: "Isabella Rossi", text: "Elena is a magician! I left feeling like a completely new person.", role: "Model" },
          ].map((t, idx) => (
            <div key={idx} className="bg-white p-10 rounded-3xl shadow-sm border border-stone-100 relative">
              <div className="flex justify-center mb-6">
                {[...Array(5)].map((_, i) => <Star key={i} size={16} className="text-yellow-400 fill-current" />)}
              </div>
              <p className="italic text-stone-600 mb-8 text-lg">"{t.text}"</p>
              <div>
                <h5 className="font-bold text-stone-900">{t.name}</h5>
                <p className="text-stone-400 text-sm">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
