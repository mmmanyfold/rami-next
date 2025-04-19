import CaretUpRight from "@/icon/CaretUpRight";

const LinkWithArrow = ({ href, text, isExternal }) => {
  return (
    <a 
      href={href}
      {...(isExternal ? { target: "_blank" } : {})}
    >
      {text}
      <CaretUpRight />
    </a>
  );
};

export default LinkWithArrow;
