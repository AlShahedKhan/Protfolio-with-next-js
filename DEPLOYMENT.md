# Complete Deployment & Testing Guide

Your professional Laravel developer portfolio is ready for production! This comprehensive guide covers deploying both your Next.js frontend and Laravel backend, with testing procedures, monitoring setup, and troubleshooting.

## Pre-Deployment Checklist

Before deploying to production, verify these critical items:

### Code Quality
- [ ] All TypeScript errors resolved (`npm run type-check`)
- [ ] No console.log statements in production code
- [ ] All environment variables documented
- [ ] Error handling implemented for all API calls
- [ ] No hardcoded URLs or API keys
- [ ] All components properly typed

### Frontend Testing
- [ ] Admin dashboard loads without errors
- [ ] All navigation links working
- [ ] Forms validate and submit correctly
- [ ] Responsive design verified (mobile, tablet, desktop)
- [ ] Images load and are optimized
- [ ] Animations perform smoothly

### Backend Testing
- [ ] All endpoints tested with Postman or curl
- [ ] Database migrations run successfully
- [ ] CORS headers configured correctly
- [ ] Rate limiting implemented
- [ ] Input validation on all endpoints
- [ ] Error responses formatted consistently

### Security Verification
- [ ] HTTPS/SSL configured
- [ ] CORS origins whitelist correct
- [ ] No sensitive data in code
- [ ] SQL injection prevention verified
- [ ] XSS protection enabled
- [ ] CSRF tokens working properly

### Performance Check
- [ ] Lighthouse score 90+
- [ ] API response time < 200ms
- [ ] Database queries optimized
- [ ] Images compressed (WebP format)
- [ ] Bundle size acceptable

## Frontend Deployment (Next.js on Vercel)

### Option 1: Deploy via Vercel UI (Recommended)

1. **Push your code to GitHub**
```bash
git add .
git commit -m "Initial portfolio commit"
git push origin main
```

2. **Connect to Vercel**
   - Go to [Vercel.com](https://vercel.com)
   - Click "Import Project"
   - Select your GitHub repository
   - Vercel will auto-detect it's a Next.js project

3. **Set Environment Variables**
   - In Vercel dashboard, go to Settings → Environment Variables
   - Add: `NEXT_PUBLIC_API_URL=https://your-laravel-api.com/api`

4. **Deploy**
   - Click "Deploy"
   - Your site will be live in ~1 minute

### Option 2: Deploy via CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel

# For production
vercel --prod
```

### Vercel Configuration

Optional: Create `vercel.json` for custom configuration:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "env": {
    "NEXT_PUBLIC_API_URL": "@api_url"
  }
}
```

## Backend Deployment (Laravel)

### Option 1: Deploy to Heroku

```bash
# Install Heroku CLI
# macOS: brew tap heroku/brew && brew install heroku
# Linux: curl https://cli-assets.heroku.com/install.sh | sh
# Windows: Download from heroku.com/windows

# Login
heroku login

# Create app
heroku create your-portfolio-api

# Add PostgreSQL
heroku addons:create heroku-postgresql:hobby-dev

# Set environment variables
heroku config:set APP_NAME="Portfolio API"
heroku config:set APP_KEY=base64:YOUR_APP_KEY
heroku config:set APP_ENV=production
heroku config:set APP_DEBUG=false

# Deploy from GitHub
# In Heroku dashboard: Connect to GitHub repo
# Enable automatic deploys from main branch

# Or deploy via CLI
git push heroku main
```

### Option 2: Deploy to Railway

1. **Connect GitHub**
   - Go to [railway.app](https://railway.app)
   - Click "New Project"
   - Select "Deploy from GitHub"
   - Choose your Laravel repo

2. **Configure**
   - Railway auto-detects Laravel
   - Sets up PostgreSQL automatically
   - Configure environment variables in dashboard

3. **Deploy**
   - Railway deploys automatically on push

### Option 3: Deploy to DigitalOcean

1. **Create Droplet**
   - Select Ubuntu 22.04 LTS
   - Choose $4-5/month plan minimum
   - Create SSH key

2. **SSH into Droplet**
```bash
ssh root@your_droplet_ip
```

3. **Install Dependencies**
```bash
apt update && apt upgrade -y

# Install PHP
apt install -y php8.2 php8.2-fpm php8.2-pgsql php8.2-json php8.2-mbstring php8.2-curl

# Install Composer
curl -sS https://getcomposer.org/installer | php
mv composer.phar /usr/local/bin/composer

# Install PostgreSQL
apt install -y postgresql postgresql-contrib

# Install Nginx
apt install -y nginx

# Install Node.js (for npm, if needed)
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
apt install -y nodejs
```

4. **Setup Database**
```bash
sudo -u postgres psql
CREATE DATABASE portfolio_db;
CREATE USER portfolio_user WITH PASSWORD 'strong_password';
ALTER ROLE portfolio_user SET client_encoding TO 'utf8';
ALTER ROLE portfolio_user SET default_transaction_isolation TO 'read committed';
GRANT ALL PRIVILEGES ON DATABASE portfolio_db TO portfolio_user;
\q
```

5. **Deploy Application**
```bash
cd /var/www
git clone your-repo portfolio-api
cd portfolio-api

# Install dependencies
composer install --no-dev

# Setup environment
cp .env.example .env
php artisan key:generate

# Configure .env with database details
nano .env
# Update: DB_HOST, DB_USERNAME, DB_PASSWORD, DB_DATABASE

# Run migrations
php artisan migrate --force

# Set permissions
chown -R www-data:www-data /var/www/portfolio-api
chmod -R 755 /var/www/portfolio-api/storage
```

6. **Configure Nginx**
```bash
sudo nano /etc/nginx/sites-available/portfolio-api
```

Add configuration:
```nginx
server {
    listen 80;
    server_name your-domain.com;
    
    root /var/www/portfolio-api/public;
    index index.php;
    
    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }
    
    location ~ \.php$ {
        include snippets/fastcgi-php.conf;
        fastcgi_pass unix:/var/run/php/php8.2-fpm.sock;
    }
    
    location ~ /\.ht {
        deny all;
    }
}
```

Enable site:
```bash
sudo ln -s /etc/nginx/sites-available/portfolio-api /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

7. **Setup SSL (Let's Encrypt)**
```bash
apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com
```

### Option 4: Deploy to AWS

1. **Launch EC2 Instance**
   - Choose Ubuntu 22.04 AMI
   - T2 micro (free tier eligible)

2. **Security Group**
   - Allow HTTP (80)
   - Allow HTTPS (443)
   - Allow SSH (22)

3. **Follow similar steps to DigitalOcean above**

## Environment Variables Checklist

### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=https://your-api.com/api
```

### Backend (.env)
```env
APP_NAME=Portfolio
APP_ENV=production
APP_KEY=base64:YOUR_KEY
APP_DEBUG=false
APP_URL=https://your-api.com

DB_CONNECTION=pgsql
DB_HOST=your-db-host
DB_PORT=5432
DB_DATABASE=portfolio_db
DB_USERNAME=your_user
DB_PASSWORD=your_password

CORS_ALLOWED_ORIGINS="https://your-domain.com"
```

## Domain Setup

### Using Custom Domain with Vercel

1. **Buy domain** from Namecheap, GoDaddy, etc.
2. **In Vercel dashboard:**
   - Project Settings → Domains
   - Add custom domain
   - Follow DNS instructions
3. **SSL certificate** is automatic

### Using Custom Domain with Backend

1. **Point DNS to your server IP**
2. **Add domain to Nginx configuration**
3. **Get SSL with Let's Encrypt** (shown above)

## Performance Optimization

### Frontend
- Images are optimized automatically
- Code splitting happens by default
- Enable ISR (Incremental Static Regeneration) for blog

### Backend
- Setup Laravel caching
- Use database indexing
- Implement Redis for sessions (optional)
- Setup CDN for media files

## Monitoring & Maintenance

### Vercel Dashboard
- Monitor build logs
- Check analytics
- View error tracking

### Backend
```bash
# Check Laravel logs
tail -f storage/logs/laravel.log

# Monitor server
top
df -h
netstat -tulpn

# Database backups
pg_dump portfolio_db > backup.sql
```

## Updating in Production

### Frontend
Simply push to main branch on GitHub:
```bash
git push origin main
# Vercel deploys automatically
```

### Backend (if using auto-deploy)
```bash
git push heroku main
# or
git push origin main
# (if connected via GitHub integration)
```

### Manual Backend Update
```bash
# SSH into server
git pull origin main
composer install --no-dev
php artisan migrate --force
php artisan cache:clear
```

## Troubleshooting

### 502 Bad Gateway (Backend)
- Check if Laravel is running
- Check PHP-FPM status: `systemctl status php8.2-fpm`
- Check Nginx logs: `/var/log/nginx/error.log`

### CORS Errors
- Update `CORS_ALLOWED_ORIGINS` in backend `.env`
- Ensure frontend and backend domains match

### Database Connection Errors
- Test connection: `psql -h host -U user -d database`
- Check `.env` credentials
- Ensure database is running and accessible

### SSL Certificate Issues
- Renew Let's Encrypt: `certbot renew`
- Setup auto-renewal: `systemctl enable certbot.timer`

## Backup Strategy

### Database Backups
```bash
# Daily backup
pg_dump portfolio_db > /backups/portfolio_$(date +%Y%m%d).sql

# Restore from backup
psql portfolio_db < backup.sql
```

### Application Backups
- GitHub is your backup for code
- Use Vercel's automatic backups for frontend
- For backend, regularly commit changes

---

Your portfolio is now ready for production! Monitor performance and user feedback, then continue improving your portfolio over time.
