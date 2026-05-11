# Contributing to Knit

Thank you for your interest in contributing to Knit! This document provides guidelines and standards for contributing to our AI financial infrastructure platform.

## 🤝 How to Contribute

### Reporting Issues

1. **Search existing issues** before creating a new one
2. **Use descriptive titles** and provide detailed descriptions
3. **Include steps to reproduce** for bug reports
4. **Add relevant labels** (bug, enhancement, question, etc.)

### Submitting Pull Requests

1. **Fork the repository** to your GitHub account
2. **Create a feature branch** from the main branch
3. **Make your changes** following our coding standards
4. **Test thoroughly** before submitting
5. **Submit a pull request** with a clear description

## 🏗️ Development Workflow

### Branch Naming Convention

- `feature/feature-name` - New features
- `fix/issue-description` - Bug fixes
- `docs/documentation-update` - Documentation changes
- `refactor/component-name` - Code refactoring
- `hotfix/critical-fix` - Urgent production fixes

### Commit Message Standards

Follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
type(scope): description

[optional body]

[optional footer]
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code formatting (no functional changes)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Build process or dependency updates

**Examples:**
```
feat(contact): add form validation
fix(workflow): resolve animation timing issues
docs(readme): update installation instructions
```

## 📝 Code Standards

### TypeScript Guidelines

1. **Use strict mode** - Enable all TypeScript strict checks
2. **Prefer explicit types** - Avoid `any` when possible
3. **Use interfaces** for object shapes
4. **Add JSDoc comments** for complex functions
5. **Export types** for public APIs

```typescript
// ✅ Good
interface User {
  id: string;
  name: string;
  email: string;
}

const createUser = (userData: Omit<User, 'id'>): User => {
  return {
    id: generateId(),
    ...userData,
  };
};

// ❌ Avoid
const createUser = (userData: any): any => {
  // implementation
};
```

### React Component Standards

1. **Functional components** with TypeScript
2. **Props interfaces** for all components
3. **Default props** when appropriate
4. **Destructure props** for clarity
5. **Use hooks** for state management

```typescript
// ✅ Good
interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  onClick 
}) => {
  return (
    <button 
      className={`btn btn-${variant}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

// ❌ Avoid
const Button = (props: any) => {
  return <button {...props} />;
};
```

### CSS and Styling

1. **Use Tailwind CSS** utilities
2. **Follow mobile-first** responsive design
3. **Maintain consistency** with design tokens
4. **Use semantic class names**
5. **Optimize for performance**

```typescript
// ✅ Good
<div className="flex flex-col md:flex-row gap-4 p-6 bg-white rounded-lg shadow-sm">

// ❌ Avoid
<div className="flex-col md:flex-row gap-4 p-6 bg-white rounded-lg shadow-sm flex">
```

## 🧪 Testing Standards

### Unit Testing

1. **Test component behavior** not implementation
2. **Use meaningful test names**
3. **Mock external dependencies**
4. **Test edge cases** and error states
5. **Maintain test coverage** above 80%

```typescript
// ✅ Good
describe('ContactForm', () => {
  it('should submit form with valid data', async () => {
    const mockSubmit = jest.fn();
    render(<ContactForm onSubmit={mockSubmit} />);
    
    fireEvent.change(screen.getByLabelText('Email'), {
      target: { value: 'test@example.com' }
    });
    fireEvent.click(screen.getByText('Submit'));
    
    await waitFor(() => {
      expect(mockSubmit).toHaveBeenCalledWith({
        email: 'test@example.com'
      });
    });
  });
});
```

### Integration Testing

1. **Test user workflows**
2. **Use real browser APIs** when possible
3. **Test responsive behavior**
4. **Verify accessibility** standards
5. **Test error scenarios**

## 📋 Code Review Process

### Review Checklist

- [ ] **Code follows** style guidelines
- [ ] **Tests are included** and passing
- [ ] **Documentation is updated**
- [ ] **No console errors** or warnings
- [ ] **Responsive design** works correctly
- [ ] **Accessibility standards** are met
- [ ] **Performance impact** is considered
- [ ] **Security implications** are evaluated

### Review Guidelines

1. **Be constructive** and helpful
2. **Explain reasoning** for suggestions
3. **Focus on code quality** not personal style
4. **Ask questions** if something is unclear
5. **Approve promptly** when ready

## 🔧 Development Setup

### Prerequisites

- Node.js 18+
- npm or yarn
- Git
- VS Code (recommended)

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/PhalePallo/Knit-website.git
   cd Knit-website
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment**
   ```bash
   cp .env.example .env.local
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

### Recommended VS Code Extensions

- **TypeScript Importer** - Auto import TypeScript modules
- **Tailwind CSS IntelliSense** - Tailwind class completion
- **ESLint** - Code linting and formatting
- **Prettier** - Code formatting
- **GitLens** - Enhanced Git capabilities

## 🚀 Release Process

### Version Management

We follow [Semantic Versioning](https://semver.org/):
- **Major (X.0.0)**: Breaking changes
- **Minor (X.Y.0)**: New features (backward compatible)
- **Patch (X.Y.Z)**: Bug fixes (backward compatible)

### Release Checklist

- [ ] **All tests are passing**
- [ ] **Documentation is updated**
- [ ] **CHANGELOG is updated**
- [ ] **Version is bumped**
- [ ] **Git tag is created**
- [ ] **Release is published**

### Deployment

1. **Merge to main** branch
2. **Create release tag**
3. **Deploy to staging** for testing
4. **Deploy to production** after approval
5. **Monitor** for issues

## 📚 Documentation Standards

### File Structure

```
docs/
├── api/           # API documentation
├── guides/        # User guides
├── components/    # Component documentation
└── deployment/    # Deployment guides
```

### Writing Guidelines

1. **Use clear headings** and subheadings
2. **Include code examples** for complex topics
3. **Add screenshots** for UI components
4. **Keep documentation** up to date
5. **Use consistent formatting**

## 🏆 Recognition

### Contributors

All contributors are recognized in:
- **README.md** - Contributor list
- **Release notes** - Feature attributions
- **Annual report** - Key contributors

### Recognition Levels

- **🌱 Contributor** - First contribution
- **🌿 Regular** - 5+ contributions
- **🌳 Core** - 20+ contributions
- **🌲 Maintainer** - Long-term contributor

## 🆘 Getting Help

### Resources

- **GitHub Issues** - Bug reports and feature requests
- **Discord Community** - Real-time discussions
- **Documentation** - Comprehensive guides
- **Blog** - Tutorials and announcements

### Contact

- **Email**: dev@knit.cash
- **Discord**: [Join our community](https://discord.gg/knit)
- **Twitter**: [@KnitFinance](https://twitter.com/KnitFinance)

---

Thank you for contributing to Knit! Your contributions help make financial infrastructure better for educational institutions and businesses. 🚀
