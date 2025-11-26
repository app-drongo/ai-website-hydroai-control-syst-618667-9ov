import Hero from '@/components/sections/home/Hero'
import Features from '@/components/sections/home/Features'
import Benefits from '@/components/sections/home/Benefits'
import Process from '@/components/sections/home/Process'
import Stats from '@/components/sections/home/Stats'
import Casestudies from '@/components/sections/home/Casestudies'
import Testimonials from '@/components/sections/home/Testimonials'
import About from '@/components/sections/home/About'
import Contact from '@/components/sections/home/Contact'
import Cta from '@/components/sections/home/Cta'

export default function HomePage() {
  return (
    <>
      <Hero />
      <Features />
      <Benefits />
      <Process />
      <Stats />
      <Casestudies />
      <Testimonials />
      <About />
      <Contact />
      <Cta />
    </>
  )
}