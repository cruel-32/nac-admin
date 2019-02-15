import { DefaultApi } from './DefaultApi';
export const ContentService = Object.assign(DefaultApi,{
    getContent(key:any,params:any={}){
        return DefaultApi.get(`content/${key}`, Object.assign({
            print : `pretty`
        },params))
    },
    getContents(params:any={}){
        return DefaultApi.get(`content`, Object.assign({
            orderByChild : `key`,
            print : `pretty`
        },params))
    },
    createContent(params:any={}){
        return DefaultApi.post(`content`, params);
    },
    updateContent(key:any,params:any={}){
        return DefaultApi.patch(`content/${key}`, params)
    },
    deleteContent(key:any,params:any={}){
        return DefaultApi.del(`content/${key}`, params)
    },
});