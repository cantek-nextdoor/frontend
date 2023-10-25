import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import {NavLink} from "react-router-dom";

interface IListItemMui {
    handleOnClick?: (props?: any) => void
    icon?: JSX.Element
    text: string
    to?: string
}

export const ListItemMui = ({handleOnClick, icon, text, to}: IListItemMui) => {
    return (<>
        <ListItem disablePadding onClick={handleOnClick}>
            <ListItemButton component={to ? NavLink : 'div'} to={to}>
                {icon &&
                    <ListItemIcon>
                        <>
                            {icon}
                        </>
                    </ListItemIcon>
                }
                <ListItemText primary={text}/>
            </ListItemButton>
        </ListItem>
    </>)
}