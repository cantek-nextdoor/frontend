import {Alert, AlertColor, Snackbar} from "@mui/material";

interface IAlertMui {
    handleAlertClose: () => void
    isAlertOpen: boolean;
    message: string;
    severity?: AlertColor;
}

export const AlertMui = ({handleAlertClose, isAlertOpen, message, severity}: IAlertMui) => {
    return (
        <Snackbar
            anchorOrigin={{vertical: 'top', horizontal: 'center'}}
            autoHideDuration={3000}
            open={isAlertOpen}
            onClose={handleAlertClose}
        >
            <Alert onClose={handleAlertClose} severity={severity ?? 'info'} sx={{ width: '100%' }}>
                {message}
            </Alert>
        </Snackbar>


    )
}
