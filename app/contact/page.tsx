'use client';

import { useState, type FormEvent } from 'react';
import { useQuery } from '@tanstack/react-query';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';
import { PageHeader } from '@/components/shared/PageHeader';
import { getStorefrontHome, submitContact } from '@/services/storefront.service';
import { ApiError } from '@/services/http-client';
import { siteConfig } from '@/app/lib/site';


export default function ContactPage() {
  const { data: storefront } = useQuery({ queryKey: ['storefront-home'], queryFn: getStorefrontHome });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const [pending, setPending] = useState(false);
  const [notice, setNotice] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPending(true);
    setNotice('');
    setError('');
    try {
      const result = await submitContact(formData);
      setNotice(result.message);
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (cause) {
      setError(cause instanceof ApiError ? cause.message : 'Could not send your message. Please try again.');
    } finally {
      setPending(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <PageHeader title="Contact Us" image="/images/blog/blog-image5.jpg" breadcrumbLabel="Contact" />

      <div className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Section Title */}
          <div className="text-center mb-16">
            <p className="text-orange-500 text-sm font-medium mb-2">Contact Us</p>
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              Get In Touch With Us
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
                Whether you have a question about our services, pricing, or anything else, our team is ready to answer all your questions.  
            </p>
            </div>

          {/* Contact Info Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            <div className="bg-blue-900 text-white p-8 text-center">
              <div className="flex justify-center mb-4">
                <MapPin className="w-8 h-8 text-orange-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Our Location</h3>
              <p className="text-gray-300 text-sm">{storefront?.contact.addressLines.join(', ') || siteConfig.contact.address.join(', ')}</p>
            </div>

            <div className="bg-white border border-gray-200 p-8 text-center">
              <div className="flex justify-center mb-4">
                <Phone className="w-8 h-8 text-orange-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Phone Number</h3>
              <p className="text-gray-600 text-sm">{storefront?.contact.phone || siteConfig.contact.phone}</p>
            </div>

            <div className="bg-blue-900 text-white p-8 text-center">
              <div className="flex justify-center mb-4">
                <Mail className="w-8 h-8 text-orange-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Email Us</h3>
              <p className="text-gray-300 text-sm">{storefront?.contact.email || siteConfig.contact.email}</p>
            </div>

            <div className="bg-white border border-gray-200 p-8 text-center">
              <div className="flex justify-center mb-4">
                <Clock className="w-8 h-8 text-orange-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Working Hours</h3>
              <p className="text-gray-600 text-sm">{storefront?.contact.workingHours || 'Mon - Sat: 9:00 - 5:00'}</p>
            </div>
          </div>

          {/* Map and Form Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Map */}
            <div className="overflow-hidden shadow-lg h-96 lg:h-full">
              <iframe
                src={storefront?.contact.mapEmbedUrl || 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3944.2546283282386!2d110.50388!3d-8.50754!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7a5c5d5c5c5c5d%3A0x5c5c5c5c5c5c5c5c!2sRayes%20Ubud!5e0!3m2!1sen!2sid!4v1234567890'}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>

            {/* Contact Form */}
            <div className="flex flex-col justify-center">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="John Doe"
                    className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="john@example.com"
                    className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-gray-700 font-medium mb-2">
                    Your Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    placeholder="Trip Inquiry"
                    className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-gray-700 font-medium mb-2">
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Tell us more about your inquiry..."
                    rows={5}
                    className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none"
                    required
                  ></textarea>
                </div>

                <input name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" value="" readOnly />

                {notice && <p role="status" className="text-sm text-emerald-700">{notice}</p>}
                {error && <p role="alert" className="text-sm text-red-700">{error}</p>}

                <button
                  type="submit"
                  disabled={pending}
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 flex items-center justify-center gap-2 transition-colors"
                >
                  <Send className="w-5 h-5" />
                  {pending ? 'Sending…' : 'Send Message'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

   
    </div>
  );
}
