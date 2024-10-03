"use client";
import React, { useRef } from "react";
import { useMotionValueEvent, useScroll } from "framer-motion";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { TracingBeam } from "./tracing-beam";

export const StickyScroll = ({
  content,
  contentClassName,
}: {
  content: {
    title: string;
    description: string;
    content?: React.ReactNode | any;
  }[];
  contentClassName?: string;
}) => {
  const [activeCard, setActiveCard] = React.useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    container: ref,
    offset: ["start start", "end start"],
  });
  const cardLength = content.length;

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const cardsBreakpoints = content.map((_, index) => index / cardLength);
    const closestBreakpointIndex = cardsBreakpoints.reduce(
      (acc, breakpoint, index) => {
        const distance = Math.abs(latest - breakpoint);
        if (distance < Math.abs(latest - cardsBreakpoints[acc])) {
          return index;
        }
        return acc;
      },
      0
    );
    setActiveCard(closestBreakpointIndex);
  });

  return (
    <motion.div
      className="h-[30rem] overflow-y-auto flex justify-center relative space-x-10 rounded-md p-10 hide-scrollbar"
      ref={ref}
    >
      <div className="div relative flex items-start px-4">
        <div className="max-w-2xl">
          <TracingBeam className="px-6" scrollRef={ref}>
            {content.map((item, index) => (
              <div key={item.title + index} className="my-20">
                <motion.h2
                  initial={{
                    opacity: 0,
                  }}
                  animate={{
                    opacity: activeCard === index ? 1 : 0.3,
                  }}
                  style={activeCard === index ? { color: "#60a5fa" } : {}}
                  className={cn(
                    "text-2xl font-bold adaptive-text",
                  )}
                >
                  {item.title}
                </motion.h2>
                <motion.p
                  initial={{
                    opacity: 0,
                  }}
                  animate={{
                    opacity: activeCard === index ? 1 : 0.3,
                  }}
                  className={cn(
                    "text-kg max-w-sm mt-10",
                    activeCard === index ? "text-foreground" : "text-muted-foreground"
                  )}
                >
                  {item.description}
                </motion.p>
              </div>
            ))}
            <div className="h-40" />
          </TracingBeam>
        </div>
      </div>
      <div
        className={cn(
          "hidden lg:block h-[400px] w-[400px] rounded-md sticky top-10 overflow-hidden",
          "shadow-lg", // Thêm shadow để tạo độ sâu
          "bg-white dark:bg-neutral-950", // Thêm màu nền
          "transition-all duration-300 ease-in-out", // Thêm hiệu ứng chuyển đổi
          "hover:shadow-xl hover:scale-105", // Hiệu ứng khi hover
          contentClassName
        )}
      >
        <div className="w-full h-full flex items-center justify-center p-4">
          {content[activeCard].content ?? null}
        </div>
      </div>
    </motion.div>
  );
};
