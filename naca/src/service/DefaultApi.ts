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
    return new Promise((resolve,reject)=>{
        let newKey = Firebase.database.ref().child(url).push().key;
        Firebase.database.ref().update({
            [`/${url}/${newKey}`] : params
        },(error)=>{
            if(error){
                reject(error);
            } else {
                resolve();
            }
        });
    })
    // return axios.post(`${baseURL}${url}`,params)
};
const del = (url:string, params={})=>{
    return axios.delete(`${baseURL}${url}`,{params})
};
const patch = (url:string, params={})=>{
    return new Promise((resolve,reject)=>{
        Firebase.database.ref().update({
            [`/${url}`] : params
        },(error)=>{
            if(error){
                reject(error);
            } else {
                resolve();
            }
        });
    })
    // return axios.patch(`${baseURL}${url}`,{params})
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