import axios from "axios";

function getBaseURL() {
    if(process.env.VUE_APP_BASE_API_URL) {
        console.log(process.env.VUE_APP_BASE_API_URL)
        return process.env.VUE_APP_BASE_API_URL.toString()
    }
    return "/api";
}

export default axios.create({
    baseURL: getBaseURL(),
    headers: {
        "Content-type": "application/json"
    }
})