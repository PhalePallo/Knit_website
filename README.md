<div align="center">
  <img src="/knit-logo.png" alt="Knit Logo" width="200" />
  <h1>Knit - AI Financial Infrastructure</h1>
  <p>Next-generation financial infrastructure for schools and businesses powered by AI</p>
</div>

## 🚀 Overview

Knit provides AI-powered financial infrastructure specifically designed for educational institutions and businesses. Our platform automates payment recovery, risk assessment, and financial workflows with intelligent automation.

### ✨ Key Features

- **AI-Powered Automation**: Intelligent payment recovery and risk assessment
- **School Management Integration**: Seamless integration with existing school systems
- **Compliance-First**: Built with South African regulatory standards (SASA, POPIA, NCR)
- **Real-Time Dashboard**: Live financial insights and analytics
- **Multi-Channel Communication**: WhatsApp, email, and SMS automation

## 🛠️ Technology Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS + shadcn/ui components
- **State Management**: React Hooks + Context API
- **Charts**: Recharts for data visualization
- **Communication**: EmailJS for contact forms
- **Deployment**: Optimized for Vercel/Netlify

## 📦 Installation

### Prerequisites

- Node.js 18+ 
- npm or yarn package manager

### Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/PhalePallo/Knit-website.git
   cd Knit-website
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment setup**
   ```bash
   cp .env.example .env.local
   # Add your API keys to .env.local
   ```

4. **Run development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000`

## 🏗️ Project Structure

```
knit---ai-financial-infrastructure/
├── components/           # React components
│   ├── contact/         # Contact form components
│   └── workflow/        # Workflow demo components
├── constants/           # Configuration constants
├── hooks/              # Custom React hooks
├── types/              # TypeScript type definitions
├── public/             # Static assets
└── src/                # Source files
```

## 🧩 Component Architecture

### Modular Components

- **KnitWorkflowDemo**: Interactive demonstration of platform capabilities
- **ContactForm**: Modular contact form with validation
- **WorkflowLogCard**: Reusable log display component
- **WorkflowMilestoneCard**: Progress milestone component
- **SimpleChart**: Data visualization component

### Custom Hooks

- **useWorkflowDemo**: Manages workflow demonstration state
- **useContactForm**: Handles form validation and submission

### Type Definitions

- **workflow.ts**: Workflow-related TypeScript interfaces
- **contact.ts**: Contact form type definitions

## 🔧 Development

### Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

### Environment Variables

Create a `.env.local` file in the root directory:

```env
VITE_EMAILJS_PUBLIC_KEY=your_emailjs_public_key
VITE_EMAILJS_SERVICE_ID=your_emailjs_service_id
VITE_EMAILJS_TEMPLATE_ID=your_emailjs_template_id
```

## 🎨 Design System

### Color Palette

- **Primary**: Brand colors (#3b82f6, #1e40af)
- **Secondary**: Surface colors (#f8fafc, #e2e8f0)
- **Accent**: Emerald (#10b981) for success states
- **Alert**: Red (#ef4444) for error states

### Typography

- **Font**: Inter (system font stack)
- **Headings**: Bold weights (600-800)
- **Body**: Regular weight (400)
- **Code**: JetBrains Mono

### Components

Built with shadcn/ui design system:
- Consistent spacing and sizing
- Accessible color contrasts
- Responsive design patterns
- Smooth animations and transitions

## 📊 Performance

### Bundle Size

- **Total**: ~566KB (gzipped: ~148KB)
- **Components**: Lazy loaded for optimal performance
- **Images**: Optimized and compressed
- **Fonts**: System fonts for faster loading

### Optimization

- Code splitting with dynamic imports
- Image optimization with next-gen formats
- CSS minification and purging
- Tree shaking for unused code

## 🔒 Security

### Content Security Policy

Strict CSP headers configured for:
- Script execution from trusted sources
- Font loading from Google Fonts
- Image loading from same origin and trusted CDNs
- API calls to approved endpoints

### Data Protection

- No sensitive data in client-side code
- Environment variables for API keys
- HTTPS enforcement in production
- Regular security audits

## 🚀 Deployment

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Configure environment variables
3. Deploy automatically on push to main

### Netlify

1. Connect repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `dist`

### Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "preview"]
```

## 🧪 Testing

### Component Testing

```bash
npm run test        # Run unit tests
npm run test:watch  # Watch mode
npm run test:cover  # Coverage report
```

### E2E Testing

```bash
npm run test:e2e    # Playwright tests
npm run test:e2e:ui # Visual testing
```

## 📈 Monitoring

### Performance Metrics

- Core Web Vitals monitoring
- Bundle size tracking
- Error reporting and logging
- User analytics integration

### SEO Optimization

- Meta tags and structured data
- Open Graph and Twitter cards
- XML sitemaps
- Robots.txt configuration

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Standards

- Follow TypeScript strict mode
- Use ESLint and Prettier configurations
- Write meaningful commit messages
- Add tests for new features
- Update documentation

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Email**: info@knit.cash
- **Phone**: +27 10 141 2770
- **Website**: https://www.knit.cash
- **Documentation**: https://docs.knit.cash

## 🗺️ Roadmap

### Q3 2024
- [ ] Advanced AI predictions
- [ ] Mobile app development
- [ ] Enhanced reporting dashboard
- [ ] Multi-currency support

### Q4 2024
- [ ] API public release
- [ ] Third-party integrations
- [ ] Advanced analytics
- [ ] Enterprise features

---

<div align="center">
  <p>Built with ❤️ for educational institutions in South Africa</p>
  <p>© 2024 Knit Financial Infrastructure</p>
</div>
