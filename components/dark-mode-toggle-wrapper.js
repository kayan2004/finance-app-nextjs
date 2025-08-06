"use client";
import { CookiesProvider } from "react-cookie";
import DarkModeToggle from "./dark-mode-toggle";
const DarkModeToggleWrapper = ({ defaultTheme }) => {
  return (
    <>
      <CookiesProvider>
        <DarkModeToggle defaultTheme={defaultTheme} />
      </CookiesProvider>
    </>
  );
};
export default DarkModeToggleWrapper;
