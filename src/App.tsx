import {useState} from "react";
import "./App.css";
import {NavLink, Outlet, Route, Routes, useNavigate} from "react-router-dom";
import {alpha, styled, useTheme} from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import MuiAppBar, {AppBarProps as MuiAppBarProps} from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import CssBaseline from "@mui/material/CssBaseline";
import InputBase from "@mui/material/InputBase";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import SearchIcon from "@mui/icons-material/Search";
import HomeIcon from "@mui/icons-material/Home";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import MilitaryTechIcon from "@mui/icons-material/MilitaryTech";
import EventIcon from '@mui/icons-material/Event';
import HomePage from "./pages/Home/HomePage";
import SalePage from "./pages/Sale/SalePage";
import PointPage from "./pages/Point/PointPage";
import ButtonMui from "./ui-components/ButtonMui.tsx";
import {AuthPage} from "./pages/Auth/AuthPage.tsx";
import {useUserStore} from "./zustand/user.ts";
import {useRefreshToken} from "./hooks/useRefreshToken.ts";
import SaleItemDetailPage from "./pages/Sale/SaleItemDetailPage.tsx";
import NotFoundPage from "./pages/NotFoundPage";
import { EventsPage } from "./pages/Events/EventsPage.tsx";

type drawerItemsProps = {
    id: string;
    title: string;
    icon: JSX.Element;
};

const drawerItems: drawerItemsProps[] = [
    {
        id: "home",
        title: "Home",
        icon: <HomeIcon/>,
    },
    {
        id: "events",
        title: "Events",
        icon: <EventIcon/>,
    },
    {
        id: "sale",
        title: "For Sale & Free",
        icon: <LocalOfferIcon/>,
    },
    {
        id: "point",
        title: "Point",
        icon: <MilitaryTechIcon/>,
    },
];

const drawerWidth = 240;


const Main = styled('main', {shouldForwardProp: (prop) => prop !== 'open'})<{
    open?: boolean;
}>(({theme, open}) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    }),
}));

interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({theme, open}) => ({
    transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(["margin", "width"], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Search = styled("div")(({theme}) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100vw",
    [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing(3),
        width: "auto",
    },
}));

const SearchIconWrapper = styled("div")(({theme}) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({theme}) => ({
    color: "inherit",
    "& .MuiInputBase-input": {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create("width"),
        width: "100%",
        [theme.breakpoints.up("md")]: {
            width: "20ch",
        },
    },
}));

const DrawerHeader = styled("div")(({theme}) => ({
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-start",
}));

const Navigation = () => {
    const theme = useTheme();
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const displayName = useUserStore((state) => state.displayName)
    const isLoggedIn = useUserStore((state) => state.isLoggedIn)

    console.log('displayName')

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <Box sx={{display: "flex"}}>
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
                    {/* <Typography variant="h6" noWrap sx={{ flexGrow: 1 }} component="div">
                Dan
            </Typography> */}
                    <div style={{flexGrow: 1}}></div>
                    <ButtonMui
                        color="inherit"
                        component={NavLink}
                        to="/auth"
                        text={isLoggedIn ? displayName : "Login / Register"}
                    />
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
                                onClick={() =>
                                    navigate(`/${item.id === "home" ? "" : item.id}`)
                                }
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

const App = () => {
    useRefreshToken()

    return (
    <>
    <Routes>
        <Route path="/" element={<Navigation />}>
            <Route index element={<HomePage />} />
            <Route path="auth" element={<AuthPage/>}/>
            <Route path="events" element={<EventsPage />} />
            <Route path="sale" element={<SalePage />} />
            <Route path="itemDetail/:id" element={<SaleItemDetailPage />} />
            <Route path="point" element={<PointPage />} />
            <Route path="*" element={<NotFoundPage />} />
        </Route>
    </Routes>
    </>
)
}

export default App;
