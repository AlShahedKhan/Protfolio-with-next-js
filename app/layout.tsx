import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { portfolioOwner } from '@/lib/portfolio-data'
import './globals.css'

const _geist = Geist({ subsets: ["latin"], variable: '--font-geist' });
const _geistMono = Geist_Mono({ subsets: ["latin"], variable: '--font-geist-mono' });
const siteUrl = portfolioOwner.siteUrl;

export const metadata: Metadata = {
  title: `${portfolioOwner.name} | ${portfolioOwner.title}`,
  description: `${portfolioOwner.title} showcasing ${portfolioOwner.yearsExperience} years of experience building full-stack web applications.`,
  keywords: ['Laravel', 'PHP', 'Web Development', 'Full Stack', 'Backend Development'],
  authors: [{ name: portfolioOwner.name }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    title: `${portfolioOwner.name} Portfolio`,
    description: `${portfolioOwner.title} with ${portfolioOwner.yearsExperience} years of professional experience.`,
    images: [
      {
        url: `${siteUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: `${portfolioOwner.name} portfolio preview`,
      },
    ],
  },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${_geist.variable} ${_geistMono.variable} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
