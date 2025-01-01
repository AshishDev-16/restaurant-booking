'use client';

import BookingForm from '../components/BookingForm';
import { CalendarDays, ClipboardList } from 'lucide-react';

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-4 sm:py-8 max-w-4xl">
      <div className="text-center mb-6 sm:mb-8 bg-gradient-to-r from-blue-50 via-white to-blue-50 py-8 rounded-2xl shadow-sm">
        <h1 className="text-3xl sm:text-4xl font-bold mb-3 sm:mb-4">
          Restaurant Table Booking
        </h1>
        <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">
          Reserve your table for a delightful dining experience. Quick, easy, and
          convenient booking process.
        </p>
        <a 
          href="/bookings" 
          className="inline-flex items-center gap-2 bg-white px-6 py-3 rounded-full shadow-md hover:shadow-lg transition-all text-gray-700 hover:text-gray-900"
        >
          <ClipboardList className="w-5 h-5" />
          <span>View All Bookings</span>
        </a>
      </div>
      
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
    </main>
  );
}