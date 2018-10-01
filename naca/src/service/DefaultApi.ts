import axios from 'axios';
const qs = require('qs');
const baseURL = 'https://nac-admin.firebaseio.com';
const getIdToken = (currentUser:any)=>{
    return currentUser.getIdToken(true);
};
const put = (url:string, params={})=>{
    return axios.put(`${baseURL}${url}`,{params})
};
const get = (url:string, params={})=>{
    return axios.get(`${baseURL}${url}`,{params})
};
const post = (url:string, params={})=>{
    return axios.post(`${baseURL}${url}`,{params})
};
const del = (url:string, params={})=>{
    return axios.delete(`${baseURL}${url}`,{params})
};
export const DefaultApi = {
    axios,
    qs,
    baseURL,
    getIdToken,
    put,
    get,
    post,
    del
}