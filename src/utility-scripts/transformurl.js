export function transformUrl(url)
{
    if(url && typeof(url) === 'string' && url.length > 0) {
        const miniPhotos = 'mini-photos'
        if(url.indexOf(miniPhotos) > 0) {
            return url.replace(miniPhotos, 'thumbs');
        }
        return url;
    }
    else {
        return 'no-image.png';
    }
}
