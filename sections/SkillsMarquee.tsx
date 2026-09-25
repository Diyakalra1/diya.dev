"use client";

const topSkills = [
  "Python",
  "C++",
  "JavaScript",
 
  "React",
  "Next.js",
  "SQL",
  "Firebase",
];

const bottomSkills = [
  "LangChain",
 "DSA"
  "RAG",
"My SQL"
  "Scikit-Learn",
  "Gemini",
    "Pandas"
  "Git",
];

function SkillRow({
  skills,
  direction,
}: {
  skills: string[];
  direction: "left" | "right";
}) {
  const repeatedSkills = [...skills, ...skills, ...skills, ...skills];

  return (
    <div className="overflow-hidden">
      <div
        className={`
          flex
          w-max
          items-center
          whitespace-nowrap
          ${
            direction === "left"
              ? "animate-marquee-left"
              : "animate-marquee-right"
          }
        `}
      >
        {repeatedSkills.map((skill, index) => (
          <div
            key={`${skill}-${index}`}
            className="flex items-center"
          >
            <span
              className="
                px-7
                text-2xl
                font-medium
                uppercase
                tracking-[0.08em]
                text-neutral-100
                lg:text-3xl
              "
            >
              {skill}
            </span>

            <span className="text-xl text-neutral-600">
                •
                </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function SkillsMarquee() {
  return (
    <section className="overflow-hidden py-20">
      <div
        className="
          border-y
          border-neutral-800
          bg-[#111111]
          py-8
        "
      >
        <SkillRow skills={topSkills} direction="right" />

        <div className="my-7 h-px bg-neutral-800" />

        <SkillRow skills={bottomSkills} direction="left" />
      </div>
    </section>
  );
}
