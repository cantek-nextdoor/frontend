import axios from "axios";
import Cookies from 'js-cookie';


export const accessInstance = axios.create({
    headers: {authorization: "Bearer " + Cookies.get('accessToken')}
}
)

