
import React, { useState } from 'react';
import { Calendar, CheckCircle, XCircle, Clock, User, LogOut, Filter, Download, Search, RefreshCcw, MoreHorizontal } from 'lucide-react';
import { Booking, BookingStatus } from '../types';
import { SERVICES, STYLISTS } from '../constants';

interface AdminPanelProps {
  bookings: Booking[];
  onUpdateStatus: (id: string, status: BookingStatus) => void;
  onLogout: () => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({ bookings, onUpdateStatus, onLogout }) => {
  const [filter, setFilter] = useState<string>('ALL');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredBookings = bookings
    .filter(b => filter === 'ALL' || b.status === filter)
    .filter(b => 
      b.customerName.toLowerCase().includes(searchTerm.toLowerCase()) || 
      b.id.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const getStatusColor = (status: BookingStatus) => {
    switch(status) {
      case BookingStatus.CONFIRMED: return 'bg-green-50 text-green-700 border-green-100';
      case BookingStatus.PENDING: return 'bg-orange-50 text-orange-700 border-orange-100';
      case BookingStatus.CANCELLED: return 'bg-red-50 text-red-700 border-red-100';
      case BookingStatus.COMPLETED: return 'bg-stone-50 text-stone-700 border-stone-200';
      default: return 'bg-stone-50 text-stone-700 border-stone-100';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-6 mb-12">
        <div>
          <h1 className="text-5xl font-bold uppercase tracking-tight mb-2">Saloon Manager</h1>
          <p className="text-stone-500 font-medium">Jeyansh Luxury Dashboard</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="hidden md:flex flex-col items-end mr-4">
            <span className="font-bold text-sm">System Admin</span>
            <span className="text-xs text-green-500 font-bold uppercase tracking-widest">Live Connection</span>
          </div>
          <button 
            onClick={onLogout}
            className="flex items-center gap-2 bg-stone-900 text-white px-6 py-3 rounded-xl font-bold shadow-lg hover:bg-stone-800 transition-all"
          >
            <LogOut size={18} /> Logout
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {[
          { label: "Pending Approval", val: bookings.filter(b => b.status === BookingStatus.PENDING).length, icon: <Clock size={20}/>, color: "bg-orange-50 text-orange-600" },
          { label: "Today's Target", val: "$1,240", icon: <CheckCircle size={20}/>, color: "bg-green-50 text-green-600" },
          { label: "New Clients", val: "24", icon: <User size={20}/>, color: "bg-stone-900 text-white" },
          { label: "System Uptime", val: "99.9%", icon: <RefreshCcw size={20}/>, color: "bg-stone-100 text-stone-500" },
        ].map((stat, idx) => (
          <div key={idx} className="bg-white p-6 rounded-3xl border border-stone-100 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <div className={`p-3 rounded-xl ${stat.color}`}>{stat.icon}</div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-stone-300">Live Data</span>
            </div>
            <p className="text-stone-400 font-bold uppercase text-[10px] tracking-widest mb-1">{stat.label}</p>
            <p className="text-3xl font-bold text-stone-900">{stat.val}</p>
          </div>
        ))}
      </div>

      {/* Controls */}
      <div className="bg-white rounded-[2.5rem] shadow-xl border border-stone-100 overflow-hidden">
        <div className="p-8 border-b border-stone-100 flex flex-col lg:flex-row justify-between items-center gap-6">
          <div className="relative w-full lg:max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-300" size={18} />
            <input 
              type="text"
              placeholder="Search by ID or Client Name..."
              className="w-full pl-12 pr-4 py-3 rounded-xl bg-stone-50 border border-stone-100 focus:outline-none focus:ring-2 focus:ring-stone-900 transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex flex-wrap items-center gap-3">
            {['ALL', 'PENDING', 'CONFIRMED', 'CANCELLED'].map((s) => (
              <button
                key={s}
                onClick={() => setFilter(s)}
                className={`px-5 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all ${
                  filter === s ? 'bg-stone-900 text-white shadow-md' : 'bg-stone-50 text-stone-500 hover:bg-stone-100 border border-stone-100'
                }`}
              >
                {s}
              </button>
            ))}
            <div className="h-8 w-[1px] bg-stone-100 mx-2 hidden sm:block"></div>
            <button className="p-3 bg-stone-50 rounded-xl hover:bg-stone-100 border border-stone-100 transition-colors">
              <Download size={18} className="text-stone-500" />
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-stone-50/50">
                <th className="px-8 py-5 text-[10px] font-bold uppercase text-stone-400 tracking-[0.2em]">Booking ID</th>
                <th className="px-8 py-5 text-[10px] font-bold uppercase text-stone-400 tracking-[0.2em]">Client Information</th>
                <th className="px-8 py-5 text-[10px] font-bold uppercase text-stone-400 tracking-[0.2em]">Service Details</th>
                <th className="px-8 py-5 text-[10px] font-bold uppercase text-stone-400 tracking-[0.2em]">Schedule</th>
                <th className="px-8 py-5 text-[10px] font-bold uppercase text-stone-400 tracking-[0.2em]">Status</th>
                <th className="px-8 py-5 text-[10px] font-bold uppercase text-stone-400 tracking-[0.2em] text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-50">
              {filteredBookings.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-8 py-20 text-center">
                    <div className="flex flex-col items-center space-y-4 opacity-30">
                      <Search size={48} />
                      <p className="font-bold uppercase tracking-widest text-sm">No records found</p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredBookings.map((booking) => {
                  const service = SERVICES.find(s => s.id === booking.serviceId);
                  const stylist = STYLISTS.find(s => s.id === booking.stylistId);
                  return (
                    <tr key={booking.id} className="hover:bg-stone-50/30 transition-all group">
                      <td className="px-8 py-6">
                        <span className="font-mono text-xs font-bold text-stone-400">{booking.id}</span>
                      </td>
                      <td className="px-8 py-6">
                        <div className="flex flex-col">
                          <span className="font-bold text-stone-900">{booking.customerName}</span>
                          <span className="text-xs text-stone-500">{booking.customerEmail}</span>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg overflow-hidden border border-stone-200">
                             <img src={service?.image} className="w-full h-full object-cover" />
                          </div>
                          <div className="flex flex-col">
                            <span className="font-semibold text-stone-800 text-sm">{service?.name}</span>
                            <span className="text-[10px] text-stone-400 font-bold uppercase tracking-widest">{stylist?.name || 'Any Stylist'}</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <div className="flex flex-col">
                          <span className="text-stone-900 font-bold text-sm">{booking.date}</span>
                          <div className="flex items-center gap-1 text-stone-400 text-xs">
                             <Clock size={12} /> {booking.time}
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <span className={`px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-[0.1em] border ${getStatusColor(booking.status)}`}>
                          {booking.status}
                        </span>
                      </td>
                      <td className="px-8 py-6 text-right">
                        <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          {booking.status === BookingStatus.PENDING && (
                            <>
                              <button 
                                onClick={() => onUpdateStatus(booking.id, BookingStatus.CONFIRMED)}
                                className="p-2.5 bg-green-50 text-green-600 rounded-xl hover:bg-green-600 hover:text-white transition-all shadow-sm border border-green-100"
                                title="Approve Booking"
                              >
                                <CheckCircle size={18} />
                              </button>
                              <button 
                                onClick={() => onUpdateStatus(booking.id, BookingStatus.CANCELLED)}
                                className="p-2.5 bg-red-50 text-red-600 rounded-xl hover:bg-red-600 hover:text-white transition-all shadow-sm border border-red-100"
                                title="Reject Booking"
                              >
                                <XCircle size={18} />
                              </button>
                            </>
                          )}
                          <button 
                            className="p-2.5 bg-stone-100 text-stone-400 rounded-xl hover:bg-stone-900 hover:text-white transition-all shadow-sm"
                            title="More Options"
                          >
                            <MoreHorizontal size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
