'use client';

import { MenuHighlights } from '../../components/MenuHighlights';
import { Clock, Users, Utensils, Gift } from 'lucide-react';

const diningOffers = [
  {
    title: "Happy Hours",
    description: "Enjoy 20% off on all beverages between 4 PM to 7 PM daily",
    icon: Clock,
    color: "text-purple-600",
    bgColor: "bg-purple-50"
  },
  {
    title: "Group Dining",
    description: "Special packages available for groups of 10 or more",
    icon: Users,
    color: "text-blue-600",
    bgColor: "bg-blue-50"
  },
  {
    title: "Weekend Brunch",
    description: "Exclusive weekend brunch menu with live cooking stations",
    icon: Utensils,
    color: "text-green-600",
    bgColor: "bg-green-50"
  },
  {
    title: "Special Occasions",
    description: "Customized menus for birthdays and anniversaries",
    icon: Gift,
    color: "text-red-600",
    bgColor: "bg-red-50"
  }
];

export default function Home() {
  return (
    <main>
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* About Section */}
        <section className="mb-12">
          <h1 className="text-3xl font-bold mb-4">The Gourmet Kitchen</h1>
          <p className="text-gray-600 text-lg leading-relaxed max-w-3xl">
            Welcome to The Gourmet Kitchen, where traditional flavors meet modern culinary artistry. 
            Our restaurant offers an elegant dining experience with a focus on premium vegetarian cuisine, 
            crafted with the finest ingredients and served in a sophisticated ambiance.
          </p>
        </section>
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Menu Highlights Column */}
          <div>
            <MenuHighlights />
          </div>

          {/* Special Offers Column */}
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-6">Special Dining Offers</h2>
            <div className="space-y-6">
              {diningOffers.map((offer, index) => (
                <div 
                  key={index} 
                  className="flex items-start gap-4 p-4 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className={`${offer.bgColor} w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0`}>
                    <offer.icon className={`w-6 h-6 ${offer.color}`} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">{offer.title}</h3>
                    <p className="text-gray-600">{offer.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}