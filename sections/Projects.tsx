"use client";

import { useState, useRef } from "react";
import { useInView } from "framer-motion";
import {
  ArrowUpRight,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { FaGithub } from "react-icons/fa";
import Container from "@/components/Container";

const projects = [
  {
    id: 1,
    name: "AMASES",
    tagline: "Adaptive Multi-Agent Skill Evolution System",
    description:
      "A multi-agent AI system that evolves specialized skills through reinforcement learning.",
    image: "/amases.png",
    tech: ["OpenEnv", "PyTorch", "RL", "GRPO"],
    github: "https://github.com/Diyakalra1/skillgraph-adaptive-llm/blob/main/skillgraph_adaptive_env/README.md",
    demo: "https://github.com/Diyakalra1/skillgraph-adaptive-llm/blob/main/skillgraph_adaptive_env/README.md",
    pinned: true,

    problem:
      "Multi-agent systems often rely on static agent roles and struggle to adapt their capabilities across diverse tasks.",

    built:
      "Designed Planner, Debater, and Integrator agents with skill-tracking graphs, deterministic reward decomposition, and a TRL-GRPO training pipeline.",

    results:
      "Built the system across 15 task environments and finished in the Top 2.6% among 31,000+ hackathon registrations.",

    challenges:
      "Designing stable reward signals and coordinating specialized agents while preventing overlapping agent behaviour.",
  },

  {
    id: 2,
    name: "Local Language Integrator",
    tagline: "Real-Time Multilingual Communication Platform",
    description:
      "A real-time chat platform enabling communication across 14 Indian languages.",
    image: "/locallanguage.png",
    tech: ["React", "Socket.io", "Firebase", "Python","FASTAPI"],
    github: "https://github.com/Diyakalra1/local-language",
    demo: "https://local-language-ashen.vercel.app/login",
    pinned: true,

    problem:
      "Language barriers make real-time digital communication difficult across India's diverse linguistic ecosystem.",

    built:
      "Built a multilingual chat system with real-time translations, text-to-audio, and audio-to-text capabilities.",

    results:
      "Enabled real-time communication across 14 Indian languages through a unified messaging experience.",

    challenges:
     

"Real-time message delivery	-Messages were initially received only after a page refresh. This was resolved by ensuring users establish a Socket.IO connection and join the appropriate conversation room before sending or receiving messages. Responsive user interface	-Replaced fixed-width layouts with responsive Tailwind CSS utilities to ensure a consistent experience across different screen sizes and deployments."
  },

  {
    id: 3,
    name: "MedAssist",
    tagline: "Medical Evidence Copilot built using Traceable RAG with minimal latency",
    description:
      "A retrieval-grounded AI assistant for contextual medical information.",
    image: "MedAssist.png",
    tech: ["LangChain", "RAG", "VectorDB", "Flask", "gemini-3-flash-preview"],
    github: "https://github.com/Diyakalra1/Medical-Chatbot-",
    demo: "https://youtu.be/1YD7Zs4BcCA",
    pinned: false,

    problem:
  "Medical assistants powered solely by general-purpose LLMs often produce ungrounded responses, perform unnecessary LLM inference for unsupported queries, and lack mechanisms to validate evidence before generation.",

built:
  "Developed MedAssist, an evidence-aware medical RAG system integrating semantic query routing, vector retrieval, CrossEncoder reranking, context evaluation, and grounded response generation using Gemini and Pinecone.",

results:
  "Reduced unnecessary LLM invocations by 52%, lowered average end-to-end latency by 51.6% (1050 ms → 508 ms) across a 100-query benchmark, achieved 78% routing decision agreement, and promoted higher-quality evidence in 56% of medical queries while maintaining a 508 ms average inference latency.",

    

    challenges:
  "Unnecessary LLM inference was the primary latency bottleneck, while weak retrieval quality increased the risk of ungrounded responses. Introduced semantic routing, CrossEncoder reranking, and an evidence-aware context evaluator to improve retrieval precision and eliminate unsupported generations."
  },
];

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<
    (typeof projects)[0] | null
  >(null);

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const ref = useRef(null);

  const isInView = useInView(ref, {
    once: false,
    amount: 0.3,
  });

  const sortedProjects = [...projects].sort(
    (a, b) => Number(b.pinned) - Number(a.pinned)
  );

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400;

      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section
      id="projects"
      ref={ref}
      className="py-32"
      style={{
        opacity: isInView ? 1 : 0,
        transform: isInView
          ? "translateY(0)"
          : "translateY(40px)",
        transition:
          "all 1.2s cubic-bezier(0.17, 0.55, 0.55, 1)",
      }}
    >
      <Container>
        <p className="text-sm uppercase tracking-[0.25em] text-neutral-500">
          Selected Work
        </p>

        <h2 className="mt-5 text-5xl font-semibold tracking-tight">
          Projects built around
          <br />
          intelligent systems.
        </h2>

        <div className="mt-16 relative group">
          <div
            ref={scrollContainerRef}
            className="
              flex
              gap-6
              overflow-x-auto
              pb-4
              snap-x
              snap-mandatory
            "
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            {sortedProjects.map((project) => (
              <div
                key={project.id}
                onClick={() => setSelectedProject(project)}
                className="
                  min-w-[380px]
                  snap-start
                  overflow-hidden
                  rounded-[24px]
                  border
                  border-neutral-200
                  bg-white
                  cursor-pointer
                  transition-all
                  duration-300
                  hover:-translate-y-2
                  hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)]
                "
              >
                <div className="h-[220px] overflow-hidden bg-neutral-100">
                  <img
                    src={project.image}
                    alt={project.name}
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="p-6">
                  <h3 className="text-lg font-semibold">
                    {project.name}
                  </h3>

                  <p className="mt-1 text-sm text-neutral-500">
                    {project.tagline}
                  </p>

                  <p className="mt-3 leading-5 text-sm text-neutral-600">
                    {project.description}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-1">
                    {project.tech.slice(0, 3).map((item) => (
                      <span
                        key={item}
                        className="
                          rounded-full
                          border
                          border-neutral-200
                          px-2
                          py-1
                          text-xs
                        "
                      >
                        {item}
                      </span>
                    ))}
                  </div>

                  <div className="mt-5 flex gap-2">
                    <a
                      href={project.github}
                      onClick={(e) => e.stopPropagation()}
                      className="
                        flex-1
                        flex
                        items-center
                        justify-center
                        gap-1
                        rounded-full
                        border
                        border-neutral-300
                        px-3
                        py-2
                        text-xs
                        hover:bg-neutral-50
                        transition-colors
                      "
                    >
                      <FaGithub className="h-3 w-3" />

                      GitHub
                    </a>

                    <a
                      href={project.demo}
                      onClick={(e) => e.stopPropagation()}
                      className="
                        flex-1
                        flex
                        items-center
                        justify-center
                        gap-1
                        rounded-full
                        bg-black
                        px-3
                        py-2
                        text-xs
                        text-white
                        hover:bg-neutral-900
                        transition-colors
                      "
                    >
                      Demo

                      <ArrowUpRight className="h-3 w-3" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* LEFT ARROW */}

          <button
            onClick={() => scroll("left")}
            className="
              absolute
              left-0
              top-1/3
              -translate-y-1/2
              z-10
              h-10
              w-10
              rounded-full
              bg-white
              border
              border-neutral-300
              flex
              items-center
              justify-center
              hover:bg-neutral-100
              transition-all
              hover:shadow-lg
              -ml-6
              opacity-0
              group-hover:opacity-100
            "
            aria-label="Scroll left"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          {/* RIGHT ARROW */}

          <button
            onClick={() => scroll("right")}
            className="
              absolute
              right-0
              top-1/3
              -translate-y-1/2
              z-10
              h-10
              w-10
              rounded-full
              bg-white
              border
              border-neutral-300
              flex
              items-center
              justify-center
              hover:bg-neutral-100
              transition-all
              hover:shadow-lg
              -mr-6
              opacity-0
              group-hover:opacity-100
            "
            aria-label="Scroll right"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </Container>

      {selectedProject && (
        <div
          onClick={() => setSelectedProject(null)}
          className="
            fixed
            inset-0
            z-[100]
            flex
            items-center
            justify-center
            bg-black/40
            p-8
            backdrop-blur-sm
          "
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="
              relative
              max-h-[90vh]
              w-full
              max-w-4xl
              overflow-y-auto
              rounded-[32px]
              bg-white
              p-12
              shadow-[0_30px_100px_rgba(0,0,0,0.18)]
            "
          >
            {/* CLOSE BUTTON */}

            <button
              onClick={() => setSelectedProject(null)}
              aria-label="Close project"
              className="
                absolute
                right-6
                top-6
                flex
                h-9
                w-9
                items-center
                justify-center
                rounded-full
                border
                border-neutral-200
                bg-white
                text-neutral-500
                transition-colors
                duration-200
                hover:border-neutral-400
                hover:text-black
              "
            >
              <X className="h-4 w-4" />
            </button>

            <p className="text-sm uppercase tracking-[0.22em] text-neutral-500">
              Project Case Study
            </p>

            <h2 className="mt-5 text-4xl font-semibold">
              {selectedProject.name}
            </h2>

            <p className="mt-2 text-xl text-neutral-500">
              {selectedProject.tagline}
            </p>

            <div className="mt-12 space-y-10">
              <ProjectDetail
                title="The Problem"
                text={selectedProject.problem}
              />

              <ProjectDetail
                title="What I Built"
                text={selectedProject.built}
              />

              <ProjectDetail
                title="Results"
                text={selectedProject.results}
              />

              <ProjectDetail
                title="Challenges"
                text={selectedProject.challenges}
              />
            </div>

            <div className="mt-12 flex gap-4">
              <a
                href={selectedProject.github}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  flex
                  items-center
                  gap-2
                  rounded-full
                  border
                  border-neutral-300
                  px-6
                  py-3
                "
              >
                <FaGithub className="h-4 w-4" />

                GitHub
              </a>

              <a
                href={selectedProject.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  flex
                  items-center
                  gap-2
                  rounded-full
                  bg-black
                  px-6
                  py-3
                  text-white
                "
              >
                View Demo

                <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

function ProjectDetail({
  title,
  text,
}: {
  title: string;
  text: string;
}) {
  return (
    <div>
      <p className="text-sm uppercase tracking-[0.22em] text-neutral-500">
        {title}
      </p>

      <p className="mt-3 text-lg leading-8 text-neutral-700">
        {text}
      </p>
    </div>
  );
}