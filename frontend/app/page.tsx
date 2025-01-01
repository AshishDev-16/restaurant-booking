'use client';

import BookingForm from '../components/BookingForm';
import { CalendarDays, ClipboardList } from 'lucide-react';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-12">
        <header className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Restaurant Table Booking
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Reserve your table for a delightful dining experience. Quick, easy, and convenient booking process.
          </p>
          <a 
            href="/bookings" 
            className="inline-flex items-center gap-2 bg-white px-6 py-3 rounded-full shadow-md hover:shadow-lg transition-all text-gray-700 hover:text-gray-900"
          >
            <ClipboardList className="w-5 h-5" />
            <span>View All Bookings</span>
          </a>
        </header>
        
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="p-8 bg-blue-500 text-white">
            <div className="flex items-center gap-3 mb-2">
              <CalendarDays className="w-6 h-6" />
              <h2 className="text-2xl font-semibold">Make a Reservation</h2>
            </div>
            <p className="text-blue-100">Fill in the form below to book your table</p>
          </div>
          <div className="p-8">
            <BookingForm />
          </div>
        </div>
      </div>
    </main>
  );
}