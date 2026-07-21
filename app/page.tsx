import Navbar from "@/components/Navbar";
import Hero from "@/sections/Hero";
import About from "@/sections/About";
import Projects from "@/sections/Projects";
// import Achievements from "@/sections/Achievements";
import Contact from "@/sections/Contact";
import Journey from "@/sections/Journey";
import SkillsMarquee from "@/sections/SkillsMarquee";

export default function Home() {
  return (
    <>
      <main className="relative z-10 bg-[#f8f6f2]">
        <Navbar />

        <Hero />

        <section id="about">
          <About />
        </section>

        

         <SkillsMarquee />

        <section id="projects">
          <Projects />
        </section>

        <section id="journey">
          <Journey />
        </section>
      </main>

      <Contact />
    </>
  );
}