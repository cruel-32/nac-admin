import axios from 'axios';
import {Firebase} from './Firebase';

const qs = require('qs');
const baseURL = 'https://nac-admin.firebaseio.com/';
const getIdToken = (currentUser:any)=>{
    return currentUser.getIdToken(true);
};
const put = (url:string, params={})=>{
    return axios.put(`${baseURL}${url}`,params)
};
const get = (url:string, params:any={})=>{
    if(url.includes('.json')){
        url = url.split('.json')[0];
    }
    return new Promise((resolve,reject)=>{
        let ref = Firebase.database.ref(url);
        for(let key in params){
            if(key == "orderByChild"
                || key == "startAt"
                || key == "endAt"
                || key == "orderBy"
            ){
                ref = ref[key](params[key])
            } else {
                continue;
            }
        }
        ref.once("value", (Data:any)=>{
            if(Data){
                resolve(Data.val());
            } else {
                reject(Data);
            }
        });
    })
    // return axios.get(`${baseURL}${url}`,{params})
};
const post = (url:string, params={})=>{
    return axios.post(`${baseURL}${url}`,{params})
};
const del = (url:string, params={})=>{
    return axios.delete(`${baseURL}${url}`,{params})
};
const patch = (url:string, params={})=>{
    return axios.patch(`${baseURL}${url}`,{params})
};
export const DefaultApi = {
    axios,
    qs,
    baseURL,
    getIdToken,
    put,
    get,
    post,
    del,
    patch
}