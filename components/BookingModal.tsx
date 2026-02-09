
import React, { useState, useEffect } from 'react';
import { X, Calendar, User, Clock, Check, ShieldCheck, ChevronRight, ChevronLeft, Loader2, Scissors, Smartphone, AlertCircle } from 'lucide-react';
import { SERVICES, STYLISTS } from '../constants';
import { Booking } from '../types';
import { api } from '../services/api';

interface BookingModalProps {
  onClose: () => void;
  onSuccess: (booking: Booking) => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({ onClose, onSuccess }) => {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingData, setBookingData] = useState({
    serviceId: '',
    stylistId: '',
    date: '',
    time: '',
    customerName: '',
    customerEmail: '',
    customerPhone: '',
  });

  const [otp, setOtp] = useState('');
  const [timer, setTimer] = useState(300); // 5 minutes in seconds
  const [isVerifying, setIsVerifying] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState<Booking | null>(null);
  const [simulatedCode, setSimulatedCode] = useState<string | null>(null);

  // Timer logic for OTP
  useEffect(() => {
    let interval: number;
    if (isVerifying && timer > 0) {
      interval = window.setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isVerifying, timer]);

  const handleNext = () => setStep(prev => prev + 1);
  const handlePrev = () => setStep(prev => prev - 1);

  const selectedService = SERVICES.find(s => s.id === bookingData.serviceId);
  const selectedStylist = STYLISTS.find(s => s.id === bookingData.stylistId);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const startVerification = async () => {
    setIsSubmitting(true);
    const code = await api.generateOTP(bookingData.customerPhone);
    setSimulatedCode(code);
    setIsSubmitting(false);
    setIsVerifying(true);
    setTimer(300);
  };

  const confirmBooking = async () => {
    if (timer <= 0) {
      alert("OTP has expired. Please request a new one.");
      return;
    }

    setIsSubmitting(true);
    const isValid = await api.verifyOTP(bookingData.customerPhone, otp);
    
    if (!isValid) {
      alert("Invalid OTP code. Please try again.");
      setIsSubmitting(false);
      return;
    }

    const result = await api.createBooking({
      customerName: bookingData.customerName,
      customerEmail: bookingData.customerEmail,
      customerPhone: bookingData.customerPhone,
      serviceId: bookingData.serviceId,
      stylistId: bookingData.stylistId,
      date: bookingData.date,
      time: bookingData.time,
    });
    
    setConfirmedBooking(result);
    setIsConfirmed(true);
    onSuccess(result);
    setIsSubmitting(false);
  };

  const renderStep = () => {
    if (isSubmitting && !isVerifying) {
      return (
        <div className="flex flex-col items-center justify-center h-full space-y-6">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-stone-100 border-t-stone-900 rounded-full animate-spin"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <Smartphone size={24} className="text-stone-900" />
            </div>
          </div>
          <p className="text-stone-500 font-bold uppercase tracking-[0.2em] text-xs">Connecting to SMS Gateway...</p>
        </div>
      );
    }

    switch(step) {
      case 1:
        return (
          <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
            <h2 className="text-2xl font-bold mb-4 uppercase tracking-tight">Select Luxury Service</h2>
            <div className="grid grid-cols-1 gap-4 max-h-[50vh] overflow-y-auto pr-2 custom-scrollbar">
              {SERVICES.map(service => (
                <button
                  key={service.id}
                  onClick={() => {
                    setBookingData({...bookingData, serviceId: service.id});
                    handleNext();
                  }}
                  className={`flex items-center justify-between p-5 rounded-2xl border-2 transition-all group ${
                    bookingData.serviceId === service.id ? 'border-stone-900 bg-stone-50' : 'border-stone-100 hover:border-stone-200'
                  }`}
                >
                  <div className="flex items-center gap-5">
                    <div className="relative w-16 h-16 rounded-xl overflow-hidden">
                      <img src={service.image} className="w-full h-full object-cover transition-transform group-hover:scale-110" />
                    </div>
                    <div className="text-left">
                      <p className="font-bold text-lg">{service.name}</p>
                      <p className="text-sm text-stone-500">₹{service.price} • {service.duration} mins</p>
                    </div>
                  </div>
                  <ChevronRight size={20} className="text-stone-300 group-hover:text-stone-900 transition-colors" />
                </button>
              ))}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
            <h2 className="text-2xl font-bold mb-4 uppercase tracking-tight">Expert Stylist</h2>
            <div className="grid grid-cols-1 gap-4">
              <button
                onClick={() => {
                  setBookingData({...bookingData, stylistId: ''});
                  handleNext();
                }}
                className={`flex items-center justify-between p-5 rounded-2xl border-2 transition-all ${
                  bookingData.stylistId === '' ? 'border-stone-900 bg-stone-50 shadow-sm' : 'border-stone-100 hover:border-stone-200'
                }`}
              >
                <div className="flex items-center gap-5">
                  <div className="w-14 h-14 rounded-full bg-stone-100 flex items-center justify-center text-stone-500">
                    <User size={28} />
                  </div>
                  <div className="text-left">
                    <p className="font-bold text-lg">Auto-Assign Stylist</p>
                    <p className="text-sm text-stone-500">Fastest available appointment</p>
                  </div>
                </div>
                <ChevronRight size={20} className="text-stone-300" />
              </button>
              {STYLISTS.map(stylist => (
                <button
                  key={stylist.id}
                  onClick={() => {
                    setBookingData({...bookingData, stylistId: stylist.id});
                    handleNext();
                  }}
                  className={`flex items-center justify-between p-5 rounded-2xl border-2 transition-all ${
                    bookingData.stylistId === stylist.id ? 'border-stone-900 bg-stone-50 shadow-sm' : 'border-stone-100 hover:border-stone-200'
                  }`}
                >
                  <div className="flex items-center gap-5">
                    <img src={stylist.image} className="w-14 h-14 rounded-full object-cover ring-2 ring-stone-100" />
                    <div className="text-left">
                      <p className="font-bold text-lg">{stylist.name}</p>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-stone-400">{stylist.role}</p>
                    </div>
                  </div>
                  <ChevronRight size={20} className="text-stone-300" />
                </button>
              ))}
            </div>
            <button onClick={handlePrev} className="flex items-center gap-2 text-stone-400 font-bold uppercase text-[10px] tracking-widest hover:text-stone-900 transition-colors"><ChevronLeft size={14}/> Go Back</button>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
            <h2 className="text-2xl font-bold mb-4 uppercase tracking-tight">Select Schedule</h2>
            <div className="space-y-6">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-stone-400 mb-3">Choose Date</label>
                <input 
                  type="date" 
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full px-5 py-4 rounded-xl border-2 border-stone-100 focus:border-stone-900 focus:outline-none bg-stone-50 font-medium"
                  value={bookingData.date}
                  onChange={(e) => setBookingData({...bookingData, date: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-stone-400 mb-3">Available Slots</label>
                <div className="grid grid-cols-4 gap-3">
                  {['09:00', '10:00', '11:00', '12:00', '14:00', '15:00', '16:00', '17:00'].map(t => (
                    <button
                      key={t}
                      onClick={() => setBookingData({...bookingData, time: t})}
                      className={`py-3 rounded-xl font-bold border-2 transition-all text-sm ${
                        bookingData.time === t ? 'border-stone-900 bg-stone-900 text-white shadow-lg' : 'border-stone-100 hover:border-stone-200 hover:bg-white'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex justify-between items-center pt-8">
              <button onClick={handlePrev} className="flex items-center gap-2 text-stone-400 font-bold uppercase text-[10px] tracking-widest hover:text-stone-900 transition-colors"><ChevronLeft size={14}/> Go Back</button>
              <button 
                disabled={!bookingData.date || !bookingData.time}
                onClick={handleNext}
                className="bg-stone-900 text-white px-10 py-4 rounded-xl font-bold shadow-xl hover:bg-stone-800 disabled:opacity-50 transition-all hover:-translate-y-1"
              >
                Continue
              </button>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
            <h2 className="text-2xl font-bold mb-4 uppercase tracking-tight">Personal Details</h2>
            <div className="space-y-4">
              <input 
                type="text" 
                className="w-full px-5 py-4 rounded-xl border-2 border-stone-100 focus:border-stone-900 focus:outline-none bg-stone-50"
                placeholder="Full Name"
                value={bookingData.customerName}
                onChange={(e) => setBookingData({...bookingData, customerName: e.target.value})}
              />
              <input 
                type="email" 
                className="w-full px-5 py-4 rounded-xl border-2 border-stone-100 focus:border-stone-900 focus:outline-none bg-stone-50"
                placeholder="Email Address"
                value={bookingData.customerEmail}
                onChange={(e) => setBookingData({...bookingData, customerEmail: e.target.value})}
              />
              <div className="relative">
                <input 
                  type="tel" 
                  className="w-full px-5 py-4 rounded-xl border-2 border-stone-100 focus:border-stone-900 focus:outline-none bg-stone-50"
                  placeholder="Mobile Number (SMS verification)"
                  value={bookingData.customerPhone}
                  onChange={(e) => setBookingData({...bookingData, customerPhone: e.target.value})}
                />
                <Smartphone className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-300" size={20} />
              </div>
              <div className="bg-stone-50 p-4 rounded-xl flex gap-3 items-start border border-stone-100">
                <AlertCircle className="text-stone-400 shrink-0 mt-0.5" size={16} />
                <p className="text-[10px] text-stone-500 leading-relaxed font-medium">
                  By clicking "Verify & Book", we will send a 6-digit verification code to your mobile number. Standard messaging rates may apply.
                </p>
              </div>
            </div>
            <div className="flex justify-between items-center pt-6">
              <button onClick={handlePrev} className="flex items-center gap-2 text-stone-400 font-bold uppercase text-[10px] tracking-widest hover:text-stone-900 transition-colors"><ChevronLeft size={14}/> Go Back</button>
              <button 
                disabled={!bookingData.customerName || !bookingData.customerEmail || !bookingData.customerPhone}
                onClick={startVerification}
                className="bg-stone-900 text-white px-10 py-4 rounded-xl font-bold shadow-xl hover:bg-stone-800 transition-all hover:-translate-y-1"
              >
                Verify & Book
              </button>
            </div>
          </div>
        );

      default: return null;
    }
  };

  if (isConfirmed) {
    return (
      <div className="fixed inset-0 bg-stone-900/70 backdrop-blur-md z-[60] flex items-center justify-center p-4">
        <div className="bg-white rounded-[3rem] w-full max-w-lg p-12 text-center space-y-10 animate-in zoom-in-95 duration-500 relative shadow-[0_0_100px_rgba(0,0,0,0.4)]">
          <div className="absolute top-0 left-0 w-full h-3 bg-gradient-to-r from-stone-900 via-stone-400 to-stone-900"></div>
          
          <div className="w-24 h-24 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto shadow-sm border border-green-100 animate-bounce">
            <Check size={48} strokeWidth={3} />
          </div>
          
          <div className="space-y-4">
            <h2 className="text-4xl font-bold uppercase tracking-tight text-stone-900">Appointment Requested</h2>
            <div className="inline-block bg-stone-100 px-4 py-1.5 rounded-full font-mono text-sm font-bold tracking-widest text-stone-500">
              Ref ID: {confirmedBooking?.id}
            </div>
            <p className="text-stone-500 text-lg leading-relaxed">
              We've sent a <strong>booking confirmation email</strong> to your inbox. Please keep it handy for your visit.
            </p>
          </div>

          <div className="bg-stone-50 p-8 rounded-[2rem] border-2 border-dashed border-stone-200 space-y-5 text-left relative overflow-hidden group">
             <div className="absolute -left-4 top-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full"></div>
             <div className="absolute -right-4 top-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full"></div>
             
             <div className="flex items-center justify-between mb-4 border-b border-stone-200 pb-4">
               <div className="flex items-center gap-3">
                 <div className="bg-stone-900 text-white p-2 rounded-lg"><Scissors size={18} /></div>
                 <span className="font-bold text-stone-900 uppercase tracking-[0.2em] text-[10px]">jeyansh Luxury Salon</span>
               </div>
               <span className="text-[10px] font-bold text-orange-600 uppercase tracking-widest animate-pulse">Pending Approval</span>
             </div>

             <div className="grid grid-cols-2 gap-y-5 gap-x-8">
               <div className="space-y-1">
                 <p className="text-[9px] font-bold uppercase text-stone-400 tracking-widest">Client</p>
                 <p className="font-bold text-stone-900 leading-tight">{confirmedBooking?.customerName}</p>
               </div>
               <div className="space-y-1 text-right">
                 <p className="text-[9px] font-bold uppercase text-stone-400 tracking-widest">Service</p>
                 <p className="font-bold text-stone-900 leading-tight">{selectedService?.name}</p>
               </div>
               <div className="space-y-1">
                 <p className="text-[9px] font-bold uppercase text-stone-400 tracking-widest">Date</p>
                 <p className="font-bold text-stone-900 leading-tight">{bookingData.date}</p>
               </div>
               <div className="space-y-1 text-right">
                 <p className="text-[9px] font-bold uppercase text-stone-400 tracking-widest">Arrival</p>
                 <p className="font-bold text-stone-900 leading-tight">{bookingData.time}</p>
               </div>
             </div>
          </div>
          
          <button 
            onClick={onClose}
            className="w-full bg-stone-900 text-white py-5 rounded-2xl font-bold text-lg hover:bg-stone-800 transition-all shadow-xl hover:shadow-stone-200"
          >
            I'll Be There
          </button>
        </div>
      </div>
    );
  }

  if (isVerifying) {
    return (
      <div className="fixed inset-0 bg-stone-900/60 backdrop-blur-sm z-[60] flex items-center justify-center p-4">
        <div className="bg-white rounded-[3rem] w-full max-w-md p-10 animate-in zoom-in-95 duration-300 relative shadow-2xl overflow-hidden">
          {simulatedCode && (
            <div className="absolute top-0 left-0 w-full bg-stone-100 p-3 flex items-center justify-between border-b border-stone-200 animate-in slide-in-from-top duration-500">
               <div className="flex items-center gap-2">
                 <Smartphone size={14} className="text-stone-400" />
                 <span className="text-[10px] font-bold text-stone-500 uppercase tracking-widest">Simulated SMS: Code is <span className="text-stone-900 select-all">{simulatedCode}</span></span>
               </div>
               <span className="text-[9px] text-stone-400 font-mono">Just now</span>
            </div>
          )}
          
          <button onClick={() => setIsVerifying(false)} className="absolute top-12 right-6 text-stone-300 hover:text-stone-900"><X size={24}/></button>
          
          <div className="text-center space-y-8 pt-6">
            <div className="w-20 h-20 bg-stone-50 rounded-full flex items-center justify-center mx-auto text-stone-900 shadow-inner border border-stone-100">
              <ShieldCheck size={40} className="text-stone-900" />
            </div>
            
            <div className="space-y-2">
              <h2 className="text-3xl font-bold uppercase tracking-tight">Verify Device</h2>
              <p className="text-stone-500 text-sm">We've sent a 6-digit code to <br/><span className="text-stone-900 font-bold">{bookingData.customerPhone}</span></p>
            </div>
            
            <div className="space-y-4">
              <input 
                type="text" 
                maxLength={6}
                placeholder="000 000"
                className="w-full text-center text-4xl font-bold tracking-[0.5rem] py-6 rounded-2xl border-2 border-stone-100 focus:border-stone-900 focus:outline-none bg-stone-50 shadow-inner transition-all focus:bg-white"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                autoFocus
              />
              <div className="flex justify-between items-center px-2">
                <span className={`text-[10px] font-bold uppercase tracking-widest ${timer < 60 ? 'text-red-500 animate-pulse' : 'text-stone-400'}`}>
                   Expires in {formatTime(timer)}
                </span>
                <button 
                  onClick={startVerification}
                  className="text-[10px] font-bold uppercase tracking-widest text-stone-900 border-b-2 border-stone-900 hover:text-stone-500 hover:border-stone-500 transition-all"
                >
                  Resend Code
                </button>
              </div>
            </div>

            <button 
              onClick={confirmBooking}
              disabled={isSubmitting || otp.length < 6 || timer <= 0}
              className="w-full bg-stone-900 text-white py-5 rounded-2xl font-bold text-lg hover:bg-stone-800 transition-all shadow-xl disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isSubmitting ? <Loader2 className="animate-spin" /> : 'Confirm Booking'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-stone-900/70 backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-[3rem] w-full max-w-5xl min-h-[600px] flex flex-col md:flex-row overflow-hidden animate-in zoom-in-95 duration-500 shadow-[0_30px_100px_rgba(0,0,0,0.5)]">
        {/* Progress Sidebar */}
        <div className="w-full md:w-80 bg-stone-900 text-white p-12 flex flex-col justify-between border-r border-stone-800">
          <div className="space-y-16">
            <div className="space-y-4">
              <h3 className="text-stone-500 font-bold uppercase text-[10px] tracking-[0.4em] mb-2">Step {step} of 4</h3>
              <h2 className="text-4xl font-bold serif leading-tight">Your <br/>Perfect <br/>Style.</h2>
            </div>
            
            <div className="space-y-10">
              {[1,2,3,4].map(s => (
                <div key={s} className={`flex items-center gap-5 transition-all duration-500 ${step >= s ? 'opacity-100' : 'opacity-20'}`}>
                  <div className={`w-8 h-8 rounded-xl border border-stone-700 flex items-center justify-center text-[10px] font-bold transition-all ${step === s ? 'bg-white text-stone-900 scale-125 shadow-lg' : ''}`}>
                    {s}
                  </div>
                  <span className={`font-bold uppercase tracking-[0.2em] text-[10px] ${step === s ? 'text-white' : 'text-stone-500'}`}>
                    {s === 1 ? 'Service' : s === 2 ? 'Stylist' : s === 3 ? 'Schedule' : 'Details'}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-10 border-t border-stone-800 space-y-5">
            <p className="text-[10px] font-bold uppercase tracking-widest text-stone-600">Quick Summary</p>
            <div className="flex items-center gap-4 text-stone-400">
              <Calendar size={16} />
              <span className="text-xs font-medium tracking-wide">{bookingData.date || '---'}</span>
            </div>
            <div className="flex items-center gap-4 text-stone-400">
              <Clock size={16} />
              <span className="text-xs font-medium tracking-wide">{bookingData.time || '---'}</span>
            </div>
          </div>
        </div>

        {/* Form Content */}
        <div className="flex-grow p-12 md:p-16 relative bg-white">
          <button onClick={onClose} className="absolute top-10 right-10 text-stone-200 hover:text-stone-900 transition-all hover:rotate-90"><X size={32} /></button>
          {renderStep()}
        </div>
      </div>
    </div>
  );
};
