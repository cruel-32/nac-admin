import { DefaultApi } from './DefaultApi';
export const MeetingService = Object.assign(DefaultApi,{
    getMeeting(key:any,params:any={}){
        return DefaultApi.get(`meeting/${key}`, Object.assign({
            print : `pretty`
        },params))
    },
    getMeetings(params:any){
        return DefaultApi.get(`meeting`, Object.assign({
            orderByKey : null,
            print : `pretty`
        },params))
    },
    // createMeeting(key:any,params:any){
    //     // return DefaultApi.post(`meeting`, params);
    //     return DefaultApi.patch(`meeting/${key}`, params)
    // },
    updateMeeting(key:any,params:any){
        return DefaultApi.patch(`meeting/${key}`, params)
    },
    deleteMeeting(key:any,params:any){
        return DefaultApi.del(`meeting/${key}`, params)
    },
});