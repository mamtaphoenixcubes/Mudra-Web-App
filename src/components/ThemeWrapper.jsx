"use client";

import { useEffect } from "react";
import { useTheme } from "../context/ThemeContext";

export default function ThemeWrapper({ children }) {
  const { textColor, dark } = useTheme();
  
  useEffect(() => {
    // Update CSS variable for text color
    document.documentElement.style.setProperty('--theme-text-color', textColor);
    
    // Update body class for dark mode - using 'dark' class
    if (dark) {
      document.documentElement.classList.add('dark');
      document.documentElement.style.backgroundColor = '#111827';
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.style.backgroundColor = '#f9fafb';
    }
  }, [textColor, dark]);

  return <>{children}</>;
}