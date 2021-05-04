// custom type definitions (FOUND IN @type/emotion.d.ts):
import { Dimension, Font, Theme } from "@emotion/react";
import { css, Global, useTheme } from "@emotion/react";

export const dimensions: Dimension = {
  baseUnit: 14,
  mainNav: {
    maxWidth: 60,
    maxHeight: 60,
  },
  subNav: {
    maxWidth: 60,
    maxHeight: 60,
  },
};

export const baseFont: Font = {
  size: dimensions.baseUnit,
  family: "Inter, sans-serif",
  weight: "400",
};

export const darkTheme: Theme = {
  name: "dark",
  dimensions,
  colors: {
    // primary: "#afb9f1",
    // primary: "#54a0ff",
    primary: "#43dbab",
    secondary: "#2dc3e9",
    // secondary: "#e87b9b",

    background: "#363f49",
    surface: "#2c333b",

    // onPrimary: "#373e4d",
    onPrimary: "#ffffff",
    onSecondary: "#ffffff",

    onBackground: "#ffffff",
    onSurface: "#f6f6f6",

    outline: "#3b4148",

    error: "#ff6b6b",
    correct: "#37d7b2",
    warning: "#fee257",
  },
  font: baseFont,
  // dimensions: dimensions,
};

export const lightTheme: Theme = {
  name: "light",
  dimensions,
  colors: {
    // primary: "#e87b9b",
    // primary: "#54a0ff",
    primary: "#43dbab",
    secondary: "#6c63ff",

    // background: "#e5e5e5",
    // background: "#f1f3f4",
    background: "#edf0f5",

    surface: "#ffffff",
    // surface2: "f8f9fb",

    onPrimary: "#ffffff",
    onSecondary: "#000000",

    onBackground: "#363f49",
    // onSurface: "#e5e5e5",
    onSurface: "#2c333b",

    outline: "#ebebeb",
    // outline: "#eff1f3",

    error: "#ff6b6b",
    correct: "#37d7b2",
    warning: "#fee257",
  },
  font: baseFont,
  // dimensions: dimensions,
};

export const defaultCustomTheme: Theme = {
  ...darkTheme,
  name: "custom",
};

/** THEMES represent all the themes you define in Themes.ts */
export const THEMES = {
  [lightTheme.name]: lightTheme,
  [darkTheme.name]: darkTheme,
  [defaultCustomTheme.name]: defaultCustomTheme,
};

export const GlobalReset = () => {
  const theme: Theme = useTheme();

  return (
    <Global
      styles={css`
        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
          border: 0;
          outline: 0;

          font-family: ${theme.font.family};
          font-size: ${theme.font.size}px;
          font-weight: ${theme.font.weight};
          color: ${theme.colors.onBackground};
        }

        html {
          width: 100%;
          height: 100%;
          overflow: hidden;

          background-color: ${theme.colors.background};

          body {
            overflow: hidden;
            width: 100%;
            height: 100%;

            #root {
              overflow: hidden;
              width: 100%;
              height: 100%;

              display: flex;
            }
          }
        }

        a,
        a:link,
        a:visited,
        a:hover,
        a:active {
          cursor: pointer;
          text-decoration: none;
        }

        ul,
        ol {
          list-style-type: none;
        }

        button {
          border: 0;
          cursor: pointer;
        }

        button:active,
        button:focus {
          outline: 0;
        }

        input {
          border: 0;
          outline: 0;
        }
      `}
    />
  );
};
