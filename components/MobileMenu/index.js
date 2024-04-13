import { CSSTransition } from "react-transition-group";
import { useContext } from "react";
import { LayoutContext } from "@/app/layout";
import "./index.scss";

function MobileMenu({ isOpen, onToggle }) {
  const { setProjectsView } = useContext(LayoutContext);
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
              <ul className="plain-list">
                <li>
                  <a href="/" onClick={() => setProjectsView("list")}>INDEX</a>
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
