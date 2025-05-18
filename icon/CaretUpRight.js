import * as React from "react";

const CaretUpRight = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 220 220"
    width={props.size || 16}
    height={props.size || 16}
    style={{ marginRight: 3 }}
    {...props}
  >
    <path fill="none" d="M0 0h256v256H0z" />
    <path
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={18}
      d="M64 192 192 64M88 64h104v104"
    />
  </svg>
);

export default CaretUpRight;
