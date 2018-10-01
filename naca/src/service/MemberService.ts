import { DefaultApi } from './DefaultApi';
export const MeetingService = Object.assign(DefaultApi,{
    getMeetings(token:any){
        return DefaultApi.get(`/meetings.json`,{
            'print' : 'pretty',
            'auth' : `${token}`
        })
    }
});