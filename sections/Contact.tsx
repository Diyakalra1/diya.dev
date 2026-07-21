"use client";

import { useState, FormEvent } from "react";
import { ArrowUpRight, Mail, Send } from "lucide-react";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { twMerge } from "tailwind-merge";
import Container from "@/components/Container";

const inputStyles = `
  mt-2
  w-full
  border-b
  border-neutral-700
  bg-transparent
  py-3
  text-lg
  text-white
  outline-none
  transition-colors
  focus:border-white
`;

export default function Contact() {
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setStatus("sending");

    const form = event.currentTarget;
    const formData = new FormData(form);

    formData.append(
      "access_key",
      "be804b8a-3c49-448c-becc-fbf0008284d0"
    );

    formData.append("from_name", "Diya Kalra Portfolio");

    try {
      const response = await fetch(
        "https://api.web3forms.com/submit",
        {
          method: "POST",
          body: formData,
        }
      );

      const result = await response.json();

      if (result.success) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch (error) {
      console.error("Contact form error:", error);
      setStatus("error");
    }
  }

  return (
    <footer
      id="contact"
      className="
        sticky
        bottom-0
        -z-0
        bg-[#111111]
        text-white
      "
    >
      <Container>
        <div className="px-4 pt-36 pb-16 lg:pt-40 lg:pb-0">
          <div className="grid gap-20 lg:grid-cols-[40%_1fr] lg:gap-16">

            {/* LEFT */}

            <div>
              <p className="text-sm uppercase tracking-[0.25em] text-neutral-500">
                Contact
              </p>

              <h2 className="mt-6 text-5xl font-semibold leading-[1.1] tracking-tight lg:text-6xl">
                Have an idea?
                <br />
                Let's build it.
              </h2>

              <p className="mt-8 max-w-[500px] text-[18px] leading-8 text-neutral-400">
                I'm always open to discussing software engineering, AI,
                intelligent systems, internships, and interesting ideas worth
                building.
              </p>

              <a
                href="mailto:diyakalra266@gmail.com"
                className="
                  mt-10
                  inline-flex
                  items-center
                  gap-3
                  text-lg
                  font-medium
                  transition-opacity
                  hover:opacity-60
                "
              >
                <Mail className="h-5 w-5" />

                diyakalra266@gmail.com

                <ArrowUpRight className="h-4 w-4" />
              </a>

              <div className="mt-12 flex gap-3">
                <a
                  href="https://github.com/Diyakalra1"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className="
                    flex
                    h-12
                    w-12
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-neutral-700
                    text-neutral-300
                    transition-all
                    duration-300
                    hover:border-white
                    hover:bg-white
                    hover:text-black
                  "
                >
                  <FaGithub className="h-5 w-5" />
                </a>

                <a
                  href="https://www.linkedin.com/in/diya-kalra-/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="
                    flex
                    h-12
                    w-12
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-neutral-700
                    text-neutral-300
                    transition-all
                    duration-300
                    hover:border-white
                    hover:bg-white
                    hover:text-black
                  "
                >
                  <FaLinkedinIn className="h-5 w-5" />
                </a>
              </div>
            </div>

            {/* RIGHT */}

            <form onSubmit={handleSubmit} className="space-y-6">
              <input
                type="checkbox"
                name="botcheck"
                className="hidden"
              />

              <div className="grid gap-8 md:grid-cols-2">
                <div>
                  <label className="text-sm font-medium text-neutral-500">
                    Your name
                  </label>

                  <input
                    type="text"
                    name="name"
                    required
                    className={inputStyles}
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-neutral-500">
                    Your email
                  </label>

                  <input
                    type="email"
                    name="email"
                    required
                    className={inputStyles}
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-neutral-500">
                  Subject
                </label>

                <input
                  type="text"
                  name="subject"
                  required
                  className={inputStyles}
                />
              </div>

              <div>
                <label className="text-sm font-medium text-neutral-500">
                  Tell me about your idea
                </label>

                <textarea
                  rows={3}
                  name="message"
                  required
                  className={twMerge(
                    inputStyles,
                    "h-[100px] resize-none"
                  )}
                />
              </div>

              {status === "success" && (
                <p className="text-sm font-medium text-green-400">
                  Message sent successfully. I'll get back to you soon.
                </p>
              )}

              {status === "error" && (
                <p className="text-sm font-medium text-red-400">
                  Something went wrong. Please try again.
                </p>
              )}

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="
                    flex
                    items-center
                    gap-3
                    rounded-full
                    bg-white
                    px-8
                    py-4
                    font-medium
                    text-black
                    transition-all
                    duration-300
                    hover:-translate-y-1
                    hover:bg-neutral-200
                    disabled:cursor-not-allowed
                    disabled:opacity-50
                  "
                >
                  {status === "sending"
                    ? "Sending..."
                    : "Send Message"}

                  <Send className="h-4 w-4" />
                </button>
              </div>
            </form>
          </div>

          {/* FOOTER LINE */}

          <div className="mt-20 border-t border-neutral-800 pt-8">
            <div className="flex flex-col gap-3 text-sm text-neutral-500 md:flex-row md:items-center md:justify-between">
              <p>Made with ♡ by Diya Kalra</p>

              <p>2026</p>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}