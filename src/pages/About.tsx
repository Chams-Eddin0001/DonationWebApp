import { Heart, Eye, Compass, Users, Globe, Shield } from 'lucide-react';
import { Card } from '../components/Card';
import { Button } from '../components/Button';

interface AboutProps {
  onNavigate: (page: string) => void;
}

export function About({ onNavigate }: AboutProps) {
  const values = [
    {
      icon: Heart,
      title: 'Compassion',
      description: 'We lead with empathy and genuine care for every person we serve.'
    },
    {
      icon: Shield,
      title: 'Integrity',
      description: 'Transparency and accountability guide every decision we make.'
    },
    {
      icon: Users,
      title: 'Community',
      description: 'We believe in the power of people working together for change.'
    },
    {
      icon: Globe,
      title: 'Impact',
      description: 'We focus on creating sustainable, long-term positive change.'
    }
  ];

  return (
    <div>
      <section className="relative bg-purple-900 text-white py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/about-bg.jpg')] bg-cover bg-center"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/90 via-purple-700/90 to-purple-900/90 mix-blend-multiply"></div>
        <div className="relative max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-6">About Our Mission</h1>
          <p className="text-xl text-purple-100">
            Dedicated to creating lasting positive change in communities worldwide through compassion, action, and unwavering commitment.
          </p>
        </div>
      </section>

      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <img
                src="https://images.pexels.com/photos/6646917/pexels-photo-6646917.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Our team helping communities"
                className="rounded-2xl shadow-xl"
              />
            </div>
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Story</h2>
              <p className="text-lg text-gray-700 mb-4">
                Founded in 2009, our organization was born from a simple belief: that every person deserves access to basic necessities, education, and opportunities for a better life.
              </p>
              <p className="text-lg text-gray-700 mb-4">
                What started as a small group of volunteers has grown into a global movement, touching the lives of thousands across multiple continents. We've expanded our reach, but our core mission remains unchanged.
              </p>
              <p className="text-lg text-gray-700">
                Today, we work tirelessly to provide education, healthcare, clean water, and economic opportunities to underserved communities. Every day, we're inspired by the resilience and hope of the people we serve.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-purple-50">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            <Card className="p-8">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mr-4">
                  <Eye className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900">Our Mission</h2>
              </div>
              <p className="text-lg text-gray-700">
                To empower vulnerable communities through sustainable programs in education, healthcare, and economic development, creating pathways out of poverty and fostering dignity and self-sufficiency.
              </p>
            </Card>

            <Card className="p-8">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-amber-500 rounded-full flex items-center justify-center mr-4">
                  <Compass className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900">Our Vision</h2>
              </div>
              <p className="text-lg text-gray-700">
                A world where every individual has equal access to opportunities, resources, and support needed to build a fulfilling life and contribute meaningfully to their communities.
              </p>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Core Values</h2>
            <p className="text-xl text-gray-600">
              These principles guide everything we do and every decision we make.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="p-6 text-center" hover>
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-gradient-to-r from-purple-600 to-purple-800 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Join Our Mission</h2>
          <p className="text-xl mb-8 text-purple-100">
            Whether through donations, volunteering, or spreading awareness, you can be part of the change.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button size="lg" variant="secondary" onClick={() => onNavigate('donate')}>
              Make a Donation
            </Button>
            <Button size="lg" variant="outline" className="bg-white/10 border-white text-white hover:bg-white/20" onClick={() => onNavigate('volunteer')}>
              Become a Volunteer
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
