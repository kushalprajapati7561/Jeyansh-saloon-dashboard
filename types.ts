
export enum BookingStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  CANCELLED = 'CANCELLED',
  COMPLETED = 'COMPLETED'
}

export interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: number; // in minutes
  category: 'haircut' | 'styling' | 'coloring' | 'spa' | 'grooming';
  image: string;
}

export interface Stylist {
  id: string;
  name: string;
  role: string;
  specialty: string[];
  image: string;
  availability: string[]; // e.g., ["09:00", "10:00", ...]
}

export interface Booking {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  serviceId: string;
  stylistId?: string;
  date: string;
  time: string;
  status: BookingStatus;
  createdAt: string;
}

export interface ContactMessage {
  name: string;
  email: string;
  message: string;
}
