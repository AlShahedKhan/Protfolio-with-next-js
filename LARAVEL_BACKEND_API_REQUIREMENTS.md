# Laravel Backend API Requirements

This file defines the Laravel API that should power this Next.js portfolio.

It is based on the current frontend structure in:

- `app/page.tsx`
- `app/blog/page.tsx`
- `app/blog/[slug]/page.tsx`
- `lib/content.ts`
- `lib/portfolio-data.ts`
- `app/admin/*`

## Goal

Build only the API this frontend actually needs now, while keeping the Laravel backend ready for a future admin CMS.

The current public site needs:

- homepage content
- featured projects
- experience timeline
- blog list
- blog detail

The current public site does **not** need:

- a contact form API
- public skills API right now
- public testimonials API right now

Those can come later if you turn those sections back on.

## Recommended Laravel Stack

- Laravel `12.x`
- `php artisan install:api`
- Laravel Sanctum for admin authentication
- Form Request validation for all write endpoints
- Eloquent API Resources for stable JSON responses
- Laravel filesystem for image and document uploads

Official references:

- https://laravel.com/docs/12.x/authentication
- https://laravel.com/docs/12.x/routing
- https://laravel.com/docs/12.x/eloquent-resources
- https://laravel.com/docs/12.x/validation
- https://laravel.com/docs/12.x/requests

## Frontend To API Mapping

This is the simplest mapping from the current Next.js app to Laravel:

| Frontend surface | Current file | Recommended API |
| --- | --- | --- |
| Home page header, hero, about, contact, footer | `app/page.tsx` | `GET /api/v1/public/home` |
| Featured projects on home page | `components/sections/Projects.tsx` | included in `GET /api/v1/public/home` |
| Experience on home page | `components/sections/Experience.tsx` | included in `GET /api/v1/public/home` |
| Blog index page | `app/blog/page.tsx` | `GET /api/v1/public/blog-posts` |
| Blog detail page | `app/blog/[slug]/page.tsx` | `GET /api/v1/public/blog-posts/{slug}` |
| Admin settings | `app/admin/settings/page.tsx` | `GET/PUT /api/v1/admin/site` |
| Admin projects | `app/admin/projects/page.tsx` | projects CRUD |
| Admin experience | `app/admin/experience/page.tsx` | experience CRUD |
| Admin blog | `app/admin/blog/page.tsx` | blog CRUD |
| Hidden future skills section/admin | `app/admin/skills/page.tsx` | optional skills CRUD |
| Hidden future testimonials section/admin | `app/admin/testimonials/page.tsx` | optional testimonials CRUD |

## How Many APIs You Actually Need

### Best-practice minimum for the current live site

If you want the cleanest setup, build **3 public endpoints**:

1. `GET /api/v1/public/home`
2. `GET /api/v1/public/blog-posts`
3. `GET /api/v1/public/blog-posts/{slug}`

This is the best fit for the current frontend because the homepage content is tightly related and can be delivered in one response.

### If you prefer fully separated public resources

Then build **5 public endpoints**:

1. `GET /api/v1/public/site`
2. `GET /api/v1/public/projects?featured=1&limit=3`
3. `GET /api/v1/public/experience`
4. `GET /api/v1/public/blog-posts`
5. `GET /api/v1/public/blog-posts/{slug}`

### Minimum admin/CMS for what is visible today

If you want the Laravel backend to manage the visible site content, build **21 auth/admin endpoints**:

1. `GET /sanctum/csrf-cookie`
2. `POST /login`
3. `POST /logout`
4. `GET /api/v1/auth/me`
5. `GET /api/v1/admin/site`
6. `PUT /api/v1/admin/site`
7. `GET /api/v1/admin/projects`
8. `POST /api/v1/admin/projects`
9. `GET /api/v1/admin/projects/{id}`
10. `PATCH /api/v1/admin/projects/{id}`
11. `DELETE /api/v1/admin/projects/{id}`
12. `GET /api/v1/admin/experience`
13. `POST /api/v1/admin/experience`
14. `GET /api/v1/admin/experience/{id}`
15. `PATCH /api/v1/admin/experience/{id}`
16. `DELETE /api/v1/admin/experience/{id}`
17. `GET /api/v1/admin/blog-posts`
18. `POST /api/v1/admin/blog-posts`
19. `GET /api/v1/admin/blog-posts/{id}`
20. `PATCH /api/v1/admin/blog-posts/{id}`
21. `DELETE /api/v1/admin/blog-posts/{id}`

### Optional later endpoints

Build these only if you turn those features back on:

- `GET /api/v1/public/skills`
- `GET /api/v1/public/testimonials`
- skills CRUD: 5 endpoints
- testimonials CRUD: 5 endpoints
- `POST /api/v1/admin/media`
- `DELETE /api/v1/admin/media/{id}`
- `POST /api/v1/public/contact-messages` only if you add a real contact form later

## Recommended Public API

For this project, I recommend the aggregate homepage endpoint.

### 1. `GET /api/v1/public/home`

Returns everything needed by:

- header
- hero
- about
- projects section
- experience section
- contact section
- footer
- page metadata

### Example response

```json
{
  "data": {
    "site": {
      "name": "Abdullah Al Shahed",
      "title": "Senior Laravel Developer | Backend Architect",
      "email": "alshahed.cse@gmail.com",
      "phone": "+8801907693009",
      "location": "Dhaka, Bangladesh",
      "site_url": "https://example.com",
      "years_experience": 4,
      "github_url": "https://github.com/AlShahedKhan",
      "linkedin_url": "https://www.linkedin.com/in/your-slug",
      "twitter_url": null,
      "upwork_url": null,
      "resume_url": null,
      "hero_badge": "Dhaka-based and open to remote Laravel work",
      "contact_note": "Prefer email for project inquiries.",
      "languages": ["English", "Bengali", "Hindi", "Urdu"]
    },
    "about": {
      "intro": "Senior Laravel developer with 4+ years of professional experience building secure, scalable systems for global clients.",
      "description": "I build robust Laravel applications across AI platforms, SaaS products, fintech workflows, real-time systems, and education platforms.",
      "highlights": [
        "30+ production projects delivered",
        "Global client experience across the USA, UK, Japan, UAE, Australia, Canada, and Asia",
        "Strong in Laravel, Redis, Docker, AWS, Stripe, and PayPal"
      ]
    },
    "featured_projects": [
      {
        "id": 1,
        "title": "Orfa AI",
        "slug": "orfa-ai",
        "description": "Built an AI chatbot platform for a USA client...",
        "image_url": "https://api.example.com/storage/projects/orfa-ai.jpg",
        "technologies": ["Laravel", "OpenAI API", "Redis", "Docker", "AWS", "JWT"],
        "live_url": null,
        "github_url": null,
        "featured": true,
        "confidential": true
      }
    ],
    "experience": [
      {
        "id": 1,
        "position": "Senior Laravel Developer",
        "company": "Quins Group / Quins International BD Ltd.",
        "start_date": "2025-08-01",
        "end_date": null,
        "current": true,
        "description": "Developing and optimizing Laravel backends for international clients...",
        "technologies": ["Laravel", "JWT", "RBAC", "MySQL", "PostgreSQL"],
        "start_label": "Aug 2025",
        "end_label": "Present"
      }
    ],
    "seo": {
      "meta_title": "Abdullah Al Shahed | Senior Laravel Developer | Backend Architect",
      "meta_description": "Senior Laravel Developer | Backend Architect from Dhaka, Bangladesh with 4+ years of professional experience building Laravel APIs, SaaS platforms, and scalable web applications.",
      "keywords": ["Laravel", "PHP", "Backend Architect", "REST APIs", "Redis", "Docker", "AWS"],
      "og_image_url": "https://api.example.com/storage/site/og-image.png"
    }
  }
}
```

### 2. `GET /api/v1/public/blog-posts`

### Query params

- `page=1`
- `per_page=9`
- `tag=laravel`
- `status=published`

### Example response

```json
{
  "data": [
    {
      "id": 1,
      "title": "Designing JWT and RBAC APIs in Laravel for SaaS Products",
      "slug": "designing-jwt-rbac-apis-in-laravel",
      "excerpt": "A practical look at building secure Laravel APIs...",
      "image_url": "https://api.example.com/storage/blog/jwt-rbac.jpg",
      "published_at": "2026-02-12T00:00:00Z",
      "read_time": 7,
      "tags": ["Laravel", "JWT", "RBAC"]
    }
  ],
  "meta": {
    "current_page": 1,
    "per_page": 9,
    "total": 3
  },
  "links": {
    "self": "https://api.example.com/api/v1/public/blog-posts?page=1",
    "next": null,
    "prev": null
  }
}
```

### 3. `GET /api/v1/public/blog-posts/{slug}`

### Example response

```json
{
  "data": {
    "id": 1,
    "title": "Designing JWT and RBAC APIs in Laravel for SaaS Products",
    "slug": "designing-jwt-rbac-apis-in-laravel",
    "excerpt": "A practical look at building secure Laravel APIs...",
    "content": "<p>Full article HTML or sanitized rich text...</p>",
    "image_url": "https://api.example.com/storage/blog/jwt-rbac.jpg",
    "published_at": "2026-02-12T00:00:00Z",
    "read_time": 7,
    "tags": ["Laravel", "JWT", "RBAC"],
    "meta_title": "Designing JWT and RBAC APIs in Laravel",
    "meta_description": "A practical look at secure Laravel API design"
  }
}
```

## Alternate Public API

Use this only if you strongly prefer separated resources.

### `GET /api/v1/public/site`

Returns profile, about, contact, social links, and SEO.

### `GET /api/v1/public/projects`

Recommended query params:

- `featured=1`
- `limit=3`
- `page=1`

### `GET /api/v1/public/experience`

Returns the experience timeline used on the homepage.

## Admin Authentication

Use Sanctum for the future admin area.

### 1. `GET /sanctum/csrf-cookie`

Required before login when using cookie-based SPA auth.

### 2. `POST /login`

### Body

```json
{
  "email": "admin@example.com",
  "password": "secret-password",
  "remember": true
}
```

### 3. `POST /logout`

No body required.

### 4. `GET /api/v1/auth/me`

### Example response

```json
{
  "data": {
    "id": 1,
    "name": "Admin User",
    "email": "admin@example.com"
  }
}
```

## Required Admin Content Endpoints

All endpoints below should be protected by Sanctum auth.

## Site Settings

### `GET /api/v1/admin/site`

Returns the editable settings payload for the admin form.

### `PUT /api/v1/admin/site`

### Body

```json
{
  "name": "Abdullah Al Shahed",
  "title": "Senior Laravel Developer | Backend Architect",
  "email": "alshahed.cse@gmail.com",
  "phone": "+8801907693009",
  "location": "Dhaka, Bangladesh",
  "site_url": "https://example.com",
  "years_experience": 4,
  "github_url": "https://github.com/AlShahedKhan",
  "linkedin_url": "https://www.linkedin.com/in/your-slug",
  "twitter_url": null,
  "upwork_url": "https://www.upwork.com/freelancers/your-slug",
  "resume_url": "https://api.example.com/storage/site/resume.pdf",
  "hero_badge": "Dhaka-based and open to remote Laravel work",
  "about_intro": "Senior Laravel developer with 4+ years of professional experience building secure, scalable systems for global clients.",
  "about_description": "I build robust Laravel applications across AI platforms, SaaS products, fintech workflows, real-time systems, and education platforms.",
  "about_highlights": [
    "30+ production projects delivered",
    "Global client experience across the USA, UK, Japan, UAE, Australia, Canada, and Asia",
    "Strong in Laravel, Redis, Docker, AWS, Stripe, and PayPal"
  ],
  "contact_note": "Prefer email for project inquiries.",
  "languages": ["English", "Bengali", "Hindi", "Urdu"],
  "seo_keywords": ["Laravel", "PHP", "Backend Architect", "REST APIs"],
  "og_image_url": "https://api.example.com/storage/site/og-image.png"
}
```

## Projects CRUD

### `GET /api/v1/admin/projects`

### Query params

- `page=1`
- `per_page=15`
- `featured=1`
- `published=1`
- `search=orfa`

### `POST /api/v1/admin/projects`

### Body

```json
{
  "title": "Orfa AI",
  "slug": "orfa-ai",
  "description": "Built an AI chatbot platform for a USA client with custom AI agents, JWT-secured APIs, session tracking, user feedback flow, and usage analytics across a scalable Laravel backend.",
  "image_url": "https://api.example.com/storage/projects/orfa-ai.jpg",
  "technologies": ["Laravel", "OpenAI API", "Redis", "Docker", "AWS", "JWT"],
  "live_url": null,
  "github_url": null,
  "featured": true,
  "published": true,
  "sort_order": 1,
  "role": "Senior Laravel Developer",
  "client_region": "USA",
  "problem": "Needed a scalable AI chatbot backend",
  "solution": "Designed modular Laravel APIs with JWT auth, session tracking, and analytics support",
  "outcome": "Delivered a scalable backend ready for production use",
  "confidential": true
}
```

### `GET /api/v1/admin/projects/{id}`

### `PATCH /api/v1/admin/projects/{id}`

Partial update allowed. Use the same fields as create.

### `DELETE /api/v1/admin/projects/{id}`

No body required.

## Experience CRUD

### `GET /api/v1/admin/experience`

### `POST /api/v1/admin/experience`

### Body

```json
{
  "position": "Senior Laravel Developer",
  "company": "Quins Group / Quins International BD Ltd.",
  "start_date": "2025-08-01",
  "end_date": null,
  "current": true,
  "description": "Developing and optimizing Laravel backends for international clients, designing secure JWT-based APIs, and supporting business-critical systems with strong availability and performance requirements.",
  "technologies": ["Laravel", "JWT", "RBAC", "MySQL", "PostgreSQL"],
  "sort_order": 1,
  "published": true
}
```

### `GET /api/v1/admin/experience/{id}`

### `PATCH /api/v1/admin/experience/{id}`

Partial update allowed. Use the same fields as create.

### `DELETE /api/v1/admin/experience/{id}`

No body required.

## Blog CRUD

### `GET /api/v1/admin/blog-posts`

### Query params

- `page=1`
- `per_page=10`
- `status=published`
- `search=laravel`

### `POST /api/v1/admin/blog-posts`

### Body

```json
{
  "title": "Designing JWT and RBAC APIs in Laravel for SaaS Products",
  "slug": "designing-jwt-rbac-apis-in-laravel",
  "excerpt": "A practical look at building secure Laravel APIs with JWT authentication, role-based access control, and maintainable backend structure.",
  "content": "<p>Full article body...</p>",
  "image_url": "https://api.example.com/storage/blog/jwt-rbac.jpg",
  "published_at": "2026-02-12T00:00:00Z",
  "read_time": 7,
  "tags": ["Laravel", "JWT", "RBAC"],
  "status": "published",
  "meta_title": "Designing JWT and RBAC APIs in Laravel",
  "meta_description": "A practical look at secure Laravel API design"
}
```

### `GET /api/v1/admin/blog-posts/{id}`

### `PATCH /api/v1/admin/blog-posts/{id}`

Partial update allowed. Use the same fields as create.

### `DELETE /api/v1/admin/blog-posts/{id}`

No body required.

## Optional Future Endpoints

These match code that still exists in the repo, but they are not required for the visible public site today.

## Skills CRUD

### `GET /api/v1/public/skills`

### `GET /api/v1/admin/skills`

### `POST /api/v1/admin/skills`

```json
{
  "name": "Laravel",
  "category": "Backend",
  "level": "expert",
  "sort_order": 1,
  "published": true
}
```

### `GET /api/v1/admin/skills/{id}`

### `PATCH /api/v1/admin/skills/{id}`

### `DELETE /api/v1/admin/skills/{id}`

## Testimonials CRUD

### `GET /api/v1/public/testimonials`

### `GET /api/v1/admin/testimonials`

### `POST /api/v1/admin/testimonials`

```json
{
  "name": "Upwork Client",
  "role": "Client",
  "company": "Upwork",
  "content": "My experience was excellent. The collaboration was smooth from start to finish.",
  "avatar_url": "https://api.example.com/storage/testimonials/client-1.jpg",
  "rating": 5,
  "source_url": "https://www.upwork.com/freelancers/your-slug",
  "featured": true,
  "published": true,
  "sort_order": 1
}
```

### `GET /api/v1/admin/testimonials/{id}`

### `PATCH /api/v1/admin/testimonials/{id}`

### `DELETE /api/v1/admin/testimonials/{id}`

## Media Uploads

### `POST /api/v1/admin/media`

Content type: `multipart/form-data`

### Body

- `file`
- `collection`
- `folder` optional

### Example response

```json
{
  "data": {
    "id": 44,
    "disk": "public",
    "path": "projects/orfa-ai.jpg",
    "url": "https://api.example.com/storage/projects/orfa-ai.jpg",
    "collection": "projects"
  }
}
```

### `DELETE /api/v1/admin/media/{id}`

## Required Field Shapes

These are the core fields Laravel should expose because the current Next.js app depends on them.

## Site

```json
{
  "name": "Abdullah Al Shahed",
  "title": "Senior Laravel Developer | Backend Architect",
  "email": "alshahed.cse@gmail.com",
  "phone": "+8801907693009",
  "location": "Dhaka, Bangladesh",
  "site_url": "https://example.com",
  "years_experience": 4,
  "github_url": "https://github.com/AlShahedKhan",
  "linkedin_url": "https://www.linkedin.com/in/your-slug",
  "twitter_url": null
}
```

## Project

```json
{
  "id": 1,
  "title": "Orfa AI",
  "slug": "orfa-ai",
  "description": "Built an AI chatbot platform...",
  "image_url": "https://api.example.com/storage/projects/orfa-ai.jpg",
  "technologies": ["Laravel", "OpenAI API", "Redis"],
  "live_url": null,
  "github_url": null,
  "featured": true
}
```

## Experience

```json
{
  "id": 1,
  "position": "Senior Laravel Developer",
  "company": "Quins Group / Quins International BD Ltd.",
  "start_date": "2025-08-01",
  "end_date": null,
  "current": true,
  "description": "Developing and optimizing Laravel backends...",
  "technologies": ["Laravel", "JWT", "RBAC"],
  "start_label": "Aug 2025",
  "end_label": "Present"
}
```

## Blog post

```json
{
  "id": 1,
  "title": "Designing JWT and RBAC APIs in Laravel for SaaS Products",
  "slug": "designing-jwt-rbac-apis-in-laravel",
  "excerpt": "A practical look at building secure Laravel APIs...",
  "content": "<p>Full article body...</p>",
  "image_url": "https://api.example.com/storage/blog/jwt-rbac.jpg",
  "published_at": "2026-02-12T00:00:00Z",
  "read_time": 7,
  "tags": ["Laravel", "JWT", "RBAC"]
}
```

## Validation Rules To Use

These are the recommended Laravel validation rules for v1.

## Site

- `name`: `required|string|max:255`
- `title`: `required|string|max:255`
- `email`: `required|email|max:255`
- `phone`: `nullable|string|max:50`
- `location`: `required|string|max:255`
- `site_url`: `nullable|url|max:255`
- `years_experience`: `required|integer|min:0|max:50`
- `github_url`: `nullable|url|max:255`
- `linkedin_url`: `nullable|url|max:255`
- `twitter_url`: `nullable|url|max:255`
- `upwork_url`: `nullable|url|max:255`
- `resume_url`: `nullable|url|max:255`
- `about_intro`: `required|string|max:500`
- `about_description`: `required|string`
- `about_highlights`: `required|array`
- `about_highlights.*`: `string|max:255`
- `languages`: `nullable|array`
- `languages.*`: `string|max:50`
- `seo_keywords`: `nullable|array`
- `seo_keywords.*`: `string|max:100`

## Project

- `title`: `required|string|max:255`
- `slug`: `required|string|max:255|unique:projects,slug`
- `description`: `required|string`
- `image_url`: `nullable|url|max:255`
- `technologies`: `required|array|min:1`
- `technologies.*`: `string|max:100`
- `live_url`: `nullable|url|max:255`
- `github_url`: `nullable|url|max:255`
- `featured`: `required|boolean`
- `published`: `required|boolean`
- `sort_order`: `nullable|integer|min:0`
- `confidential`: `nullable|boolean`

## Experience

- `position`: `required|string|max:255`
- `company`: `required|string|max:255`
- `start_date`: `required|date`
- `end_date`: `nullable|date|after_or_equal:start_date`
- `current`: `required|boolean`
- `description`: `required|string`
- `technologies`: `required|array`
- `technologies.*`: `string|max:100`

## Blog post

- `title`: `required|string|max:255`
- `slug`: `required|string|max:255|unique:blog_posts,slug`
- `excerpt`: `required|string|max:500`
- `content`: `required|string`
- `image_url`: `nullable|url|max:255`
- `published_at`: `nullable|date`
- `read_time`: `required|integer|min:1|max:120`
- `tags`: `required|array`
- `tags.*`: `string|max:100`
- `status`: `required|in:draft,published`

## Optional skill rules

- `name`: `required|string|max:100`
- `category`: `required|string|max:100`
- `level`: `required|in:beginner,intermediate,advanced,expert`

## Optional testimonial rules

- `name`: `required|string|max:255`
- `role`: `required|string|max:255`
- `company`: `required|string|max:255`
- `content`: `required|string`
- `avatar_url`: `nullable|url|max:255`
- `rating`: `nullable|integer|min:1|max:5`
- `source_url`: `nullable|url|max:255`

## Database Tables

For a clean first version, these tables are enough:

- `site_settings`
- `projects`
- `experiences`
- `blog_posts`
- `skills` optional
- `testimonials` optional
- `media` optional

JSON columns that are safe for v1:

- `about_highlights`
- `technologies`
- `tags`
- `languages`
- `seo_keywords`

If you later need advanced filtering by technologies or tags, you can normalize them into relation tables.

## Recommended Controllers

- `Api/V1/Public/HomeController`
- `Api/V1/Public/BlogPostController`
- `Api/V1/Public/SiteController` only if you choose separated public resources
- `Api/V1/Public/ProjectController` only if you choose separated public resources
- `Api/V1/Public/ExperienceController` only if you choose separated public resources
- `Api/V1/Admin/SiteController`
- `Api/V1/Admin/ProjectController`
- `Api/V1/Admin/ExperienceController`
- `Api/V1/Admin/BlogPostController`
- `Api/V1/Admin/SkillController` optional
- `Api/V1/Admin/TestimonialController` optional
- `Api/V1/Admin/MediaController` optional
- `Api/V1/Auth/MeController`

## Recommended Form Requests

- `LoginRequest`
- `UpdateSiteRequest`
- `StoreProjectRequest`
- `UpdateProjectRequest`
- `StoreExperienceRequest`
- `UpdateExperienceRequest`
- `StoreBlogPostRequest`
- `UpdateBlogPostRequest`
- `StoreSkillRequest` optional
- `UpdateSkillRequest` optional
- `StoreTestimonialRequest` optional
- `UpdateTestimonialRequest` optional
- `StoreMediaRequest` optional

## Important Cross-Origin Note

If Next.js and Laravel run on different ports, subdomains, or domains and you use Sanctum cookie auth, configure these correctly:

- CORS allowed origin for the Next.js frontend
- `supports_credentials=true`
- `SESSION_DOMAIN`
- `SANCTUM_STATEFUL_DOMAINS`
- frontend requests with `credentials: 'include'`

This is an implementation detail inferred from the Laravel authentication and Sanctum guidance and matters a lot for local dev plus VPS deployment.

## Recommended Build Order

## Phase 1: public site first

1. `GET /api/v1/public/home`
2. `GET /api/v1/public/blog-posts`
3. `GET /api/v1/public/blog-posts/{slug}`

## Phase 2: admin for visible content

1. Sanctum auth
2. admin site settings
3. admin projects CRUD
4. admin experience CRUD
5. admin blog CRUD

## Phase 3: optional content

1. skills
2. testimonials
3. media upload
4. contact messages if you add a real form

## Frontend Integration Notes

Use `lib/content.ts` as the public data adapter and replace local data reads there first.

Recommended env var in Next.js:

```env
NEXT_PUBLIC_API_BASE_URL=https://api.example.com
```

Example public fetch:

```ts
export async function getHomeContent() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/public/home`, {
    next: { revalidate: 300 },
  });

  if (!res.ok) {
    throw new Error('Failed to load home content');
  }

  const json = await res.json();
  return json.data;
}
```

Use `lib/api.ts` for authenticated admin calls after the Laravel backend is ready, but update its types and route paths to match this document instead of the older placeholder shape.

## Final Recommendation

For this project, the cleanest backend is:

1. one aggregate public homepage endpoint
2. two public blog endpoints
3. Sanctum auth for admin
4. site, projects, experience, and blog CRUD
5. skills, testimonials, and media later

That gives you a backend that matches the current UI, avoids overbuilding, and stays easy to connect from Next.js.
