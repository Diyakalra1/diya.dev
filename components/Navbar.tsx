"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useEffect, useState } from "react";

const links = [
  { name: "About", href: "#about" },
  { name: "Projects", href: "#projects" },
  { name: "Journey", href: "#journey" },
];

export default function Navbar() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;

      const documentHeight =
        document.documentElement.scrollHeight - window.innerHeight;

      const progress =
        documentHeight > 0
          ? (scrollTop / documentHeight) * 100
          : 0;

      setScrollProgress(progress);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () =>
      window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className="
        fixed
        inset-x-0
        top-0
        z-50
        bg-[#f8f6f2]/95
        backdrop-blur-md
      "
    >
      <div
        className="
          mx-auto
          flex
          h-16
          max-w-[1320px]
          items-center
          justify-between
          px-8
          lg:px-12
        "
      >
        {/* LOGO */}

        <Link
          href="/"
          className="
            flex
            items-center
            text-[19px]
            font-semibold
            tracking-[-0.04em]
            "
            >
            diya.dev

            <span className="logo-cursor ml-[2px]">_</span>
        </Link>

        {/* RIGHT SIDE */}

        <div className="flex items-center gap-14">
          <nav className="flex items-center gap-10">
            {links.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="
                  group
                  relative
                  overflow-hidden
                  text-[15px]
                  font-medium
                  text-neutral-600
                "
              >
                <span
                  className="
                    block
                    transition-transform
                    duration-300
                    ease-out
                    group-hover:-translate-y-full
                  "
                >
                  {link.name}
                </span>

                <span
                  className="
                    absolute
                    left-0
                    top-full
                    block
                    text-black
                    transition-transform
                    duration-300
                    ease-out
                    group-hover:-translate-y-full
                  "
                >
                  {link.name}
                </span>
              </a>
            ))}
          </nav>

          <button
            type="button"
            onClick={() => {
              window.scrollTo({
                top: document.documentElement.scrollHeight,
                behavior: "smooth",
              });
            }}
            className="
              group
              flex
              items-center
              gap-2
              text-[15px]
              font-semibold
              cursor-pointer
            "
          >
            Let's Talk

            <ArrowUpRight
              className="
                h-4
                w-4
                transition-transform
                duration-300
                group-hover:translate-x-1
                group-hover:-translate-y-1
              "
            />
          </button>
        </div>
      </div>

      {/* SCROLL PROGRESS */}

      <div className="h-px w-full bg-neutral-200">
        <div
          className="
            h-full
            bg-black
            transition-[width]
            duration-150
            ease-out
          "
          style={{
            width: `${scrollProgress}%`,
          }}
        />
      </div>
    </header>
  );
}