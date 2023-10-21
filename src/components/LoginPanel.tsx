import {FormEvent, useEffect, useRef, useState} from "react";
import axios from "axios";
import {useCookies} from "react-cookie";


export const LoginPanel = () => {
    const [canSeeTest, setCanSeeTest] = useState(false)
    const emailRef = useRef<HTMLInputElement>(null)
    const passwordRef = useRef<HTMLInputElement>(null)
    const [cookies] = useCookies(['access_token', 'refresh_token']);

    const axiosInstance = axios.create({
        headers:
            {authorization: 'Bearer ' + cookies.access_token}
    })

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const res = await axios.post('/api/auth/login', {
            email: emailRef?.current?.value,
            password: passwordRef?.current?.value
        })
        console.log('res', res)
    }

    console.log('cookies', cookies)

    useEffect(() => {
        const fetchTest = async () => {
            try {
                const res = await axiosInstance.get('/api/user/test')
                console.log('res.data', res.data)
                setCanSeeTest(true)
            } catch (e) {
                console.log('e', e)
            }
        }

        fetchTest()
    }, [])

    return (<div>
        <form onSubmit={handleSubmit}>
            <label htmlFor="email">Email</label>
            <input type="text" name="email" ref={emailRef}/>
            <label htmlFor="password">Password</label>
            <input type="password" name="password" ref={passwordRef}/>
            <button type="submit">Log In</button>
        </form>
        <hr/>
        or sign up / sign in with Google
        <div>cat content: {canSeeTest.toString()}</div>
    </div>)
}