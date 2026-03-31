import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Hero from '@/components/home/Hero'
import Stats from '@/components/home/Stats'
import Services from '@/components/home/Services'
import WhyUs from '@/components/home/WhyUs'
import Process from '@/components/home/Process'
import Testimonials from '@/components/home/Testimonials'
import CtaBanner from '@/components/home/CtaBanner'

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <Services />
        <WhyUs />
        <Process />
        <Testimonials />
        <CtaBanner />
      </main>
      <Footer />
    </>
  )
}
