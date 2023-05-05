import "./index.scss";

function Header({ mobileMenuOpen, toggleMobileMenu }) {
  return (
    <header>
      <a className="home-link" href="/">
        RAMI GEORGE
      </a>
      <div className="nav-links">
        <a href="/projects">INDEX</a>
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
