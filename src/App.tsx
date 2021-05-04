// styling:
import { css, jsx, Theme, useTheme } from "@emotion/react";
import styled from "@emotion/styled";

// libraries:
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Debug from "./components/Debug";

import { useThemeState } from "./contexts/ThemeContext";

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  overflow: auto;
  width: 100%;
`;

const Wrapper = styled.div`
  display: flex;
  /* opacity: 0.5; */
  background-color: ${({ theme }) => theme.colors.primary};
`;

function App() {
  const theme = useTheme();
  const {
    currentTheme,
    toggleTheme,
    changeCustomTheme,
    toggleThroughAllThemes,
  } = useThemeState();

  return (
    <AppContainer className="App">
      <Helmet>
        <meta name="theme-color" content={theme.colors.background} />
        <title>{theme.colors.background}</title>
      </Helmet>
      <Wrapper>
        <Debug data={theme} />
        <Debug data={currentTheme} />
      </Wrapper>
      <button
        onClick={() => {
          console.log("themeState: ", currentTheme);
        }}
      >
        CONTEXT
      </button>
      <button onClick={toggleThroughAllThemes}>ALL THEMES</button>
      <button onClick={toggleTheme}>toggle themes</button>
      {/* <button
        onClick={() => {
          const colors = ["#ff0000", "#00ff00", "#0000ff"];
          function randomInRange(start: number, end: number) {
            return Math.floor(Math.random() * (end - start + 1) + start);
          }

          const colorChosen = colors[randomInRange(0, colors.length - 1)];

          const change = {
            colors: { ...defaultCustomTheme.colors, background: colorChosen },
          };
          console.log("-------\nthemechange", change);
          console.log("color chosen", colorChosen);
          changeCustomTheme(change);
        }}
      ></button> */}
      <button
        onClick={() => {
          const colors = ["#ff0000", "#00ff00", "#0000ff"];
          function randomInRange(start: number, end: number) {
            return Math.floor(Math.random() * (end - start + 1) + start);
          }

          const colorChosen = colors[randomInRange(0, colors.length - 1)];
          console.log(colorChosen);

          const updater = (currentCustomTheme: Theme) => ({
            ...currentCustomTheme,
            colors: {
              ...currentCustomTheme.colors,
              primary: colorChosen,
              background: colorChosen,
            },
            // ...currentCustomTheme,
            // colors: {
            //   ...currentCustomTheme.colors,
            //   primary: "#f34489",
            //   background: "#00e846",
            // },
          });

          changeCustomTheme(updater);
        }}
      >
        change custom theme
      </button>
    </AppContainer>
  );
}

export default App;
