"use client";

import { useInView } from "framer-motion";
import { useRef } from "react";
import Container from "@/components/Container";

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });

  return (
    <section 
      id="about"
      ref={ref}
      style={{
        opacity: isInView ? 1 : 0,
        transform: isInView ? "translateY(0)" : "translateY(40px)",
        transition: "all 1.2s cubic-bezier(0.17, 0.55, 0.55, 1)",
      }}
    >
      <Container>
        <div className="grid lg:grid-cols-[55%_45%] gap-0 items-start py-15">

          {/* LEFT */}

          <div>
            <p className="uppercase tracking-[0.25em] text-sm text-neutral-500 mb-2 px-1">
              ABOUT ME
            </p>

            <h2 className="text-5xl font-semibold leading-tight tracking-tight mb-3">
              Building intelligent software 
              <br />
               with AI at the core.
            </h2>

            <div className="max-w-[650px] space-y-3 text-[18px] leading-9 text-neutral-600 ">

              <p>
                I'm a Computer Science undergraduate at{" "}
                <span className="font-medium text-black">
                  Thapar Institute of Engineering & Technology
                </span>
                , currently maintaining a{" "}
                <span className="font-semibold text-black">
                  CGPA of 9.63
                </span>{" "}
                while building AI-powered applications,
                intelligent software systems, and full-stack products.
              
              </p>
                <p>
                I enjoy solving meaningful problems through technology.
                Whether it's developing intelligent AI systems,
                engineering scalable web applications,
                or exploring modern machine learning frameworks,
                I'm driven by the challenge of turning
                complex ideas into practical,
                user-centric solutions.
              </p>

              <p>
                Beyond academics, I continuously sharpen my
                problem-solving skills through competitive
                programming. I've solved{" "}
                <span className="font-semibold text-black">
                  200+ LeetCode problems
                </span>
                , maintained{" "}
                <span className="font-semibold text-black">
                  170+ active coding days
                </span>
                , and actively participate in hackathons
                that push me to build innovative
                solutions under real-world constraints.
              </p>

              

              <p>
                I'm constantly exploring emerging technologies,
                building ambitious side projects,
                and looking for opportunities to create software
                that delivers meaningful real-world impact.
              </p>

            </div>
          </div>

          {/* RIGHT */}

          
          <div className="glass-card rounded-3xl p-8 shadow-xl mt-4">
    

            <p className="uppercase text-sm tracking-[0.22em] text-neutral-500 mb-4">
              Profile At A Glance
            </p>

            <div className="grid grid-cols-2 gap-5">
              <Stat number="9.63" label="CGPA" />
              <Stat number="200+" label="LeetCode" />
              <Stat number="170+" label="Active Days" />
              <Stat number="5+" label="Projects" />
            </div>

            <div className="my-5 h-px bg-neutral-200" />

            <p className="uppercase text-sm tracking-[0.22em] text-neutral-500 mb-3">
              Achievements
            </p>

            <div className="space-y-6">
              <Achievement
                title="Top 2.5%"
                subtitle="Meta PyTorch OpenEnv Hackathon"
              />

              <Achievement
                title="Top 1%"
                subtitle="APOGEE Business Strategy Competition"
              />

              <Achievement
                title="1st Place"
                subtitle="MergeItUp — Enactus TIET"
              />
            </div>
          </div>
          

        </div>
      </Container>
    </section>
  );
}

function Stat({
  number,
  label,
}: {
  number: string;
  label: string;
}) {
  return (
    <div className="rounded-2xl border border-neutral-200 p-4">
      <h4 className="text-3xl font-semibold p-0">{number}</h4>

      <p className="mt-1 text-sm text-neutral-500">
        {label}
      </p>
    </div>
  );
}

function Achievement({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  return (
    <div>
      <h4 className="text-lg font-semibold">{title}</h4>

      <p className="text-neutral-500">
        {subtitle}
      </p>
    </div>
  );
}