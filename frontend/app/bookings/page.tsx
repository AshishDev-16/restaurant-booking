'use client';

import { useEffect, useState } from 'react';
import { useToast } from '../../hooks/use-toast';
import { CalendarDays, Users, Mail, Phone, Trash2, PlusCircle, Loader2, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { ConfirmationDialog } from '../../components/ui/confirmation-dialog';

interface Booking {
  _id: string;
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
}

export default function BookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await fetch('/api/bookings');
      const data = await response.json();
      setBookings(data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch bookings",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;

    try {
      const response = await fetch(`/api/bookings/${deleteId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setBookings(bookings.filter(booking => booking._id !== deleteId));
        toast({
          title: "Success",
          description: "Booking deleted successfully",
        });
      } else {
        throw new Error('Failed to delete booking');
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete booking",
        variant: "destructive",
      });
    } finally {
      setShowDeleteDialog(false);
      setDeleteId(null);
    }
  };

  const handleDeleteClick = (id: string) => {
    setDeleteId(id);
    setShowDeleteDialog(true);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentBookings = bookings.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(bookings.length / itemsPerPage);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-8 flex items-center justify-center">
        <div className="flex items-center gap-2 text-gray-500">
          <Loader2 className="w-6 h-6 animate-spin" />
          <span>Loading bookings...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-4 sm:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="p-4 sm:p-8 bg-blue-500 text-white">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold mb-2">Manage Bookings</h1>
                <p className="text-blue-100 text-sm sm:text-base">View and manage all restaurant bookings</p>
              </div>
              <a 
                href="/"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white text-blue-500 px-4 sm:px-6 py-2 sm:py-3 rounded-full hover:shadow-lg transition-all text-sm sm:text-base"
              >
                <PlusCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>New Booking</span>
              </a>
            </div>
          </div>

          <div className="p-4 sm:p-8">
            {bookings.length === 0 ? (
              <div className="text-center py-8 sm:py-12">
                <CalendarDays className="w-10 h-10 sm:w-12 sm:h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg sm:text-xl font-medium text-gray-900 mb-2">No Bookings Found</h3>
                <p className="text-sm sm:text-base text-gray-500">There are no bookings in the system yet.</p>
              </div>
            ) : (
              <div className="overflow-x-auto -mx-4 sm:-mx-8 px-4 sm:px-8 md:mx-0 md:px-0">
                <div className="hidden md:block">
                  <table className="w-full min-w-[800px]">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Guest Details</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Date & Time</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Party Size</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Contact</th>
                        <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentBookings.map((booking) => (
                        <tr key={booking._id} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="md:hidden font-medium text-gray-500 mb-1">Guest Details</div>
                            <div className="font-medium text-gray-900">{booking.name}</div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2 text-gray-700">
                              <CalendarDays className="w-4 h-4 text-gray-400" />
                              <span>{new Date(booking.date).toLocaleDateString()}</span>
                              <span className="text-gray-400">|</span>
                              <span>{booking.time}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2 text-gray-700">
                              <Users className="w-4 h-4 text-gray-400" />
                              <span>{booking.guests} guests</span>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="space-y-1">
                              <div className="flex items-center gap-2 text-gray-700">
                                <Mail className="w-4 h-4 text-gray-400" />
                                <span>{booking.email}</span>
                              </div>
                              <div className="flex items-center gap-2 text-gray-700">
                                <Phone className="w-4 h-4 text-gray-400" />
                                <span>{booking.phone}</span>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <button
                              onClick={() => handleDeleteClick(booking._id)}
                              className="inline-flex items-center gap-1 text-red-500 hover:text-red-700 transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                              <span>Delete</span>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="md:hidden space-y-4">
                  {currentBookings.map((booking) => (
                    <div 
                      key={booking._id} 
                      className="bg-white rounded-lg border border-gray-200 p-4 space-y-3"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium text-gray-900">{booking.name}</h3>
                          <div className="flex items-center gap-1 text-sm text-gray-600 mt-1">
                            <Users className="w-4 h-4" />
                            <span>{booking.guests} guests</span>
                          </div>
                        </div>
                        <button
                          onClick={() => handleDeleteClick(booking._id)}
                          className="text-red-500 p-2 hover:bg-red-50 rounded-full transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="space-y-2 pt-2 border-t border-gray-100">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <CalendarDays className="w-4 h-4 text-gray-400 flex-shrink-0" />
                          <span>{new Date(booking.date).toLocaleDateString()}</span>
                          <span className="text-gray-400">|</span>
                          <span>{booking.time}</span>
                        </div>

                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Mail className="w-4 h-4 text-gray-400 flex-shrink-0" />
                          <span className="truncate">{booking.email}</span>
                        </div>

                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Phone className="w-4 h-4 text-gray-400 flex-shrink-0" />
                          <span>{booking.phone}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-4 sm:mt-6">
                  <div className="flex items-center justify-between px-2 py-3 sm:py-4 border-t">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                      disabled={currentPage === 1}
                      className="text-xs sm:text-sm"
                    >
                      <ChevronLeft className="h-4 w-4 mr-1 sm:mr-2" />
                      Previous
                    </Button>
                    <span className="text-xs sm:text-sm text-gray-700">
                      Page {currentPage} of {totalPages}
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                      disabled={currentPage === totalPages}
                      className="text-xs sm:text-sm"
                    >
                      Next
                      <ChevronRight className="h-4 w-4 ml-1 sm:ml-2" />
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <ConfirmationDialog
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
        onConfirm={handleDelete}
        title="Delete Booking"
        description="Are you sure you want to delete this booking? This action cannot be undone."
      />
    </div>
  );
} 