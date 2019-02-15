import { DefaultApi } from './DefaultApi';
export const PlaceService = Object.assign(DefaultApi,{
    getPlace(key:any,params:any={}){
        return DefaultApi.get(`place/${key}`, Object.assign({
            print : `pretty`
        },params))
    },
    getPlaces(params:any={}){
        return DefaultApi.get(`place`, Object.assign({
            orderByChild : `key`,
            print : `pretty`
        },params))
    },
    createPlace(params:any={}){
        return DefaultApi.post(`place`, params);
    },
    updatePlace(key:any,params:any={}){
        return DefaultApi.patch(`place/${key}`, params)
    },
    deletePlace(key:any,params:any={}){
        return DefaultApi.del(`place/${key}`, params)
    },
});