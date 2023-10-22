import { CSSProperties, ReactNode } from "react";

type ColumnComponentProps = {
  style?: CSSProperties;
  children: ReactNode;
};

const ColumnComponent = ({style, children}: ColumnComponentProps) => {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "center", ...style}}>
      {children}
    </div>
  )
}

export default ColumnComponent;