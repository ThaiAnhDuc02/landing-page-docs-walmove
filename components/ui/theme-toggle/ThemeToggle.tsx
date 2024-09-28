import { useTheme } from 'nextra-theme-docs';
import React from 'react';

import { FiMoon, FiSun } from 'react-icons/fi';

const ThemeToggle: React.FC = () => {
  const { theme, setTheme } = useTheme();

  return (
    <button
      type="button"
      className="inline-flex items-center rounded-full border p-1 max-lg:hidden"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
    >
      <FiSun
        className={`size-8 rounded-full p-1.5 mr-1 ${theme === 'dark'
          ? 'bg-transparent text-muted-foreground'
          : 'bg-accent text-accent-foreground'
          }`}
      />
      <FiMoon
        className={`size-8 rounded-full p-1.5 ${theme === 'dark'
          ? 'bg-accent text-accent-foreground'
          : 'text-muted-foreground'
          }`}
      />
    </button>
  );
};

export default ThemeToggle;