import React from 'react';
import { FaSignInAlt, FaGamepad, FaRocket } from 'react-icons/fa';

const steps = [
  {
    icon: FaSignInAlt,
    title: "Log in to WALNET Cloud PC",
  },
  {
    icon: FaGamepad,
    title: "Select your favorite game or dApp",
  },
  {
    icon: FaRocket,
    title: "Start playing or using the app instantly – lag-free!",
  }
];

const HowItWorks: React.FC = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4 max-w-5xl">
        <h2 className="text-4xl font-bold text-center mb-8">
          How WALNET Works
        </h2>

        <div className="max-w-3xl mx-auto mb-12 text-center">
          <p className="text-lg text-gray-300">
            Built on the powerful Sui Blockchain, WALNET gives you instant access to AAA games and decentralized apps without the need for high-end hardware. All processing happens in the cloud, so you can focus on what matters - the experience.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="dark:bg-neutral-900 p-6 rounded-lg shadow-md text-center">
              <step.icon className="mx-auto text-5xl text-purple-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Step {index + 1}</h3>
              <p className="text-gray-300">{step.title}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;