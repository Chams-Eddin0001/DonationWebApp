import { useState } from 'react';
import { Shield, Heart, CheckCircle } from 'lucide-react';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { Input } from '../components/Input';

interface DonateProps {
  onNavigate: (page: string) => void;
}

export function Donate({ onNavigate }: DonateProps) {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(50);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const predefinedAmounts = [25, 50, 100, 250, 500, 1000];

  const handleAmountSelect = (amount: number) => {
    setSelectedAmount(amount);
    setCustomAmount('');
  };

  const handleCustomAmountChange = (value: string) => {
    setCustomAmount(value);
    setSelectedAmount(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const finalAmount = customAmount ? parseFloat(customAmount) : selectedAmount;

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-20">
        <Card className="max-w-2xl w-full p-12 text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Thank You for Your Generosity!</h2>
          <p className="text-lg text-gray-600 mb-8">
            Your donation of <span className="font-bold text-purple-600">${finalAmount}</span> will make a real difference in someone's life. We've sent a confirmation email to <span className="font-semibold">{formData.email}</span>.
          </p>
          <div className="space-y-4">
            <Button size="lg" className="w-full" onClick={() => onNavigate('home')}>
              Return to Home
            </Button>
            <Button size="lg" variant="outline" className="w-full" onClick={() => setSubmitted(false)}>
              Make Another Donation
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div>
      <section className="bg-gradient-to-br from-purple-600 to-purple-800 text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-6">Make a Donation</h1>
          <p className="text-xl text-purple-100">
            Your contribution helps us continue our mission of creating positive change in communities worldwide.
          </p>
        </div>
      </section>

      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <Card className="p-6 text-center">
              <Shield className="w-12 h-12 mx-auto mb-4 text-purple-600" />
              <h3 className="font-bold text-gray-900 mb-2">100% Secure</h3>
              <p className="text-sm text-gray-600">Your information is protected with bank-level encryption</p>
            </Card>
            <Card className="p-6 text-center">
              <Heart className="w-12 h-12 mx-auto mb-4 text-purple-600" />
              <h3 className="font-bold text-gray-900 mb-2">Tax Deductible</h3>
              <p className="text-sm text-gray-600">All donations are tax-deductible to the fullest extent</p>
            </Card>
            <Card className="p-6 text-center">
              <CheckCircle className="w-12 h-12 mx-auto mb-4 text-purple-600" />
              <h3 className="font-bold text-gray-900 mb-2">Transparent</h3>
              <p className="text-sm text-gray-600">We provide regular updates on how your donation is used</p>
            </Card>
          </div>

          <Card className="p-8 md:p-12">
            <form onSubmit={handleSubmit}>
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Select Donation Amount</h3>
                <div className="grid grid-cols-3 gap-4 mb-4">
                  {predefinedAmounts.map((amount) => (
                    <button
                      key={amount}
                      type="button"
                      onClick={() => handleAmountSelect(amount)}
                      className={`py-4 rounded-xl font-bold text-lg transition-all ${
                        selectedAmount === amount
                          ? 'bg-purple-600 text-white shadow-lg scale-105'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      ${amount}
                    </button>
                  ))}
                </div>
                <Input
                  type="number"
                  placeholder="Enter custom amount"
                  value={customAmount}
                  onChange={(e) => handleCustomAmountChange(e.target.value)}
                  min="1"
                  label="Or enter a custom amount"
                />
              </div>

              <div className="mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Your Information</h3>
                <div className="space-y-4">
                  <Input
                    type="text"
                    placeholder="John Doe"
                    label="Full Name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                  <Input
                    type="email"
                    placeholder="john@example.com"
                    label="Email Address"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                  <Input
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    label="Phone Number (Optional)"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
              </div>

              <div className="bg-purple-50 rounded-xl p-6 mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-700 font-medium">Your donation:</span>
                  <span className="text-3xl font-bold text-purple-600">
                    ${finalAmount || 0}
                  </span>
                </div>
                <p className="text-sm text-gray-600">
                  This donation will directly support our ongoing projects and help those in need.
                </p>
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full"
                disabled={!finalAmount || finalAmount <= 0 || !formData.name || !formData.email}
              >
                Complete Donation
              </Button>

              <p className="text-center text-sm text-gray-500 mt-4">
                By donating, you agree to our terms and privacy policy. Your donation is secure and confidential.
              </p>
            </form>
          </Card>
        </div>
      </section>

      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Other Ways to Help</h2>
          <p className="text-lg text-gray-600 mb-8">
            Can't donate right now? There are other meaningful ways to support our cause.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button variant="outline" size="lg" onClick={() => onNavigate('volunteer')}>
              Volunteer With Us
            </Button>
            <Button variant="outline" size="lg" onClick={() => onNavigate('contact')}>
              Get in Touch
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
