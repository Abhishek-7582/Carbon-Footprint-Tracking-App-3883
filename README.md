# 🛒 E-commerce Marketplace

A modern, feature-rich marketplace built with React, Supabase, and Tailwind CSS.

## 🚀 Features

- **User Authentication** - Secure login/registration with Supabase Auth
- **Product Management** - Add, edit, and manage product listings
- **Shopping Cart** - Full cart functionality with persistent storage
- **Search & Filter** - Advanced product search and filtering
- **Seller Dashboard** - Comprehensive seller tools and analytics
- **Responsive Design** - Mobile-first, beautiful UI
- **Real-time Updates** - Live product updates with Supabase

## 🛠️ Tech Stack

- **Frontend**: React 18, Vite, Tailwind CSS
- **Backend**: Supabase (PostgreSQL, Auth, Storage)
- **State Management**: React Context
- **Animations**: Framer Motion
- **Icons**: React Icons
- **Routing**: React Router DOM

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd ecommerce-marketplace
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Add your Supabase credentials to `.env`:
   ```
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

## 🗄️ Database Setup

The application uses Supabase with the following schema:

- **Users** - User profiles and authentication
- **Products** - Product listings and details
- **Categories** - Product categories
- **Orders** - Order management
- **Reviews** - Product reviews and ratings

## 🚀 Deployment

### Vercel Deployment
1. Push to GitHub
2. Connect repository to Vercel
3. Add environment variables
4. Deploy!

### Manual Deployment
```bash
npm run build
npm run preview
```

## 🔧 Configuration

### Supabase Setup
1. Create a new Supabase project
2. Run the database migrations
3. Configure authentication providers
4. Set up storage buckets for product images

### GitHub Integration
1. Create repository
2. Set up GitHub Actions (optional)
3. Configure branch protection rules

## 📱 Features Overview

### For Buyers
- Browse products by category
- Advanced search and filters
- Shopping cart with persistence
- Order tracking
- User reviews and ratings

### For Sellers
- Product listing management
- Sales dashboard
- Order management
- Performance analytics

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details

## 🆘 Support

For support, email support@marketplace.com or create an issue on GitHub.

---

Built with ❤️ using React and Supabase