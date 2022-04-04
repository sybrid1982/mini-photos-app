import axios from "axios";

function getBaseURL() {
    if(process.env.VUE_APP_BASE_API_URL) {
        console.log(process.env.VUE_APP_BASE_API_URL)
        return process.env.VUE_APP_BASE_API_URL.toString()
    }
    console.log('process.env.VUE_APP_BASE_API_URL was falsy')
    return "https://localhost:7101"
}

export default axios.create({
    baseURL: getBaseURL(),
    headers: {
        "Content-type": "application/json"
    }
})