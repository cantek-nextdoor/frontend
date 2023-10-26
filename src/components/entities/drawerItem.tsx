import HomeIcon from '@mui/icons-material/Home';
import LocalActivityIcon from '@mui/icons-material/LocalActivity';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import MilitaryTechIcon from '@mui/icons-material/MilitaryTech';
import PostAddIcon from '@mui/icons-material/PostAdd';

type drawerItemsProps = {
    id: string,
    title: string,
    icon: JSX.Element,
};

export const drawerItems: drawerItemsProps[] = [
    {
        id: "home",
        title: "Home",
        icon: <HomeIcon />,
    },
    {
        id: "activities",
        title: "Activities",
        icon: <LocalActivityIcon />,
    },
    {
        id: "sale",
        title: "For Sale & Free",
        icon: <LocalOfferIcon />,
    },
    {
        id: "ranking",
        title: "Ranking",
        icon: <MilitaryTechIcon />,
    },
    {
        id: "post",
        title: "Post",
        icon: <PostAddIcon />,
    },
    ];