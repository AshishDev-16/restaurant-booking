'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Calendar } from '../components/ui/calendar';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { TimeSlots } from './ui/time-slots';
import { useToast } from '../hooks/use-toast';
import confetti from 'canvas-confetti';

export default function BookingForm() {
  const router = useRouter();
  const { toast } = useToast();
  const [date, setDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    guests: 1,
  });
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const triggerConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    if (!date || !selectedTime) {
      toast({
        title: 'Error',
        description: 'Please select both date and time',
        variant: 'destructive',
      });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast({
        title: 'Error',
        description: 'Please enter a valid email address',
        variant: 'destructive',
      });
      return;
    }

    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(formData.phone.replace(/[^0-9]/g, ''))) {
      toast({
        title: 'Error',
        description: 'Please enter a valid 10-digit phone number',
        variant: 'destructive',
      });
      return;
    }

    if (formData.guests < 1 || formData.guests > 20) {
      toast({
        title: 'Error',
        description: 'Number of guests must be between 1 and 20',
        variant: 'destructive',
      });
      return;
    }

    try {
      const response = await fetch(`/api/bookings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          date,
          time: selectedTime,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        toast({
          title: 'Error',
          description: data.message || 'Booking failed',
          variant: 'destructive',
        });
        return;
      }

      setShowConfirmation(true);
      triggerConfetti();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Something went wrong. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (showConfirmation) {
    return (
      <div className="p-6">
        <div className="bg-green-50 border border-green-200 rounded-md p-4 mb-4">
          <h3 className="text-lg font-semibold text-green-800 mb-2">
            Booking Confirmed!
          </h3>
          <div className="space-y-2 text-sm text-green-700">
            <p><strong>Name:</strong> {formData.name}</p>
            <p><strong>Date:</strong> {date?.toLocaleDateString()}</p>
            <p><strong>Time:</strong> {selectedTime}</p>
            <p><strong>Guests:</strong> {formData.guests}</p>
            <p><strong>Email:</strong> {formData.email}</p>
            <p><strong>Phone:</strong> {formData.phone}</p>
          </div>
        </div>
        <button
          onClick={() => {
            setShowConfirmation(false);
            setFormData({
              name: '',
              email: '',
              phone: '',
              guests: 1,
            });
            setDate(undefined);
            setSelectedTime('');
          }}
          className="text-blue-500 hover:text-blue-700"
        >
          Make another booking
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <div className="input-group">
        <Label htmlFor="name" className="input-label">Name *</Label>
        <Input
          id="name"
          className="input-field"
          required
          placeholder="John Doe"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
      </div>

      <div className="input-group">
        <Label htmlFor="email" className="input-label">Email *</Label>
        <Input
          id="email"
          type="email"
          className="input-field"
          required
          placeholder="john@example.com"
          pattern="[^\s@]+@[^\s@]+\.[^\s@]+"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
      </div>

      <div className="input-group">
        <Label htmlFor="phone" className="input-label">Phone *</Label>
        <Input
          id="phone"
          className="input-field"
          required
          placeholder="123-456-7890"
          value={formData.phone}
          onChange={(e) => {
            const value = e.target.value.replace(/[^\d-]/g, '').slice(0, 12);
            setFormData({ ...formData, phone: value });
          }}
        />
      </div>

      <div className="input-group">
        <Label htmlFor="guests" className="input-label">Number of Guests *</Label>
        <Input
          id="guests"
          type="number"
          className="input-field"
          required
          min="1"
          max="20"
          placeholder="1"
          value={formData.guests}
          onChange={(e) => {
            const value = parseInt(e.target.value);
            if (!isNaN(value)) {
              setFormData({ ...formData, guests: Math.max(1, value) });
            }
          }}
        />
      </div>

      <div className="input-group">
        <Label className="input-label">Select Date & Time *</Label>
        <div className="grid md:grid-cols-2 gap-6 sm:gap-4">
          <div className="w-full">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="border shadow-sm"
              disabled={(date) => date < new Date()}
              fromDate={new Date()}
            />
          </div>
          
          <div className="w-full">
            <TimeSlots
              selectedTime={selectedTime}
              onTimeSelect={setSelectedTime}
              selectedDate={date}
            />
          </div>
        </div>
      </div>

      <div className="flex gap-4 mt-6">
        <button
          type="button"
          onClick={() => {
            setFormData({
              name: '',
              email: '',
              phone: '',
              guests: 1,
            });
            setDate(undefined);
            setSelectedTime('');
          }}
          className="w-1/3 bg-gray-100 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors"
        >
          Clear Form
        </button>
        <button
          type="submit"
          disabled={isLoading}
          className="w-2/3 bg-blue-500 text-white py-3 rounded-lg font-medium hover:bg-blue-600 transition-colors flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Booking...
            </>
          ) : (
            'Book Table'
          )}
        </button>
      </div>
    </form>
  );
} 