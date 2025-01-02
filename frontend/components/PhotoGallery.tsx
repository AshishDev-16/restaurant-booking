import { ImageIcon } from 'lucide-react';

const photos = [
  {
    url: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0",
    title: "Signature Dish"
  },
  {
    url: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4",
    title: "Restaurant Interior"
  },
  {
    url: "https://images.unsplash.com/photo-1559339352-11d035aa65de",
    title: "Fine Dining"
  },
  {
    url: "https://images.unsplash.com/photo-1544025162-d76694265947",
    title: "Desserts"
  }
];

export function PhotoGallery() {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Photo Gallery</h2>
        <button className="text-blue-600 flex items-center gap-2 text-sm hover:text-blue-700">
          <ImageIcon className="w-4 h-4" />
          View All Photos
        </button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {photos.map((photo, index) => (
          <div key={index} className="relative group cursor-pointer">
            <div className="aspect-square overflow-hidden rounded-lg">
              <img
                src={photo.url}
                alt={photo.title}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
            </div>
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-lg">
              <span className="text-white text-sm font-medium">{photo.title}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 