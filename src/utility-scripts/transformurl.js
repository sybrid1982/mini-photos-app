export function transformUrl(url)
{
    // const BASE_URL = 'https://mini-photo-backend.azurewebsites.net';

    if(url.length > 0 || url === 'string') {
        return url
    }
    else {
        return 'no-image.png'
    }
}
