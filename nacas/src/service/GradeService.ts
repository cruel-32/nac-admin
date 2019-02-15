import { DefaultApi } from './DefaultApi';
export const GradeService = Object.assign(DefaultApi,{
    getGrade(key:any,params:any={}){
        return DefaultApi.get(`grade/${key}`, Object.assign({
            print : `pretty`
        },params))
    },
    getGrades(params:any={}){
        return DefaultApi.get(`grade`, Object.assign({
            orderByChild : `key`,
            print : `pretty`
        },params))
    },
    createGrade(params:any={}){
        return DefaultApi.post(`grade`, params);
    },
    updateGrade(key:any,params:any={}){
        return DefaultApi.patch(`grade/${key}`, params)
    },
    deleteGrade(key:any,params:any={}){
        return DefaultApi.del(`grade/${key}`, params)
    },
});