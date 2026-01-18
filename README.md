# 🤰 Leleka - Pregnancy Journey & Diary Companion

**A comprehensive web application that guides expectant mothers through their pregnancy journey with personalized weekly information and a personal diary for tracking memories.**

---

## 📋 Table of Contents

- [About](#about)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Development](#development)
- [Deployment](#deployment)
- [Contributors](#contributors)

---

## 🎯 About

**Leleka** is designed to support pregnant women by providing week-by-week information about pregnancy development and allowing them to document their personal journey. The application combines educational content about fetal and maternal development with a secure space for personal reflections.

### Problem Solved
- Pregnant women need reliable, week-by-week pregnancy information
- Expectant mothers want to track their emotional journey and memories
- Need for a single platform combining medical guidance with personal expression

---

## ✨ Features

### 📖 Journey Section
- **Week-by-week guides** showing baby and mother development
- **Responsive design** for desktop (two-pane), tablet, and mobile
- **Rich content** with details about fetal growth and maternal changes
- **Current week highlighting** based on pregnancy timeline

### 📔 Diary Section
- **Personal entries** with title, content, and timestamps
- **Desktop layout** (two-pane):
  - Left: Sortable list of all diary entries
  - Right: Detailed view of selected entry
- **Mobile layout**: List view with navigation to detailed entry page
- **Full CRUD operations**:
  - ✅ Create new entries (+ buttons throughout app)
  - ✅ Edit entries with modal form
  - ✅ Delete entries with confirmation
  - ✅ View entry history

### 🔐 Authentication
- Secure login/registration system
- Session-based authentication with cookies
- Protected routes and API endpoints
- User profile management

### 💅 Design & UX
- Responsive design (mobile-first approach)
- Smooth animations and transitions
- Accessible components and keyboard navigation
- Modern UI with design system

---

## 🛠 Tech Stack

### Frontend
- **Framework**: Next.js 16+ (App Router, Server Components)
- **Language**: TypeScript
- **Styling**: CSS Modules + Design System variables
- **State Management**: Zustand (UI state)
- **Data Fetching**: TanStack React Query (server state)
- **HTTP Client**: Axios
- **Responsive**: CSS Flexbox, Media Queries

### Backend
- **Framework**: Node.js + Express (or similar)
- **API**: RESTful architecture
- **Database**: MongoDB/PostgreSQL
- **Authentication**: Session-based (cookies)
- **Endpoints**: 
  - `/weeks/{weekNumber}` - Weekly data
  - `/weeks/{weekNumber}/baby` - Baby development
  - `/weeks/{weekNumber}/mom` - Mom information
  - `/diaries` - Get all, create diary entries
  - `/diaries/{entryId}` - Update, delete entries

### DevOps & Tools
- **Deployment**: Vercel (frontend), Render (backend)
- **Version Control**: Git + GitHub
- **Package Manager**: npm
- **Build Tool**: Next.js built-in
- **Code Quality**: ESLint, TypeScript strict mode

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** 18+ 
- **npm** 9+
- **Git**

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/engapantio/leleka-01-team-project.git
cd leleka-01-team-project
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure environment variables**
```bash
cp .env.example .env
# Edit .env with your settings
```

4. **Start development server**
```bash
npm run dev
```

5. **Open in browser**
```
http://localhost:3000
```
```

---


## 🔧 Environment Variables

### `.env` (Frontend)

```env
# Backend API
NEXT_PUBLIC_API_URL=http://localhost:3000/api

# Optional: Vercel Analytics
NEXT_PUBLIC_VERCEL_ANALYTICS_ID=your_id


```



---

## 💻 Development

### Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint

# Type checking
npx tsc --noEmit

# Run tests (when available)
npm run test
```

### Code Style & Standards

- **TypeScript**: Strict mode enabled
- **ESLint**: Configured for Next.js
- **Formatting**: Consistent with project setup
- **Git Hooks**: Pre-commit linting (configure if needed)

### Key Patterns

- **Server Components**: Use for data fetching when possible
- **Client Components**: Mark with `'use client'` when needed
- **State Management**:
  - Zustand for UI state (selected entry, theme, etc.)
  - React Query for server state (API data)
- **API Calls**: Use hooks (`useDiaries`, `useCreateDiaryMutation`, etc.)
- **Error Handling**: Try-catch in mutations, user-facing errors in modals

---

## 🚢 Deployment

### Frontend (Vercel - Recommended)

```bash
# Push to GitHub
git add .
git commit -m "feat: update feature"
git push origin main

# Auto-deploy on Vercel
# Configure at: https://vercel.com/dashboard
```

**Vercel Setup:**
1. Connect GitHub repository
2. Set environment variables in Vercel dashboard
3. Deploy main branch
4. Preview branches auto-deploy


### Production Checklist

- [ ] Environment variables configured
- [ ] API URL points to production backend
- [ ] Database migrations completed
- [ ] SSL certificates valid
- [ ] Analytics tracking enabled
- [ ] Error monitoring (Sentry) configured
- [ ] Backups configured
- [ ] Performance monitoring enabled



---

## 🤝 Contributing

### How to Contribute

1. Create a feature branch: `git checkout -b feature/your-feature`
2. Commit changes: `git commit -m 'feat: add new feature'`
3. Push to branch: `git push origin feature/your-feature`
4. Open a Pull Request

### Code Review Process

- All PRs require at least 1 approval
- CI checks must pass
- No conflicts with main branch

---

## 👥 Team

This project was created by the **Project-01 Team** as part of the GoIT final team project task.

### Current Contributors

See [CONTRIBUTORS.md](CONTRIBUTORS.md) or GitHub [contributors page](https://github.com/engapantio/leleka-01-team-project/graphs/contributors).

---

## 📝 License

This project is licensed under the **MIT License** 

---

## ❓ FAQ

### Q: Can I use Leleka offline?
**A:** Currently, Leleka requires internet connection. Offline support is planned for future versions.

### Q: Is my data secure?
**A:** Yes. All data is encrypted in transit (HTTPS) and at rest. Authentication is session-based with secure cookies.

### Q: Can I export my diary entries?
**A:** Not yet, but this is in the roadmap for v2.0.

### Q: What if I have a question?
**A:** Create an issue on GitHub or contact the development team.

---

## 🗺 Roadmap

- [ ] v1.1 - Export diary entries as PDF
- [ ] v1.2 - Modes refinements
- [ ] v2.0 - Offline sync capability
- [ ] v2.1 - Partner access & notifications
- [ ] v2.2 - Multilingual support (Ukrainian, English, Polish, etc.)
- [ ] v3.0 - Mobile app (React Native)

---

## 🐛 Bug Report

Found a bug? Please create an issue with:
- Clear description of the bug
- Steps to reproduce
- Expected vs actual behavior
- Screenshots/recordings if applicable
- Your environment (OS, browser, Node version)

---

## 📞 Support

- 💬 GitHub Issues: [Report Issues](https://github.com/engapantio/leleka-01-team-project/issues)
- 📖 Documentation: [Wiki](https://github.com/engapantio/leleka-01-team-project/wiki)

---

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - React framework
- [TanStack React Query](https://tanstack.com/query/) - Server state management
- [Zustand](https://github.com/pmndrs/zustand) - Client state management
- [GoIT](https://goit.global/) - Educational partner
- All contributors and testers

---

**Made with ❤️ for expectant mothers**

*Leleka - Let's journey together through pregnancy.*
