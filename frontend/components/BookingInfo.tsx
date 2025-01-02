"use client"
import { cn } from "../lib/utils";
import { Cake, GlassWater, Briefcase, Heart, Car, Clock, UtensilsCrossed, BadgeAlert, Sparkles } from 'lucide-react';
import { useState } from 'react';

const occasions = [
  { icon: Cake, label: 'Birthday', color: 'text-pink-500', bgColor: 'bg-pink-50' },
  { icon: Heart, label: 'Anniversary', color: 'text-red-500', bgColor: 'bg-red-50' },
  { icon: Briefcase, label: 'Business', color: 'text-blue-500', bgColor: 'bg-blue-50' },
  { icon: Sparkles, label: 'Date Night', color: 'text-purple-500', bgColor: 'bg-purple-50' },
];

const expectations = [
  { icon: UtensilsCrossed, label: 'Smart Casual Dress Code' },
  { icon: Car, label: 'Free Valet Parking' },
  { icon: GlassWater, label: 'Complimentary Welcome Drink' },
  { icon: Clock, label: 'Avg. Dining Time: 1.5-2 hrs' },
  { icon: BadgeAlert, label: '24hr Cancellation Policy' },
];

export function BookingInfo() {
  const [selectedOccasion, setSelectedOccasion] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      {/* Special Occasions */}
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h3 className="text-lg font-medium text-gray-700 mb-4">Special Occasion?</h3>
        <div className="grid grid-cols-2 gap-3">
          {occasions.map((occasion) => (
            <button
              key={occasion.label}
              onClick={() => setSelectedOccasion(occasion.label)}
              className={cn(
                "flex flex-col items-center p-4 rounded-lg border transition-all",
                selectedOccasion === occasion.label 
                  ? "border-blue-500 bg-blue-50" 
                  : "border-gray-200 hover:border-blue-500"
              )}
            >
              <div className={cn("p-2 rounded-full", occasion.bgColor)}>
                <occasion.icon className={cn("w-5 h-5", occasion.color)} />
              </div>
              <span className="text-sm mt-2">{occasion.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* What to Expect */}
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h3 className="text-lg font-medium text-gray-700 mb-4">What to Expect</h3>
        <div className="space-y-4">
          {expectations.map((item) => (
            <div key={item.label} className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center">
                <item.icon className="w-5 h-5 text-blue-600" />
              </div>
              <span className="text-sm text-gray-600">{item.label}</span>
            </div>
          ))}
        </div>
        
        <div className="mt-6 pt-6 border-t">
          <p className="text-sm text-gray-500">
            For special dietary requirements or group bookings of more than 10 people, 
            please contact us directly at <span className="font-medium">+91 98765 43210</span>
          </p>
        </div>
      </div>
    </div>
  );
} 