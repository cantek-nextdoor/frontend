import { CSSProperties, ReactNode } from "react";

type RowComponentProps = {
  style?: CSSProperties;
  className?: string;
  children: ReactNode;
};

const RowComponent = ({style, className, children}: RowComponentProps) => {
  return (
    <div
      className={className}
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: style?.justifyContent ?? "space-between",
        alignItems: style?.alignItems ?? "center",
        ...style
      }}>
      {children}
    </div>
  )
}

export default RowComponent