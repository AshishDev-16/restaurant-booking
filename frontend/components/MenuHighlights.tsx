import { ChefHat, Award, Flame } from 'lucide-react';

const menuItems = [
  {
    name: "Paneer Tikka Masala",
    description: "Fresh cottage cheese in rich aromatic gravy with bell peppers and Indian spices",
    price: "₹495",
    tag: "Chef's Special",
    icon: ChefHat,
    imageUrl: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?q=80&w=2670&auto=format&fit=crop"
  },
  {
    name: "Malai Kofta",
    description: "Soft cottage cheese dumplings in rich, creamy cashew and tomato gravy",
    price: "₹445",
    tag: "Award Winner",
    icon: Award,
    imageUrl: "https://images.unsplash.com/photo-1645177628172-a94c1f96e6db?q=80&w=2574&auto=format&fit=crop"
  },
  {
    name: "Dal Makhani",
    description: "Slow-cooked black lentils with rich cream and butter, a house specialty",
    price: "₹395",
    tag: "Popular",
    icon: Flame,
    imageUrl: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?q=80&w=2576&auto=format&fit=crop"
  }
];

export function MenuHighlights() {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <h2 className="text-xl font-semibold mb-6">Menu Highlights</h2>
      <div className="space-y-6">
        {menuItems.map((item, index) => (
          <div key={index} className="flex items-start gap-4 p-4 rounded-lg hover:bg-gray-50 transition-colors">
            <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
              <img
                src={item.imageUrl}
                alt={item.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-grow">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-medium">{item.name}</h3>
                <div className="flex items-center gap-1 text-xs px-2 py-1 rounded-full bg-blue-50 text-blue-600">
                  <item.icon className="w-3 h-3" />
                  <span>{item.tag}</span>
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-2">{item.description}</p>
              <span className="font-medium text-gray-900">{item.price}</span>
            </div>
          </div>
        ))}
      </div>
      <button className="w-full mt-6 py-3 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors">
        View Full Menu
      </button>
    </div>
  );
} 