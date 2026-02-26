import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: 'Do you offer home care services?',
      answer: 'Yes, we provide comprehensive home health care services. Our professional nurses and caregivers can visit your home to provide medical support, personal care, and companionship tailored to your specific needs.'
    },
    {
      question: 'Can my elderly relative live at the facility?',
      answer: 'Absolutely. We offer residential geriatric care with 24/7 supervision, medical monitoring, and a supportive community environment designed specifically for the comfort and safety of the elderly.'
    },
    {
      question: 'What are your operating hours?',
      answer: 'Our administrative offices are open Monday through Saturday from 8:00 AM to 6:00 PM. However, our nursing care and emergency services operate 24 hours a day, 7 days a week.'
    },
    {
      question: 'Do you provide maternity support for first-time mothers?',
      answer: 'Yes, we have specialized programs for first-time mothers, including prenatal education, postnatal recovery support, and newborn care guidance to ensure a smooth transition into motherhood.'
    },
    {
      question: 'How do I book an appointment?',
      answer: 'You can book an appointment through our website form, call us directly at our contact numbers, or message us on WhatsApp. We recommend booking at least 24 hours in advance for non-emergencies.'
    }
  ];

  return (
    <section id="faq" className="section-padding bg-slate-50">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-primary font-semibold tracking-wider uppercase text-sm mb-4 block">Got Questions?</span>
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
              Frequently Asked <span className="text-primary">Questions</span>
            </h2>
          </motion.div>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              className={`bg-white rounded-3xl border transition-all duration-300 ${activeIndex === idx ? 'border-primary shadow-lg' : 'border-slate-100 shadow-sm'}`}
            >
              <button
                onClick={() => setActiveIndex(activeIndex === idx ? null : idx)}
                className="w-full px-8 py-6 flex items-center justify-between text-left"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${activeIndex === idx ? 'bg-primary text-white' : 'bg-primary/10 text-primary'}`}>
                    <HelpCircle size={18} />
                  </div>
                  <span className={`font-bold text-lg ${activeIndex === idx ? 'text-primary' : 'text-slate-900'}`}>{faq.question}</span>
                </div>
                {activeIndex === idx ? <ChevronUp className="text-primary" /> : <ChevronDown className="text-slate-400" />}
              </button>
              
              <AnimatePresence>
                {activeIndex === idx && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="px-8 pb-8 pt-0 text-slate-600 leading-relaxed border-t border-slate-50 mt-2 pt-4">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
