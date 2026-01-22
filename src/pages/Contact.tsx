import { useState } from 'react';
import { Mail, Phone, Send, Loader2 } from 'lucide-react';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Textarea } from '../components/Textarea';

interface ContactProps {
  onNavigate: (page: string) => void;
}

export function Contact(_props: ContactProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Failed to send message');

      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      console.error('Error sending message:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };


  const contactInfo = [
    {
      icon: Mail,
      title: 'Email Us',
      value: 'contact@charityimpact.org',
      link: 'mailto:contact@charityimpact.org'
    },
    {
      icon: Phone,
      title: 'Call Us',
      value: '+1 (555) 123-4567',
      link: 'tel:+15551234567'
    }
  ];





  return (
    <div>
      <section className="relative bg-purple-900 text-white py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/contact-bg.jpg')] bg-cover bg-center"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/90 via-purple-700/90 to-purple-900/90 mix-blend-multiply"></div>
        <div className="relative max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-6">Get in Touch</h1>
          <p className="text-xl text-purple-100">
            Have questions or want to learn more? We'd love to hear from you.
          </p>
        </div>
      </section>

      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {contactInfo.map((info, index) => (
              <Card key={index} className="p-6 text-center" hover>
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <info.icon className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{info.title}</h3>
                <a
                  href={info.link}
                  className="text-purple-600 hover:text-purple-700 transition-colors"
                >
                  {info.value}
                </a>
              </Card>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Send us a Message</h2>
              <Card className="p-8">
                {submitStatus === 'success' ? (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Send className="w-8 h-8 text-green-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Message Sent!</h3>
                    <p className="text-gray-600 mb-6">
                      Thank you for reaching out. We'll get back to you as soon as possible.
                    </p>
                    <Button onClick={() => setSubmitStatus('idle')}>
                      Send Another Message
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <Input
                      label="Full Name"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      disabled={isSubmitting}
                    />
                    <Input
                      label="Email Address"
                      type="email"
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      disabled={isSubmitting}
                    />
                    <Input
                      label="Subject"
                      placeholder="How can we help?"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      required
                      disabled={isSubmitting}
                    />
                    <Textarea
                      label="Message"
                      placeholder="Your message..."
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      required
                      disabled={isSubmitting}
                    />

                    {submitStatus === 'error' && (
                      <p className="text-red-600 text-sm">
                        Something went wrong. Please try again later.
                      </p>
                    )}

                    <Button type="submit" className="w-full" disabled={isSubmitting}>
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin inline" />
                          Sending...
                        </>
                      ) : (
                        'Send Message'
                      )}
                    </Button>
                  </form>
                )}
              </Card>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Office Hours</h2>
              <Card className="p-8 mb-8">
                <div className="space-y-4">
                  <div className="flex justify-between border-b border-gray-200 pb-3">
                    <span className="font-semibold text-gray-900">Monday - Friday</span>
                    <span className="text-gray-600">9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-200 pb-3">
                    <span className="font-semibold text-gray-900">Saturday</span>
                    <span className="text-gray-600">10:00 AM - 4:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold text-gray-900">Sunday</span>
                    <span className="text-gray-600">Closed</span>
                  </div>
                </div>
              </Card>

              <h2 className="text-3xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
              <Card className="p-8">
                <div className="space-y-6">
                  <div>
                    <h4 className="font-bold text-gray-900 mb-2">How can I track my donation?</h4>
                    <p className="text-gray-600">We send email receipts and regular updates on how donations are being used.</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-2">Can I volunteer remotely?</h4>
                    <p className="text-gray-600">Yes! We have many remote volunteer opportunities available.</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-2">Are donations tax-deductible?</h4>
                    <p className="text-gray-600">Yes, all donations are tax-deductible to the fullest extent allowed by law.</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
