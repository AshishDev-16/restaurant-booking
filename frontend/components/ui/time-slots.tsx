import { cn } from "@/lib/utils"
import { useEffect, useState } from "react"

interface TimeSlotsProps {
  selectedTime: string
  onTimeSelect: (time: string) => void
  selectedDate: Date | undefined
}

const timeSlots = [
  '11:00', '11:30', '12:00', '12:30', '13:00', '13:30',
  '14:00', '14:30', '15:00', '15:30', '16:00', '16:30',
  '17:00', '17:30', '18:00', '18:30', '19:00', '19:30'
]

export function TimeSlots({ selectedTime, onTimeSelect, selectedDate }: TimeSlotsProps) {
  const [bookedSlots, setBookedSlots] = useState<string[]>([]);

  useEffect(() => {
    const fetchBookedSlots = async () => {
      if (!selectedDate) return;
      
      try {
        const response = await fetch('/api/bookings');
        const bookings = await response.json();
        
        // Filter bookings for selected date
        const dateBookings = bookings.filter((booking: any) => {
          const bookingDate = new Date(booking.date);
          return bookingDate.toDateString() === selectedDate.toDateString();
        });
        
        // Get all booked times for this date
        const bookedTimes = dateBookings.map((booking: any) => booking.time);
        setBookedSlots(bookedTimes);
      } catch (error) {
        console.error('Error fetching booked slots:', error);
      }
    };

    fetchBookedSlots();
  }, [selectedDate]);

  return (
    <div className="grid grid-cols-2 gap-2">
      {timeSlots.map((time) => {
        const isBooked = bookedSlots.includes(time);
        return (
          <button
            key={time}
            type="button"
            disabled={isBooked}
            onClick={() => onTimeSelect(time)}
            className={cn(
              "time-slot",
              isBooked ? "bg-gray-200 text-gray-400 cursor-not-allowed" : 
              selectedTime === time ? "selected" : ""
            )}
          >
            {time} {isBooked && '(Booked)'}
          </button>
        )
      })}
    </div>
  )
} 