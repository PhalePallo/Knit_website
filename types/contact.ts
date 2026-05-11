export interface ContactFormData {
  user_firstname: string;
  user_lastname: string;
  user_company: string;
  user_email: string;
  message: string;
  user_phone?: string;
}

export interface ContactFormProps {
  onSubmit?: (data: ContactFormData) => void;
  loading?: boolean;
  status?: 'idle' | 'submitting' | 'success' | 'error';
  errorMessage?: string;
}

export type FormStatus = 'idle' | 'submitting' | 'success' | 'error';
