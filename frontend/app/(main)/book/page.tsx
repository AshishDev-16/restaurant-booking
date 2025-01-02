import BookingForm from '../../../components/BookingForm';
import { BookingInfo } from '../../../components/BookingInfo';
import { ClipboardList } from 'lucide-react';

export default function BookPage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Reserve Your Table</h1>
        <a 
          href="/bookings" 
          className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm hover:shadow-md transition-all text-gray-700 hover:text-gray-900"
        >
          <ClipboardList className="w-4 h-4" />
          <span>View Bookings</span>
        </a>
      </div>
      
      <div className="grid lg:grid-cols-[1fr,400px] gap-8">
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <BookingForm />
        </div>
        <BookingInfo />
      </div>
    </main>
  );
} 