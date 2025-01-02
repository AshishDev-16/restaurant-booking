"use client"

import { Calendar, Share2 } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from "./popover"
import { Button } from "./button"
import { format } from 'date-fns';

interface BookingActionsProps {
  booking: {
    name: string;
    date: string;
    time: string;
    guests: number;
  }
}

export function BookingActions({ booking }: BookingActionsProps) {
  const addToGoogleCalendar = () => {
    const date = new Date(booking.date);
    const [hours, minutes] = booking.time.split(':');
    date.setHours(parseInt(hours), parseInt(minutes));
    
    const endDate = new Date(date);
    endDate.setHours(date.getHours() + 2); 
    
    const startTime = date.toISOString().replace(/-|:|\.\d\d\d/g, '');
    const endTime = endDate.toISOString().replace(/-|:|\.\d\d\d/g, '');
    
    const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(`Reservation at The Gourmet Kitchen`)}&dates=${startTime}/${endTime}&details=${encodeURIComponent(`Reservation for ${booking.guests} guests\nReservation Name: ${booking.name}`)}&location=${encodeURIComponent('123 FC Road, Deccan Gymkhana, Pune')}`;
    
    window.open(url, '_blank');
  };

  const addToOutlook = () => {
    const date = new Date(booking.date);
    const [hours, minutes] = booking.time.split(':');
    date.setHours(parseInt(hours), parseInt(minutes));
    
    const endDate = new Date(date);
    endDate.setHours(date.getHours() + 2);
    
    const url = `https://outlook.office.com/calendar/action/compose?subject=${encodeURIComponent(`Reservation at The Gourmet Kitchen`)}&startdt=${date.toISOString()}&enddt=${endDate.toISOString()}&body=${encodeURIComponent(`Reservation for ${booking.guests} guests\nReservation Name: ${booking.name}`)}&location=${encodeURIComponent('123 FC Road, Deccan Gymkhana, Pune')}`;
    
    window.open(url, '_blank');
  };

  const shareBooking = async () => {
    const shareData = {
      title: 'Restaurant Reservation',
      text: `I have a reservation at The Gourmet Kitchen on ${format(new Date(booking.date), "MMM d, yyyy")} at ${booking.time} for ${booking.guests} guests.`,
      url: window.location.href
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        // Fallback copy to clipboard
        await navigator.clipboard.writeText(shareData.text);
        alert('Booking details copied to clipboard!');
      }
    } catch (err) {
      console.error('Error sharing:', err);
    }
  };

  return (
    <div className="inline-flex items-center rounded-md shadow-sm">
      <Popover>
        <PopoverTrigger asChild>
          <Button 
            variant="outline" 
            size="sm"
            className="rounded-r-none border-r-0"
          >
            <Calendar className="w-4 h-4 mr-2" />
            Calendar
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-56 p-2" align="end">
          <div className="grid gap-2">
            <Button 
              variant="ghost" 
              size="sm" 
              className="justify-start"
              onClick={addToGoogleCalendar}
            >
              Google Calendar
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className="justify-start"
              onClick={addToOutlook}
            >
              Outlook Calendar
            </Button>
          </div>
        </PopoverContent>
      </Popover>

      <Button 
        variant="outline" 
        size="sm"
        className="rounded-l-none"
        onClick={shareBooking}
      >
        <Share2 className="w-4 h-4" />
      </Button>
    </div>
  );
} 