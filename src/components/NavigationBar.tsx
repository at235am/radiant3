// styling:
import { css, jsx, useTheme } from "@emotion/react";
import styled from "@emotion/styled";
import { rgba } from "emotion-rgba";
import { motion } from "framer-motion";
import { createElement, forwardRef, useEffect, useState } from "react";

// icons:
import {
  MdBrightnessHigh,
  MdBrightness4,
  MdDetails,
  MdFirstPage,
  MdLastPage,
  MdFlare,
  MdMap,
  MdPeople,
  MdStar,
} from "react-icons/md";
import { FaCrown, FaCrosshairs } from "react-icons/fa";
import { FiCrosshair } from "react-icons/fi";
import { CgMenu } from "react-icons/cg";
import { BiCrosshair } from "react-icons/bi";

// custom:
// import { themeState } from "../recoil/ThemeState";
// import { useThemeCustom } from "./Theme";
// import ToggleButton from "./ToggleButton";
import Debug from "./Debug";
import { IconType } from "react-icons";
import { useThemeState } from "../contexts/ThemeContext";
import { useUIState } from "../contexts/UIContext";

const HEIGHT = 5;
const WIDTH = 7;

const NavbarContainer = styled(motion.nav)`
  position: relative;
  z-index: 200;

  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 550px) {
    /* background-color: red; */
    flex-direction: column-reverse;

    /* height: ${HEIGHT}rem; */
    /* max-height: ${HEIGHT}rem; */
    min-height: ${HEIGHT}rem;

    width: 100%;

    padding: 0 1rem;

    /* top: 5rem; */
  }

  @media (min-width: 551px) {
    /* background-color: blue; */
    flex-direction: column;

    width: ${WIDTH}rem;
    max-width: ${WIDTH}rem;
    min-width: ${WIDTH}rem;

    height: 100%;

    padding: 0.5rem 0;

    /* top: 0; */
  }
`;

const MainNav = styled.ul`
  display: flex;
  flex-direction: column;
  @media (max-width: 550px) {
    background-color: ${({ theme }) => theme.colors.surface.main};
    position: absolute;
    top: ${HEIGHT}rem;
    left: 0;

    width: 100%;
  }

  @media (min-width: 551px) {
    /* background-color: blue; */
  }
`;

const SubNav = styled.ul`
  flex: 1;

  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;

  @media (max-width: 550px) {
    flex-direction: row;
    width: 100%;
  }

  @media (min-width: 551px) {
    /* background-color: blue; */
    flex-direction: column;
  }
`;

const NavItem = styled.li`
  /* padding: 0 0.5rem; */

  width: ${WIDTH - 1.5}rem;
  height: ${WIDTH - 1.5}rem;

  @media (max-width: 550px) {
    width: 100%;
    height: ${HEIGHT - 1.5}rem;

    button {
      flex-direction: row;
      justify-content: flex-start;
      overflow: visible;
      padding: 0 1.75rem;

      span {
        margin-right: 1rem;
        ${({ iconSize }: { iconSize: any }) =>
          css`
            width: ${iconSize ? `${iconSize}px` : "1.5rem"};
            height: ${iconSize ? `${iconSize}px` : "1.5rem"};
          `}
      }
    }
  }

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const NavItemSmall = styled.li`
  /* padding: 0.5rem; */

  width: 3rem;
  height: 3rem;

  @media (max-width: 550px) {
    width: 3rem;
    height: 3rem;
  }

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Button = styled(motion.button)`
  background-color: transparent;

  height: 100%;
  width: 100%;

  overflow: hidden;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  border-radius: 5px;

  &:hover {
    background-color: ${({ theme }) =>
      rgba(theme.colors.onSecondary.main, 0.05)};
  }

  p {
    font-size: 12px;
    color: ${({ theme }) => theme.colors.onBackground.main};
  }

  span {
    ${({ small, iconSize }: { small: any; iconSize: any }) =>
      small
        ? css`
            width: ${iconSize ? `${iconSize}px` : "1.5rem"};
            height: ${iconSize ? `${iconSize}px` : "1.5rem"};
          `
        : css`
            width: ${iconSize ? `${iconSize}px` : "2.5rem"};
            height: ${iconSize ? `${iconSize}px` : "2.5rem"};
          `}

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    svg {
      height: 100%;
      width: 100%;

      path,
      line {
        fill: ${({ theme }) => theme.colors.onBackground.main};
      }
    }
  }

  @media (max-width: 550px) {
  }
`;

type NavButtonProps = {
  text?: string;
  icon?: IconType;
  iconSize?: number;
  small?: boolean;
  iconAnimation?: any;
  css?: any;
  className?: string;
  onClick?: () => void;
};

const NavButton = ({
  text,
  icon,
  iconSize,
  small = false,
  iconAnimation,
  css,
  className,
  onClick = () => {},
  ...props
}: NavButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  const Container = small ? NavItemSmall : NavItem;

  return (
    <Container css={css} className={className} iconSize={iconSize}>
      <Button iconSize={iconSize} small={small} onClick={onClick}>
        {icon && (
          <motion.span {...iconAnimation}>{createElement(icon)}</motion.span>
        )}

        {text && <p>{text}</p>}
      </Button>
    </Container>
  );
};

const Logo = styled(NavButton)`
  button {
    p {
      position: absolute;
      color: ${({ theme }) => theme.colors.onBackground.main};
      font-size: 1.25rem;
      font-weight: 700;
      letter-spacing: 1px;

      transform: translateY(-10px);
    }

    span {
      position: relative;
      transform-origin: center 39%;
      width: 5rem;
      height: 5rem;
      svg {
        path {
          fill: ${({ theme }) => theme.colors.primary.main};
        }
      }
    }

    /* span::after {
    content: "";
    position: absolute;
    top: 37.5%;
    left: 50%;
    background-color: red;
    width: 1px;
    height: 1px;
  } */
  }
`;

const MenuButton = styled(NavButton)`
  /* flex: 1; */
  /* justify-self: flex-start; */
  margin-right: auto;
`;

const NavigationBar = () => {
  const theme = useTheme();
  const {
    isMobile,
    toggleSidebar,
    setSidebarState,
    sidebarState,
  } = useUIState();
  const [mainNav, setMainNav] = useState(false);

  const { selectedTheme, toggleTheme } = useThemeState();
  const themeToggle = selectedTheme === "dark" ? true : false;
  const showMainNav = mainNav ? true : !isMobile;

  const rotate = {
    open: { rotate: 180 + (isMobile ? 90 : 0) },
    closed: { rotate: 0 + (isMobile ? 90 : 0) },
  };

  const navBarColor = {
    open: {
      backgroundColor: theme.colors.background.main,
    },
    closed: {
      backgroundColor: theme.colors.surface.main,
    },
  };

  const sidebarButtonAnimation = {
    variants: rotate,
    initial: sidebarState ? "open" : "closed",
    animate: sidebarState ? "open" : "closed",
  };

  const crossHairAnimation = {
    whileHover: {
      x: [0, 20, -20, 40, -50, 0, 0, 0, 0, 0, 0, 0],
      y: [0, 0, 50, 20, -20, 0, 0, 0, 0, 0, 0, 0],
      scale: [1, 0.5, 0.5, 0.5, 0.5, 0.5, 0.8, 0.5, 0.8, 0.5, 0.8, 0.5, 1],

      // rotate: [0, 0, 270, 270, 0],
      // borderRadius: ["20%", "20%", "50%", "50%", "20%"],
      transition: {
        duration: 2,
        ease: "easeInOut",
        // times: [0.3, 0.3, 0.3, 0.3, 0.3, 0.1, 0.1, 0.1, 0.1, 0.1],
        loop: Infinity,
        repeatDelay: 1,
      },
    },
  };

  const logoAnimation = {
    whileHover: {
      // originX: 0.5,
      rotate: 360,
      transition: {
        duration: 1,
        ease: "linear",

        loop: Infinity,
      },
    },
  };

  const toggleMainNav = () => setMainNav((val) => !val);
  const closeSidebarToggleMainNav = () => {
    setSidebarState(false);
    toggleMainNav();
  };

  return (
    <NavbarContainer
      variants={navBarColor}
      initial={sidebarState ? "open" : "closed"}
      animate={sidebarState ? "open" : "closed"}
    >
      {showMainNav && (
        <MainNav>
          {!isMobile && (
            <Logo text="" icon={MdDetails} iconAnimation={logoAnimation} />
          )}
          <NavButton
            text="Crosshair"
            icon={BiCrosshair}
            iconAnimation={crossHairAnimation}
          />
          <NavButton text="Map Tools" icon={MdMap} />
          <NavButton text="Top Picks" icon={MdStar} />
          <NavButton text="Pros" icon={FaCrown} />
          <NavButton text="Community" icon={MdPeople} />
        </MainNav>
      )}

      <SubNav>
        {isMobile && (
          <>
            <MenuButton
              small
              icon={CgMenu}
              iconSize={23}
              onClick={closeSidebarToggleMainNav}
            />
          </>
        )}
        <NavButton
          small
          onClick={toggleTheme}
          icon={themeToggle ? MdBrightnessHigh : MdBrightness4}
        />
        <NavButton
          small
          onClick={toggleSidebar}
          icon={MdLastPage}
          // iconSize={26}
          iconAnimation={sidebarButtonAnimation}
        />
      </SubNav>
    </NavbarContainer>
  );
};
export default NavigationBar;
