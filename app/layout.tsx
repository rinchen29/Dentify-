import type { Metadata } from 'next'
import { Playfair_Display, Plus_Jakarta_Sans } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '700', '900'],
  variable: '--font-display',
  display: 'swap',
})

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Dentify – Smart Dental Care',
  description:
    'Dentify is a premium dental CRM platform offering advanced dental services, seamless appointment booking, and exceptional patient care.',
  keywords: [
    'dental care',
    'dentist',
    'teeth whitening',
    'dental implants',
    'orthodontics',
    'root canal',
    'cosmetic dentistry',
    'dental clinic',
    'appointment booking',
  ],
  openGraph: {
    title: 'Dentify – Smart Dental Care',
    description:
      'Premium dental services with cutting-edge technology. Book your appointment today.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${playfairDisplay.variable} ${plusJakartaSans.variable}`}
    >
      <body className="bg-[#030712] text-white font-sans antialiased">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  )
}
