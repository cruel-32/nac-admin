import { DefaultApi } from './DefaultApi';
export const MeetingService = Object.assign(DefaultApi,{
    getMeetings(params:any){
        return DefaultApi.get(`/meetings.json`,Object.assign({
            "orderBy" : "date",
            "print" : "pretty",
        }, params))
    }
});