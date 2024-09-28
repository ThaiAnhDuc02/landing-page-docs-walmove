import React, { useEffect, useState } from 'react';
import { FaGamepad, FaCode, FaShieldAlt, FaBolt } from 'react-icons/fa';
import BlurFade from '@/components/ui/blur-fade';
import CardIntro from '@/components/ui/card/CardIntro';
import TextRevealByWord from '@/components/ui/text-reveal';
import Particles from '@/components/ui/particles';
import { useTheme } from 'nextra-theme-docs';

export interface Feature {
  icon: React.ElementType;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    icon: FaGamepad,
    title: "Instant AAA Game Access",
    description: "No powerful PC needed, just connect and play!"
  },
  {
    icon: FaCode,
    title: "Seamless dApp Integration",
    description: "Access decentralized apps and GameFi with one click."
  },
  {
    icon: FaShieldAlt,
    title: "Security Through Smart Contracts",
    description: "All transactions secured by Sui's smart contracts."
  },
  {
    icon: FaBolt,
    title: "Smooth, Lag-Free Performance",
    description: "Enjoy high-performance gaming with no lag."
  }
];

const KeyFeatureSection: React.FC = () => {
  const { theme } = useTheme();
  const [color, setColor] = useState("#a855f7");

  useEffect(() => {
    setColor(theme === "dark" ? "#a855f7" : "#a855f7");
  }, [theme]);

  return (
    <section className="py-20 mb-20">
      <div className="container max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-center relative z-10 mx-auto h-56">
          <TextRevealByWord
            text="THE FEATURES"
            className="flex items-center justify-center text-4xl font-bold"
          />
          <Particles
            className="absolute"
            quantity={100}
            ease={80}
            color={color}
            refresh
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
          {features.map((feature, index) => (
            <CardIntro key={index} {...feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default KeyFeatureSection;
