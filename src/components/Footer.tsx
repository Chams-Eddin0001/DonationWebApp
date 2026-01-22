import { Heart, Facebook, Twitter, Instagram, Linkedin, Mail } from 'lucide-react';
import { Button } from './Button';
import { Input } from './Input';
import { useState } from 'react';

interface FooterProps {
  onNavigate: (page: string) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    setSubscribed(true);
    setEmail('');
    setTimeout(() => setSubscribed(false), 3000);
  };

  const quickLinks = [
    { label: 'About Us', page: 'about' },
    { label: 'Our Causes', page: 'causes' },
    { label: 'Volunteer', page: 'volunteer' },
    { label: 'Contact', page: 'contact' },
    { label: 'Admin Login', page: 'admin-login' }
  ];

  const socialLinks = [
    { icon: Facebook, href: 'https://facebook.com', label: 'Facebook' },
    { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
    { icon: Instagram, href: 'https://instagram.com', label: 'Instagram' },
    { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' }
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-purple-800 rounded-full flex items-center justify-center">
                <Heart className="w-6 h-6 text-white fill-white" />
              </div>
              <div>
                <div className="text-lg font-bold">CharityImpact</div>
                <div className="text-xs text-purple-400">Building Better Futures</div>
              </div>
            </div>
            <p className="text-gray-400 text-sm">
              Creating lasting positive change in communities worldwide through compassion and action.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.page}>
                  <button
                    onClick={() => onNavigate(link.page)}
                    className="text-gray-400 hover:text-purple-400 transition-colors text-sm"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Contact Info</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>123 Hope Street</li>
              <li>San Francisco, CA 94102</li>
              <li>Phone: +1 (555) 123-4567</li>
              <li>
                <a href="mailto:contact@charityimpact.org" className="hover:text-purple-400 transition-colors">
                  contact@charityimpact.org
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Newsletter</h3>
            <p className="text-gray-400 text-sm mb-4">
              Stay updated with our latest news and impact stories.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <Input
                type="email"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-gray-800 border-gray-700 text-white placeholder-gray-500"
              />
              <Button type="submit" className="w-full" size="sm">
                {subscribed ? (
                  <>
                    <Mail className="w-4 h-4 mr-2 inline" />
                    Subscribed!
                  </>
                ) : (
                  'Subscribe'
                )}
              </Button>
            </form>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm">
              © 2024 CharityImpact. All rights reserved.
            </p>

            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-purple-600 transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
