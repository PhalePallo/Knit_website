export const CONTACT_CONFIG = {
  EMAIL: 'info@knit.cash',
  PHONE: '+27 12 345 6789',
  ADDRESS: '123 School Street, Centurion, South Africa',
  HOURS: 'Monday - Friday: 8:00 AM - 5:00 PM',
} as const;

export const FORM_FIELDS = {
  FIRST_NAME: {
    id: 'user_firstname',
    label: 'First name',
    placeholder: 'First name',
    required: true,
    maxLength: 50,
  },
  LAST_NAME: {
    id: 'user_lastname',
    label: 'Last name',
    placeholder: 'Last name',
    required: true,
    maxLength: 50,
  },
  COMPANY: {
    id: 'user_company',
    label: 'School name',
    placeholder: 'School name',
    required: false,
    maxLength: 100,
  },
  EMAIL: {
    id: 'user_email',
    label: 'School email',
    placeholder: 'School email',
    required: true,
    type: 'email',
  },
  PHONE: {
    id: 'user_phone',
    label: 'Phone number',
    placeholder: 'Phone number (optional)',
    required: false,
    maxLength: 20,
  },
  MESSAGE: {
    id: 'message',
    label: 'Message',
    placeholder: 'Tell us about your school and current challenges with fee collection or financial management',
    required: true,
    maxLength: 500,
  },
} as const;

export const FORM_MESSAGES = {
  SUCCESS: 'Thank you for your message! We\'ll get back to you within 24 hours.',
  ERROR: 'Something went wrong. Please try again or contact us directly.',
  LOADING: 'Sending your message...',
  REQUIRED_FIELD: 'This field is required',
  INVALID_EMAIL: 'Please enter a valid email address',
} as const;
