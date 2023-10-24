import { CSSProperties } from "react";

type ButtonProps = {
  style?: CSSProperties;
  title: string;
};

const Button = ({style, title}: ButtonProps) => {
  return (
    <button 
      style={{
        backgroundColor: style?.backgroundColor ?? "#2074d4",
        color: style?.color ?? "#fff",
        ...style
      }}
    >
      {title}
    </button>
  )
}

export default Button;