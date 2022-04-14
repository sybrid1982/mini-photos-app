import { transformUrl } from '@/utility-scripts/transformurl.js';

describe('transformUrl', () => {
    it('should return no-image.png if given an empty string', () => {
        expect(transformUrl("")).toBe('no-image.png')
    })

    it('should return the given string if the string does not contain mini-photos', () => {
        const testString = "https://miniphotostorage.blob.core.windows.net/box-art/pic1196191.jpg"
        expect(transformUrl(testString)).toBe(testString);
    })

    it('should not return a URL containing mini-photos', () => {
        const testString = "https://miniphotostorage.blob.core.windows.net/mini-photos/pic1196191.jpg"
        expect(transformUrl(testString).includes('mini-photos')).toBeFalsy();
    })

    it('should return a URL containing thumbs if given one with mini-photos', () => {
        const testString = "https://miniphotostorage.blob.core.windows.net/mini-photos/pic1196191.jpg"
        expect(transformUrl(testString).includes('thumbs')).toBeTruthy();
    })

})

