import axios from 'axios';
import {Firebase} from './Firebase';

const qs = require('qs');
const baseURL = 'https://nac-admin.firebaseio.com/';
const getIdToken = (currentUser:any)=>{
    return currentUser.getIdToken(true);
};
const put = (url:string, params:any)=>{
    return axios.put(`${baseURL}${url}`,params)
};
const get = (url:string, params:any)=>{
    return new Promise((resolve,reject)=>{
        let ref:any = Firebase.database.ref(url);
        for(let key in params){
            if(
                key == "orderByKey"
                || key == "orderByValue"
                || key == "orderByChild"
                || key == "startAt"
                || key == "endAt"
            ){
                if(params[key]){
                    ref = ref[key](params[key])
                } else {
                    ref = ref[key]()
                }
            }  
            else {
                continue;
            }
        }
        ref.once("value", (Data:any)=>{
            if(Data){
                resolve(Data);
            } else {
                reject(Data);
            }
        });
    })
    // return axios.get(`${baseURL}${url}`,{params})
};
const post = (url:string, params:any)=>{
    return new Promise((resolve,reject)=>{
        let newKey:any = Firebase.database.ref().child(url).push().key;
        Firebase.database.ref().update({
            [`/${url}/${newKey}`] : params
        },(error)=>{
            if(error){
                reject(error);
            } else {
                resolve(newKey);
            }
        });
    })
    // return axios.post(`${baseURL}${url}`,params)
};
const del = (url:string, params:any)=>{
    return Firebase.database.ref().child(url).remove();
    // return axios.delete(`${baseURL}${url}`,{params})
};
const patch = (url:string, params:any)=>{
    return new Promise((resolve,reject)=>{
        Firebase.database.ref().update({
            [`/${url}`] : params
        },(error)=>{
            if(error){
                reject(error);
            } else {
                resolve(true);
            }
        });
    })
    // return axios.patch(`${baseURL}${url}`,{params})
};

// const patchs = (url:string, params:any)=>{
//     return new Promise((resolve,reject)=>{
//         let ref = Firebase.database.ref(url);
//         ref.once('value',(snapShot)=>{
//             let val = snapShot.val();
//             console.log('val : ', val);
//             console.log('params : ', params);

//             let keys = Object.keys(params);

//             keys.forEach((key)=>{
//                 let meetingKey = Object.keys(params[key]['participation'])[0];
//                 val[key]['participation'] ? 
//                 Object.assign(val[key]['participation'], params[key]['participation'])
//                 : val[key]['participation'] = params[key]['participation']
//             })

//             ref.update(val,(error)=>{
//                 if(error){
//                     reject(error);
//                 } else {
//                     resolve(true);
//                 }
//             });
//         });
//     });
// };

export const DefaultApi = {
    Firebase,
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