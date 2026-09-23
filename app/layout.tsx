import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'
import '@/sytyles/colors/index.css'
import '@/sytyles/spacing/index.css'

const america = localFont({
  src: [
    {
      path: '../public/fonts/GT-America-Standard-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/GT-America-Standard-Bold.woff2',
      weight: 'bold',
      style: 'normal',
    },
  ],
  display: 'swap',
  fallback: ['system-ui', 'helvetica-neue'],
  variable: '--america',
})

export const metadata: Metadata = {
  title: "What's your favorite color palette?",
  description: 'Your personalized color palette based on your Flickr feed.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${america.className} antialiased`}>{children}</body>
    </html>
  )
}
