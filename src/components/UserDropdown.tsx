import {Popover} from "@mui/material";
import List from "@mui/material/List";
import {ListItemMui} from "../ui-components/ListItemMui.tsx";
import Box from "@mui/material/Box";
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import TheaterComedyIcon from '@mui/icons-material/TheaterComedy';
import LogoutIcon from '@mui/icons-material/Logout';
import {USE_USER_STORE_DEFAULT_PROPS, useUserStore} from "../zustand/user.ts";
import Cookies from 'js-cookie';
import {useNavigate} from "react-router-dom";


interface IUserDropdown {
    id: string;
    isUserProfileOpen: boolean;
    onClose: () => void;
    anchorEl: HTMLButtonElement | null
}

export const UserDropdown = ({id, isUserProfileOpen, onClose, anchorEl}: IUserDropdown) => {
    const resetUser = useUserStore((state) => state.resetUser)
    const navigate = useNavigate();

    const handleLogout = () => {
        Cookies.remove('accessToken', {path: ''})
        Cookies.remove('refreshToken', {path: ''})
        resetUser(USE_USER_STORE_DEFAULT_PROPS)
        navigate("/auth");
    }

    return (<>
            <Popover
                anchorEl={anchorEl}
                id={id}
                onClose={onClose}
                open={isUserProfileOpen}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
            >
                <Box sx={{minWidth: 240, bgcolor: 'background.paper'}}>
                    <List>
                        <ListItemMui to='/my-transactions' icon={<AccountBalanceWalletIcon/>} text="Transactions"/>
                        <ListItemMui to='/my-events' icon={<TheaterComedyIcon/>} text="Events"/>
                        <ListItemMui handleOnClick={handleLogout} icon={<LogoutIcon/>}
                                     text="Logout"/>
                    </List>
                </Box>
            </Popover></>
    )
}