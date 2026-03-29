# Quick Start Guide

Get your professional Laravel developer portfolio up and running in 5 minutes!

## What You Have

A complete, production-ready portfolio with:
- **Beautiful Frontend**: Next.js 15 with Tailwind CSS and smooth animations
- **Admin Dashboard**: Complete CMS for managing all content
- **8 Professional Sections**: Hero, About, Projects, Skills, Experience, Testimonials, Blog, Contact
- **Responsive Design**: Perfect on mobile, tablet, and desktop
- **API Ready**: Configured to connect to Laravel backend
- **Sample Data**: 6 projects, 16 skills, 3 experiences, 4 testimonials, 3 blog posts

## 🚀 Quick Setup

### Prerequisites
- Node.js 18+ installed
- npm or pnpm package manager

### Step 1: Install Dependencies
```bash
npm install
# or
pnpm install
```

### Step 2: Run Development Server
```bash
npm run dev
# or
pnpm dev
```

### Step 3: View Portfolio
Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📝 Customize Your Content

### Edit Your Portfolio Information
Edit `/lib/portfolio-data.ts` to update all content:

```typescript
// Update portfolio owner info
export const portfolioOwner = {
  name: 'Your Name',
  title: 'Senior Laravel Developer',
  email: 'your@email.com',
  phone: '+1 (555) 123-4567',
  location: 'Your City, Country',
  // ... more fields
};

// Update projects array
export const projectsData = [
  {
    id: 'project-1',
    title: 'Your Project',
    description: 'Project details',
    image: '/path-to-image.jpg',
    technologies: ['Laravel', 'React', 'PostgreSQL'],
    featured: true,
  },
  // Add more projects
];

// Update skills
export const skillsData = [
  { id: 'skill-1', name: 'Laravel', category: 'Backend', level: 'expert' },
  // Add more skills
];
```

### Edit via Admin Dashboard
Alternatively, use the admin panel at [http://localhost:3000/admin](http://localhost:3000/admin) to manage content visually.

## 🎨 Customize Colors

Edit `/app/globals.css` and update the CSS variables:

```css
:root {
  --primary: #0f172a;
  --accent: #06b6d4;
  /* Change to your preferred colors */
}
```

### Color Schemes
- **Cyan/Blue** (Current): Modern tech feel
- **Purple/Pink**: Creative energy
- **Green/Emerald**: Growth focused
- **Orange/Red**: Bold & energetic

## 🏗️ Project Structure

```
📁 app/
  ├── 📄 page.tsx (Main portfolio page)
  ├── 📄 layout.tsx (Root layout)
  ├── 📁 api/ (Mock API endpoints)
  ├── 📁 admin/ (Admin dashboard)
  │   ├── 📄 page.tsx (Admin home)
  │   ├── 📁 projects/
  │   ├── 📁 skills/
  │   ├── 📁 experience/
  │   ├── 📁 blog/
  │   └── 📁 testimonials/
  └── 📁 globals.css (Global styles)

📁 components/
  ├── 📄 Header.tsx
  ├── 📄 Footer.tsx
  └── 📁 sections/
      ├── 📄 Hero.tsx
      ├── 📄 About.tsx
      ├── 📄 Projects.tsx
      ├── 📄 Skills.tsx
      ├── 📄 Experience.tsx
      ├── 📄 Testimonials.tsx
      ├── 📄 Blog.tsx
      └── 📄 Contact.tsx

📁 lib/
  ├── 📄 api.ts (API utilities)
  └── 📄 utils.ts (Helper functions)

📄 README.md (Full documentation)
📄 LARAVEL_SETUP.md (Backend setup guide)
📄 DEPLOYMENT.md (Deployment guide)
```

## 🔗 Connect to Backend (Optional)

### Using Mock API (Demo Mode)
The portfolio works out of the box with mock data. Content is fetched from `/app/api/` endpoints.

### Connect to Real Laravel Backend

1. **Update API URL** in `.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api
```

2. **Follow Laravel Setup Guide**:
   - See `LARAVEL_SETUP.md` for detailed instructions
   - Set up your Laravel backend
   - Run migrations and seed data

3. **Update Components**:
   Replace mock data with API calls using the utilities in `lib/api.ts`

Example:
```typescript
import { projectsAPI } from '@/lib/api';

export default async function Projects() {
  const { data } = await projectsAPI.getAll();
  return (
    // Display data
  );
}
```

## 📱 Admin Dashboard

Access the admin panel at [http://localhost:3000/admin](http://localhost:3000/admin)

### Features
- Manage projects
- Update skills
- Handle experience
- Manage testimonials
- Write blog posts
- Update settings

**Note:** In demo mode, changes are stored in memory. For persistent data, connect to Laravel backend.

## 🎯 Essential Pages to Update

1. **Hero Section** - `/components/sections/Hero.tsx`
   - Change tagline
   - Update CTA buttons
   - Add your image

2. **About Section** - `/components/sections/About.tsx`
   - Write your bio
   - Update highlights
   - Add your statistics

3. **Projects** - `/app/api/projects/route.ts`
   - Add your best projects
   - Include project images
   - Add GitHub links

4. **Contact** - `/components/sections/Contact.tsx`
   - Update email address
   - Add your contact info
   - Verify form submission

## 🚢 Deploy

### Deploy to Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

Or connect GitHub to Vercel for automatic deployments.

### Deploy Backend
See `DEPLOYMENT.md` for detailed deployment options:
- Heroku
- Railway
- DigitalOcean
- AWS
- Others

## 🎓 Learning Resources

### For Next.js/React
- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)

### For Laravel (Backend)
- [Laravel Documentation](https://laravel.com/docs)
- [Laravel API Best Practices](https://laravel.com/docs/11.x/eloquent-api-resources)
- [PostgreSQL Guide](https://www.postgresql.org/docs)

## ❓ Common Questions

### Q: Can I use the mock API for production?
**A:** Not recommended. Mock data is stored in memory and resets on deploy. Use Laravel backend for persistence.

### Q: How do I change the color scheme?
**A:** Edit CSS variables in `/app/globals.css`. All colors are customizable.

### Q: How do I add a blog section?
**A:** Blog is already included! Edit `/app/api/blog/route.ts` or connect to Laravel backend.

### Q: Can I add more sections?
**A:** Yes! Create new component in `/components/sections/` and import it in `/app/page.tsx`.

### Q: How do I add authentication for admin panel?
**A:** Currently uses demo mode. Add authentication via:
- NextAuth.js for frontend
- Laravel authentication for backend
- JWT tokens for API communication

## 🐛 Troubleshooting

### Port 3000 already in use
```bash
# Use different port
npm run dev -- -p 3001
```

### Module not found errors
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

### Styling issues
```bash
# Rebuild Tailwind
npm run build
# Clear browser cache (Ctrl+Shift+Delete)
```

### API connection issues
- Check `NEXT_PUBLIC_API_URL` in `.env.local`
- Ensure backend server is running
- Check browser console for error messages

## 📚 Next Steps

1. **Customize your content** - Update projects, skills, experience
2. **Add your images** - Replace placeholder images
3. **Connect real backend** - Follow Laravel setup guide
4. **Deploy** - Follow deployment guide
5. **Monitor** - Set up analytics and monitoring
6. **Maintain** - Keep portfolio updated with new projects

## 🎉 You're All Set!

Your portfolio is now ready! Start customizing and show the world your amazing work.

For detailed documentation, see:
- `README.md` - Full documentation
- `LARAVEL_SETUP.md` - Backend setup
- `DEPLOYMENT.md` - Production deployment

Happy coding! 🚀
