# AI Agents Platform

A comprehensive showcase website for AI agents with authentication, dashboard, and full backend integration.

## 🚀 Features

- **Authentication System** - Complete signup/login with API integration
- **User Dashboard** - Agent management and analytics
- **Responsive Design** - Mobile and desktop optimized
- **API Integration** - RESTful backend with Next.js API routes
- **Agent Marketplace** - Browse and deploy AI agents
- **Contact System** - Functional contact form with backend

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes
- **Authentication**: Cookie-based sessions
- **Components**: Custom UI components with Radix UI
- **Icons**: Lucide React

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/PresidentAnderson/agents-showcase.git

# Navigate to project directory
cd agents-showcase

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 🌐 Deployment

### Vercel (Recommended)

1. **Connect to Vercel**:
   - Visit [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Deploy automatically

2. **Environment Variables** (if needed):
   ```
   NEXTAUTH_SECRET=your-secret-key
   NEXTAUTH_URL=your-domain.vercel.app
   ```

### Manual Deployment

```bash
# Build the project
npm run build

# Start production server
npm start
```

## 🔧 API Endpoints

- `POST /api/auth/login` - User authentication
- `POST /api/auth/signup` - User registration
- `POST /api/auth/logout` - User logout
- `GET /api/auth/me` - Get current user
- `POST /api/contact` - Contact form submission

## 🎯 Demo Credentials

- **Email**: demo@example.com
- **Password**: password

## 📱 Pages

- `/` - Homepage with hero and features
- `/login` - User authentication
- `/signup` - User registration
- `/dashboard` - User dashboard (requires auth)
- `/agents` - Agent marketplace
- `/pricing` - Subscription plans
- `/features` - Platform features
- `/docs` - Documentation
- `/contact` - Contact form

## 🤖 AI Agents

The platform includes various AI agent types:
- General Purpose Agent
- Code Review Expert
- Data Science Analyst
- Disk Organizer
- Research Assistant
- Content Creator

## 🔒 Security

- HTTP-only cookies for authentication
- CSRF protection
- Input validation and sanitization
- Secure headers configuration

## 📄 License

MIT License - see LICENSE file for details

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

---

**Status**: ✅ Production Ready - Full functionality implemented

Deploy to Vercel: [![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/git/external?repository-url=https://github.com/PresidentAnderson/agents-showcase)
