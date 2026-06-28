import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Experience from './components/Experience'
import TechStack from './components/TechStack'
import Journey from './components/Journey'
import Contact from './components/Contact'
import Footer from './components/Footer'
import AnimatedSection from './components/AnimatedSection'
import ScrollButterfly from './components/ScrollButterfly'

export default function App() {
  return (
    <div className="bg-[#131313] text-[#e5e2e1] font-[Inter] text-base leading-relaxed antialiased overflow-x-hidden selection:bg-[#0066ff] selection:text-[#f8f7ff]">
      <ScrollButterfly />
      <Navbar />
      <Hero />
      <main className="max-w-[1280px] !mx-auto !px-4 md:!px-8 !pb-32">
        <AnimatedSection id="about">
          <About />
        </AnimatedSection>
        <AnimatedSection id="skills">
          <Skills />
        </AnimatedSection>
        <AnimatedSection id="projects">
          <Projects />
        </AnimatedSection>
        <AnimatedSection id="experience">
          <Experience />
        </AnimatedSection>
        <AnimatedSection id="stack">
          <TechStack />
        </AnimatedSection>
        <AnimatedSection id="journey">
          <Journey />
        </AnimatedSection>
        <AnimatedSection id="contact">
          <Contact />
        </AnimatedSection>
      </main>
      <Footer />
    </div>
  )
}
