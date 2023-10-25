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
import { FormHelperText } from "@mui/material";

export const AuthPanel = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [password, setPassword]  = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const navigate = useNavigate();
    const ACTION_MESSAGE = isLogin ? "Sign In" : "Sign Up";

    const enum errorMessages {
        WRONG_EMAIL = "Wrong Email Address",
        WRONG_PASSWORD = "Password must be at least 8 characters long, contain at least one letter and one number",
        MISMATCH_PWD = "Passwords are not the same",
        INVALID_POSTAL_CODE = "Postal Code is invalid, use either A#A #A# or A#A-#A# or A#A#A# format",
        NOT_AUTHORIZED = "Email or Password is invalid",
        REQUIRED = "Please fill up required fields"
    }
    
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
        if (errorMessage != errorMessages.WRONG_EMAIL)
        {
            // cleanup error message for invalid postal code and mismatch pwd
            setErrorMessage("");
        }
    };

    // Check if email is valid format during onChange
    const validateEmail = (input:string) => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(input))
        {
            setErrorMessage(errorMessages.WRONG_EMAIL);
            return;
        }
        setErrorMessage("");
    }

    // Check if postal code is valid format during onChange
    const validatePostalCode = (input:string) => {
        const canadianPostalCodeRegex =  /^[ABCEGHJ-NPRSTVXY]\d[ABCEGHJ-NPRSTV-Z][ -]?\d[ABCEGHJ-NPRSTV-Z]\d$/;
        if (!canadianPostalCodeRegex.test(input))
        {
            setErrorMessage(errorMessages.INVALID_POSTAL_CODE);
            return;
        }
        setErrorMessage("");
    }

    // Check if password and confirm password are the same
    const validateConfirmPassword = (input:string) => {
        if(password != input)
        {
            setErrorMessage(errorMessages.MISMATCH_PWD);
            return;
        }
        //only check if password is valid during user registration
        validatePassword(input);
    }

    const validatePassword = (input:string) => {
        const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,}$/;
        if (!passwordRegex.test(input))
        {
            setErrorMessage(errorMessages.WRONG_PASSWORD);
            return;
        }
        setErrorMessage("");
    }
    // Store Password on state for checking (during registration)
    const saveAndValidatePassword = (input:string) => {
        setPassword(input);
        if(isLogin)
        {
            return;
        }
        //only check if password is valid during user registration
        validatePassword(input);
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const inputEmail = formData.get("email")!.toString();
        const inputPassword = formData.get("password")!.toString();
        
        if(inputEmail == "" || inputPassword == "")
        {
            setErrorMessage(errorMessages.REQUIRED);
            return;
        }
        if (errorMessage != "")
        {
            return;
        }
        const payload = {
            email: inputEmail,
            password: inputPassword
        }
        const registerPayload = {
            ...payload,
            postalCode: formData.get("postal_code")?.toString(),
        }
        if(!isLogin)
        {
            const confirmPwd = formData.get("confirm_password")?.toString();
            if(registerPayload.postalCode == "" || confirmPwd == undefined || confirmPwd == "")
            {
                setErrorMessage(errorMessages.REQUIRED);
                return;
            }
            validatePassword(inputPassword);
        }

        if(errorMessage != "")
        {
            return;
        }
        try {
            const res = isLogin ? await loginUser(payload) : await registerUser(registerPayload);
            updateUser({...res.data, isLoggedIn: true})
            navigate("/");
        } catch (e){
            console.log(e)
             setErrorMessage("Login Failed");
             return;
        }
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

                    <TextFieldMui autoComplete="email" error={errorMessage==errorMessages.WRONG_EMAIL || errorMessage==errorMessages.REQUIRED } autoFocus label="Email Address" name="email" required
                                  size="medium" onChange={(e)=>validateEmail(e.target.value)}/>
                    <TextFieldMui autoComplete="current-password"  error={errorMessage==errorMessages.WRONG_PASSWORD || errorMessage==errorMessages.REQUIRED } label="Password" name="password" type="password"
                                  required size="medium" onChange={(e)=>saveAndValidatePassword(e.target.value)} />
                    {!isLogin && <TextFieldMui autoComplete="confirm-password" label="Confirm Password" name="confirm_password" type="password"
                                  error={errorMessage==errorMessages.MISMATCH_PWD || errorMessage==errorMessages.REQUIRED} required size="medium" onChange={(e)=>validateConfirmPassword(e.target.value)}/>}
                    {!isLogin && <TextFieldMui autoComplete="postal-code" label="Postal Code" name="postal_code"
                                  error={errorMessage==errorMessages.INVALID_POSTAL_CODE || errorMessage==errorMessages.REQUIRED} required size="medium" onChange={(e)=>validatePostalCode(e.target.value)}/>}
                    {errorMessage && <FormHelperText error>{errorMessage}</FormHelperText>}
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
