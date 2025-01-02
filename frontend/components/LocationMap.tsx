import { MapPin, Navigation, Clock, Phone } from 'lucide-react';

export function LocationMap() {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <h2 className="text-xl font-semibold mb-6">Location & Contact</h2>
      
      <div className="aspect-video w-full rounded-lg overflow-hidden mb-6">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3782.2613173278896!2d73.84007597499179!3d18.52429798256998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2c07f4f32e3ad%3A0x324e8e777c7c5361!2sFC%20Road%2C%20Pune%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1709494433696!5m2!1sen!2sin"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>

      <div className="space-y-4">
        <div className="flex items-start gap-3">
          <MapPin className="w-5 h-5 text-blue-600 mt-1" />
          <div>
            <h3 className="font-medium mb-1">Address</h3>
            <p className="text-gray-600 text-sm">123 FC Road, Deccan Gymkhana</p>
            <p className="text-gray-600 text-sm">Pune, Maharashtra 411004</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Navigation className="w-5 h-5 text-blue-600 mt-1" />
          <div>
            <h3 className="font-medium mb-1">Get Directions</h3>
            <a 
              href="https://goo.gl/maps/your-restaurant-location" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 text-sm hover:underline"
            >
              View on Google Maps
            </a>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Clock className="w-5 h-5 text-blue-600 mt-1" />
          <div>
            <h3 className="font-medium mb-1">Hours</h3>
            <p className="text-gray-600 text-sm">Mon-Sun: 11:00 AM - 11:00 PM</p>
            <p className="text-gray-600 text-sm">Happy Hours: 4:00 PM - 7:00 PM</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Phone className="w-5 h-5 text-blue-600 mt-1" />
          <div>
            <h3 className="font-medium mb-1">Contact</h3>
            <p className="text-gray-600 text-sm">+91 98765 43210</p>
            <p className="text-gray-600 text-sm">info@gourmetkitchen.com</p>
          </div>
        </div>
      </div>
    </div>
  );
} 