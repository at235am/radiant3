import { Theme, ThemeProvider } from "@emotion/react";
import React, { createContext, useContext, useState } from "react";
import { GlobalReset, THEMES } from "../util/Themes";

type State = {
  selectedTheme: string;
  currentTheme: Theme;
  themes: { [name: string]: Theme };
  toggleTheme: () => void;
  toggleThroughAllThemes: () => void;
  changeCustomTheme: (fn: (a: Theme) => Theme) => void;
};

type ThemeProviderProps = {
  children: React.ReactNode;
};

const ThemeStateContext = createContext<State | undefined>(undefined);

/**
 * ThemeStateProvider wraps both emotion's ThemeProvider with our own custom ThemeStateContext provider
 * We use ThemeStateProvider to get and update the state of the theme
 * while using emotion's ThemeProvider to provide us our theme object values in emotion's styled components.
 */
const ThemeStateProvider = ({ children }: ThemeProviderProps) => {
  const [themes, setThemes] = useState(THEMES);
  const [selectedTheme, setSelectedTheme] = useState("custom");
  const currentTheme = themes[selectedTheme];
  const themeKeys = Object.keys(themes);

  const toggleThroughAllThemes = () => {
    const index = themeKeys.findIndex((str) => str === selectedTheme);
    const nextIndex = (index + 1) % themeKeys.length;
    setSelectedTheme(themeKeys[nextIndex]);
  };

  const toggleTheme = () =>
    setSelectedTheme((val) => (val === "dark" ? "light" : "dark"));

  const changeCustomTheme = (fn: (a: Theme) => Theme) => {
    const newTheme = fn(themes["custom"]);
    setThemes((allThemes) => ({
      ...allThemes,
      custom: { ...newTheme, name: "custom" },
    }));
  };

  return (
    <ThemeStateContext.Provider
      value={{
        themes,
        toggleTheme,
        currentTheme,
        selectedTheme,
        changeCustomTheme,
        toggleThroughAllThemes,
      }}
    >
      <ThemeProvider theme={currentTheme}>
        <GlobalReset />
        {children}
      </ThemeProvider>
    </ThemeStateContext.Provider>
  );
};

const useThemeState = () => {
  const context = useContext(ThemeStateContext);
  if (context === undefined)
    throw new Error("useThemeState must be used within a ThemeProvider");
  return context;
};

export { ThemeStateProvider, useThemeState };

// const getKeyPermutations: any = (theme: Object, parentKey: any = "") => {
//   // console.log("----------------------");
//   const finalValues: any = [];

//   Object.entries(theme).forEach((entry, i) => {
//     const key = entry[0];
//     const value = entry[1];
//     const newParentKey = `${parentKey}.${key}`;

//     if (typeof value === "object")
//       finalValues.push(...getKeyPermutations(value, newParentKey));
//     else finalValues.push({ keyPath: newParentKey, value });
//   });

//   return finalValues;
// };

// const getKeyPermutations: any = (theme: Object, parentKey: any = "") => {
//   // console.log("----------------------");
//   const finalValues: Map<string, any> = new Map();

//   Object.entries(theme).forEach((entry, i) => {
//     const key = entry[0];
//     const value = entry[1];
//     const newParentKey = `${parentKey}.${key}`;

//     if (typeof value === "object") {
//       const map = getKeyPermutations(value, newParentKey);

//       map.forEach((v: any, k: any) => {
//         finalValues.set(k, v);
//       });
//       // finalValues.set();
//     } else finalValues.set(newParentKey, value);
//   });

//   return finalValues;
// };

// const createObj: any = (keys: string[], value: any) => {
//   if (keys.length === 0 || !keys) return { wrong: "uhoh" };
//   if (keys.length === 1) {
//     return { [keys[0]]: value };
//   } else {
//     const a = createObj([...keys.slice(1, keys.length)], value);

//     return { [keys[0]]: a };
//   }
// };

// const groupObjs = (arrayOfObjs: any) => {
//   console.log(arrayOfObjs);

//   // // const set = new Set();
//   let obj = {};
//   arrayOfObjs.forEach((key: any) => {
//     const newArrayOfObjs = key.length > 1 ? key.slice(1, key.length) : "";
//     console.log(newArrayOfObjs);
//     // // const a = key.length > 1 ? groupObjs(newArrayOfObjs) : "";
//     obj = { ...obj, [key[0]]: "{}" };
//   });

//   return obj;
// };

// const convertFlattenDotKeysToObj: any = (map: Map<string, any>) => {
//   let obj = {};

//   map.forEach((v, k) => {
//     console.log(k, v, k.split("."));

//     const array = k.split(".");
//     array.forEach((key: any) => {
//       if (key) {
//         obj = { ...obj, [key]: v };
//       }
//     });
//   });

//   return obj;
// };

// const changeCustomTheme = (updateFields: RecursivePartial<Theme>) => {

//   const customThemeMap = getKeyPermutations(customTheme, "");
//   const updatedFieldsMap = getKeyPermutations(updateFields, "");

//   updatedFieldsMap.forEach((v: any, k: any) => {
//     if (customThemeMap.has(k)) customThemeMap.set(k, v);
//   });

//   const arrayOfObjs: any[] = [];

//   customThemeMap.forEach((v: any, k: any) => {
//     let keys = k.split(".");
//     keys = keys.slice(1, keys.length);
//     console.log("keys correct", keys);
//     arrayOfObjs.push(keys);
//     console.log("obj created:", createObj(keys, v));
//   });

//   console.log(groupObjs(arrayOfObjs));

// };
