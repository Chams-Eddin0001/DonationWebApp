import { useEffect, useState } from 'react';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { ProgressBar } from '../components/ProgressBar';

interface Cause {
  _id?: string;
  id?: number;
  image_url: string;
  title: string;
  description: string;
  category: string;
  raised_amount: number;
  goal_amount: number;
}

interface CausesProps {
  onNavigate: (page: string) => void;
}

export function Causes({ onNavigate }: CausesProps) {
  const [causes, setCauses] = useState<Cause[]>([]);
  const [filteredCauses, setFilteredCauses] = useState<Cause[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [isLoading, setIsLoading] = useState(true);

  const categories = ['All', 'Education', 'Healthcare', 'Water & Sanitation', 'Food & Nutrition', 'Empowerment', 'Emergency Relief'];

  useEffect(() => {
    const fetchCauses = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/causes');
        if (response.ok) {
          const data = await response.json();
          setCauses(data);
          setFilteredCauses(data);
        }
      } catch (error) {
        console.error('Error fetching causes:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCauses();
  }, []);

  useEffect(() => {
    if (selectedCategory === 'All') {
      setFilteredCauses(causes);
    } else {
      setFilteredCauses(causes.filter(cause => cause.category === selectedCategory));
    }
  }, [selectedCategory, causes]);



  return (
    <div>
      <section className="relative bg-purple-900 text-white py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/causes-bg.jpg')] bg-cover bg-center"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/90 via-purple-700/90 to-purple-900/90 mix-blend-multiply"></div>
        <div className="relative max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-6">Our Causes</h1>
          <p className="text-xl text-purple-100">
            Explore the projects and initiatives making a real difference in communities worldwide. Your support can change lives.
          </p>
        </div>
      </section>

      <section className="py-12 px-4 bg-white border-b">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full font-semibold transition-all ${selectedCategory === category
                  ? 'bg-purple-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          {isLoading ? (
            <div className="flex justify-center items-center h-64"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div></div>
          ) : filteredCauses.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-xl text-gray-600">No causes found in this category.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredCauses.map((cause) => (
                <Card key={cause._id || cause.id} className="overflow-hidden flex flex-col" hover>
                  <img
                    src={cause.image_url}
                    alt={cause.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6 flex-grow flex flex-col">
                    <div className="inline-block self-start px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold mb-3">
                      {cause.category}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{cause.title}</h3>
                    <p className="text-gray-600 mb-4 flex-grow">{cause.description}</p>
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
        </div>
      </section>

      <section className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">Can't Find What You're Looking For?</h2>
          <p className="text-xl text-gray-600 mb-8">
            Get in touch with us to learn more about our ongoing projects or suggest new initiatives.
          </p>
          <Button size="lg" onClick={() => onNavigate('contact')}>
            Contact Us
          </Button>
        </div>
      </section>
    </div>
  );
}
