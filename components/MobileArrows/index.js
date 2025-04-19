import CaretLeft from "../../icon/CaretLeft";
import CaretRight from "../../icon/CaretRight";

const MobileArrows = ({ onLeftClick, onRightClick }) => {
  return (
    <div className="mobile-arrows hide-desktop">
      {onLeftClick && (
        <div
          className="arrow left"
          onClick={onLeftClick}
          role="button"
        >
          <CaretLeft size={30} />
        </div>
      )}
      {onRightClick && (
        <div
          className="arrow right"
          onClick={onRightClick}
          role="button"
        >
          <CaretRight size={30} />
        </div>
      )}
    </div>
  );
};

export default MobileArrows;
