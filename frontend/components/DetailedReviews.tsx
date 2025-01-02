import { Star, ThumbsUp } from 'lucide-react';

const reviews = [
  {
    name: "Priya Sharma",
    rating: 5,
    date: "2 days ago",
    review: "Absolutely amazing experience! The Paneer Tikka Masala was perfectly spiced and the service was impeccable. The ambiance makes it perfect for special occasions.",
    helpful: 12,
    images: [
      "https://images.unsplash.com/photo-1631452180519-c014fe946bc7",
      "https://images.unsplash.com/photo-1585937421612-70a008356fbe",
    ]
  },
  {
    name: "Rahul Desai",
    rating: 4,
    date: "1 week ago",
    review: "Great vegetarian options and wonderful atmosphere. The Dal Makhani was outstanding. Slightly long wait during peak hours but worth it.",
    helpful: 8,
    images: []
  },
  {
    name: "Anjali Patel",
    rating: 5,
    date: "2 weeks ago",
    review: "Celebrated my anniversary here and it was perfect! The Malai Kofta was divine and the staff made our evening special with their attention to detail.",
    helpful: 15,
    images: [
      "https://images.unsplash.com/photo-1645177628172-a94c1f96e6db"
    ]
  }
];

export function DetailedReviews() {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Customer Reviews</h2>
        <div className="flex items-center gap-2">
          <div className="flex text-yellow-400">
            {"★".repeat(4)}{"☆".repeat(1)}
          </div>
          <span className="text-gray-600">(128 reviews)</span>
        </div>
      </div>

      <div className="space-y-6">
        {reviews.map((review, index) => (
          <div key={index} className="border-b border-gray-100 last:border-0 pb-6 last:pb-0">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="font-medium">{review.name}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex text-yellow-400 text-sm">
                    {"★".repeat(review.rating)}{"☆".repeat(5 - review.rating)}
                  </div>
                  <span className="text-sm text-gray-500">{review.date}</span>
                </div>
              </div>
              <button className="flex items-center gap-1 text-sm text-gray-500 hover:text-blue-600">
                <ThumbsUp className="w-4 h-4" />
                <span>Helpful ({review.helpful})</span>
              </button>
            </div>

            <p className="text-gray-600 mb-4">{review.review}</p>

            {review.images.length > 0 && (
              <div className="flex gap-2 mt-3">
                {review.images.map((image, imgIndex) => (
                  <div key={imgIndex} className="w-20 h-20 rounded-lg overflow-hidden">
                    <img
                      src={image}
                      alt={`Review by ${review.name}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      <button className="w-full mt-6 py-3 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors">
        View All Reviews
      </button>
    </div>
  );
} 