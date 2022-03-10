export function transformUrl(url)
{
    const BASE_URL = 'https://localhost:7066';

    if(url.length > 0) {
        return `${BASE_URL}/Images/${url}`
    }
    else {
        return `${BASE_URL}/Images/no-image.png`
    }
}
