import { useState, useCallback } from 'react';
import emailjs from '@emailjs/browser';
import { ContactFormData, FormStatus } from '../types/contact';
import { FORM_MESSAGES } from '../constants/contact';

export const useContactForm = () => {
  const [status, setStatus] = useState<FormStatus>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [subscribeToNewsletter, setSubscribeToNewsletter] = useState(false);

  const resetForm = useCallback(() => {
    setStatus('idle');
    setErrorMessage('');
    setSubscribeToNewsletter(false);
  }, []);

  const validateForm = useCallback((data: ContactFormData): string | null => {
    if (!data.user_firstname.trim()) return 'First name is required';
    if (!data.user_lastname.trim()) return 'Last name is required';
    if (!data.user_email.trim()) return 'Email is required';
    if (!data.message.trim()) return 'Message is required';
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.user_email)) return 'Please enter a valid email address';
    
    return null;
  }, []);

  const sendEmail = useCallback(async (formData: FormData) => {
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      const error = "Configuration Error: Missing EmailJS keys in .env.local";
      setErrorMessage(error);
      setStatus('error');
      return;
    }

    const contactData: ContactFormData = {
      user_firstname: formData.get('user_firstname') as string,
      user_lastname: formData.get('user_lastname') as string,
      user_company: formData.get('user_company') as string,
      user_email: formData.get('user_email') as string,
      message: formData.get('message') as string,
      user_phone: formData.get('user_phone') as string,
    };

    const validationError = validateForm(contactData);
    if (validationError) {
      setErrorMessage(validationError);
      setStatus('error');
      return;
    }

    setStatus('submitting');
    setErrorMessage('');

    try {
      const templateParams = {
        ...contactData,
      };

      const result = await emailjs.send(serviceId, templateId, templateParams, publicKey);

      // Handle newsletter subscription if checked
      if (subscribeToNewsletter && contactData.user_email) {
        try {
          const mlFormData = new FormData();
          mlFormData.append('fields[email]', contactData.user_email);
          mlFormData.append('ml-submit', '1');
          mlFormData.append('anticsrf', 'true');

          await fetch("https://assets.mailerlite.com/jsonp/2096299/forms/179649503348917659/subscribe", {
            method: "POST",
            body: mlFormData,
            mode: 'no-cors'
          });
        } catch (mlError) {
          // Newsletter subscription failure doesn't affect form submission
          console.error('Newsletter subscription failed:', mlError);
        }
      }

      setStatus('success');
      setSubscribeToNewsletter(false);
      
      // Reset form after successful submission
      setTimeout(() => {
        const form = document.getElementById('contact-form') as HTMLFormElement;
        if (form) form.reset();
      }, 1000);

    } catch (error: any) {
      setErrorMessage(`Failed to send: ${error.text || JSON.stringify(error)}`);
      setStatus('error');
    }
  }, [validateForm, subscribeToNewsletter]);

  return {
    status,
    errorMessage,
    subscribeToNewsletter,
    setSubscribeToNewsletter,
    sendEmail,
    resetForm,
  };
};
