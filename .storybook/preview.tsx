import React, { useEffect } from "react";
import type { Preview } from "@storybook/react";
import "../tokens.css";
import "../globals.css";

/**
 * This is what makes Storybook trustworthy: components render against the
 * actual tokens.css / globals.css shipped to production, not a copy or an
 * approximation. If a token changes, every story reflects it immediately.
 */
const preview: Preview = {
  parameters: {
    backgrounds: {
      default: "app-bg",
      values: [
        { name: "app-bg", value: "#F4F5FA" },
        { name: "dark", value: "#0D0B1F" },
      ],
    },
    a11y: {
      // Fails the story (in CI via test-runner) on any WCAG AA violation.
      config: {},
      options: { checks: { "color-contrast": { enabled: true } } },
    },
  },
  globalTypes: {
    theme: {
      description: "Light / dark surface",
      toolbar: {
        items: [
          { value: "light", title: "Light" },
          { value: "dark", title: "Dark" },
        ],
      },
    },
  },
  decorators: [
    (Story, context) => {
      const { theme } = context.globals;
      
      useEffect(() => {
        const root = document.documentElement;
        if (theme === 'dark') {
          root.classList.add('dark');
          root.setAttribute('data-theme', 'dark');
        } else {
          root.classList.remove('dark');
          root.removeAttribute('data-theme');
        }
      }, [theme]);

      return <Story />;
    },
  ],
};

export default preview;
