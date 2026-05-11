import React from 'react';
import { FORM_FIELDS } from '../../constants/contact';

interface ContactFormFieldProps {
  fieldId: keyof typeof FORM_FIELDS;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  error?: string;
}

const ContactFormField: React.FC<ContactFormFieldProps> = ({
  fieldId,
  value,
  onChange,
  error,
}) => {
  const field = FORM_FIELDS[fieldId];
  const isTextarea = fieldId === 'MESSAGE';

  const inputClasses = `
    w-full px-4 py-3 rounded border 
    ${error ? 'border-red-500 focus:border-red-500' : 'border-surface-300 focus:border-brand-500'}
    focus:ring-1 ${error ? 'focus:ring-red-500' : 'focus:ring-brand-500'}
    outline-none transition-colors 
    bg-white placeholder-slate-400
    ${isTextarea ? 'resize-none' : ''}
  `;

  return (
    <div>
      <label htmlFor={field.id} className="sr-only">
        {field.label}
      </label>
      {isTextarea ? (
        <textarea
          id={field.id}
          name={field.id}
          required={field.required}
          maxLength={field.maxLength}
          rows={4}
          className={inputClasses}
          placeholder={field.placeholder}
          value={value}
          onChange={onChange}
        />
      ) : (
        <input
          type={field.type || 'text'}
          id={field.id}
          name={field.id}
          required={field.required}
          maxLength={field.maxLength}
          className={inputClasses}
          placeholder={field.placeholder}
          value={value}
          onChange={onChange}
        />
      )}
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};

export default ContactFormField;
