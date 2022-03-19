export function transformUrl(url)
{
    const BASE_URL = 'https://mini-photo-backend.azurewebsites.net';

    if(url.length > 0) {
        return `${BASE_URL}/Images/${url}`
    }
    else {
        return `${BASE_URL}/Images/no-image.png`
    }
}
