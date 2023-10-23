import { Button, ButtonProps } from "@mui/material";
import { NavLinkProps } from "react-router-dom";

type TButtonMuiProps =
  | ButtonProps<"button", { text: string }>
  | (ButtonProps<
      "button",
      {
        component: React.ComponentType<NavLinkProps>;
        text: string;
      }
    > &
      NavLinkProps);

const ButtonMui = ({ text, ...others }: TButtonMuiProps) => {
  return (
    <Button color="primary" variant="text" {...others}>
      {text}
    </Button>
  );
};

export default ButtonMui;
