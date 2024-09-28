"use client";

import { useRef } from "react";
import {
  AnimatePresence,
  motion,
  useInView,
  UseInViewOptions,
  Variants,
} from "framer-motion";

type MarginType = UseInViewOptions["margin"];

interface BlurFadeProps {
  children: React.ReactNode;
  className?: string;
  variant?: {
    hidden: { y?: number; z?: number; rotateX?: number; rotateY?: number };
    visible: { y?: number; z?: number; rotateX?: number; rotateY?: number };
  };
  duration?: number;
  delay?: number;
  yOffset?: number;
  zOffset?: number;
  rotateAngle?: number;
  inView?: boolean;
  inViewMargin?: MarginType;
  blur?: string;
}

export default function BlurFade({
  children,
  className,
  variant,
  duration = 0.4,
  delay = 0,
  yOffset = 6,
  zOffset = -100,
  rotateAngle = 30,
  inView = false,
  inViewMargin = "-50px",
  blur = "6px",
}: BlurFadeProps) {
  const ref = useRef(null);
  const inViewResult = useInView(ref, { once: true, margin: inViewMargin });
  const isInView = !inView || inViewResult;

  const defaultVariants: Variants = {
    hidden: {
      y: yOffset,
      z: zOffset,
      rotateX: rotateAngle,
      opacity: 0,
      filter: `blur(${blur})`
    },
    visible: {
      y: 0,
      z: 0,
      rotateX: 0,
      opacity: 1,
      filter: `blur(0px)`
    },
  };

  const combinedVariants = variant || defaultVariants;

  return (
    <AnimatePresence>
      <motion.div
        ref={ref}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        exit="hidden"
        variants={combinedVariants}
        transition={{
          delay: 0.04 + delay,
          duration,
          ease: "easeOut",
        }}
        className={className}
        style={{ perspective: "1000px" }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
