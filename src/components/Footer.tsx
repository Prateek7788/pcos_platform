import React from 'react';
import { Heart, Mail, Phone } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-r from-purple-900 to-pink-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="bg-white/20 p-2 rounded-lg">
                <Heart className="h-6 w-6" />
              </div>
              <span className="text-xl font-bold">OviQue</span>
            </div>
            <p className="text-purple-100 mb-4">
              Empowering women with PCOS/PCOD through knowledge, tools, and guidance for better health management.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-purple-100">
              <li><a href="/yoga" className="hover:text-white transition-colors">Yoga Guide</a></li>
              <li><a href="/diet" className="hover:text-white transition-colors">Diet Plans</a></li>
              <li><a href="/tracker" className="hover:text-white transition-colors">Period Tracker</a></li>
              <li><a href="/prediction" className="hover:text-white transition-colors">PCOS Assessment</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <div className="space-y-2 text-purple-100">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>support@ovique.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>+1 (555) 123-4567</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-purple-700 mt-8 pt-8 text-center text-purple-100">
          <p>&copy; 2025 OviQue. All rights reserved. Always consult healthcare professionals for medical advice.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;