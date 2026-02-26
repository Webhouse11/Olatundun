import React, { useState } from 'react';
import { motion } from 'motion/react';
import { MapPin, Phone, Mail, Send, CheckCircle } from 'lucide-react';
import { useSite } from '../context/SiteContext';

export default function Contact() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { settings } = useSite();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulated submission - no email sending logic
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  if (!settings) return null;

  return (
    <section id="contact" className="section-padding">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-primary font-semibold tracking-wider uppercase text-sm mb-4 block">Contact Us</span>
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-8 leading-tight">
              We're Here to <span className="text-primary">Help You</span>
            </h2>
            <p className="text-slate-600 text-lg mb-12 leading-relaxed">
              Have questions about our services or want to visit our facility? Feel free to reach out to us. Our team is ready to provide all the information you need.
            </p>

            <div className="space-y-8 mb-12">
              <div className="flex items-start gap-6">
                <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary flex-shrink-0">
                  <MapPin size={28} />
                </div>
                <div>
                  <h4 className="text-xl font-bold mb-1">Our Location</h4>
                  <p className="text-slate-500">{settings.contact_address}</p>
                </div>
              </div>
              <div className="flex items-start gap-6">
                <div className="w-14 h-14 bg-secondary/10 rounded-2xl flex items-center justify-center text-secondary flex-shrink-0">
                  <Phone size={28} />
                </div>
                <div>
                  <h4 className="text-xl font-bold mb-1">Phone Number</h4>
                  <p className="text-slate-500">{settings.contact_phone}</p>
                </div>
              </div>
              <div className="flex items-start gap-6">
                <div className="w-14 h-14 bg-accent/10 rounded-2xl flex items-center justify-center text-accent flex-shrink-0">
                  <Mail size={28} />
                </div>
                <div>
                  <h4 className="text-xl font-bold mb-1">Email Address</h4>
                  <p className="text-slate-500">{settings.contact_email}</p>
                </div>
              </div>
            </div>

            {/* Google Map Section */}
            <div className="w-full h-80 bg-slate-100 rounded-[2.5rem] overflow-hidden border border-slate-200 relative group shadow-inner">
              <iframe 
                width="100%" 
                height="100%" 
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                src={`https://maps.google.com/maps?q=${encodeURIComponent(settings.contact_address)}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
                className="grayscale group-hover:grayscale-0 transition-all duration-700"
              ></iframe>
              
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                <a 
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(settings.contact_address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white px-8 py-3 rounded-full shadow-2xl font-bold text-primary flex items-center gap-2 hover:bg-primary hover:text-white transition-all whitespace-nowrap"
                >
                  <MapPin size={18} /> Open in Google Maps
                </a>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-slate-900 p-10 md:p-16 rounded-[3rem] shadow-2xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[100px] -mr-32 -mt-32"></div>
            
            <div className="relative z-10">
              <h3 className="text-3xl font-display font-bold text-white mb-8">Send Us a Message</h3>
              
              {isSubmitted ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-primary/20 border border-primary/30 p-8 rounded-3xl text-center"
                >
                  <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white mx-auto mb-4">
                    <CheckCircle size={32} />
                  </div>
                  <h4 className="text-white text-xl font-bold mb-2">Message Received!</h4>
                  <p className="text-slate-300">Thank you for reaching out. Our team will get back to you shortly via phone or WhatsApp.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-slate-400 mb-2">Full Name</label>
                      <input 
                        required
                        type="text" 
                        className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-white focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                        placeholder="Your Name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-400 mb-2">Email Address</label>
                      <input 
                        required
                        type="email" 
                        className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-white focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                        placeholder="Your Email"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-400 mb-2">Subject</label>
                    <input 
                      required
                      type="text" 
                      className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-white focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                      placeholder="How can we help?"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-400 mb-2">Message</label>
                    <textarea 
                      required
                      rows={5}
                      className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-white focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all resize-none"
                      placeholder="Write your message here..."
                    ></textarea>
                  </div>
                  <button type="submit" className="w-full btn-primary py-5 text-lg flex items-center justify-center gap-3">
                    <Send size={22} />
                    Send Message
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
