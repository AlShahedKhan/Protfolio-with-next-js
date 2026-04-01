import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { getPortfolioOwner } from '@/lib/content'
import { getSiteUrl } from '@/lib/site-config'
import './globals.css'

const _geist = Geist({ subsets: ["latin"], variable: '--font-geist' });
const _geistMono = Geist_Mono({ subsets: ["latin"], variable: '--font-geist-mono' });
const portfolioOwner = getPortfolioOwner();
const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  ...(siteUrl ? { metadataBase: new URL(siteUrl) } : {}),
  title: `${portfolioOwner.name} | ${portfolioOwner.title}`,
  description: `${portfolioOwner.title} from ${portfolioOwner.location} with ${portfolioOwner.yearsExperience}+ years of professional experience building Laravel APIs, SaaS platforms, and scalable web applications.`,
  keywords: ['Laravel', 'PHP', 'Backend Architect', 'REST APIs', 'Redis', 'Docker', 'AWS', 'Stripe', 'PayPal', 'SaaS Development'],
  authors: [{ name: portfolioOwner.name }],
  robots: {
    index: true,
    follow: true,
  },
  ...(siteUrl
    ? {
        alternates: {
          canonical: '/',
        },
      }
    : {}),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    title: `${portfolioOwner.name} Portfolio`,
    description: `${portfolioOwner.title} with ${portfolioOwner.yearsExperience}+ years of professional experience.`,
    ...(siteUrl
      ? {
          url: siteUrl,
        }
      : {}),
  },
  twitter: {
    card: 'summary_large_image',
    title: `${portfolioOwner.name} Portfolio`,
    description: `${portfolioOwner.title} with ${portfolioOwner.yearsExperience}+ years of professional experience.`,
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
      <body suppressHydrationWarning className={`${_geist.variable} ${_geistMono.variable} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
