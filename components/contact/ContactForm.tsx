import React from 'react';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle, AlertCircle } from 'lucide-react';
import { useContactForm } from '../../hooks/useContactForm';
import { CONTACT_CONFIG, FORM_MESSAGES } from '../../constants/contact';
import ContactFormField from './ContactFormField';

const ContactForm: React.FC = () => {
  const {
    status,
    errorMessage,
    subscribeToNewsletter,
    setSubscribeToNewsletter,
    sendEmail,
    resetForm,
  } = useContactForm();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    await sendEmail(formData);
  };

  const handleReset = () => {
    resetForm();
    const form = document.getElementById('contact-form') as HTMLFormElement;
    if (form) form.reset();
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid lg:grid-cols-2 gap-12">
        {/* Contact Information */}
        <div className="space-y-8">
          <div>
            <h1 className="text-4xl font-bold tracking-tight text-brand-950 mb-4">
              Book a Demo
            </h1>
            <p className="text-slate-600 leading-relaxed">
              Ready to transform your school's financial operations? Reach out to our team at{' '}
              <a href={`mailto:${CONTACT_CONFIG.EMAIL}`} className="text-brand-600 font-medium hover:underline">
                {CONTACT_CONFIG.EMAIL}
              </a>
              {' '}or use the form below.
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-brand-100 rounded-lg flex items-center justify-center">
                <Mail className="text-brand-600" size={20} />
              </div>
              <div>
                <h3 className="font-semibold text-brand-950">Email</h3>
                <a href={`mailto:${CONTACT_CONFIG.EMAIL}`} className="text-slate-600 hover:text-brand-600">
                  {CONTACT_CONFIG.EMAIL}
                </a>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-brand-100 rounded-lg flex items-center justify-center">
                <Phone className="text-brand-600" size={20} />
              </div>
              <div>
                <h3 className="font-semibold text-brand-950">Phone</h3>
                <a href={`tel:${CONTACT_CONFIG.PHONE}`} className="text-slate-600 hover:text-brand-600">
                  {CONTACT_CONFIG.PHONE}
                </a>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-brand-100 rounded-lg flex items-center justify-center">
                <MapPin className="text-brand-600" size={20} />
              </div>
              <div>
                <h3 className="font-semibold text-brand-950">Address</h3>
                {CONTACT_CONFIG.ADDRESS.split('\n').map((line, i) => (
                  <p key={i} className="text-slate-600">{line}</p>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-brand-100 rounded-lg flex items-center justify-center">
                <Clock className="text-brand-600" size={20} />
              </div>
              <div>
                <h3 className="font-semibold text-brand-950">Business Hours</h3>
                <p className="text-slate-600">{CONTACT_CONFIG.HOURS}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white rounded-xl border border-surface-200 shadow-lg p-8">
          {status === 'success' ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="text-emerald-600" size={32} />
              </div>
              <h3 className="text-2xl font-bold text-brand-950 mb-2">Message Sent!</h3>
              <p className="text-slate-600 mb-6">{FORM_MESSAGES.SUCCESS}</p>
              <button
                onClick={handleReset}
                className="inline-flex items-center justify-center px-6 py-3 border border-brand-600 text-base font-medium rounded-md text-brand-600 bg-white hover:bg-brand-50 transition-colors"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form id="contact-form" onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <ContactFormField fieldId="FIRST_NAME" />
                <ContactFormField fieldId="LAST_NAME" />
              </div>

              <ContactFormField fieldId="COMPANY" />
              <ContactFormField fieldId="EMAIL" />
              <ContactFormField fieldId="PHONE" />
              <ContactFormField fieldId="MESSAGE" />

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="newsletter_subscribe"
                  name="newsletter_subscribe"
                  checked={subscribeToNewsletter}
                  onChange={(e) => setSubscribeToNewsletter(e.target.checked)}
                  className="w-4 h-4 text-brand-600 border-surface-300 rounded focus:ring-brand-500 focus:ring-2"
                />
                <label htmlFor="newsletter_subscribe" className="ml-2 text-sm text-slate-600 cursor-pointer select-none">
                  Keep me updated with Knit school finance insights
                </label>
              </div>

              {errorMessage && (
                <div className="flex items-center gap-2 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <AlertCircle className="text-red-600" size={20} />
                  <p className="text-sm text-red-800">{errorMessage}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={status === 'submitting'}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-brand-600 hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {status === 'submitting' ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    {FORM_MESSAGES.LOADING}
                  </>
                ) : (
                  <>
                    <Send size={20} />
                    Submit
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
