# Deployment Guide

This guide covers deploying the Knit financial infrastructure platform to various hosting environments.

## 🚀 Quick Deploy Options

### Vercel (Recommended)

Vercel is the recommended platform for deploying Knit due to its seamless integration with React applications and automatic optimizations.

#### Prerequisites
- Vercel account
- GitHub repository connected
- Environment variables configured

#### Deployment Steps

1. **Connect Repository**
   ```bash
   # Install Vercel CLI
   npm i -g vercel
   
   # Login to Vercel
   vercel login
   
   # Link project
   vercel link
   ```

2. **Configure Environment Variables**
   ```bash
   # Set environment variables
   vercel env add VITE_EMAILJS_PUBLIC_KEY
   vercel env add VITE_EMAILJS_SERVICE_ID
   vercel env add VITE_EMAILJS_TEMPLATE_ID
   ```

3. **Deploy**
   ```bash
   # Deploy to production
   vercel --prod
   ```

#### Auto-Deployment Setup

1. Connect your GitHub repository to Vercel
2. Configure build settings:
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`
3. Enable automatic deployments on push to main

### Netlify

#### Deployment Steps

1. **Connect Repository**
   - Sign up at [netlify.com](https://netlify.com)
   - Connect your GitHub repository
   - Configure build settings

2. **Build Configuration**
   ```yaml
   # netlify.toml
   [build]
     command = "npm run build"
     publish = "dist"
   
   [build.environment]
     NODE_VERSION = "18"
   ```

3. **Environment Variables**
   - Set in Netlify dashboard under Site Settings > Environment Variables
   - Required: `VITE_EMAILJS_PUBLIC_KEY`, `VITE_EMAILJS_SERVICE_ID`, `VITE_EMAILJS_TEMPLATE_ID`

### AWS Amplify

#### Prerequisites
- AWS account
- Amplify CLI installed

#### Deployment Steps

1. **Initialize Amplify**
   ```bash
   npm install -g @aws-amplify/cli
   amplify configure
   amplify init
   ```

2. **Add Hosting**
   ```bash
   amplify add hosting
   # Choose "Continuous deployment (Git-based)"
   # Select your GitHub repository
   # Configure build settings
   ```

3. **Deploy**
   ```bash
   amplify publish
   ```

## 🐳 Docker Deployment

### Dockerfile

```dockerfile
# Multi-stage build for optimization
FROM node:18-alpine AS builder

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci --only=production

# Build application
COPY . .
RUN npm run build

# Production stage
FROM node:18-alpine AS runner

WORKDIR /app

# Create non-root user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy built application
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./package.json

# Set permissions
RUN chown -R nextjs:nodejs /app
USER nextjs

# Expose port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3000/ || exit 1

# Start application
CMD ["npm", "run", "preview"]
```

### Docker Compose

```yaml
# docker-compose.yml
version: '3.8'

services:
  knit-app:
    build:
      context: .
      dockerfile: Dockerfile
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3000/"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 40s

  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
      - ./ssl:/etc/nginx/ssl
    depends_on:
      - knit-app
    restart: unless-stopped
```

### Nginx Configuration

```nginx
# nginx.conf
events {
    worker_connections 1024;
}

http {
    upstream knit-app {
        server knit-app:3000;
    }

    server {
        listen 80;
        server_name knit.cash www.knit.cash;
        
        # Redirect to HTTPS
        return 301 https://$server_name$request_uri;
    }

    server {
        listen 443 ssl http2;
        server_name knit.cash www.knit.cash;

        # SSL Configuration
        ssl_certificate /etc/nginx/ssl/cert.pem;
        ssl_certificate_key /etc/nginx/ssl/key.pem;
        ssl_protocols TLSv1.2 TLSv1.3;
        ssl_ciphers HIGH:!aNULL:!MD5;

        # Security Headers
        add_header X-Frame-Options DENY;
        add_header X-Content-Type-Options nosniff;
        add_header X-XSS-Protection "1; mode=block";
        add_header Strict-Transport-Security "max-age=31536000; includeSubDomains";

        # Proxy to application
        location / {
            proxy_pass http://knit-app;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
        }

        # Static assets caching
        location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
            expires 1y;
            add_header Cache-Control "public, immutable";
        }
    }
}
```

## 🔧 Environment Configuration

### Environment Variables

Create `.env.production` for production deployments:

```env
# EmailJS Configuration
VITE_EMAILJS_PUBLIC_KEY=your_production_public_key
VITE_EMAILJS_SERVICE_ID=your_production_service_id
VITE_EMAILJS_TEMPLATE_ID=your_production_template_id

# Analytics (optional)
VITE_GA_TRACKING_ID=your_google_analytics_id
VITE_HOTJAR_ID=your_hotjar_id

# Feature Flags
VITE_ENABLE_ANALYTICS=true
VITE_ENABLE_CHATBOT=true
VITE_ENABLE_DEMO_MODE=false
```

### Build Optimization

#### Vite Configuration

```typescript
// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  build: {
    target: 'es2015',
    minify: 'terser',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          charts: ['recharts'],
          ui: ['lucide-react'],
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  server: {
    headers: {
      'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'DENY',
      'X-XSS-Protection': '1; mode=block',
    },
  },
});
```

## 📊 Performance Monitoring

### Core Web Vitals

Monitor these metrics in production:

1. **Largest Contentful Paint (LCP)** - < 2.5s
2. **First Input Delay (FID)** - < 100ms
3. **Cumulative Layout Shift (CLS)** - < 0.1

### Monitoring Tools

#### Google Analytics

```typescript
// analytics.ts
import { createGtm } from '@gtm-support/vue-gtm';

export const initAnalytics = () => {
  if (import.meta.env.PROD && import.meta.env.VITE_GA_TRACKING_ID) {
    createGtm({
      id: import.meta.env.VITE_GA_TRACKING_ID,
      enabled: true,
      debug: false,
    });
  }
};
```

#### Sentry Error Tracking

```typescript
// sentry.ts
import * as Sentry from '@sentry/react';

export const initSentry = () => {
  if (import.meta.env.PROD) {
    Sentry.init({
      dsn: import.meta.env.VITE_SENTRY_DSN,
      environment: 'production',
      tracesSampleRate: 0.1,
    });
  }
};
```

## 🔒 Security Considerations

### Content Security Policy

```html
<!-- index.html -->
<meta http-equiv="Content-Security-Policy" content="
  default-src 'self';
  script-src 'self' 'unsafe-inline' https://cdn.tailwindcss.com https://www.googletagmanager.com;
  style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
  font-src 'self' https://fonts.gstatic.com;
  img-src 'self' data: https:;
  connect-src 'self' https://api.emailjs.com https://generativelanguage.googleapis.com;
  frame-src 'none';
  object-src 'none';
">
```

### HTTPS Configuration

1. **Use HTTPS** in production
2. **Redirect HTTP to HTTPS**
3. **Implement HSTS** headers
4. **Use strong SSL/TLS** protocols

### Environment Security

1. **Never commit** `.env` files
2. **Use secret management** services
3. **Rotate API keys** regularly
4. **Limit API permissions**

## 🚦 CI/CD Pipeline

### GitHub Actions

```yaml
# .github/workflows/deploy.yml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      
      - run: npm ci
      - run: npm run lint
      - run: npm run test
      - run: npm run build

  deploy:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
          vercel-args: '--prod'
```

## 🔍 Troubleshooting

### Common Issues

#### Build Failures

```bash
# Clear cache
rm -rf node_modules
npm install

# Check Node version
node --version  # Should be 18+

# Check environment
npm run build
```

#### Deployment Errors

1. **Check build logs** for specific errors
2. **Verify environment variables** are set correctly
3. **Ensure all dependencies** are installed
4. **Check file permissions** on server

#### Performance Issues

1. **Analyze bundle size** with `npm run build -- --analyze`
2. **Optimize images** and assets
3. **Enable compression** on server
4. **Implement caching** strategies

### Monitoring Commands

```bash
# Check server status
curl -I https://your-domain.com

# Monitor response time
curl -w "@curl-format.txt" -o /dev/null -s https://your-domain.com

# Check SSL certificate
openssl s_client -connect your-domain.com:443
```

## 📋 Deployment Checklist

### Pre-Deployment

- [ ] **Tests passing** locally
- [ ] **Build successful** in production mode
- [ ] **Environment variables** configured
- [ ] **Security headers** implemented
- [ ] **Performance optimized** (bundle size, images)
- [ ] **Error tracking** configured
- [ ] **Analytics setup** (optional)

### Post-Deployment

- [ ] **Application accessible** via HTTPS
- [ ] **All pages loading** correctly
- [ ] **Forms submitting** properly
- [ ] **Mobile responsive** working
- [ ] **Core Web Vitals** within acceptable ranges
- [ ] **No console errors** or warnings
- [ ] **Analytics tracking** active

---

For additional support, contact our development team at dev@knit.cash or create an issue on GitHub.
