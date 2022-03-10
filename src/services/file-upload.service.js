import httpCommon from '../http-common';

// const BASE_URL = 'https://localhost:7066';

async function upload(file, url) {
    return httpCommon.post(url, file)
        // .then(x => x.data)
        // .then(x => x.map(img => Object.assign({},
        //     img, { url: `${BASE_URL}/images/${img.id}`})));
}

export { upload }