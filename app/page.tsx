import Header from '@/components/Header'
import Hero from '@/components/Hero'
import MetricsDashboard from '@/components/MetricsDashboard'
import Projects from '@/components/Projects'
import About from '@/components/About'
import FAQ from '@/components/FAQ'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <MetricsDashboard />
      <Projects />
      <About />
      <FAQ />
      <Footer />
    </main>
  )
}
