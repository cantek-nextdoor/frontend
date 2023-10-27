import {useTheme} from "@mui/material/styles";
import {useEffect, useState} from "react";
import {NavLink, Outlet, useNavigate} from "react-router-dom";
import {useUserStore} from "../zustand/user.ts";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import ButtonMui from "../ui-components/ButtonMui.tsx";
import Drawer from "@mui/material/Drawer";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import {drawerItems} from "./entities/drawerItem.tsx";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import {DrawerHeader} from "./DrawerHeader.tsx";
import {StyledInputBase} from "./StyledInputBase.tsx";
import {SearchIconWrapper} from "./SearchIconWrapper.tsx";
import {Search} from "./Search.tsx";
import {Main} from "./Main.tsx";
import {AppBar} from "./Appbar.tsx";
import {UserDropdown} from "./UserDropdown.tsx";
import Typography from "@mui/material/Typography";
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import Cookies from "js-cookie";
import {getMe} from "../axios/user.ts";

const drawerWidth = 240;

export const Navigation = () => {
    const theme = useTheme();
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const displayName = useUserStore((state) => state.displayName)
    const updateUser = useUserStore((state) => state.updateUser)
    const isLoggedIn = useUserStore((state) => state.isLoggedIn)
    const points = useUserStore((state) => state.points)

    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

    useEffect( () => {

        const loginGoogleUser = async () => {
            const accessToken = Cookies.get('accessToken')
            if (accessToken){
                const res = await getMe()
                const updatedUser = res.data
                updateUser({
                    email: updatedUser.email,
                    points: updatedUser.points,
                    displayName: updatedUser.displayName,
                    uuid: updatedUser.uuid,
                    isLoggedIn: true
                })
            }

            if (!isLoggedIn){
                navigate("/");
            }
        }

        loginGoogleUser()

    }, [])

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const isUserProfileOpen = Boolean(anchorEl);
    const id = isUserProfileOpen ? 'user-profile-id' : '';

    return (
        <Box sx={{display: "flex", maxWidth: 1280 }}>
            <CssBaseline/>
            <AppBar position="fixed" open={open}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="end"
                        onClick={handleDrawerOpen}
                        sx={{...(open && {display: "none"})}}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Search>
                        <SearchIconWrapper>
                            <SearchIcon/>
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="Search…"
                            inputProps={{"aria-label": "search"}}
                        />
                    </Search>

                    <div style={{flexGrow: 1}}></div>
                    {isLoggedIn &&
                        <>
                            <div style={{display: 'flex', flexDirection: 'row'}}>
                                <SupervisedUserCircleIcon/>
                                <Typography sx={{pl: 1, pr: 4}}>{points}</Typography>
                            </div>
                            <ButtonMui
                                aria-describedby={id}
                                color="inherit"
                                onClick={handleClick}
                                text={displayName}
                            />
                            <UserDropdown id={id} isUserProfileOpen={isUserProfileOpen} onClose={handleClose}
                                anchorEl={anchorEl}
                            />
                        </>
                    }
                    {!isLoggedIn && <ButtonMui
                        color="inherit"
                        component={NavLink}
                        to="/auth"
                        text="Login / Register"
                    />}
                </Toolbar>
            </AppBar>

            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    "& .MuiDrawer-paper": {
                        width: drawerWidth,
                    },
                }}
                variant="persistent"
                anchor="left"
                open={open}
            >
                <DrawerHeader>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === "rtl" ? (
                            <ChevronRightIcon/>
                        ) : (
                            <ChevronLeftIcon/>
                        )}
                    </IconButton>
                </DrawerHeader>
                <Divider/>
                <List>
                    {drawerItems.map((item) => (
                        <ListItem key={item.id} disablePadding>
                            <ListItemButton
                                onClick={() => {
                                    navigate(`/${item.id}`);
                                    handleDrawerClose();
                                }}
                            >
                                <ListItemIcon>{item.icon}</ListItemIcon>
                                <ListItemText primary={item.title}/>
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Drawer>

            <Main open={open} sx={{height: "100vh", width: "100vw"}}>
                <DrawerHeader/>
                <Outlet/>
            </Main>
        </Box>
    );
};