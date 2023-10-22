import { CSSProperties, ReactNode } from "react";

type RowComponentProps = {
  style?: CSSProperties;
  children: ReactNode;
};

const RowComponent = ({style, children}: RowComponentProps) => {
  return (
    <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", ...style}}>
      {children}
    </div>
  )
}

export default RowComponent