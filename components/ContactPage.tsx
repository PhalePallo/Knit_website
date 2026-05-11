import React, { useEffect } from 'react';
import Navigation from './Navigation';
import Footer from './Footer';
import ScrollReveal from './ScrollReveal';
import ContactForm from './contact/ContactForm';
import emailjs from '@emailjs/browser';

const ContactPage: React.FC = () => {
  useEffect(() => {
    // Initialize EmailJS with the public key on component mount
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
    if (publicKey) {
      emailjs.init(publicKey);
    } else {
      console.error("EmailJS Public Key missing in .env.local");
    }
  }, []);

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 selection:bg-brand-100 selection:text-brand-900">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-16 md:pt-48 md:pb-24 bg-surface-50 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-brand-100/30 rounded-full blur-3xl -z-10 animate-blob"></div>
        <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-surface-200/40 rounded-full blur-3xl -z-10 animate-blob animation-delay-2000"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <ScrollReveal>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 border border-brand-100 text-brand-700 text-xs font-medium mb-6">
                <span>Contact</span>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={100}>
              <h1 className="text-4xl md:text-5xl font-bold text-brand-950 tracking-tight mb-6">
                Get in Touch
              </h1>
            </ScrollReveal>
            <ScrollReveal delay={200}>
              <p className="text-xl text-slate-600 leading-relaxed">
                We're here to help transform your school's financial operations
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-20 bg-white">
        <ScrollReveal delay={300}>
          <ContactForm />
        </ScrollReveal>
      </section>

      <Footer />
    </div>
  );
};

export default ContactPage;
