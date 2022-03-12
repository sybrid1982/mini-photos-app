import axios from "axios";

export default axios.create({
    baseURL: 'https://192.168.86.139:7066',
    headers: {
        "Content-type": "application/json"
    }
})