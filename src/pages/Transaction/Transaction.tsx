import {useEffect} from "react";

export const TransactionPage = () => {

    useEffect( () => {
        console.log('hi')
    }, [])

    return (<>
        <div style={{ fontSize: 50, fontWeight: 700, marginBottom: 15}}>Transaction</div>

    </>)
}