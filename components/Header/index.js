import "./index.scss";

function Header({ mobileMenuOpen, toggleMobileMenu }) {
  return (
    <header>
      <div className="title">RAMI GEORGE</div>
      <div className="nav-links">
        <a href="/">INDEX</a>
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
