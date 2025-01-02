'use client';

import { RestaurantHeader } from '../components/RestaurantHeader';
import { MenuHighlights } from '../components/MenuHighlights';

export default function Home() {
  return (
    <main>
      <RestaurantHeader />
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="space-y-8">
          <div className="prose max-w-none">
            <h2>About The Gourmet Kitchen</h2>
            <p>
              Welcome to The Gourmet Kitchen, where traditional flavors meet modern culinary artistry. 
              Our restaurant offers an elegant dining experience with a focus on premium vegetarian cuisine.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <MenuHighlights />
          </div>
        </div>
      </div>
    </main>
  );
}