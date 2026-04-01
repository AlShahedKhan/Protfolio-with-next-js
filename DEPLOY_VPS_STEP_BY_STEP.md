# Deploy To VPS

This project is prepared for a standard Linux VPS deploy with:

- Node.js
- PM2
- Nginx
- Optional SSL via Certbot

## 1. On your VPS, check listening ports

```bash
sudo ss -tulpn
sudo ufw status
```

## 2. Install required packages

```bash
sudo apt update
sudo apt install -y nginx
```

Install Node.js LTS and PM2 using your preferred method, then verify:

```bash
node -v
npm -v
pm2 -v
```

## 3. Clone the project

```bash
cd /var/www
sudo git clone https://github.com/AlShahedKhan/Protfolio-with-next-js.git portfolio-pro
sudo chown -R $USER:$USER /var/www/portfolio-pro
cd /var/www/portfolio-pro
```

## 4. Install and build

```bash
npm install
npm run build:standalone
```

This project uses Next.js standalone output, and the build helper copies the
required static assets into the standalone folder so production runs from:

```bash
.next/standalone/server.js
```

## 5. Start with PM2

```bash
pm2 start ecosystem.config.cjs
pm2 save
pm2 startup
```

Follow the extra command shown by `pm2 startup`.

## 6. Configure Nginx

Copy `deploy/nginx-portfolio.conf.example` to your Nginx site config and replace the domain:

```bash
sudo cp deploy/nginx-portfolio.conf.example /etc/nginx/sites-available/portfolio-pro
sudo nano /etc/nginx/sites-available/portfolio-pro
sudo ln -s /etc/nginx/sites-available/portfolio-pro /etc/nginx/sites-enabled/portfolio-pro
sudo nginx -t
sudo systemctl restart nginx
```

## 7. Open firewall ports

```bash
sudo ufw allow OpenSSH
sudo ufw allow 'Nginx Full'
sudo ufw enable
```

Leave port `3000` closed publicly. Nginx should be the only internet-facing layer.

## 8. Add SSL

After DNS points to the VPS and Nginx works on port 80:

```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d example.com -d www.example.com
```

## 9. Useful commands

```bash
pm2 status
pm2 logs portfolio-pro
pm2 restart portfolio-pro
sudo systemctl status nginx
sudo ss -tulpn
```
