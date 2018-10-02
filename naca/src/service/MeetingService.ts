import { DefaultApi } from './DefaultApi';
export const MeetingService = Object.assign(DefaultApi,{
    getMeetings(params:any={}){
        return DefaultApi.get(`meetings.json`, Object.assign({
            orderByChild : `date`,
            print : `pretty`
        },params))
    },
    createMeeting(auth:any,params:any={}){
        return DefaultApi.put(`meetings.json?auth`+auth, Object.assign({
            print : `pretty`
        },params))
    }
});