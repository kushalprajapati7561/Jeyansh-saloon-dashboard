
import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { ServicesPage } from './pages/ServicesPage';
import { Contact } from './pages/Contact';
import { AdminPanel } from './pages/AdminPanel';
import { AdminLogin } from './pages/AdminLogin';
import { BookingModal } from './components/BookingModal';
import { Booking, BookingStatus } from './types';
import { api } from './services/api';

export default function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'services' | 'contact' | 'admin'>('home');
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Initial data load and auth check
    const init = async () => {
      setIsAdminAuthenticated(api.checkAdminAuth());
      const fetchedBookings = await api.getBookings();
      setBookings(fetchedBookings);
      setIsLoading(false);
    };
    init();
  }, []);

  const handleAddBooking = async (newBooking: Booking) => {
    setBookings(prev => [newBooking, ...prev]);
  };

  const handleUpdateBookingStatus = async (id: string, status: BookingStatus) => {
    await api.updateBookingStatus(id, status);
    setBookings(prev => prev.map(b => b.id === id ? { ...b, status } : b));
  };

  const handleAdminLogout = () => {
    api.logout();
    setIsAdminAuthenticated(false);
    setCurrentPage('home');
  };

  const renderPage = () => {
    if (isLoading) return <div className="min-h-[60vh] flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-stone-900"></div></div>;

    switch (currentPage) {
      case 'home':
        return <Home onBookClick={() => setIsBookingOpen(true)} onNavigateServices={() => setCurrentPage('services')} />;
      case 'services':
        return <ServicesPage onBookClick={() => setIsBookingOpen(true)} />;
      case 'contact':
        return <Contact />;
      case 'admin':
        return isAdminAuthenticated ? (
          <AdminPanel 
            bookings={bookings} 
            onUpdateStatus={handleUpdateBookingStatus} 
            onLogout={handleAdminLogout} 
          />
        ) : (
          <AdminLogin onLoginSuccess={() => {
            setIsAdminAuthenticated(true);
            setCurrentPage('admin');
          }} />
        );
      default:
        return <Home onBookClick={() => setIsBookingOpen(true)} onNavigateServices={() => setCurrentPage('services')} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-stone-50">
      <Navbar 
        onNavigate={(page) => setCurrentPage(page as any)} 
        activePage={currentPage}
        onBookClick={() => setIsBookingOpen(true)} 
      />
      
      <main className="flex-grow pt-20">
        {renderPage()}
      </main>

      <Footer />

      {isBookingOpen && (
        <BookingModal 
          onClose={() => setIsBookingOpen(false)} 
          onSuccess={handleAddBooking}
        />
      )}
    </div>
  );
}
