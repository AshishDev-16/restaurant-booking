"use client"

import { Mail, Calendar, Share2, ClipboardList } from 'lucide-react';
import { Button } from './button';
import { useRouter } from 'next/navigation';

interface BookingNextStepsProps {
  onMakeAnother: () => void;
}

export function BookingNextSteps({ onMakeAnother }: BookingNextStepsProps) {
  const router = useRouter();

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <h4 className="text-sm font-medium text-gray-700">What's Next:</h4>
        <div className="bg-blue-50 rounded-lg p-4">
          <ul className="space-y-4">
            <li className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                <Mail className="w-4 h-4 text-blue-600" />
              </div>
              <span className="text-sm text-gray-600">
                You'll receive a confirmation email shortly
              </span>
            </li>
            <li className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                <Calendar className="w-4 h-4 text-blue-600" />
              </div>
              <span className="text-sm text-gray-600">
                Add this to your calendar
              </span>
            </li>
            <li className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                <Share2 className="w-4 h-4 text-blue-600" />
              </div>
              <span className="text-sm text-gray-600">
                Share with your guests
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-100 pt-4 flex flex-col gap-3">
        <Button
          variant="outline"
          onClick={() => router.push('/bookings')}
          className="w-full"
        >
          <ClipboardList className="w-4 h-4 mr-2" />
          View My Bookings
        </Button>
        <Button
          variant="ghost"
          onClick={onMakeAnother}
          className="text-blue-600 hover:text-blue-700"
        >
          Make Another Booking
        </Button>
      </div>
    </div>
  );
} 