"use client";

import { Sparkles, ArrowUpRight } from "lucide-react";
import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
} from "react-icons/fa";
import { useRef, useState } from "react";
import Image from "next/image";
import { TypeAnimation } from "react-type-animation";

import PortfolioChat from "@/components/PortfolioChat";
import Container from "@/components/Container";
import { Button } from "@/components/ui/button";

export default function Hero() {
  const imageRef = useRef<HTMLDivElement>(null);
  const [chatOpen, setChatOpen] = useState(false);

  return (
    <>
      <section className="relative flex min-h-screen items-center overflow-hidden pt-16">
        {/* DOTTED GRID */}

        <div
          className="
            pointer-events-none
            absolute
            left-[38%]
            top-[17%]
            h-[72%]
            w-[58%]
            opacity-[0.55]
            [mask-image:radial-gradient(ellipse_at_center,black_35%,transparent_78%)]
          "
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(0,0,0,0.55) 1.2px, transparent 1.2px)",
            backgroundSize: "18px 18px",
          }}
        />

        <Container>
          <div
            className="
              grid
              items-center
              gap-4
              lg:grid-cols-[42%_48%]
            "
          >
            {/* LEFT */}

            <div className="max-w-[650px] lg:ml-24">
              <p className="mb-5 text-xl text-neutral-500">
                Hi, I'm
              </p>

              <h1 className="text-6xl font-bold leading-[0.9] tracking-tight lg:text-7xl">
                Diya Kalra
              </h1>

              <div className="mt-8 flex h-12 items-center text-2xl font-medium lg:text-3xl">
                <span>I'm &nbsp;</span>

                <TypeAnimation
                  sequence={[
                    "a Software Developer",
                    2000,
                    "",
                    500,
                    "a Competitive Programmer",
                    2000,
                    "",
                    500,
                    "an AI Engineer",
                    2000,
                    "",
                    500,
                  ]}
                  wrapper="span"
                  speed={45}
                  repeat={Infinity}
                  cursor={true}
                  className="text-black"
                />
              </div>

              <p className="mt-10 max-w-md text-lg leading-8 text-neutral-600">
                Building intelligent software, AI-powered products, and
                meaningful user experiences.
              </p>

              {/* BUTTONS */}

              <div className="mt-12 flex items-center gap-4">
                <Button
                  onClick={() => setChatOpen(true)}
                  className="
                    h-12
                    min-w-[145px]
                    rounded-2xl
                    bg-black
                    text-[15px]
                    font-medium
                    tracking-tight
                    text-white
                    transition-colors
                    hover:bg-neutral-900
                  "
                >
                  <Sparkles className="mr-2 h-4 w-4" />

                  Ask AI
                </Button>

                <a
                  href="/Diyakalra_resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    variant="outline"
                    className="
                      h-12
                      min-w-[145px]
                      rounded-2xl
                      border-neutral-400
                      bg-white
                      text-[15px]
                      font-medium
                      tracking-tight
                      transition-colors
                      hover:border-black
                    "
                  >
                    Resume

                    <ArrowUpRight className="ml-2 h-4 w-4" />
                  </Button>
                </a>
              </div>

              {/* SOCIAL ICONS */}

              <div className="mt-10 flex items-center gap-8">
                <a
                  href="https://github.com/Diyakalra1"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                >
                  <FaGithub className="text-xl text-neutral-500 transition duration-300 hover:text-black" />
                </a>

                <a
                  href="https://www.linkedin.com/in/diya-kalra-/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                >
                  <FaLinkedin className="text-xl text-neutral-500 transition duration-300 hover:text-black" />
                </a>

                <a
                  href="https://mail.google.com/mail/?view=cm&fs=1&to=diyakalra266@gmail.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Email"
                >
                  <FaEnvelope className="text-xl text-neutral-500 transition duration-300 hover:text-black" />
                </a>
              </div>
            </div>

            {/* RIGHT */}

            <div className="flex justify-center lg:justify-end lg:pr-12">
              <div
                ref={imageRef}
                className="
                  relative
                  h-[430px]
                  w-[430px]
                  overflow-hidden
                  rounded-[28px]
                  transition-all
                  duration-150
                  ease-out
                "
                style={{
                  boxShadow:
                    "0px 20px 50px rgba(0,0,0,0.08)",
                }}
                onMouseMove={(e) => {
                  if (!imageRef.current) return;

                  const rect =
                    imageRef.current.getBoundingClientRect();

                  const x = e.clientX - rect.left;
                  const y = e.clientY - rect.top;

                  const centerX = rect.width / 2;
                  const centerY = rect.height / 2;

                  const dx = (x - centerX) / centerX;
                  const dy = (y - centerY) / centerY;

                  imageRef.current.style.boxShadow = `
                    ${-dx * 24}px
                    ${-dy * 24 + 20}px
                    60px
                    rgba(0,0,0,0.15)
                  `;
                }}
                onMouseLeave={() => {
                  if (!imageRef.current) return;

                  imageRef.current.style.boxShadow =
                    "0px 20px 50px rgba(0,0,0,0.08)";
                }}
              >
                <Image
                  src="/diya.png"
                  alt="Diya Kalra"
                  fill
                  priority
                  className="object-cover object-top"
                />
              </div>
            </div>
          </div>
        </Container>
      </section>

      <PortfolioChat
        open={chatOpen}
        onClose={() => setChatOpen(false)}
      />
    </>
  );
}