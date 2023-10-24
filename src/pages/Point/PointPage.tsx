import {useEffect, useState} from 'react'
import {getRankedUsers} from "../../axios/auth.ts";
import {TRankedUser} from "../../types/user.ts";

const PointPage = () => {

    const [rankedUsers, setRankedUsers] = useState<TRankedUser[]>([])

    useEffect(() => {
        const getUsersWithPoints = async () => {
            try {

                console.log('getRankedUsers')
                const res = await getRankedUsers()
                console.log('res.data', res.data.users)
                setRankedUsers(res.data.users)
            } catch (e) {
                console.log('getUsersWithPoint', e)
            }
        }
        getUsersWithPoints()
    }, [])

    return (
        <>
            <div>PointPage</div>
            {rankedUsers.map((user) => <div>{user.displayName}</div>)}
        </>
    )
}

export default PointPage;