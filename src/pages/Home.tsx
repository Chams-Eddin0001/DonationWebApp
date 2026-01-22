import { useState } from 'react';
import { Heart, Users, Target, Award } from 'lucide-react';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { ProgressBar } from '../components/ProgressBar';

interface Cause {
  id: number;
  image_url: string;
  title: string;
  description: string;
  category: string;
  raised_amount: number;
  goal_amount: number;
}

interface HomeProps {
  onNavigate: (page: string) => void;
}

export function Home({ onNavigate }: HomeProps) {
  const initialFeatured: Cause[] = [
    {
      id: 1,
      image_url: '/images/cause-education.jpg',
      title: 'Education for All',
      description: 'Supporting education initiatives in underserved communities.',
      category: 'Education',
      raised_amount: 3500,
      goal_amount: 10000
    },
    {
      id: 2,
      image_url: '/images/cause-healthcare.jpg',
      title: 'Healthcare Access',
      description: 'Providing essential medical supplies and services to families in need.',
      category: 'Healthcare',
      raised_amount: 12500,
      goal_amount: 25000
    },
    {
      id: 3,
      image_url: '/images/cause-water.jpg',
      title: 'Clean Water Projects',
      description: 'Building wells and improving sanitation to provide safe water.',
      category: 'Water & Sanitation',
      raised_amount: 8000,
      goal_amount: 15000
    }
  ];

  const [featuredCauses] = useState<Cause[]>(initialFeatured);



  const stats = [
    { icon: Heart, label: 'Families Helped', value: '12,450+' },
    { icon: Users, label: 'Active Volunteers', value: '2,300+' },
    { icon: Target, label: 'Projects Completed', value: '450+' },
    { icon: Award, label: 'Years of Service', value: '15+' }
  ];

  return (
    <div>
      <section className="relative bg-purple-900 text-white py-24 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/hero-bg.jpg')] bg-cover bg-center"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/90 via-purple-700/90 to-purple-900/90 mix-blend-multiply"></div>
        <div className="relative max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Together We Can Make a Difference
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-purple-100 max-w-3xl mx-auto">
            Join us in creating lasting change for communities in need. Every contribution brings hope to those who need it most.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button size="lg" variant="secondary" onClick={() => onNavigate('donate')}>
              Donate Now
            </Button>
            <Button size="lg" variant="outline" className="bg-white/10 border-white text-white hover:bg-white/20" onClick={() => onNavigate('volunteer')}>
              Join as a Volunteer
            </Button>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <Card key={index} className="p-6 text-center" hover>
                <stat.icon className="w-12 h-12 mx-auto mb-4 text-purple-600" />
                <div className="text-3xl font-bold text-purple-600 mb-2">{stat.value}</div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Causes</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Support the causes that matter most. Your generosity creates real, tangible impact in communities around the world.
            </p>
          </div>

          {featuredCauses.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-xl text-gray-600">No featured causes at the moment.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-8">
              {featuredCauses.map((cause) => (
                <Card key={cause.id} className="overflow-hidden" hover>
                  <img
                    src={cause.image_url}
                    alt={cause.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <div className="inline-block px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold mb-3">
                      {cause.category}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{cause.title}</h3>
                    <p className="text-gray-600 mb-4 line-clamp-3">{cause.description}</p>
                    <ProgressBar
                      current={cause.raised_amount}
                      goal={cause.goal_amount}
                    />
                    <Button
                      className="w-full mt-4"
                      onClick={() => onNavigate('donate')}
                    >
                      Support This Cause
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <Button variant="outline" size="lg" onClick={() => onNavigate('causes')}>
              View All Causes
            </Button>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-gradient-to-r from-purple-600 to-purple-800 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Make an Impact?</h2>
          <p className="text-xl mb-8 text-purple-100">
            Whether you donate, volunteer, or spread the word, your involvement matters. Join our community today.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button size="lg" variant="secondary" onClick={() => onNavigate('donate')}>
              Start Donating
            </Button>
            <Button size="lg" variant="outline" className="bg-white/10 border-white text-white hover:bg-white/20" onClick={() => onNavigate('about')}>
              Learn More About Us
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
