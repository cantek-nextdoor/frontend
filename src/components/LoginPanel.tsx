import {FormEvent, useEffect, useState} from "react";
import axios from "axios";
import {useCookies} from "react-cookie";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import TextField from "@mui/material/TextField";
import ButtonMui from "../ui-components/ButtonMui.tsx";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import CssBaseline from "@mui/material/CssBaseline";
import {useNavigate} from "react-router-dom";
import {loginUser, registerUser} from "../axios/auth.ts";

export const LoginPanel = () => {
    const [canSeeTest, setCanSeeTest] = useState(false);
    const [cookies] = useCookies(["access_token", "refresh_token"]);
    const [isLogin, setIsLogin] = useState(true);

    const navigate = useNavigate();
    const ACTION_MESSAGE = isLogin ? "Sign In" : "Sign Up";

    const axiosInstance = axios.create({
        headers: {authorization: "Bearer " + cookies.access_token},
    });

    const Copyright = () => {
        return (
            <Typography
                variant="body2"
                color="text.secondary"
                align="center"
                sx={{my: 4}}
            >
                {"Copyright © "}
                <Link color="inherit" href="https://mui.com/">
                    Cantek NextDoor
                </Link>{" "}
                {new Date().getFullYear()}
                {"."}
            </Typography>
        );
    };

    const handleToggleAuth = () => {
        setIsLogin((prev) => !prev);
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const payload = {
            email: formData.get("email"),
            password: formData.get("password"),
        }
        const res = isLogin ? await loginUser(payload) : await registerUser(payload);
        console.log("res", res);
        navigate("/");
    };

    console.log("cookies", cookies);

    useEffect(() => {
        const fetchTest = async () => {
            try {
                const res = await axiosInstance.get("/api/user/test");
                console.log("res.data", res.data);
                setCanSeeTest(true);
            } catch (e) {
                console.log("e", e);
            }
        };

        fetchTest();
    }, []);

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
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                    />
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

            <div>cat content: {canSeeTest.toString()}</div>
        </div>
    );
};
