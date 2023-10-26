import Container from "@mui/material/Container";
import {AuthPanel} from "../../components/AuthPanel.tsx";

export const AuthPage = () => {
    return (
        <>
            <Container component="main" maxWidth="xs">
                <AuthPanel/>
            </Container>
        </>
    );
};
