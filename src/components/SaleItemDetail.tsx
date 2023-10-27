import {Avatar, Paper} from "@mui/material";
import {SaleItem} from '../pages/types/SaleItem';
import ColumnComponent from "./ColumnComponent";
import RowComponent from "./RowComponent";
import {deepPurple} from "@mui/material/colors";
import {createExchange} from "../axios/transaction.ts";
import ButtonMui from "../ui-components/ButtonMui.tsx";
import {AlertMui} from "../ui-components/AlertMui.tsx";
import {useState} from "react";
import {getUserDetail} from "../axios/user.ts";
import {useUserStore} from "../zustand/user.ts";

type SaleItemDetailProps = {
    currentItem: SaleItem;
}

const SaleItemDetail = ({currentItem}: SaleItemDetailProps) => {

    const [isAlertOpen, setIsAlertOpen] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)
    const [alertMessage, setAlertMessage] = useState("")
    const uuid = useUserStore((state) => state.uuid)
    const updateUser = useUserStore((state) => state.updateUser)

    const handleExchange = async () => {
        try {
            // TODO fetch data from posts
            await createExchange({
                counterparty: '3521047a-cf6b-404a-a356-5ac920b1391d',
                isCurrentUserSender: true,
                postId: 1
            })

            const res = await getUserDetail(uuid)
            const updatedUser = res.data
            updateUser({
                email: updatedUser.email,
                points: updatedUser.points,
                displayName: updatedUser.displayName,
                uuid: updatedUser.uuid,
                isLoggedIn: true
            })

            setIsSuccess(true)
            setAlertMessage("Successfully purchased item!")
        } catch (e) {
            setIsSuccess(false)
            setAlertMessage("Cannot purchase item")
            console.log('handleExchange error', e)
        } finally {
            setIsAlertOpen(true)
        }
    }

    const handleAlertClose = () => {
        setIsAlertOpen(false)
    }

    const {title, photo, price, user, location, description} = currentItem;
    return (
        <>
        <AlertMui severity={isSuccess ? 'success' : 'error'} handleAlertClose={handleAlertClose} isAlertOpen={isAlertOpen} message={alertMessage} />

        <ColumnComponent>
            <span style={{fontSize: 50, fontWeight: 700, marginBottom: 20}}>{title}</span>
            <RowComponent style={{gap: 130, alignItems: "flex-start"}}>
                <img src={photo} style={{width: 600, height: 600, borderRadius: 50}}/>
                <Paper elevation={2} style={{padding: 30, borderRadius: 20}}>
                    <ColumnComponent style={{gap: 20}}>
                        <span style={{fontSize: 25, fontWeight: 700}}>Price: {price} Points</span>
                        <RowComponent>
                            <Avatar sx={{bgcolor: deepPurple[500]}}>{user.charAt(0)}</Avatar>
                            <ColumnComponent style={{marginLeft: 15}}>
                                <span style={{fontSize: 15, fontWeight: 600}}>{user}</span>
                                <span style={{fontSize: 13}}>{location}</span>
                            </ColumnComponent>
                        </RowComponent>
                        <span style={{textAlign: "left"}}>{description}</span>
                        <ButtonMui onClick={handleExchange} text="Purchase"/>
                    </ColumnComponent>
                </Paper>

            </RowComponent>

        </ColumnComponent>
        </>

    )
}

export default SaleItemDetail;