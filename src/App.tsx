import {useEffect, useState} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from "axios";
import {LoginPanel} from "./components/LoginPanel.tsx";
import {useCookies} from "react-cookie";

function App() {
    const [count, setCount] = useState(0)
    const [cookies, setCookies] = useCookies(['access_token', 'refresh_token']);


    const handleFetchFromNest = async () => {
        const res = await axios.get('/api/cats')
        console.log('res test', res)
    }

    useEffect(() => {
        handleFetchFromNest()
    }, [])

    useEffect(() => {
        const refreshUserToken = async () => {
            try {
                const tokenDetails = await axios.post('/api/auth/refresh', {}, {headers: {Authorization: "Bearer " + cookies.refresh_token}})
                setCookies('access_token', tokenDetails.data.accessToken)
            } catch (e) {
                console.log('refresh e', e)
            }
        }

        refreshUserToken()
        const id = setInterval(async () => {
            await refreshUserToken()
        }, 5 * 1000)
        return () => clearInterval(id)
    }, [])

    return (
        <>
            <div>
                <a href="https://vitejs.dev" target="_blank">
                    <img src={viteLogo} className="logo" alt="Vite logo"/>
                </a>
                <a href="https://react.dev" target="_blank">
                    <img src={reactLogo} className="logo react" alt="React logo"/>
                </a>
            </div>
            <h1>Vite + React</h1>
            <div className="card">
                <button onClick={() => setCount((count) => count + 1)}>
                    count is {count}
                </button>
                <p>
                    Edit <code>src/App.tsx</code> and save to test HMR
                </p>
            </div>
            <p className="read-the-docs">
                Click on the Vite and React logos to learn more
            </p>
            <LoginPanel/>
        </>
    )
}

export default App
