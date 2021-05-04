import "@emotion/react";

declare module "@emotion/react" {
  export interface Font {
    size: number;
    family: string;
    weight: string;
  }
  export interface Dimension {
    baseUnit: number;
    mainNav: {
      maxWidth: number;
      maxHeight: number;
    };
    subNav: {
      maxWidth: number;
      maxHeight: number;
    };
  }
  export interface Theme {
    name: string;
    dimensions: Dimension;
    colors: {
      primary: string;
      secondary: string;
      background: string;
      surface: string;
      onPrimary: string;
      onSecondary: string;
      onBackground: string;
      onSurface: string;
      outline: string;
      error: string;
      correct: string;
      warning: string;
    };
    font: Font;
    breakpoints?: {
      xs: string;
      x: string;
      m: string;
      l: string;
      xl: string;
    };
  }
}
