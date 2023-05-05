import { CSSTransition } from "react-transition-group";
import "./index.scss";

function MobileMenu({ isOpen, onToggle }) {
  return (
    <div className="mobile-menu">
      {isOpen && (
        <>
          <CSSTransition
            in={isOpen}
            classNames="fade"
            timeout={300}
            unmountOnExit
          >
            <div className="overlay" onClick={onToggle} />
          </CSSTransition>
          <CSSTransition
            in={isOpen}
            classNames="slide"
            timeout={300}
            unmountOnExit
          >
            <div className="container" onClick={onToggle}>
              <ul>
                <li>
                  <a href="/index">INDEX</a>
                </li>
                <li>
                  <a href="/info">INFO</a>
                </li>
              </ul>
            </div>
          </CSSTransition>
        </>
      )}
    </div>
  );
}

export default MobileMenu;
