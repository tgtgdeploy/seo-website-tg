import type { Metadata } from 'next'
import './globals.css'
import JsonLd from '@/components/JsonLd'
import { getDomainSEOMetadata, getWebsiteByDomain } from '@/lib/get-website-by-domain'
import { headers } from 'next/headers'

// 获取当前域名的基础URL
async function getSiteUrl(): Promise<string> {
  const headersList = await headers()
  const host = headersList.get('host') || 'www.telegramtgm.com'
  const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http'
  return `${protocol}://${host}`
}

// 动态生成SEO元数据，根据访问的域名
export async function generateMetadata(): Promise<Metadata> {
  const seo = await getDomainSEOMetadata()
  const siteUrl = await getSiteUrl()

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: seo.title,
      template: `%s | ${seo.title}`,
    },
    description: seo.description,
    keywords: seo.keywords,
    authors: [{ name: 'Telegram Team' }],
    creator: 'Telegram',
    publisher: 'Telegram',
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    alternates: {
      canonical: siteUrl,
    },
    openGraph: {
      type: 'website',
      locale: 'zh_CN',
      url: siteUrl,
      siteName: seo.title,
      title: seo.title,
      description: seo.description,
      images: [
        {
          url: `${siteUrl}/og-image.png`,
          width: 1200,
          height: 630,
          alt: seo.title,
          type: 'image/png',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: seo.title,
      description: seo.description,
      images: [`${siteUrl}/og-image.png`],
      creator: '@telegram',
    },
    robots: {
      index: true,
      follow: true,
      nocache: false,
      googleBot: {
        index: true,
        follow: true,
        noimageindex: false,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    verification: {
      google: process.env.GOOGLE_SITE_VERIFICATION || '',
      yandex: process.env.YANDEX_VERIFICATION || '',
    },
    category: 'technology',
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" sizes="180x180" href="/logo.svg" />
        <link rel="manifest" href="/site.webmanifest" />
        <JsonLd />
      </head>
      <body>{children}</body>
    </html>
  )
}
