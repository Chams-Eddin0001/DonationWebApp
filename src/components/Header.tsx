import { useState } from 'react';
import { Heart, Menu, X } from 'lucide-react';
import { Button } from './Button';

interface HeaderProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export function Header({ currentPage, onNavigate }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: 'Home', page: 'home' },
    { label: 'About', page: 'about' },
    { label: 'Causes', page: 'causes' },
    { label: 'Volunteer', page: 'volunteer' },
    { label: 'Contact', page: 'contact' }
  ];

  const handleNavigate = (page: string) => {
    onNavigate(page);
    setMobileMenuOpen(false);
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <button
            onClick={() => handleNavigate('home')}
            className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-purple-800 rounded-full flex items-center justify-center">
              <Heart className="w-6 h-6 text-white fill-white" />
            </div>
            <div>
              <div className="text-xl font-bold text-gray-900">CharityImpact</div>
              <div className="text-xs text-purple-600 font-medium">Building Better Futures</div>
            </div>
          </button>

          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.page}
                onClick={() => handleNavigate(item.page)}
                className={`font-medium transition-colors ${
                  currentPage === item.page
                    ? 'text-purple-600'
                    : 'text-gray-600 hover:text-purple-600'
                }`}
              >
                {item.label}
              </button>
            ))}
            <Button onClick={() => handleNavigate('donate')}>
              Donate Now
            </Button>
          </nav>

          <button
            className="md:hidden text-gray-600"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {mobileMenuOpen && (
          <nav className="md:hidden pb-4 space-y-2">
            {navItems.map((item) => (
              <button
                key={item.page}
                onClick={() => handleNavigate(item.page)}
                className={`block w-full text-left py-2 px-4 rounded-lg font-medium transition-colors ${
                  currentPage === item.page
                    ? 'bg-purple-50 text-purple-600'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                {item.label}
              </button>
            ))}
            <div className="pt-2">
              <Button className="w-full" onClick={() => handleNavigate('donate')}>
                Donate Now
              </Button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
