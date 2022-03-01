import * as axios from 'axios';

const BASE_URL = 'http://localhost:3001';

function upload(formData) {
    const url = `${BASE_URL}/photos/upload`;
    formData.forEach((img) => img);
    console.log(url);
    console.log(axios);
    return true;
    // return axios.post(url, formData)
    //     .then(x => x.data)
    //     .then(x => x.map(img => Object.assign({},
    //         img, { url: `${BASE_URL}/images/${img.id}`})));
}

export { upload }