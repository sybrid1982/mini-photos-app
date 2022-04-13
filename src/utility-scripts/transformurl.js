export function transformUrl(url)
{
    if(url && typeof(url) === 'string' && url.length > 0) {
        const localDrive = "localFile";
        
        if(url.startsWith(localDrive)) return url.substring(localDrive.length);
        return url;
    }
    else {
        return 'no-image.png';
    }
}
