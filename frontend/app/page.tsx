'use client';

import { RestaurantHeader } from '../components/RestaurantHeader';
import { PhotoGallery } from '../components/PhotoGallery';
import { MenuHighlights } from '../components/MenuHighlights';
import BookingForm from '../components/BookingForm';

export default function Home() {
  return (
    <main>
      <RestaurantHeader />
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            <PhotoGallery />
            <MenuHighlights />
          </div>
          
          {/* Right Column - Booking Form */}
          <div>
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h2 className="text-xl font-semibold mb-6">Reserve Your Table</h2>
              <BookingForm />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}