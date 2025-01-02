import { cn } from "../../lib/utils"
import { useEffect, useState } from "react"
import { Popover, PopoverContent, PopoverTrigger } from "./popover"
import { Clock } from "lucide-react"

interface TimeSlotsProps {
  selectedTime: string
  onTimeSelect: (time: string) => void
  selectedDate: Date | undefined
  className?: string
}

const timeSlots = [
  { time: '1:00 PM' },
  { time: '1:30 PM' },
  { time: '2:00 PM' },
  { time: '2:30 PM' },
  { time: '3:00 PM' },
  { time: '3:30 PM' },
  { time: '4:00 PM' },
  { time: '4:30 PM' },
  { time: '5:00 PM' },
  { time: '5:30 PM' }
];


const convertTo24Hour = (time12h: string) => {
  const [time, modifier] = time12h.split(' ');
  let [hours, minutes] = time.split(':');
  
  if (hours === '12') {
    hours = '00';
  }
  
  if (modifier === 'PM') {
    hours = String(parseInt(hours, 10) + 12);
  }
  
  return `${hours}:${minutes}`;
};

export function TimeSlots({ selectedTime, onTimeSelect, selectedDate, className }: TimeSlotsProps) {
  const [bookedSlots, setBookedSlots] = useState<string[]>([]);

  useEffect(() => {
    const fetchBookedSlots = async () => {
      if (!selectedDate) return;
      
      try {
        const response = await fetch('/api/bookings');
        const bookings = await response.json();
        
        const dateBookings = bookings.filter((booking: any) => {
          const bookingDate = new Date(booking.date);
          return bookingDate.toDateString() === selectedDate.toDateString();
        });
        
        const bookedTimes = dateBookings.map((booking: any) => booking.time);
        setBookedSlots(bookedTimes);
      } catch (error) {
        console.error('Error fetching booked slots:', error);
      }
    };

    fetchBookedSlots();
  }, [selectedDate]);

  const handleTimeSelect = (time12h: string) => {
    const time24h = convertTo24Hour(time12h);
    onTimeSelect(time24h);
  };

  const displayTime = (time24h: string | null) => {
    if (!time24h) return null;
   
    const [hours, minutes] = time24h.split(':');
    const hour = parseInt(hours, 10);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour % 12 || 12;
    return `${hour12}:${minutes} ${ampm}`;
  };

  return (
    <div className={className}>
      <Popover>
        <PopoverTrigger asChild>
          <button
            type="button"
            className={cn(
              "w-full flex items-center gap-2 px-4 h-12 bg-gray-50 border border-gray-200 rounded-lg text-left text-base hover:bg-gray-100 transition-colors",
              !selectedTime && "text-gray-500"
            )}
          >
            <Clock className="h-5 w-5 text-gray-400" />
            {selectedTime ? displayTime(selectedTime) : <span>Select time</span>}
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-[320px] p-3" align="start">
          <div className="grid grid-cols-2 gap-2">
            {timeSlots.map((slot) => {
              const isBooked = bookedSlots.includes(convertTo24Hour(slot.time));
              return (
                <button
                  key={slot.time}
                  type="button"
                  disabled={isBooked}
                  onClick={() => handleTimeSelect(slot.time)}
                  className={cn(
                    "flex flex-col items-center p-3 rounded-lg border hover:border-blue-500 transition-all",
                    selectedTime === convertTo24Hour(slot.time) ? "border-blue-500 bg-blue-50" : "border-gray-200",
                    isBooked ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
                  )}
                >
                  <span className="text-gray-900 font-medium">{slot.time}</span>
                  
                </button>
              );
            })}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
} 