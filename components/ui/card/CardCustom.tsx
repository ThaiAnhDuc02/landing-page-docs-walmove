import React from 'react';
import Link from 'next/link';

export const Cards: React.FC<{ children: React.ReactNode; num?: number }> = ({ children, num = 1 }) => {
  return (
    <div className={`grid grid-cols-1 gap-4 sm:grid-cols-${num}`}>
      {children}
    </div>
  );
};

interface CardProps {
  title: string;
  href: string;
  image?: boolean;
  arrow?: boolean;
  children: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({ title, href, image, children, arrow }) => {
  return (
    <Link href={href} className="group flex flex-col justify-start overflow-hidden rounded-lg border border-gray-200 bg-transparent text-current no-underline shadow-sm transition-all hover:border-gray-300 hover:shadow-md dark:border-neutral-700 dark:hover:border-neutral-600">
      <div className="p-4">
        <h3 className="text-lg font-semibold">{title}</h3>
        {image && <div className="mt-4">{children}</div>}
        {!image && <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{children}</p>}
        {arrow && <span className="transition-transform group-hover:translate-x-1">→</span>}
      </div>
    </Link>
  );
};