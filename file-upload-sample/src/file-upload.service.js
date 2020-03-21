import axios from 'axios';

const BASE_URL = 'http://localhost:3000/upload-multiple';

async function upload(formData) {
    return await axios.post(BASE_URL, formData, {headers: {'Content-Type': 'multipart/form-data' }})
        // get data
        .then(x => x.data)
        .then(x => x.map(img => Object.assign({},
            img, { url: `${BASE_URL}/images/${img.id}` })))
}

export { upload }