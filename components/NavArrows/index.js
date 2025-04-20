"use client";
import CaretLeft from "../../icon/CaretLeft";
import CaretRight from "../../icon/CaretRight";

const NavArrows = ({ onLeftClick, onRightClick }) => {
  return (
    <>
      {onLeftClick && (
        <div
          className="desktop arrow left"
          onClick={onLeftClick}
          role="button"
          aria-label="Previous"
        >
          <CaretLeft />
        </div>
      )}
      {onRightClick && (
        <div
          className="desktop arrow right"
          onClick={onRightClick}
          role="button"
          aria-label="Next"
        >
          <CaretRight />
        </div>
      )}
      <div className="mobile-arrows hide-desktop">
        {onLeftClick && (
          <div
            className="arrow left"
            onClick={onLeftClick}
            role="button"
            aria-label="Previous"
          >
            <CaretLeft size={30} />
          </div>
        )}
        {onRightClick && (
          <div
            className="arrow right"
            onClick={onRightClick}
            role="button"
            aria-label="Next"
          >
            <CaretRight size={30} />
          </div>
        )}
      </div>
    </>
  );
};

export default NavArrows;
