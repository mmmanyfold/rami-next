"use client";
import "../globals.scss";
import { useState, useEffect, createContext } from "react";
import Header from "../components/Header";
import MobileMenu from "../components/MobileMenu";

export const LayoutContext = createContext(null);

function RootLayout({ children }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [projectsView, setProjectsView] = useState("gallery");

  useEffect(() => {
    const cachedView = sessionStorage.getItem("projectsView");
    if (cachedView) {
      setProjectsView(cachedView);
    }
  }, []);

  useEffect(() => {
    sessionStorage.setItem("projectsView", projectsView);
  }, [projectsView]);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <html lang="en">
      <body>
        <LayoutContext.Provider value={{ projectsView, setProjectsView }}>
          <Header
            mobileMenuOpen={mobileMenuOpen}
            toggleMobileMenu={toggleMobileMenu}
          />
          <MobileMenu isOpen={mobileMenuOpen} onToggle={toggleMobileMenu} />
          <main>{children}</main>
        </LayoutContext.Provider>
      </body>
    </html>
  );
}

export default RootLayout;
