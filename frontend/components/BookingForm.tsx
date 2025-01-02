'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Calendar } from './ui/calendar';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { TimeSlots } from './ui/time-slots';
import { useToast } from '../hooks/use-toast';
import confetti from 'canvas-confetti';
import { CalendarIcon, Users, Mail, Phone, User, CheckCircle, CalendarDays, Clock, Share2, ClipboardList } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { format } from "date-fns";
import { cn } from "../lib/utils";
import { GuestSelect } from './ui/guest-select';
import { Button } from './ui/button';
import { parse } from 'date-fns';
import { BookingNextSteps } from './ui/booking-next-steps';


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
      setIsLoading(false);
      return;
    }

    const formattedDate = new Date(date);
    formattedDate.setHours(0, 0, 0, 0);

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
          date: formattedDate.toISOString(),
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
      <div className="p-6 max-w-md mx-auto">
        <div className="bg-white border border-green-100 rounded-lg p-6 space-y-6">
          <div className="text-center">
            <div className="h-12 w-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-1">
              🎉 Your Table is Reserved!
            </h3>
            <p className="text-gray-600">
              Thank you for choosing The Gourmet Kitchen. We're excited to serve you!
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-medium text-gray-700">Reservation Details:</h4>
            <div className="bg-gray-50 rounded-lg p-4 space-y-3">
              <div className="flex items-center gap-3 text-gray-600">
                <User className="w-4 h-4 text-gray-400" />
                <span>Reserved for: <span className="text-gray-900">{formData.name}</span></span>
              </div>
              <div className="flex items-center gap-3 text-gray-600">
                <CalendarDays className="w-4 h-4 text-gray-400" />
                <span>Date: <span className="text-gray-900">{date ? format(date, "MMMM d, yyyy") : ''}</span></span>
              </div>
              <div className="flex items-center gap-3 text-gray-600">
                <Clock className="w-4 h-4 text-gray-400" />
                <span>Time: <span className="text-gray-900">{format(parse(selectedTime, 'HH:mm', new Date()), 'h:mm a')}</span></span>
              </div>
              <div className="flex items-center gap-3 text-gray-600">
                <Users className="w-4 h-4 text-gray-400" />
                <span>Party Size: <span className="text-gray-900">{formData.guests} {formData.guests === 1 ? 'guest' : 'guests'}</span></span>
              </div>
            </div>
          </div>

          <BookingNextSteps 
            onMakeAnother={() => {
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
          />

          <p className="text-center text-sm text-gray-500 mt-4">
            We look forward to welcoming you!
          </p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Personal Details Section */}
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <Label className="text-base font-medium text-gray-700">Name *</Label>
          <div className="relative mt-2">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <User className="h-5 w-5 text-gray-400" />
            </div>
            <Input
              type="text"
              name="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              className="pl-11 h-12 bg-gray-50 border-gray-200 focus:ring-blue-500 focus:border-blue-500 rounded-lg text-base"
              placeholder="John Doe"
            />
          </div>
        </div>

        <div>
          <Label className="text-base font-medium text-gray-700">Email *</Label>
          <div className="relative mt-2">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Mail className="h-5 w-5 text-gray-400" />
            </div>
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              className="pl-11 h-12 bg-gray-50 border-gray-200 focus:ring-blue-500 focus:border-blue-500 rounded-lg text-base"
              placeholder="john@example.com"
            />
          </div>
        </div>

        <div>
          <Label className="text-base font-medium text-gray-700">Phone *</Label>
          <div className="relative mt-2">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Phone className="h-5 w-5 text-gray-400" />
            </div>
            <Input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={(e) => {
                const value = e.target.value.replace(/[^\d-]/g, '').slice(0, 12);
                setFormData({ ...formData, phone: value });
              }}
              required
              className="pl-11 h-12 bg-gray-50 border-gray-200 focus:ring-blue-500 focus:border-blue-500 rounded-lg text-base"
              placeholder="+91 98765 43210"
            />
          </div>
        </div>

        <div>
          <Label className="text-base font-medium text-gray-700">Number of Guests *</Label>
          <div className="mt-2">
            <GuestSelect
              value={formData.guests}
              onChange={(value) => setFormData({ ...formData, guests: value })}
              className="w-full"
            />
          </div>
        </div>
      </div>

      {/* Date & Time Selection */}
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <Label className="text-base font-medium text-gray-700">Select Date *</Label>
          <div className="mt-2">
            <Popover>
              <PopoverTrigger asChild>
                <button
                  type="button"
                  className={cn(
                    "w-full flex items-center gap-2 px-4 h-12 bg-gray-50 border border-gray-200 rounded-lg text-left text-base hover:bg-gray-100 transition-colors",
                    !date && "text-gray-500"
                  )}
                >
                  <CalendarIcon className="h-5 w-5 text-gray-400" />
                  {date ? format(date, "PPP") : <span>Pick a date</span>}
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  disabled={(date) => date < new Date()}
                  initialFocus
                  className="rounded-lg border border-gray-200"
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        <div>
          <Label className="text-base font-medium text-gray-700">Select Time *</Label>
          <div className="mt-2">
            <TimeSlots
              selectedTime={selectedTime}
              onTimeSelect={setSelectedTime}
              selectedDate={date}
              className="w-full"
            />
          </div>
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full h-12 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? 'Confirming...' : 'Confirm Reservation'}
      </button>
    </form>
  );
} 