import React from 'react';
import { FaChevronRight } from 'react-icons/fa';

const faqItems = [
  {
    question: "How do I get started?",
    answer: "To get started with WALNET, simply sign up on our website and follow the easy setup instructions."
  },
  {
    question: "What are the costs?",
    answer: "We offer various pricing plans to suit different needs. Check our pricing page for detailed information."
  },
  {
    question: "Is it available on mobile devices?",
    answer: "Yes, WALNET is accessible on mobile devices through our dedicated mobile app or web browser."
  },
  {
    question: "Is my data secure?",
    answer: "We prioritize your data security. WALNET uses advanced encryption and blockchain technology to ensure your information is protected."
  }
];

const FAQSection: React.FC = () => {
  return (
    <section className="py-20 bg-[#1e2030] text-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">
          Frequently Asked Questions about WALNET
        </h2>

        <div className="max-w-3xl mx-auto mb-12">
          {faqItems.map((item, index) => (
            <div key={index} className="mb-6">
              <h3 className="text-xl font-semibold mb-2 flex items-center">
                <FaChevronRight className="text-purple-500 mr-2" />
                {item.question}
              </h3>
              <p className="text-gray-300 ml-6">{item.answer}</p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <button className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-6 rounded-full transition duration-300">
            Read More FAQs
          </button>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;