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
});