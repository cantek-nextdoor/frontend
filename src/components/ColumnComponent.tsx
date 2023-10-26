import { CSSProperties, ReactNode } from "react";

type ColumnComponentProps = {
  style?: CSSProperties;
  className?: string;
  children: ReactNode;
};

const ColumnComponent = ({style, className, children}: ColumnComponentProps) => {
  return (
    <div
      className={className}
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: style?.justifyContent ?? "center",
        alignItems: style?.alignItems ?? "flex-start",
        ...style
      }}>
      {children}
    </div>
  )
}

export default ColumnComponent;