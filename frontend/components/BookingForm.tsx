'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Calendar } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { TimeSlots } from './ui/time-slots';
import { useToast } from '@/hooks/use-toast';

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
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
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Something went wrong. Please try again.',
        variant: 'destructive',
      });
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
        <div className="grid md:grid-cols-2 gap-6">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-lg border shadow"
            disabled={(date) => date < new Date()}
          />
          
          <TimeSlots
            selectedTime={selectedTime}
            onTimeSelect={setSelectedTime}
            selectedDate={date}
          />
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-3 rounded-lg font-medium hover:bg-blue-600 transition-colors"
      >
        Book Table
      </button>
    </form>
  );
} 