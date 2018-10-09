import { DefaultApi } from './DefaultApi';
export const MeetingService = Object.assign(DefaultApi,{
    getMeeting(key:any,params:any={}){
        return DefaultApi.get(`meeting/${key}`, Object.assign({
            print : `pretty`
        },params))
    },
    getMeetings(params:any){
        return DefaultApi.get(`meeting`, Object.assign({
            orderByChild : `date`,
            print : `pretty`
        },params))
    },
    createMeeting(params:any){
        return DefaultApi.post(`meeting`, params);
    },
    updateMeeting(key:any,params:any){
        return DefaultApi.patch(`meeting/${key}`, params)
    },
    deleteMeeting(key:any,params:any){
        return DefaultApi.del(`meeting/${key}`, params)
    },
});