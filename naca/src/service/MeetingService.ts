import { DefaultApi } from './DefaultApi';
export const MeetingService = Object.assign(DefaultApi,{
    getMeetings(params:any={}){
        return DefaultApi.get(`meetings`, Object.assign({
            orderByChild : `date`,
            print : `pretty`
        },params))
    },
    createMeeting(params:any={}){
        return DefaultApi.post(`meetings`, params);
    },
    updateMeeting(key:any,params:any={}){
        return DefaultApi.patch(`meetings/${key}`, params)
    },
});