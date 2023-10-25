import { CSSProperties, ReactNode } from "react";

type RowComponentProps = {
  style?: CSSProperties;
  children: ReactNode;
};

const RowComponent = ({style, children}: RowComponentProps) => {
  return (
    <div
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