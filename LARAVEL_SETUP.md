# Laravel Backend Setup Guide

This guide will help you set up the Laravel backend API that powers your portfolio.

## Prerequisites

- PHP 8.2 or higher
- Composer
- PostgreSQL (recommended) or MySQL
- Git

## Installation Steps

### 1. Create New Laravel Project

```bash
composer create-project laravel/laravel portfolio-api
cd portfolio-api
```

### 2. Install Required Packages

```bash
composer require tymon/jwt-auth
composer require laravel/cors
```

### 3. Database Setup

Create a PostgreSQL database (or MySQL):
```bash
createdb portfolio_db
```

Update your `.env` file:
```env
DB_CONNECTION=pgsql
DB_HOST=127.0.0.1
DB_PORT=5432
DB_DATABASE=portfolio_db
DB_USERNAME=your_username
DB_PASSWORD=your_password
```

Or if using Neon:
```env
DB_CONNECTION=pgsql
DB_URL=postgresql://user:password@host/database?sslmode=require
```

### 4. Create Migrations

Create migration files:

```bash
php artisan make:migration create_projects_table
php artisan make:migration create_skills_table
php artisan make:migration create_experience_table
php artisan make:migration create_testimonials_table
php artisan make:migration create_blog_posts_table
php artisan make:migration create_settings_table
```

### 5. Define Models and Controllers

Create models:
```bash
php artisan make:model Project -mcr
php artisan make:model Skill -mcr
php artisan make:model Experience -mcr
php artisan make:model Testimonial -mcr
php artisan make:model BlogPost -mcr
php artisan make:model Setting -mcr
```

### 6. Define Database Schema

#### Projects Table
```php
Schema::create('projects', function (Blueprint $table) {
    $table->id();
    $table->string('title');
    $table->text('description');
    $table->string('image')->nullable();
    $table->json('tags');
    $table->string('link')->nullable();
    $table->string('github')->nullable();
    $table->enum('status', ['published', 'draft'])->default('draft');
    $table->timestamps();
});
```

#### Skills Table
```php
Schema::create('skills', function (Blueprint $table) {
    $table->id();
    $table->string('name');
    $table->string('category');
    $table->integer('level')->min(0)->max(100);
    $table->timestamps();
});
```

#### Experience Table
```php
Schema::create('experience', function (Blueprint $table) {
    $table->id();
    $table->string('role');
    $table->string('company');
    $table->string('period');
    $table->string('duration');
    $table->text('description');
    $table->json('achievements');
    $table->timestamps();
});
```

#### Testimonials Table
```php
Schema::create('testimonials', function (Blueprint $table) {
    $table->id();
    $table->string('name');
    $table->string('role');
    $table->string('image')->nullable();
    $table->text('content');
    $table->integer('rating')->min(1)->max(5);
    $table->timestamps();
});
```

#### Blog Posts Table
```php
Schema::create('blog_posts', function (Blueprint $table) {
    $table->id();
    $table->string('title');
    $table->string('slug')->unique();
    $table->longText('content');
    $table->text('excerpt');
    $table->string('image')->nullable();
    $table->string('category');
    $table->string('author');
    $table->date('date');
    $table->integer('views')->default(0);
    $table->enum('status', ['published', 'draft'])->default('draft');
    $table->json('tags');
    $table->timestamps();
});
```

#### Settings Table
```php
Schema::create('settings', function (Blueprint $table) {
    $table->id();
    $table->string('key')->unique();
    $table->longText('value')->nullable();
    $table->timestamps();
});
```

### 7. Run Migrations

```bash
php artisan migrate
```

### 8. Set Up API Routes

Create routes in `routes/api.php`:

```php
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\SkillController;
use App\Http\Controllers\ExperienceController;
use App\Http\Controllers\TestimonialController;
use App\Http\Controllers\BlogPostController;
use App\Http\Controllers\SettingController;

Route::middleware('api')->group(function () {
    // Public routes
    Route::get('/projects', [ProjectController::class, 'index']);
    Route::get('/projects/{id}', [ProjectController::class, 'show']);
    
    Route::get('/skills', [SkillController::class, 'index']);
    
    Route::get('/experience', [ExperienceController::class, 'index']);
    
    Route::get('/testimonials', [TestimonialController::class, 'index']);
    
    Route::get('/blog', [BlogPostController::class, 'index']);
    Route::get('/blog/{slug}', [BlogPostController::class, 'show']);
    
    Route::get('/settings', [SettingController::class, 'index']);
    
    // Admin routes (require authentication)
    Route::middleware('auth:api')->group(function () {
        Route::post('/projects', [ProjectController::class, 'store']);
        Route::put('/projects/{id}', [ProjectController::class, 'update']);
        Route::delete('/projects/{id}', [ProjectController::class, 'destroy']);
        
        Route::post('/skills', [SkillController::class, 'store']);
        Route::put('/skills/{id}', [SkillController::class, 'update']);
        Route::delete('/skills/{id}', [SkillController::class, 'destroy']);
        
        Route::post('/experience', [ExperienceController::class, 'store']);
        Route::put('/experience/{id}', [ExperienceController::class, 'update']);
        Route::delete('/experience/{id}', [ExperienceController::class, 'destroy']);
        
        Route::post('/testimonials', [TestimonialController::class, 'store']);
        Route::put('/testimonials/{id}', [TestimonialController::class, 'update']);
        Route::delete('/testimonials/{id}', [TestimonialController::class, 'destroy']);
        
        Route::post('/blog', [BlogPostController::class, 'store']);
        Route::put('/blog/{id}', [BlogPostController::class, 'update']);
        Route::delete('/blog/{id}', [BlogPostController::class, 'destroy']);
        
        Route::put('/settings', [SettingController::class, 'update']);
    });
});
```

### 9. Enable CORS

Update `config/cors.php`:

```php
'paths' => ['api/*'],
'allowed_methods' => ['*'],
'allowed_origins' => [
    'http://localhost:3000',
    'https://yourdomain.com',
],
'allowed_origins_patterns' => [],
'allowed_headers' => ['*'],
'exposed_headers' => [],
'max_age' => 0,
'supports_credentials' => false,
```

### 10. Run Server

```bash
php artisan serve
```

Your API will be available at `http://localhost:8000/api`

## Deployment

### Deploy to Heroku

```bash
# Install Heroku CLI
brew tap heroku/brew && brew install heroku

# Login to Heroku
heroku login

# Create new app
heroku create your-app-name

# Set environment variables
heroku config:set APP_NAME="Portfolio"
heroku config:set APP_KEY=your_app_key
heroku config:set DB_CONNECTION=pgsql
# ... set other variables

# Deploy
git push heroku main
```

### Deploy to DigitalOcean

1. Create a Droplet (Ubuntu 22.04)
2. SSH into droplet
3. Install PHP, Composer, PostgreSQL
4. Clone your repository
5. Run migrations
6. Set up Nginx as reverse proxy
7. Configure domain DNS

### Deploy to Railway

1. Connect GitHub repository
2. Select Laravel from template
3. Configure environment variables
4. Deploy automatically

## Testing

Test your API endpoints using Postman or curl:

```bash
# Get all projects
curl http://localhost:8000/api/projects

# Get single project
curl http://localhost:8000/api/projects/1

# Create project (requires auth)
curl -X POST http://localhost:8000/api/projects \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{"title":"My Project","description":"...","tags":["Laravel","React"]}'
```

## Troubleshooting

### CORS Issues
- Check `config/cors.php` has correct origins
- Verify `APP_URL` in `.env`

### Database Connection
- Test with `php artisan tinker`
- Check database credentials in `.env`
- Ensure database server is running

### API Not Responding
- Check Laravel logs: `tail -f storage/logs/laravel.log`
- Verify routes: `php artisan route:list`

## Resources

- [Laravel Documentation](https://laravel.com/docs)
- [PostgreSQL Documentation](https://www.postgresql.org/docs)
- [RESTful API Best Practices](https://restfulapi.net)

---

Now that your Laravel backend is set up, update the `NEXT_PUBLIC_API_URL` in your Next.js `.env.local` to point to your Laravel API and your portfolio will be fully functional!
