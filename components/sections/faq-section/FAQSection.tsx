import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion/Accordion"
import { BackgroundBeams } from '@/components/ui/background-beams';
import { MagicCard } from '@/components/ui/magic-card';
import { useTheme } from 'nextra-theme-docs';
import BlurFade from '@/components/ui/blur-fade';

const faqItems = [
  {
    question: "How do I get started?",
    answer: "To get started with WALNUT, simply sign up on our website and follow the easy setup instructions."
  },
  {
    question: "What are the costs?",
    answer: "We offer various pricing plans to suit different needs. Check our pricing page for detailed information."
  },
  {
    question: "Is it available on mobile devices?",
    answer: "Yes, WALNUT is accessible on mobile devices through our dedicated mobile app or web browser."
  },
  {
    question: "Is my data secure?",
    answer: "We prioritize your data security. WALNUT uses advanced encryption and blockchain technology to ensure your information is protected."
  }
];

const FAQSection: React.FC = () => {
  const { theme } = useTheme();

  return (
    <section className="py-20 background relative overflow-hidden">
      <BackgroundBeams />
      <div className="container mx-auto px-4 max-w-4xl relative z-10">
        <div className="text-5xl font-bold text-center mb-12 adaptive-text">
          FAQ
        </div>

        <Accordion type="single" collapsible className="space-y-6">
          {faqItems.map((item, index) => (
            <BlurFade key={index} inView delay={0.25 * index} yOffset={10}>
              <AccordionItem value={`item-${index}`}>
                {theme === "dark" ? (
                  <MagicCard gradientOpacity={1} className='shadow-lg flex flex-col justify-stretch'>
                    <AccordionTrigger
                      className="px-6 pb-5 text-lg font-semibold adaptive-text transition-all"
                    >
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent
                      className="px-6 pb-5 adaptive-text"
                    >
                      {item.answer}
                    </AccordionContent>
                  </MagicCard>
                ) : (
                  <MagicCard gradientOpacity={0.2} className='shadow-lg flex flex-col justify-stretch'>
                    <AccordionTrigger
                      className="px-6 pb-5 text-lg font-semibold adaptive-text transition-all"
                    >
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent
                      className="px-6 pb-5 adaptive-text"
                    >
                      {item.answer}
                    </AccordionContent>
                  </MagicCard>
                )}
              </AccordionItem>
            </BlurFade>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQSection;