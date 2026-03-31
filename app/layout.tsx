import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import './globals.css'
import SessionProvider from '@/components/SessionProvider'
import { SiteConfigProvider } from '@/lib/SiteConfigContext'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-poppins',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Dentify — Modern Dental Care',
  description:
    'Premium dental care with cutting-edge technology and a compassionate team. Book your appointment today.',
  keywords: [
    'dental care',
    'dentist',
    'teeth whitening',
    'dental implants',
    'orthodontics',
    'cosmetic dentistry',
    'dental clinic',
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={poppins.variable}>
      <body className="bg-white text-slate-800 font-sans antialiased">
        <SessionProvider>
          <SiteConfigProvider>
            {children}
          </SiteConfigProvider>
        </SessionProvider>
      </body>
    </html>
  )
}
