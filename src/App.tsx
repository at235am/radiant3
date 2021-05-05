// styling:
import { css, jsx, Theme, useTheme } from "@emotion/react";
import styled from "@emotion/styled";

// libraries:
import { BrowserRouter, Switch, Route, Redirect, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Debug from "./components/Debug";
import { useMediaQuery } from "react-responsive";

import { useThemeState } from "./contexts/ThemeContext";
import ThemePreview from "./util/Themes";
import { motion } from "framer-motion";
import { useState } from "react";
import ProPage from "./pages/ProPage";
import CrosshairCreator from "./pages/CrosshairCreator";
import NavigationBar from "./components/NavigationBar";
import { useUIState } from "./contexts/UIContext";

const AppContainer = styled.div`
  /* border: 3px solid pink; */
  width: 100%;

  display: flex;
  flex-direction: row;

  @media (max-width: ${({ theme }) => theme.breakpoints.m}px) {
    flex-direction: column;
  }
`;
const SidebarPortalLocation = styled(motion.div)`
  /* border: 1px solid yellow; */
  overflow: hidden;
  background-color: ${({ theme }) => theme.colors.surface.main};
`;

const PageContainer = styled.div`
  overflow: auto;
  flex: 1;

  display: flex;
  flex-direction: column;
`;

const App = () => {
  const theme = useTheme();
  const {
    currentTheme,
    toggleTheme,
    changeCustomTheme,
    toggleThroughAllThemes,
  } = useThemeState();

  const { sidebarState, toggleSidebar, isMobile } = useUIState();

  const horizontalVariant = {
    open: {
      width: "20rem",
      height: "100%",

      // transition: {
      //   staggerChildren: 0.04,
      //   delayChildren: 0.1,
      // },
    },
    closed: {
      width: 0,
      height: "100%",

      // transition: {
      //   delay: 0.2,
      // },
    },
  };

  const verticalVariant = {
    open: {
      height: "20rem",
      width: "100%",

      // on mobile phones this animation lags presumably cus of the large scroll content
      // this is a way to "turn off" the animation
      // transition: { duration: 0 },

      // transition: {
      //   staggerChildren: 0.04,
      //   delayChildren: 0.1,
      // },
    },
    closed: {
      width: "100%",
      height: 0,

      // on mobile phones this animation lags presumably cus of the large scroll content
      // this is a way to "turn off" the animation
      // transition: { duration: 0 },

      // transition: {
      //   delay: 0.2,
      // },
    },
  };

  return (
    <AppContainer>
      <Helmet>
        <meta name="theme-color" content={theme.colors.background.main} />
        <title>{theme.colors.background.main}</title>
      </Helmet>
      <BrowserRouter>
        <NavigationBar />
        <SidebarPortalLocation
          id="sidebar-portal"
          variants={isMobile ? verticalVariant : horizontalVariant}
          initial={sidebarState ? "open" : "closed"}
          animate={sidebarState ? "open" : "closed"}
        />
        <PageContainer className="page-container">
          <Switch>
            <Route path="/pro" component={ProPage} />
            <Route path="/cc" component={CrosshairCreator} />
          </Switch>
        </PageContainer>
      </BrowserRouter>
    </AppContainer>
  );
};

export default App;
