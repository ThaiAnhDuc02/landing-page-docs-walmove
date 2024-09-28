"use client";

import { useVideo } from '@/contexts/VideoContext';
import { AnimatePresence, motion } from "framer-motion";
import { XIcon } from "lucide-react";
import { useState, useEffect } from 'react';

import { cn } from "@/lib/utils";

type AnimationStyle =
  | "from-bottom"
  | "from-center"
  | "from-top"
  | "from-left"
  | "from-right"
  | "fade"
  | "top-in-bottom-out"
  | "left-in-right-out";

interface HeroVideoProps {
  animationStyle?: AnimationStyle;
  videoSrc: string;
  thumbnailSrc: string;
  thumbnailAlt?: string;
  className?: string;
}

const animationVariants = {
  "from-bottom": {
    initial: { y: "100%", opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: "100%", opacity: 0 },
  },
  "from-center": {
    initial: { scale: 0.5, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 0.5, opacity: 0 },
  },
  "from-top": {
    initial: { y: "-100%", opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: "-100%", opacity: 0 },
  },
  "from-left": {
    initial: { x: "-100%", opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: "-100%", opacity: 0 },
  },
  "from-right": {
    initial: { x: "100%", opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: "100%", opacity: 0 },
  },
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  },
  "top-in-bottom-out": {
    initial: { y: "-100%", opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: "100%", opacity: 0 },
  },
  "left-in-right-out": {
    initial: { x: "-100%", opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: "100%", opacity: 0 },
  },
};

export default function HeroVideoDialog({
  animationStyle = "from-center",
  videoSrc,
  thumbnailSrc,
  thumbnailAlt = "Video thumbnail",
  className,
}: HeroVideoProps) {
  const { isVideoOpen, closeVideo } = useVideo();
  const [isVideoSmall, setIsVideoSmall] = useState(false);
  const selectedAnimation = animationVariants[animationStyle];

  useEffect(() => {
    if (isVideoOpen) {
      console.log("Video dialog opened");
    }
  }, [isVideoOpen]);

  const handleVideoClick = () => {
    setIsVideoSmall(!isVideoSmall);
  };

  const videoVariants = {
    full: { width: "100%", height: "100%" },
    small: { width: "60%", height: "60%" },
  };

  if (!isVideoOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex  bg-black/20 backdrop-blur-md">
      <div className='relative flex items-center justify-center w-full h-full'>
        <button
          className="absolute top-4 right-4 text-white text-xl bg-neutral-900/50 ring-1 backdrop-blur-md rounded-full p-2 dark:bg-neutral-100/50 dark:text-black z-10"
          onClick={closeVideo}
        >
          <XIcon className="size-5" />
        </button>
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          transition={{ duration: 0.3 }}
          className={cn(
            "flex items-center justify-center",
            isVideoSmall ? "w-2/3 h-2/3" : "w-[60%] h-[60%] max-w-7xl max-h-[80vh]"
          )}
        >
          <div
            className={cn(
              "w-full h-full transition-all duration-300 ease-in-out cursor-pointer",
              isVideoSmall ? "scale-75" : "scale-100"
            )}
            onClick={handleVideoClick}
          >
            <iframe
              src={videoSrc}
              className="w-full h-full rounded-lg"
              allowFullScreen
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            ></iframe>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
