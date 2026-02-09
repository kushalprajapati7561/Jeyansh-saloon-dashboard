
import React, { useState } from 'react';
import { MapPin, Phone, Mail, Send, CheckCircle } from 'lucide-react';
import { SALON_ADDRESS, SALON_PHONE, SALON_EMAIL } from '../constants';

export const Contact: React.FC = () => {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div>
          <h1 className="text-5xl font-bold mb-8 uppercase">Reach Out</h1>
          <p className="text-stone-500 text-xl mb-12 leading-relaxed">
            Whether you have a question about our services or want to partner with us, we'd love to hear from you.
          </p>

          <div className="space-y-8 mb-12">
            {[
              { icon: <MapPin />, title: "Visit Us", content: SALON_ADDRESS },
              { icon: <Phone />, title: "Call Us", content: SALON_PHONE },
              { icon: <Mail />, title: "Email Us", content: SALON_EMAIL },
            ].map((item, idx) => (
              <div key={idx} className="flex items-start gap-6 p-6 rounded-2xl bg-white border border-stone-100 shadow-sm">
                <div className="p-3 bg-stone-900 text-white rounded-xl">{item.icon}</div>
                <div>
                  <h4 className="font-bold text-lg">{item.title}</h4>
                  <p className="text-stone-500">{item.content}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="h-80 rounded-3xl overflow-hidden bg-stone-200 relative group">
             {/* Mock Map Representation */}
             <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&q=80&w=1200')] bg-cover opacity-60"></div>
             <div className="absolute inset-0 flex items-center justify-center">
               <div className="bg-white p-4 rounded-xl shadow-2xl flex items-center gap-3">
                 <div className="bg-stone-900 text-white p-2 rounded-lg"><MapPin size={20} /></div>
                 <div>
                   <p className="font-bold">Lumière Salon</p>
                   <p className="text-xs text-stone-500">123 Elegance Ave</p>
                 </div>
               </div>
             </div>
          </div>
        </div>

        <div className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-xl border border-stone-100">
          {submitted ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-6">
              <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center animate-bounce">
                <CheckCircle size={40} />
              </div>
              <h3 className="text-3xl font-bold uppercase">Message Received!</h3>
              <p className="text-stone-500">
                Thank you for reaching out. A concierge will respond to your inquiry within 24 hours.
              </p>
              <button 
                onClick={() => setSubmitted(false)}
                className="text-stone-900 font-bold border-b-2 border-stone-900"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <h3 className="text-3xl font-bold mb-8 serif">Drop us a line</h3>
              <div>
                <label className="block text-sm font-semibold text-stone-700 mb-2">Full Name</label>
                <input 
                  type="text" 
                  required
                  className="w-full px-5 py-4 rounded-xl bg-stone-50 border border-stone-200 focus:outline-none focus:ring-2 focus:ring-stone-900 transition-all"
                  placeholder="Alexander Sterling"
                  value={formState.name}
                  onChange={(e) => setFormState({...formState, name: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-stone-700 mb-2">Email Address</label>
                <input 
                  type="email" 
                  required
                  className="w-full px-5 py-4 rounded-xl bg-stone-50 border border-stone-200 focus:outline-none focus:ring-2 focus:ring-stone-900 transition-all"
                  placeholder="alex@sterling.com"
                  value={formState.email}
                  onChange={(e) => setFormState({...formState, email: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-stone-700 mb-2">Message</label>
                <textarea 
                  required
                  rows={5}
                  className="w-full px-5 py-4 rounded-xl bg-stone-50 border border-stone-200 focus:outline-none focus:ring-2 focus:ring-stone-900 transition-all resize-none"
                  placeholder="How can we help you today?"
                  value={formState.message}
                  onChange={(e) => setFormState({...formState, message: e.target.value})}
                ></textarea>
              </div>
              <button 
                type="submit"
                className="w-full bg-stone-900 text-white py-5 rounded-2xl font-bold text-lg hover:bg-stone-800 transition-all flex items-center justify-center gap-3 shadow-lg"
              >
                Send Message <Send size={20} />
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
