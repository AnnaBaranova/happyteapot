const BASE_URL = '/api/products/';

function index(){
    return fetch(BASE_URL).then(res => res.json()).catch(err => console.log("err", err));
}


export default {
    index
}