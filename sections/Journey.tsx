"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import Container from "@/components/Container";

type ActivityDay = {
  date: string;
  count: number;
};

export default function Journey() {
  const [activity, setActivity] = useState<ActivityDay[]>([]);
  const [totalSolved, setTotalSolved] = useState(257);

  const ref = useRef(null);

  const isInView = useInView(ref, {
    once: false,
    amount: 0.2,
  });

  useEffect(() => {
    async function getLeetCodeData() {
      try {
        const calendarResponse = await fetch(
          "https://alfa-leetcode-api.onrender.com/diya_kalra/calendar"
        );

        if (calendarResponse.ok) {
          const calendarData = await calendarResponse.json();

          const calendar = JSON.parse(
            calendarData.submissionCalendar || "{}"
          );

          const formattedActivity = Object.entries(calendar).map(
            ([timestamp, count]) => ({
              date: new Date(Number(timestamp) * 1000)
                .toISOString()
                .split("T")[0],

              count: Number(count),
            })
          );

          setActivity(formattedActivity);
        }

        const solvedResponse = await fetch(
          "https://alfa-leetcode-api.onrender.com/diya_kalra/solved"
        );

        if (solvedResponse.ok) {
          const solvedData = await solvedResponse.json();

          setTotalSolved(solvedData.solvedProblem || 0);
        }
      } catch (error) {
        console.error(
          "LeetCode API temporarily unavailable:",
          error
        );
      }
    }

    getLeetCodeData();
  }, []);

  const activityMap = new Map(
    activity.map((day) => [day.date, day.count])
  );

  const days = Array.from({ length: 365 }, (_, index) => {
    const date = new Date();

    date.setDate(date.getDate() - (364 - index));

    const dateString = date.toISOString().split("T")[0];

    return {
      date: dateString,
      count: activityMap.get(dateString) || 0,
    };
  });

  const totalActiveDays = days.filter(
    (day) => day.count > 0
  ).length;

  function getActivityColor(count: number) {
    if (count === 0) return "bg-[#ebedf0]";
    if (count === 1) return "bg-[#9be9a8]";
    if (count <= 3) return "bg-[#40c463]";
    if (count <= 6) return "bg-[#30a14e]";

    return "bg-[#216e39]";
  }

  return (
    <section
      id="journey"
      ref={ref}
      className="relative overflow-hidden py-24"
    >
      {/* APPEAR ANIMATION */}

      <div
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
          {/* SECTION HEADING */}

          <p className="text-sm uppercase tracking-[0.25em] text-neutral-500">
            Coding Journey
          </p>

          <h2 className="mt-5 text-5xl font-semibold tracking-tight">
            Consistency behind
            <br />
            the work.
          </h2>

          {/* JOURNEY CARD */}

          <div
            className="
              relative
              mt-10
              overflow-hidden
              rounded-[30px]
              border
              border-neutral-200
              bg-white
              p-10
              shadow-[0_15px_60px_rgba(0,0,0,0.05)]
            "
          >
            {/* SOFT BACKGROUND GLOW */}

            <div
              className="
                pointer-events-none
                absolute
                right-[-5%]
                top-[-35%]
                h-[550px]
                w-[550px]
                rounded-full
                bg-neutral-200/60
                blur-[130px]
              "
            />

            <div
              className="
                pointer-events-none
                absolute
                right-[20%]
                top-[5%]
                h-[300px]
                w-[300px]
                rounded-full
                bg-[#f8f6f2]
                blur-[90px]
              "
            />

            {/* CARD CONTENT */}

            <div className="relative z-10">
              {/* INTRO */}

              <p className="text-sm uppercase tracking-[0.22em] text-neutral-500">
                Coding Activity
              </p>

              <h3 className="mt-3 text-2xl font-semibold">
                LeetCode consistency
              </h3>

              <p className="mt-2 text-neutral-500">
                Building problem-solving depth, one problem at a
                time.
              </p>

              {/* STATS */}

              <div className="mt-10 grid max-w-[550px] grid-cols-2 gap-5">
                {/* ACTIVE DAYS */}

                <div
                  className="
                    rounded-[22px]
                    border
                    border-neutral-200
                    bg-[#f8f6f2]/80
                    px-7
                    py-5
                    backdrop-blur-sm
                    transition-all
                    duration-300
                    hover:-translate-y-1
                    hover:shadow-md
                  "
                >
                  <p className="text-sm text-neutral-500">
                    Total Active Days
                  </p>

                  <h3 className="mt-2 text-4xl font-semibold tracking-tight">
                    {totalActiveDays}
                  </h3>

                  <p className="mt-2 text-sm text-neutral-400">
                    on LeetCode
                  </p>
                </div>

                {/* PROBLEMS SOLVED */}

                <div
                  className="
                    rounded-[22px]
                    border
                    border-neutral-200
                    bg-[#f8f6f2]/80
                    px-7
                    py-5
                    backdrop-blur-sm
                    transition-all
                    duration-300
                    hover:-translate-y-1
                    hover:shadow-md
                  "
                >
                  <p className="text-sm text-neutral-500">
                    Problems Solved
                  </p>

                  <h3 className="mt-2 text-4xl font-semibold tracking-tight">
                    {totalSolved}
                  </h3>

                  <p className="mt-2 text-sm text-neutral-400">
                    on LeetCode
                  </p>
                </div>
              </div>

              {/* DIVIDER */}

              <div className="mt-10 h-px w-full bg-neutral-200/70" />

              {/* HEATMAP */}

              <div className="project-scroll mt-8 overflow-x-auto">
                <div
                  className="
                    grid
                    w-max
                    grid-flow-col
                    grid-rows-7
                    gap-[5px]
                  "
                >
                  {days.map((day) => (
                    <div
                      key={day.date}
                      title={`${day.date} — ${day.count} submissions`}
                      className={`
                        h-[13px]
                        w-[13px]
                        rounded-[3px]
                        ${getActivityColor(day.count)}
                        transition-all
                        duration-200
                        hover:scale-125
                      `}
                    />
                  ))}
                </div>
              </div>

              {/* HEATMAP LEGEND */}

              <div className="mt-6 flex items-center justify-end gap-2">
                <span className="text-xs text-neutral-400">
                  Less
                </span>

                <div className="h-3 w-3 rounded-[3px] bg-[#ebedf0]" />

                <div className="h-3 w-3 rounded-[3px] bg-[#9be9a8]" />

                <div className="h-3 w-3 rounded-[3px] bg-[#40c463]" />

                <div className="h-3 w-3 rounded-[3px] bg-[#30a14e]" />

                <div className="h-3 w-3 rounded-[3px] bg-[#216e39]" />

                <span className="text-xs text-neutral-400">
                  More
                </span>
              </div>

              {/* LEETCODE BUTTON */}

              <div className="mt-8 flex justify-start">
                <a
                  href="https://leetcode.com/u/diya_kalra/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    rounded-full
                    border
                    border-neutral-300
                    px-5
                    py-3
                    text-sm
                    font-medium
                    transition-all
                    duration-300
                    hover:border-black
                    hover:bg-black
                    hover:text-white
                  "
                >
                  View LeetCode ↗
                </a>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
}