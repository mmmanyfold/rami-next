"use client";
import "../globals.scss";
import { useState } from "react";
import Header from "../components/Header";
import MobileMenu from "../components/MobileMenu";

function RootLayout({ children }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <html lang="en">
      <body>
        <Header
          mobileMenuOpen={mobileMenuOpen}
          toggleMobileMenu={toggleMobileMenu}
        />
        <MobileMenu isOpen={mobileMenuOpen} onToggle={toggleMobileMenu} />
        <main>{children}</main>
      </body>
    </html>
  );
}

export default RootLayout;
