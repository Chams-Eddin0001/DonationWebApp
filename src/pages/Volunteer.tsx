import { Users, Clock, Heart, Handshake, BookOpen, Home } from 'lucide-react';
import { Button } from '../components/Button';
import { Card } from '../components/Card';


interface VolunteerProps {
  onNavigate: (page: string) => void;
}

export function Volunteer({ onNavigate }: VolunteerProps) {


  const opportunities = [
    {
      icon: Users,
      title: 'Community Outreach',
      description: 'Help us connect with communities and spread awareness about our programs.'
    },
    {
      icon: BookOpen,
      title: 'Education Support',
      description: 'Tutor students, assist with literacy programs, or help in educational workshops.'
    },
    {
      icon: Handshake,
      title: 'Event Coordination',
      description: 'Support fundraising events, charity drives, and community gatherings.'
    },
    {
      icon: Heart,
      title: 'Healthcare Assistance',
      description: 'Support medical camps and health awareness initiatives in underserved areas.'
    },
    {
      icon: Home,
      title: 'Remote Opportunities',
      description: 'Contribute from home through digital marketing, design, or administrative tasks.'
    },
    {
      icon: Clock,
      title: 'Flexible Scheduling',
      description: 'Choose opportunities that fit your schedule, from one-time events to ongoing roles.'
    }
  ];





  return (
    <div>
      <section className="relative bg-purple-900 text-white py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/volunteer-bg.jpg')] bg-cover bg-center"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/90 via-purple-700/90 to-purple-900/90 mix-blend-multiply"></div>
        <div className="relative max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-6">Join Our Volunteer Team</h1>
          <p className="text-xl text-purple-100">
            Make a hands-on difference in the lives of others. Your time and skills can create lasting impact.
          </p>
        </div>
      </section>

      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Volunteer With Us?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Volunteering is more than giving back—it's about being part of a community that creates meaningful change together.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {opportunities.map((opportunity, index) => (
              <Card key={index} className="p-6 text-center" hover>
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <opportunity.icon className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{opportunity.title}</h3>
                <p className="text-gray-600">{opportunity.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-3xl mx-auto">
          <Card className="p-8 md:p-12 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Volunteer Registration</h2>
            <p className="text-gray-600 mb-4">
              To volunteer, please email us at <a href="mailto:contact@charityimpact.org" className="text-purple-600">contact@charityimpact.org</a> or call <a href="tel:+15551234567" className="text-purple-600">+1 (555) 123-4567</a>. We'll follow up with information about current opportunities and next steps.
            </p>
            <div className="mt-6">
              <Button size="lg" onClick={() => onNavigate('contact')}>Contact Us</Button>
            </div>
          </Card>
        </div>
      </section>

      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Have Questions?</h2>
          <p className="text-lg text-gray-600 mb-8">
            We're here to help. Reach out to us if you'd like to learn more about volunteering.
          </p>
          <Button variant="outline" size="lg" onClick={() => onNavigate('contact')}>
            Contact Us
          </Button>
        </div>
      </section>
    </div>
  );
}
