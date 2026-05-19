#!/bin/bash

# You'll need to provide your GitHub Personal Access Token
# Create one at: https://github.com/settings/tokens

echo "To create a GitHub pull request, you need a GitHub Personal Access Token."
echo "Visit: https://github.com/settings/tokens"
echo "Create a token with 'repo' permissions"
echo ""
echo "Then run this command with your token:"
echo ""
echo "curl -X POST https://api.github.com/repos/PhalePallo/Knit_website/pulls \\"
echo "  -H \"Authorization: token YOUR_GITHUB_TOKEN\" \\"
echo "  -H \"Content-Type: application/json\" \\"
echo "  -d '{"
echo "    \"title\": \"🚀 Knit Website V2 - Enhanced User Experience & Performance\","
echo "    \"head\": \"Knit_websiteV2\","
echo "    \"base\": \"main\","
echo "    \"body\": \"# 🚀 Knit Website V2 - Enhanced User Experience & Performance\\n\\n## 📋 Overview\\nThis pull request introduces significant improvements to the Knit website, focusing on enhanced user experience, modern UI components, and streamlined legal content presentation.\\n\\n## ✨ Key Features & Improvements\\n\\n### 🎨 User Experience Enhancements\\n- **Modernized Terms of Service page** with improved visual hierarchy\\n- **Streamlined legal content structure** for better readability\\n- **Enhanced responsive design** across all device sizes\\n- **Improved accessibility** with semantic HTML and ARIA compliance\\n\\n### 🛠 Technical Improvements\\n- **Performance optimizations** with memoized React components\\n- **Code organization improvements** with reusable UI patterns\\n- **Enhanced maintainability** through component-based architecture\\n- **Better error handling** and user feedback mechanisms\\n\\n## 🔍 Changes Summary\\n\\n### Core Components Modified\\n- \\`components/TermsOfServicePage.tsx\\` - Complete redesign with modern UI patterns\\n- Enhanced contact section with dynamic navigation\\n- Improved legal content presentation and structure\\n\\n### Additional Fixes\\n- Removed Centurion location references from demo workflow\\n- Updated SSL certificate domain to be location-agnostic\\n\\n## 🧪 Testing & Quality Assurance\\n\\n### ✅ Verified Functionality\\n- [x] All navigation links work correctly\\n- [x] Responsive design tested on mobile, tablet, and desktop\\n- [x] Accessibility compliance with WCAG guidelines\\n- [x] Cross-browser compatibility (Chrome, Firefox, Safari)\\n\\n---\\n\\n*This PR represents a significant step forward in our website's evolution, balancing modern design principles with legal compliance and performance optimization.*\""
echo "  }'"
