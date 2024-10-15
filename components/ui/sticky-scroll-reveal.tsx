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
    <div className="flex w-full h-[30rem] relative flex-row justify-center">
      <div className="w-full overflow-y-auto hide-scrollbar" ref={ref}>
        <div className="">
          <TracingBeam scrollRef={ref}>
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
      <div className="w-2/5 absolute right-[8%] top-[50%]">
        <div
          className={cn(
            "h-auto w-full rounded-md absolute top-1/2 left-0 transform -translate-y-1/2 overflow-hidden",
            "shadow-2xl", // Thêm shadow để tạo độ sâu
            "bg-neutral-900/5 dark:bg-neutral-950", // Thêm màu nền
            "transition-all duration-300 ease-in-out", // Thêm hiệu ứng chuyển đổi
            "hover:shadow-2xl hover:scale-105", // Hiệu ứng khi hover
            contentClassName
          )}
        >
          <div className="w-full h-auto flex items-center justify-center p-4">
            {content[activeCard].content ?? null}
          </div>
        </div>
      </div>
    </div>
  );
};
