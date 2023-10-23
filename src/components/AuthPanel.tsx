import {FormEvent, useState} from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import ButtonMui from "../ui-components/ButtonMui.tsx";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import CssBaseline from "@mui/material/CssBaseline";
import {useNavigate} from "react-router-dom";
import {loginUser, registerUser} from "../axios/auth.ts";
import {TextFieldMui} from "../ui-components/TextFieldMui.tsx";
import {useUserStore} from "../zustand/user.ts";

export const AuthPanel = () => {
    const [isLogin, setIsLogin] = useState(true);

    const navigate = useNavigate();
    const ACTION_MESSAGE = isLogin ? "Sign In" : "Sign Up";

    const updateUser = useUserStore((state) => state.updateUser)

    const Copyright = () => {
        return (
            <Typography
                variant="body2"
                color="text.secondary"
                align="center"
                sx={{my: 4}}
            >
                {"Copyright © "}
                Cantek NextDoor{" "}
                {new Date().getFullYear()}
                {"."}
            </Typography>
        );
    };

    const handleToggleAuth = () => {
        setIsLogin((prev) => !prev);
    };

    // TODO add validation
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const payload = {
            email: formData.get("email")!.toString(),
            password: formData.get("password")!.toString(),
        }
        const registerPayload = {
            ...payload,
            postalCode: formData.get("postal_code")?.toString(),
        }
        const res = isLogin ? await loginUser(payload) : await registerUser(registerPayload);
        updateUser({...res.data, isLoggedIn: true})
        navigate("/");
    };

    return (
        <div>
            <CssBaseline/>

            <Box
                sx={{
                    marginTop: 8,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <Avatar sx={{m: 1, bgcolor: "secondary.main"}}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    {ACTION_MESSAGE}
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{mt: 1}}>

                    <TextFieldMui autoComplete="email" autoFocus label="Email Address" name="email" required
                                  size="medium"/>
                    <TextFieldMui autoComplete="current-password" label="Password" name="password" type="password"
                                  required size="medium"/>
                    {!isLogin && <TextFieldMui autoComplete="postal-code" label="Postal Code" name="postal_code"
                                               required size="medium"/>}

                    {/*<FormControlLabel*/}
                    {/*  control={<Checkbox value="remember" color="primary" />}*/}
                    {/*  label="Remember me"*/}
                    {/*/>*/}

                    <ButtonMui
                        fullWidth
                        sx={{mt: 3, mb: 2}}
                        text={ACTION_MESSAGE}
                        type="submit"
                        variant="contained"
                    />

                    <Grid container>
                        {/*<Grid item xs>*/}
                        {/*  <Link href="#" variant="body2">*/}
                        {/*    Forgot password?*/}
                        {/*  </Link>*/}
                        {/*</Grid>*/}
                        <Grid item sx={{mb: 2}}>
                            <ButtonMui
                                onClick={handleToggleAuth}
                                sx={{textTransform: "none"}}
                                text={
                                    isLogin
                                        ? "Don't have an account? Sign Up"
                                        : "Already a member? Sign In"
                                }
                            />
                        </Grid>
                    </Grid>
                    <Divider/>
                    {/* TODO: Use google button / render */}
                    <ButtonMui
                        href="api/auth/google/login"
                        text="Sign up / Login with Google"
                    />
                </Box>
            </Box>
            <Copyright/>

        </div>
    );
};
