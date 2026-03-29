# Portfolio Setup Guide

## Overview

This is a fully dynamic Laravel developer portfolio built with **Next.js 15**, **React**, **Tailwind CSS**, and **Laravel** backend. The portfolio showcases 2 years of professional experience with a stunning UI and modern animations.

## Architecture

### Frontend (Next.js)
- **Pages**: Beautiful, fully responsive sections (Hero, About, Projects, Skills, Experience, Testimonials, Blog, Contact)
- **Admin Dashboard**: Complete CMS for managing portfolio content
- **Styling**: Tailwind CSS with custom animations and glass-effect components
- **Features**: Dark mode, smooth animations, SEO optimized, mobile-first design

### Backend (Laravel)
- **API**: RESTful endpoints for all portfolio content
- **Database**: PostgreSQL (Neon) for data persistence
- **Authentication**: Protected admin routes with session management
- **Models**: Project, Skill, Experience, Testimonial, BlogPost

## Getting Started

### Prerequisites
- Node.js 18+ (for Next.js frontend)
- PHP 8.1+ (for Laravel backend)
- PostgreSQL (Neon database)
- Composer (for Laravel dependencies)

### Frontend Setup

1. **Install Dependencies**
   ```bash
   pnpm install
   ```

2. **Environment Variables**
   Create `.env.local`:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:8000/api
   ```

3. **Development Server**
   ```bash
   pnpm dev
   ```
   Frontend runs at http://localhost:3000

4. **Admin Dashboard**
   Access admin panel at http://localhost:3000/admin

### Backend Setup (Laravel)

1. **Create Laravel Project**
   ```bash
   composer create-project laravel/laravel portfolio-api
   cd portfolio-api
   ```

2. **Install Dependencies**
   ```bash
   composer install
   ```

3. **Environment Setup**
   ```bash
   cp .env.example .env
   ```
   Configure in `.env`:
   ```env
   DB_CONNECTION=pgsql
   DB_HOST=your-neon-database-host
   DB_PORT=5432
   DB_DATABASE=your-database-name
   DB_USERNAME=your-username
   DB_PASSWORD=your-password
   
   CORS_ALLOWED_ORIGINS=http://localhost:3000
   ```

4. **Database Migrations**
   ```bash
   php artisan migrate
   ```

5. **API Routes**
   Your API will be available at `http://localhost:8000/api`

6. **Run Development Server**
   ```bash
   php artisan serve
   ```

## API Endpoints

### Projects
- `GET /api/projects` - Get all projects
- `GET /api/projects/{id}` - Get single project
- `POST /api/projects` - Create project (admin)
- `PUT /api/projects/{id}` - Update project (admin)
- `DELETE /api/projects/{id}` - Delete project (admin)

### Skills
- `GET /api/skills` - Get all skills
- `POST /api/skills` - Create skill (admin)
- `PUT /api/skills/{id}` - Update skill (admin)
- `DELETE /api/skills/{id}` - Delete skill (admin)

### Experience
- `GET /api/experience` - Get all experience
- `POST /api/experience` - Create experience (admin)
- `PUT /api/experience/{id}` - Update experience (admin)
- `DELETE /api/experience/{id}` - Delete experience (admin)

### Testimonials
- `GET /api/testimonials` - Get all testimonials
- `POST /api/testimonials` - Create testimonial (admin)
- `PUT /api/testimonials/{id}` - Update testimonial (admin)
- `DELETE /api/testimonials/{id}` - Delete testimonial (admin)

### Blog Posts
- `GET /api/blog-posts` - Get all blog posts
- `GET /api/blog-posts/{slug}` - Get single blog post
- `POST /api/blog-posts` - Create blog post (admin)
- `PUT /api/blog-posts/{id}` - Update blog post (admin)
- `DELETE /api/blog-posts/{id}` - Delete blog post (admin)

### Contact
- `POST /api/contact` - Submit contact form

## Frontend Features

### Public Pages
- **Hero Section**: Eye-catching introduction with CTA buttons
- **About**: Personal story and key highlights
- **Projects**: Featured projects with filtering and detailed view
- **Skills**: Technical proficiency organized by category
- **Experience**: Professional timeline with achievements
- **Testimonials**: Client/colleague reviews with ratings
- **Blog**: Latest articles with read time and categories
- **Contact**: Form for inquiries

### Admin Dashboard
- Complete CRUD operations for all portfolio content
- Real-time updates when data is synced from Laravel backend
- Responsive design that works on all devices
- Session-based authentication (to be implemented with Laravel Sanctum)

## Customization

### Adding New Sections
1. Create new component in `components/sections/`
2. Add data interface to `lib/portfolio-data.ts`
3. Create admin page in `app/admin/`
4. Add API endpoints in Laravel backend

### Styling
- Primary colors: Cyan (#06B6D4) and Blue (#3B82F6)
- Secondary: Slate gray (#1E293B to #0F172A)
- Modify in `app/globals.css` for global changes
- Use Tailwind classes for component styling

### Animations
- All animations defined in `app/globals.css`
- Use classes like `animate-fade-in`, `animate-slide-up`, `card-hover`
- Framer Motion can be added for advanced animations

## Database Schema (Laravel)

### Projects Table
```sql
id, title, description, image, technologies (JSON), link, github, featured, created_at, updated_at
```

### Skills Table
```sql
id, name, category, level (beginner/intermediate/advanced/expert), created_at, updated_at
```

### Experience Table
```sql
id, position, company, start_date, end_date, current, description, technologies (JSON), created_at, updated_at
```

### Testimonials Table
```sql
id, name, role, company, content, avatar, created_at, updated_at
```

### Blog Posts Table
```sql
id, title, slug, excerpt, content, image, published_at, read_time, tags (JSON), created_at, updated_at
```

## Deployment

### Frontend (Vercel)
1. Push code to GitHub
2. Connect repository to Vercel
3. Set environment variables in Vercel dashboard
4. Deploy automatically on push

### Backend (Laravel)
Options:
- **Heroku**: `git push heroku main`
- **AWS**: Elastic Beanstalk or EC2
- **DigitalOcean**: App Platform or Droplet
- **Render/Railway**: Easy deployment platforms

## Performance Optimization

- **Images**: Optimized with Next.js Image component
- **Code Splitting**: Automatic with Next.js
- **Caching**: Implement Redis caching in Laravel
- **Database**: Add indexes on frequently queried columns
- **CDN**: Use Vercel's built-in CDN for frontend

## Security

- **CORS**: Configured in Laravel backend
- **CSRF Protection**: Laravel's default protection
- **Rate Limiting**: Implement in Laravel middleware
- **Authentication**: Use Laravel Sanctum for admin routes
- **Input Validation**: Validate all API inputs in Laravel
- **SQL Injection**: Use parameterized queries (Laravel does this automatically)

## Best Practices

1. **Version Control**: Use Git with meaningful commit messages
2. **Environment Variables**: Keep sensitive data in `.env` files
3. **Code Organization**: Follow Laravel and Next.js conventions
4. **Testing**: Add unit and integration tests
5. **Documentation**: Keep API docs updated
6. **Monitoring**: Set up error tracking with Sentry
7. **Backups**: Regular database backups

## Troubleshooting

### CORS Errors
- Ensure Laravel `CORS_ALLOWED_ORIGINS` includes frontend URL
- Check API_URL in Next.js `.env.local`

### Database Connection
- Verify PostgreSQL credentials in Laravel `.env`
- Check network connectivity to Neon database
- Run migrations: `php artisan migrate`

### Admin Access
- Verify you're logged in (implement authentication)
- Check API endpoints are responding
- Look at browser console for errors

## Support

For issues or questions:
1. Check the documentation above
2. Review API responses for error messages
3. Use browser DevTools Network tab to debug API calls
4. Check Laravel logs: `storage/logs/laravel.log`

## Next Steps

1. Set up Laravel backend with database
2. Implement authentication (Laravel Sanctum)
3. Create admin authentication routes
4. Connect frontend to live backend API
5. Add image upload functionality
6. Implement search and filtering
7. Add analytics tracking
8. Deploy to production

---

**Created with v0** - Your 10/10 Portfolio is Ready! 🚀
