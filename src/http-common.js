import axios from "axios";

export default axios.create({
    baseURL: 'https://mini-photo-backend.azurewebsites.net',
    headers: {
        "Content-type": "application/json"
    }
})