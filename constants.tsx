
import { Service, Stylist } from './types';

export const SERVICES: Service[] = [
  {
    id: 's1',
    name: 'Signature Haircut',
    description: 'A bespoke precision cut followed by a refreshing wash and scalp massage.',
    price: 45,
    duration: 45,
    category: 'haircut',
    image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 's2',
    name: 'Artistic Coloring',
    description: 'Full-spectrum coloring or balayage techniques using premium organic dyes.',
    price: 120,
    duration: 120,
    category: 'coloring',
    image: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 's3',
    name: 'Royal Shave',
    description: 'Traditional hot towel shave with straight razor and luxury post-shave balm.',
    price: 35,
    duration: 30,
    category: 'grooming',
    image: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 's4',
    name: 'Revitalizing Spa',
    description: 'Intense hair repair treatment with organic oils and steam therapy.',
    price: 65,
    duration: 60,
    category: 'spa',
    image: 'https://images.unsplash.com/photo-1544161515-4af6b1d462c2?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 's5',
    name: 'Bridal Styling',
    description: 'Expert wedding day styling including consultation and trial session.',
    price: 150,
    duration: 90,
    category: 'styling',
    image: 'https://images.unsplash.com/photo-1519415943484-9fa1873496d4?auto=format&fit=crop&q=80&w=800'
  }
];

export const STYLISTS: Stylist[] = [
  {
    id: 'st1',
    name: 'Alexander Sterling',
    role: 'Master Barber',
    specialty: ['Fades', 'Beard Sculpting'],
    image: 'https://images.unsplash.com/photo-1534030347209-467a5b0ad3e6?auto=format&fit=crop&q=80&w=400',
    availability: ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00']
  },
  {
    id: 'st2',
    name: 'Elena Vance',
    role: 'Creative Director',
    specialty: ['Balayage', 'Corrective Color'],
    image: 'https://images.unsplash.com/photo-1595959183082-7b570b7e08e2?auto=format&fit=crop&q=80&w=400',
    availability: ['10:00', '11:00', '12:00', '13:00', '15:00', '17:00']
  },
  {
    id: 'st3',
    name: 'Julian Rose',
    role: 'Senior Stylist',
    specialty: ['Precision Cutting', 'Event Styling'],
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400',
    availability: ['09:00', '12:00', '13:00', '14:00', '16:00', '18:00']
  }
];

export const SALON_ADDRESS = "123 Elegance Ave, Style District, New York, NY 10001";
export const SALON_PHONE = "+1 (555) LUM-IERE";
export const SALON_EMAIL = "hello@lumieresalon.com";
