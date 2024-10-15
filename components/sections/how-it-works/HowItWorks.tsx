import React from 'react';
import { FaSignInAlt, FaGamepad, FaRocket } from 'react-icons/fa';
import { StickyScroll } from '@/components/ui/sticky-scroll-reveal';
import Image from 'next/image';
import WordFadeIn from '@/components/ui/word-fade-in';
import { FadeText } from '@/components/ui/fade-text';

const content = [
  {
    title: "Log in to WALNET Cloud PC",
    description:
      "Access our advanced cloud computing system quickly and securely. With WALNET, you can start your high-performance computing experience in just a few clicks.",
    content: (
      <div className="h-full w-full flex items-center justify-center">
        <img
          src="/assets/about/how_to_work/login1.png"
          className="w-full h-auto object-contain"
          alt="Login to WALNET Cloud PC"
        />
      </div>
    ),
  },
  {
    title: "Select your favorite game or dApp",
    description:
      "Browse our extensive library of high-performance applications and games. Whether you're a gamer or a developer, WALNET offers a wide range of options to suit your needs.",
    content: (
      <div className="h-full w-full flex items-center justify-center">
        <img
          src="/assets/about/how_to_work/blank.png"
          className="w-full h-auto object-contain"
          alt="Login to WALNET Cloud PC"
        />
      </div>
    ),
  },
  {
    title: "Enjoy seamless performance",
    description:
      "With WALNET, you can use GPU/CPU resources from your device or from nodes.",
    content: (
      <div className="h-full w-full flex items-center justify-center">
        <img
          src="/assets/about/how_to_work/sharing_gpu.png"
          className="w-full h-auto object-contain"
          alt="Login to WALNET Cloud PC"
        />
      </div>
    ),
  },
];

const HowItWorks: React.FC = () => {
  return (
    <section className="py-24 background">
      <div className="container mx-auto">
        <WordFadeIn delay={0.25} className="text-5xl font-bold adaptive-text text-center mb-8" words="HOW IT WORKS" />
        <div
          className="max-w-3xl mx-auto mb-16 text-center"
        >
          <FadeText
            className="text-xl adaptive-text"
            direction="right"
            framerProps={{
              show: { transition: { delay: 0.5, duration: 1 } },
            }}
            text="Built on the powerful Move, WALNET gives you instant access to games and decentralized apps without the need for high-end hardware. All processing happens in the cloud, so you can focus on what matters - the experience."
          />
        </div>
        <StickyScroll content={content} />
      </div>
    </section>
  );
};

export default HowItWorks;