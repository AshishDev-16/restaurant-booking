import BookingForm from '../../components/BookingForm';

export default function BookPage() {
  return (
    <main className="container mx-auto px-4 py-8 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Reserve Your Table</h1>
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <BookingForm />
      </div>
    </main>
  );
} 