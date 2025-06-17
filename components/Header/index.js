import { useContext } from "react";
import { LayoutContext } from "@/app/LayoutClient";
import "./index.scss";

function Header({ mobileMenuOpen, toggleMobileMenu }) {
  const { setProjectsView } = useContext(LayoutContext);

  return (
    <header>
      <a href="/"
        className="title"
        onClick={() => setProjectsView("gallery")}
      >
        RAMI GEORGE
      </a>
      <div className="nav-links">
        <a href="/" onClick={() => setProjectsView("list")}>INDEX</a>
        <a href="/info">INFO</a>
      </div>
      <div className="mobile-toggle-wrapper">
        <button
          onClick={toggleMobileMenu}
          className={`burger ${mobileMenuOpen ? "active" : ""}`}
        />
      </div>
    </header>
  );
}

export default Header;
