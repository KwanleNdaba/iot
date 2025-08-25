# Smart Sensor Flow - AIoT Platform

A comprehensive IoT platform that connects organizations with partner developers through a module marketplace ecosystem.

## 🚀 Overview

Smart Sensor Flow is an enterprise-grade AIoT platform that provides:

- **Organization Dashboard**: Complete IoT device management, monitoring, and analytics
- **Partner Program**: Module development, marketplace submission, and revenue tracking
- **Module Marketplace**: Discover, purchase, and integrate specialized IoT modules
- **Seamless Integration**: Modules become part of the main platform interface

## ✨ Features

### For Organizations
- Real-time IoT device monitoring
- Advanced analytics and reporting
- Custom dashboard creation
- Alert management system
- Module marketplace access
- Enterprise security and compliance

### For Partners
- Module development tools
- Marketplace submission workflow
- Revenue tracking and analytics
- Developer documentation
- Technical support resources

## 🏗️ Architecture

- **Frontend**: Next.js 15 + React 19 + TypeScript
- **Styling**: Tailwind CSS with custom design system
- **Icons**: Lucide React for consistent iconography
- **State Management**: React hooks for local state
- **Responsive Design**: Mobile-first approach

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd ssf-admin
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📱 Available Routes

### Main Pages
- `/` - Landing page with navigation to both UIs
- `/dashboard-overview` - Complete platform overview and architecture

### Organization UI
- `/organization` - Main organization dashboard
- `/organization/devices` - Device management
- `/organization/dashboards` - Custom dashboards
- `/organization/alerts` - Alert management
- `/organization/marketplace` - Module marketplace
- `/organization/settings` - Platform settings

### Partner Program UI
- `/partner` - Main partner dashboard
- `/partner/submissions` - Marketplace submissions
- `/partner/revenue` - Revenue tracking
- `/partner/support` - Technical support
- `/partner/docs` - Development documentation
- `/partner/settings` - Partner settings

## 🎯 User Flow

### Organization Journey
1. **Deploy IoT Infrastructure** - Connect devices to the platform
2. **Monitor Operations** - Use built-in dashboards and analytics
3. **Discover Modules** - Browse marketplace for specialized functionality
4. **Install & Integrate** - Seamlessly add new capabilities
5. **Enhanced Operations** - Leverage extended platform functionality

### Partner Journey
1. **Module Development** - Create specialized IoT modules
2. **Testing & Validation** - Test in development environment
3. **Marketplace Submission** - Submit for review and approval
4. **Publication** - Modules become available to organizations
5. **Revenue Generation** - Earn from module usage and subscriptions

## 🧩 Module Integration

Once installed, modules integrate seamlessly into the organization's platform:

- **New Navigation Items** - Module-specific sections added to sidebar
- **Enhanced Dashboards** - New widgets and data visualizations
- **Extended Functionality** - Additional features and capabilities
- **Unified Experience** - Consistent look and feel across the platform

## 🔧 Development

### Project Structure
```
├── app/                    # Next.js app directory
│   ├── organization/       # Organization UI routes
│   ├── partner/           # Partner Program routes
│   └── dashboard-overview/ # Platform overview
├── components/             # Reusable components
│   ├── layouts/           # Layout components
│   ├── marketplace/       # Marketplace components
│   └── ui/               # UI components
├── lib/                   # Utility functions
└── public/               # Static assets
```

### Key Components
- `AppLayout.tsx` - Shared layout for both UIs
- `ModuleMarketplace.tsx` - Marketplace interface
- `UserFlowDiagram.tsx` - Visual user flow representation

### Adding New Features
1. Create new components in the appropriate directory
2. Add routes in the app directory
3. Update navigation in AppLayout.tsx
4. Follow existing patterns for consistency

## �� Design System

### Color Palette
- **Primary**: Blue (#2563eb) - Organization UI
- **Secondary**: Green (#16a34a) - Partner Program
- **Accent**: Purple (#7c3aed) - Marketplace
- **Neutral**: Gray scale for text and backgrounds

### Typography
- **Headings**: Inter font family, bold weights
- **Body**: System font stack for readability
- **Code**: Monospace for technical content

### Components
- Consistent spacing using Tailwind's spacing scale
- Rounded corners (lg, xl) for modern feel
- Subtle shadows and borders for depth
- Hover states and transitions for interactivity

## 📊 Data & State

Currently using mock data for demonstration:
- Device information and status
- Module details and pricing
- User statistics and metrics
- Alert and notification data

Ready for backend API integration:
- RESTful API endpoints
- Real-time WebSocket updates
- Database integration
- Authentication and authorization

## 🔒 Security Features

- Role-based access control
- Secure API endpoints
- Data encryption
- Audit logging
- Compliance frameworks

## 🚀 Deployment

### Production Build
```bash
npm run build
npm start
```

### Environment Variables
Create a `.env.local` file for environment-specific configuration:
```env
NEXT_PUBLIC_API_URL=your-api-url
NEXT_PUBLIC_APP_NAME=Smart Sensor Flow
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

- **Documentation**: Check the `/dashboard-overview` page
- **Issues**: Create an issue in the repository
- **Questions**: Contact the development team

## 🔮 Roadmap

### Upcoming Features
- AI-powered insights and predictions
- Mobile applications (iOS/Android)
- Advanced analytics and reporting
- Multi-tenant support
- API marketplace for third-party integrations

### Long-term Vision
- Global IoT ecosystem
- Machine learning capabilities
- Edge computing support
- Blockchain integration
- Industry-specific solutions

---

**Smart Sensor Flow** - Transforming IoT through partnership and innovation.
