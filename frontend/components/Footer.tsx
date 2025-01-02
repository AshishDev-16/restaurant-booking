import Link from 'next/link';
import { Facebook, Instagram, Twitter, MapPin, Phone, Mail } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-white border-t mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Restaurant Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">The Gourmet Kitchen</h3>
            <p className="text-gray-600 text-sm">
              Experience the finest vegetarian cuisine in an elegant setting. 
              Perfect for special occasions and memorable dining experiences.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/menu" className="text-gray-600 hover:text-blue-600 transition-colors">
                  Our Menu
                </Link>
              </li>
              <li>
                <Link href="/book" className="text-gray-600 hover:text-blue-600 transition-colors">
                  Book a Table
                </Link>
              </li>
              <li>
                <Link href="/photos" className="text-gray-600 hover:text-blue-600 transition-colors">
                  Photo Gallery
                </Link>
              </li>
              <li>
                <Link href="/reviews" className="text-gray-600 hover:text-blue-600 transition-colors">
                  Customer Reviews
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-gray-600">
                <MapPin className="w-5 h-5 text-blue-600" />
                <span>123 FC Road, Deccan Gymkhana, Pune</span>
              </li>
              <li className="flex items-center gap-2 text-gray-600">
                <Phone className="w-5 h-5 text-blue-600" />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-center gap-2 text-gray-600">
                <Mail className="w-5 h-5 text-blue-600" />
                <span>info@gourmetkitchen.com</span>
              </li>
            </ul>
          </div>

          {/* Opening Hours */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Opening Hours</h3>
            <ul className="space-y-3">
              <li className="text-gray-600">
                <span className="font-medium">Mon - Fri:</span> 11:00 AM - 11:00 PM
              </li>
              <li className="text-gray-600">
                <span className="font-medium">Sat - Sun:</span> 10:00 AM - 11:00 PM
              </li>
              <li className="text-gray-600">
                <span className="font-medium">Happy Hours:</span> 4:00 PM - 7:00 PM
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-600 text-sm">
              © {new Date().getFullYear()} The Gourmet Kitchen. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-sm">
              <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
} 