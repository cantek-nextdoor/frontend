import { Button, ButtonProps } from "@mui/material";
import { NavLinkProps } from "react-router-dom";

type TButtonMuiProps =
  | ButtonProps<"button", { text: string, disabled?:boolean }>
  | (ButtonProps<
      "button",
      {
        component: React.ComponentType<NavLinkProps>;
        text: string;
        disabled?: boolean;
      }
    > &
      NavLinkProps);

const ButtonMui = ({ text, disabled=false, ...others }: TButtonMuiProps) => {
  return (
    <Button color="primary" disabled={disabled} variant="text" {...others}>
      {text}
    </Button>
  );
};

export default ButtonMui;
