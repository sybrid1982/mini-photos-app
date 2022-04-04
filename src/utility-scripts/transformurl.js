export function transformUrl(url)
{
    if(url && url.length > 0 || url === 'string') {
        return url
    }
    else {
        return 'no-image.png'
    }
}
