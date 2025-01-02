import { cn } from "../../lib/utils"
import { Clock, CheckCircle2, XCircle } from 'lucide-react';

type BookingStatus = 'upcoming' | 'completed' | 'cancelled';

interface StatusBadgeProps {
  date: string
  time: string
  className?: string
}

export function StatusBadge({ date, time, className }: StatusBadgeProps) {
  const getStatus = (bookingDate: Date): BookingStatus => {
    const now = new Date();
    const booking = new Date(bookingDate);
    
    // Convert booking time to hours and minutes
    const [hours, minutes] = time.split(':');
    booking.setHours(parseInt(hours), parseInt(minutes));

    if (booking < now) {
      return 'completed';
    }
    return 'upcoming';
  };

  const getStatusDetails = (status: BookingStatus) => {
    switch (status) {
      case 'upcoming':
        return {
          label: 'Upcoming',
          icon: Clock,
          className: 'bg-blue-50 text-blue-700 border-blue-100'
        };
      case 'completed':
        return {
          label: 'Completed',
          icon: CheckCircle2,
          className: 'bg-green-50 text-green-700 border-green-100'
        };
      case 'cancelled':
        return {
          label: 'Cancelled',
          icon: XCircle,
          className: 'bg-red-50 text-red-700 border-red-100'
        };
    }
  };

  const status = getStatus(new Date(date));
  const details = getStatusDetails(status);
  const Icon = details.icon;

  return (
    <div
      className={cn(
        "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border",
        details.className,
        className
      )}
    >
      <Icon className="w-3.5 h-3.5" />
      {details.label}
    </div>
  );
} 