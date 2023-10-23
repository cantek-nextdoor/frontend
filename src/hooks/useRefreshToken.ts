import {refreshUserAccessToken} from "../axios/auth.ts";
import {useEffect} from "react";
import Cookies from 'js-cookie';
import {USE_USER_STORE_DEFAULT_PROPS, useUserStore} from "../zustand/user.ts";

export const useRefreshToken = () => {
    const resetUser = useUserStore((state) => state.resetUser)

    useEffect(() => {
        const id = setInterval(async () => {
            try {
                const res = await refreshUserAccessToken()
                Cookies.set('access_token', res.data.accessToken)
            } catch (e) {
                console.log('useRefreshToken error', e)
                resetUser(USE_USER_STORE_DEFAULT_PROPS)
            }
        }, 10 * 1000)
        return () => clearInterval(id)
    }, [])
}