# Knit - AI Financial Infrastructure

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

## 📦 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn package manager

### Installation

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

## 🎯 What We Do

Knit transforms financial management for educational institutions through:

- **Automated Payment Recovery**: AI-driven collection strategies
- **Risk Assessment**: Predictive analytics for payment behavior
- **Compliance Management**: Built-in regulatory compliance
- **Real-Time Analytics**: Live financial dashboards and insights
- **Multi-Channel Communication**: Automated WhatsApp, email, and SMS

## 🌟 Use Cases

### For Schools
- **Tuition Fee Management**: Automated collection and reminders
- **Payment Plans**: Flexible payment arrangement management
- **Parent Communication**: Automated notifications and updates
- **Financial Reporting**: Comprehensive financial analytics

### For Businesses
- **Invoice Management**: Automated invoicing and follow-up
- **Cash Flow Optimization**: Predictive cash flow management
- **Customer Communication**: Multi-channel payment reminders
- **Risk Assessment**: AI-powered credit risk analysis

## 🏗️ Project Structure

```
knit---ai-financial-infrastructure/
├── components/           # React components
│   ├── contact/         # Contact form components
│   └── workflow/        # Workflow demo components
├── constants/           # Configuration constants
├── hooks/              # Custom React hooks
├── types/              # TypeScript type definitions
├── docs/               # Comprehensive documentation
└── public/             # Static assets
```

## 🔧 Development

### Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

### Environment Variables

```env
VITE_EMAILJS_PUBLIC_KEY=your_emailjs_public_key
VITE_EMAILJS_SERVICE_ID=your_emailjs_service_id
VITE_EMAILJS_TEMPLATE_ID=your_emailjs_template_id
```

## 📊 Performance

- **Bundle Size**: ~566KB (gzipped: ~148KB)
- **Load Time**: < 2 seconds on 3G
- **Core Web Vitals**: All green
- **Mobile Responsive**: Fully optimized

## 🔒 Security

- **Content Security Policy**: Strict CSP headers
- **HTTPS Only**: Enforced in production
- **No Sensitive Data**: Client-side security
- **Regular Audits**: Security best practices

## 🚀 Deployment

### Vercel (Recommended)
1. Connect repository to Vercel
2. Configure environment variables
3. Deploy automatically on push

### Netlify
1. Connect repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `dist`

## 📈 Roadmap

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

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](docs/CONTRIBUTING.md) for details.

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Email**: info@knit.cash
- **Phone**: +27 10 141 2770
- **Website**: https://www.knit.cash
- **Documentation**: https://docs.knit.cash

---

<div align="center">
  <p>Built with ❤️ for educational institutions in South Africa</p>
  <p>© 2024 Knit Financial Infrastructure</p>
</div>
