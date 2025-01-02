import { Star } from 'lucide-react';

export function RestaurantHeader() {
  return (
    <div className="relative">
      {/* Hero Image Section */}
      <div className="h-[300px] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60" />
        <img 
          src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4"
          alt="Restaurant Ambiance"
          className="w-full h-full object-cover"
        />
        
        {/* Quick Info Overlay */}
        <div className="absolute bottom-4 left-4 text-white">
          <h1 className="text-3xl font-bold mb-2">The Gourmet Kitchen</h1>
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-current text-yellow-400" />
              <span>4.2</span>
            </div>
            <span>•</span>
            <span>Fine Dining</span>
            <span>•</span>
            <span>₹₹₹₹</span>
          </div>
        </div>
      </div>

      {/* Quick Actions Bar */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <span className="text-green-600 flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-green-600" />
                Open Now
              </span>
              <span className="text-gray-600">11:00 AM - 11:00 PM</span>
            </div>
            <div className="flex items-center gap-4">
              <button className="px-4 py-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
                Direction
              </button>
              <button className="px-4 py-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
                Share
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 