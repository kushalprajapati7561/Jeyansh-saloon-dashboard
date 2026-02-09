
import { Booking, BookingStatus } from '../types';

const STORAGE_KEY = 'lumiere_bookings';
const OTP_KEY = 'lumiere_otps';
const ADMIN_KEY = 'lumiere_admin_session';

// Helper to simulate network latency
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const api = {
  // --- BOOKINGS ---
  async getBookings(): Promise<Booking[]> {
    await delay(600);
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  },

  async createBooking(booking: Omit<Booking, 'id' | 'createdAt' | 'status'>): Promise<Booking> {
    await delay(1200);
    const bookings = await this.getBookings();
    const newBooking: Booking = {
      ...booking,
      id: `Jeyansh-${Math.floor(100000 + Math.random() * 900000)}`,
      createdAt: new Date().toISOString(),
      status: BookingStatus.PENDING,
    };
    const updated = [newBooking, ...bookings];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    
    // Simulate Salon Email Notification
    console.log(`[SALON NOTIFICATION] New Booking ${newBooking.id} received. Admin approval required.`);
    return newBooking;
  },

  async updateBookingStatus(id: string, status: BookingStatus): Promise<void> {
    await delay(1000);
    const bookings = await this.getBookings();
    const booking = bookings.find(b => b.id === id);
    if (!booking) return;

    const updated = bookings.map(b => b.id === id ? { ...b, status } : b);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    
    // Double-Side Notification Simulation
    console.log(`[CUSTOMER SMS/EMAIL] To: ${booking.customerPhone} | Status: Your Lumière appointment ${id} has been ${status}.`);
    console.log(`[SALON SYSTEM] Booking ${id} status persisted as ${status}.`);
  },

  // --- OTP SYSTEM (6-DIGIT) ---
  async generateOTP(phone: string): Promise<string> {
    await delay(1500);
    // Generate true 6-digit code
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const expiry = Date.now() + 5 * 60 * 1000; // 5 mins
    
    const otps = JSON.parse(localStorage.getItem(OTP_KEY) || '{}');
    otps[phone] = { code, expiry };
    localStorage.setItem(OTP_KEY, JSON.stringify(otps));
    
    console.log(`[SMS GATEWAY] Target: ${phone} | Content: Your code is ${code}. Exp: 5m.`);
    return code;
  },

  async verifyOTP(phone: string, code: string): Promise<boolean> {
    await delay(1000);
    const otps = JSON.parse(localStorage.getItem(OTP_KEY) || '{}');
    const record = otps[phone];
    
    if (!record) return false;
    if (Date.now() > record.expiry) {
      delete otps[phone];
      localStorage.setItem(OTP_KEY, JSON.stringify(otps));
      return false;
    }
    
    const isValid = record.code === code;
    if (isValid) {
      delete otps[phone]; // OTP is single-use
      localStorage.setItem(OTP_KEY, JSON.stringify(otps));
    }
    return isValid;
  },

  // --- ADMIN AUTH ---
  async login(email: string, pass: string): Promise<boolean> {
    await delay(1200);
    if (email === 'Jeyansh@gmail.com' && pass === 'Jeyansh123') {
      localStorage.setItem(ADMIN_KEY, 'true');
      return true;
    }
    return false;
  },

  checkAdminAuth(): boolean {
    return localStorage.getItem(ADMIN_KEY) === 'true';
  },

  logout(): void {
    localStorage.removeItem(ADMIN_KEY);
  }
};
