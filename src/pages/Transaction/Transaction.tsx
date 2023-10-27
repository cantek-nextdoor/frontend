import {useEffect, useState} from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import {getUserTransactions, ITransactions} from "../../axios/transaction.ts";
import {useUserStore} from "../../zustand/user.ts";

export const TransactionPage = () => {
    const uuid = useUserStore((state) => state.uuid)
    const [userTransactions, setUserTransactions] = useState<ITransactions[]>([])

    useEffect(() => {
        const getTransactions = async () => {
            const res = await getUserTransactions(uuid)
            setUserTransactions(res.data.userTransactions)
        }
        getTransactions()
    }, [])

    return (<>
        <div style={{fontSize: 50, fontWeight: 700, marginBottom: 15}}>Transaction</div>
        <Box sx={{minWidth: 240, bgcolor: 'background.paper'}}>
            <List>
                <ListItem sx={{display: 'flex', flexDirection: 'row'}}>
                    <ListItemText primary="Transaction Date"/>
                    <ListItemText primary="Original Points"/>
                    <ListItemText primary="Points"/>
                    <ListItemText primary="Updated Points"/>
                </ListItem>


                {userTransactions.map((transaction) =>
                <ListItem sx={{display: 'flex', flexDirection: 'row'}}>
                    <ListItemText primary={transaction.createdAt.slice(0, 10)}/>
                    <ListItemText primary={transaction.fromPoints}/>
                    <ListItemText primary={transaction.postPoints}/>
                    <ListItemText primary={transaction.toPoints}/>
                </ListItem>

            )}
            </List>
        </Box>
    </>)
}