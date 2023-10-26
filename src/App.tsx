import './App.css';
import {Route, Routes} from "react-router-dom";
import HomePage from './pages/Home/HomePage';
import ActivitiesPage from './pages/Activities/ActivitiesPage';
import SalePage from './pages/Sale/SalePage';
import PointPage from './pages/Point/PointPage';
import {AuthPage} from "./pages/Auth/AuthPage.tsx";
import SaleItemDetailPage from "./pages/Sale/SaleItemDetailPage.tsx";
import NotFoundPage from "./pages/NotFoundPage";
import PostPage from './pages/Post/PostPage';
import {Navigation} from "./components/Navigation.tsx";
import InitialPage from './pages/Initial/InitialPage.tsx';

const App = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<InitialPage/>}/>
                <Route path="auth" element={<AuthPage/>}/>
                <Route element={<Navigation/>}>
                    <Route path='home' element={<HomePage/>}/>
                    <Route path="activities" element={<ActivitiesPage/>}/>
                    <Route path="sale" element={<SalePage/>}/>
                    <Route path="itemDetail/:id" element={<SaleItemDetailPage/>}/>
                    <Route path="ranking" element={<PointPage/>}/>
                    <Route path="post" element={<PostPage/>}/>
                    <Route path="*" element={<NotFoundPage/>}/>
                </Route>
            </Routes>
        </>
    )
}

export default App;
