import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Calendar, Phone, Mail, Clock, CheckCircle, MessageSquare } from 'lucide-react';
import { useSite } from '../context/SiteContext';

export default function Appointment() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { settings } = useSite();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: '',
    datetime: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Construct WhatsApp message
    const message = `*New Appointment Request*%0A%0A` +
      `*Name:* ${formData.name}%0A` +
      `*Phone:* ${formData.phone}%0A` +
      `*Email:* ${formData.email}%0A` +
      `*Service:* ${formData.service}%0A` +
      `*Preferred Date/Time:* ${formData.datetime}`;
    
    const whatsappUrl = `https://wa.me/${settings?.contact_phone.replace(/\D/g, '')}?text=${message}`;
    
    // Open WhatsApp
    window.open(whatsappUrl, '_blank');
    
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  if (!settings) return null;

  return (
    <section id="appointment" className="section-padding bg-slate-50 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/5 -skew-x-12 transform translate-x-1/4"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-primary font-semibold tracking-wider uppercase text-sm mb-4 block">Get in Touch</span>
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-8 leading-tight">
              Book an <span className="text-primary">Appointment</span> with Our Specialists
            </h2>
            <p className="text-slate-600 text-lg mb-10 leading-relaxed">
              Take the first step towards better health. Whether you need geriatric care, maternity support, or a general check-up, our team is ready to assist you.
            </p>

            <div className="space-y-6">
              <div className="flex items-start gap-5">
                <div className="w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center text-primary flex-shrink-0">
                  <Phone size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">Call Us Directly</h4>
                  <p className="text-slate-500">{settings.contact_phone}</p>
                </div>
              </div>
              <div className="flex items-start gap-5">
                <div className="w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center text-secondary flex-shrink-0">
                  <Mail size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">Email Support</h4>
                  <p className="text-slate-500">{settings.contact_email}</p>
                </div>
              </div>
              <div className="flex items-start gap-5">
                <div className="w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center text-accent flex-shrink-0">
                  <Clock size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">Working Hours</h4>
                  <p className="text-slate-500">Mon - Sat: 8:00 AM - 6:00 PM (Emergency 24/7)</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white p-10 md:p-12 rounded-[3rem] shadow-2xl border border-slate-100"
          >
            {isSubmitted ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-primary/10 border border-primary/20 p-12 rounded-[2.5rem] text-center"
              >
                <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center text-white mx-auto mb-6 shadow-lg">
                  <CheckCircle size={40} />
                </div>
                <h3 className="text-2xl font-display font-bold text-slate-900 mb-4">Request Sent!</h3>
                <p className="text-slate-600">Your appointment request has been sent via WhatsApp. Our medical team will review it and get back to you shortly.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Patient Name</label>
                    <input 
                      required
                      type="text" 
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="John Doe"
                      className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Phone / WhatsApp</label>
                    <input 
                      required
                      type="tel" 
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+234..."
                      className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Email Address</label>
                  <input 
                    required
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="john@example.com"
                    className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Service Interested In</label>
                  <select 
                    required 
                    name="service"
                    value={formData.service}
                    onChange={handleInputChange}
                    className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all appearance-none cursor-pointer"
                  >
                    <option value="">Select a service</option>
                    <option>Elderly & Geriatric Care</option>
                    <option>Home Health Care</option>
                    <option>Maternity & Obstetric Services</option>
                    <option>Fertility & Reproductive Health</option>
                    <option>General Health Services</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Preferred Date & Time</label>
                  <div className="relative">
                    <input 
                      required
                      type="datetime-local" 
                      name="datetime"
                      value={formData.datetime}
                      onChange={handleInputChange}
                      className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all cursor-pointer"
                    />
                  </div>
                </div>
                <button type="submit" className="w-full btn-primary py-5 text-lg flex items-center justify-center gap-3">
                  <MessageSquare size={22} />
                  Send via WhatsApp
                </button>
                <p className="text-center text-slate-400 text-xs">
                  By submitting this form, you will be redirected to WhatsApp to complete your request.
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
