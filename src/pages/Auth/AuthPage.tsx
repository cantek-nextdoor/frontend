import Container from "@mui/material/Container";
import { LoginPanel } from "../../components/LoginPanel.tsx";

export const AuthPage = () => {
  return (
    <>
      <Container component="main" maxWidth="xs">
        <LoginPanel />
      </Container>
    </>
  );
};
