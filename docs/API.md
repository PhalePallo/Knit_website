# API Documentation

This document describes the APIs and external services used by the Knit financial infrastructure platform.

## 📡 External APIs

### EmailJS API

EmailJS is used for handling contact form submissions without requiring a backend server.

#### Configuration

```typescript
// Environment Variables
VITE_EMAILJS_PUBLIC_KEY=your_public_key
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
```

#### Implementation

```typescript
// components/contact/useContactForm.ts
import emailjs from '@emailjs/browser';

export const useContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendEmail = async (formData: ContactFormData) => {
    setIsSubmitting(true);
    setError(null);

    try {
      const result = await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        formData,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );
      
      return result;
    } catch (err) {
      setError('Failed to send message. Please try again.');
      throw err;
    } finally {
      setIsSubmitting(false);
    }
  };

  return { sendEmail, isSubmitting, error };
};
```

#### API Endpoints

| Method | Endpoint | Description | Authentication |
|---------|----------|-------------|----------------|
| POST | https://api.emailjs.com/api/v1.0/email/send | Send email via template | Public Key |

#### Request Format

```typescript
interface EmailRequest {
  service_id: string;
  template_id: string;
  user_id: string;
  template_params: {
    from_name: string;
    from_email: string;
    message: string;
    to_name: string;
    reply_to: string;
  };
}
```

#### Response Format

```typescript
interface EmailResponse {
  status: number;
  text: string;
}
```

#### Error Handling

```typescript
const handleEmailError = (error: any) => {
  if (error.status === 429) {
    return 'Too many requests. Please try again later.';
  }
  if (error.status === 400) {
    return 'Invalid email format or missing fields.';
  }
  return 'Failed to send message. Please try again.';
};
```

### Google Gemini AI API

Used for AI-powered features and chatbot functionality.

#### Configuration

```typescript
// Environment Variables
VITE_GEMINI_API_KEY=your_gemini_api_key
```

#### Implementation

```typescript
// services/gemini.ts
import { GoogleGenerativeAI } from '@google/generative-ai';

export class GeminiService {
  private genAI: GoogleGenerativeAI;

  constructor() {
    this.genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
  }

  async generateResponse(prompt: string): Promise<string> {
    const model = this.genAI.getGenerativeModel({ model: 'gemini-pro' });
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  }

  async generateChatResponse(messages: ChatMessage[]): Promise<string> {
    const model = this.genAI.getGenerativeModel({ model: 'gemini-pro' });
    
    const chat = model.startChat({
      history: messages.map(msg => ({
        role: msg.role === 'user' ? 'user' : 'model',
        parts: [{ text: msg.content }]
      }))
    });

    const result = await chat.sendMessage(messages[messages.length - 1].content);
    const response = await result.response;
    return response.text();
  }
}
```

#### API Endpoints

| Method | Endpoint | Description | Authentication |
|---------|----------|-------------|----------------|
| POST | https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent | Generate content | API Key |
| POST | https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:streamGenerateContent | Stream content | API Key |

#### Request Format

```typescript
interface GenerateContentRequest {
  contents: Array<{
    parts: Array<{
      text: string;
    }>;
  }>;
  generationConfig?: {
    temperature?: number;
    topK?: number;
    topP?: number;
    maxOutputTokens?: number;
  };
}
```

#### Response Format

```typescript
interface GenerateContentResponse {
  candidates: Array<{
    content: {
      parts: Array<{
        text: string;
      }>;
    };
  }>;
}
```

## 🔌 Internal APIs

### Component Props API

#### KnitWorkflowDemo Component

```typescript
interface KnitWorkflowDemoProps {
  compact?: boolean;        // Enable compact mode for embedded display
  headless?: boolean;       // Remove header/footer for integration
}
```

#### ContactForm Component

```typescript
interface ContactFormProps {
  onSubmit?: (data: ContactFormData) => void;
  className?: string;
  showTitle?: boolean;
}
```

#### Workflow Components

```typescript
interface WorkflowLogCardProps {
  log: WorkflowLog;
}

interface WorkflowMilestoneCardProps {
  milestone: WorkflowMilestone;
}

interface SimpleChartProps {
  data?: ChartData[];
  height?: number;
}
```

### Custom Hooks API

#### useWorkflowDemo Hook

```typescript
interface UseWorkflowDemoReturn {
  phase: Phase;
  inputValue: string;
  logs: WorkflowLog[];
  milestones: WorkflowMilestone[];
  resetDemo: () => void;
}
```

#### useContactForm Hook

```typescript
interface UseContactFormReturn {
  formData: ContactFormData;
  errors: FormErrors;
  isSubmitting: boolean;
  isValid: boolean;
  handleChange: (field: keyof ContactFormData, value: string) => void;
  handleSubmit: (e: FormEvent) => Promise<void>;
  resetForm: () => void;
}
```

## 📊 Data Types

### Workflow Types

```typescript
// types/workflow.ts
export type Phase = 'input' | 'setup' | 'operate';

export interface WorkflowLog {
  id: string;
  text: string;
  status: 'pending' | 'processing' | 'done';
  time?: string;
}

export interface WorkflowMilestone {
  id: string;
  title: string;
  desc: string;
  status: 'pending' | 'processing' | 'done';
  items: string[];
}

export interface ChartData {
  name: string;
  value: number;
  date: string;
}
```

### Contact Types

```typescript
// types/contact.ts
export interface ContactFormData {
  from_name: string;
  from_email: string;
  message: string;
  phone?: string;
  company?: string;
}

export interface FormErrors {
  from_name?: string;
  from_email?: string;
  message?: string;
  phone?: string;
}

export interface ContactFormResponse {
  success: boolean;
  message: string;
  data?: any;
}
```

## 🔐 Security

### API Key Management

1. **Environment Variables**: Store API keys in `.env.local`
2. **Client-Side Only**: Public keys are safe for client-side use
3. **Rate Limiting**: Implement client-side rate limiting
4. **Validation**: Validate all API responses

### Content Security Policy

```html
<meta http-equiv="Content-Security-Policy" content="
  connect-src 'self' 
    https://api.emailjs.com 
    https://generativelanguage.googleapis.com;
">
```

### Error Handling

```typescript
// utils/apiErrorHandler.ts
export const handleApiError = (error: any, apiName: string) => {
  console.error(`${apiName} API Error:`, error);
  
  // Log to monitoring service
  if (import.meta.env.PROD) {
    // Send to error tracking service
  }
  
  // Return user-friendly message
  if (error.status === 429) {
    return 'Service temporarily unavailable. Please try again.';
  }
  if (error.status >= 500) {
    return 'Service error. Please try again later.';
  }
  return 'Request failed. Please check your input.';
};
```

## 🧪 Testing API Integrations

### Mock Services

```typescript
// __tests__/mocks/emailjs.ts
export const mockEmailJS = {
  send: jest.fn().mockResolvedValue({
    status: 200,
    text: 'OK'
  })
};

// __tests__/mocks/gemini.ts
export const mockGemini = {
  generateResponse: jest.fn().mockResolvedValue('Mock AI response'),
  generateChatResponse: jest.fn().mockResolvedValue('Mock chat response')
};
```

### Test Examples

```typescript
// __tests__/hooks/useContactForm.test.ts
import { renderHook, act } from '@testing-library/react';
import { useContactForm } from '../hooks/useContactForm';

describe('useContactForm', () => {
  it('should handle form submission', async () => {
    const { result } = renderHook(() => useContactForm());
    
    await act(async () => {
      await result.current.handleSubmit(mockEvent);
    });
    
    expect(result.current.isSubmitting).toBe(false);
    expect(mockEmailJS.send).toHaveBeenCalled();
  });
});
```

## 📈 Performance Optimization

### API Caching

```typescript
// utils/apiCache.ts
const apiCache = new Map<string, { data: any; timestamp: number }>();

export const cachedFetch = async (url: string, ttl: number = 300000) => {
  const cached = apiCache.get(url);
  
  if (cached && Date.now() - cached.timestamp < ttl) {
    return cached.data;
  }
  
  const response = await fetch(url);
  const data = await response.json();
  
  apiCache.set(url, { data, timestamp: Date.now() });
  return data;
};
```

### Request Debouncing

```typescript
// hooks/useDebounce.ts
export const useDebounce = <T>(value: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};
```

## 🔍 Monitoring and Debugging

### API Logging

```typescript
// utils/apiLogger.ts
export const logApiCall = (apiName: string, endpoint: string, method: string) => {
  if (import.meta.env.DEV) {
    console.log(`🔗 ${apiName} API Call:`, {
      endpoint,
      method,
      timestamp: new Date().toISOString()
    });
  }
};

export const logApiResponse = (apiName: string, status: number, duration: number) => {
  if (import.meta.env.DEV) {
    console.log(`✅ ${apiName} API Response:`, {
      status,
      duration: `${duration}ms`,
      timestamp: new Date().toISOString()
    });
  }
};
```

### Error Tracking

```typescript
// utils/errorTracking.ts
export const trackApiError = (error: any, context: {
  apiName: string;
  endpoint: string;
  method: string;
  userId?: string;
}) => {
  // Send to error tracking service
  if (import.meta.env.PROD && window.Sentry) {
    window.Sentry.captureException(error, {
      tags: {
        api: context.apiName,
        endpoint: context.endpoint
      },
      extra: context
    });
  }
};
```

## 📚 Additional Resources

- [EmailJS Documentation](https://www.emailjs.com/docs/)
- [Google Gemini API Documentation](https://ai.google.dev/docs)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)

For API support or questions, contact our development team at dev@knit.cash.
