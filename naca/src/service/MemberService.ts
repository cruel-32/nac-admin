import { DefaultApi } from './DefaultApi';
export const MemberService = Object.assign(DefaultApi,{
    getMembers(params:any={}){
        return DefaultApi.get(`member`, Object.assign({
            orderByChild : `grade`,
            startAt : 0,
            endAt : 5,
            print : `pretty`
        },params))
    },
    updateMembers(params:any={}){
        console.log('updateMembers params : ', params);
        return DefaultApi.put(`member`, Object.assign({
            print : `pretty`
        },params))
    },
    deleteMembersParticipation(params:any={}){
        return DefaultApi.del(`member`, Object.assign({
            print : `pretty`
        },params))
    }
});