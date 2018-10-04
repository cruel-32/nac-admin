import { DefaultApi } from './DefaultApi';
export const MemberService = Object.assign(DefaultApi,{
    getMembers(params:any={}){
        return DefaultApi.get(`members`, Object.assign({
            orderByChild : `name`,
            print : `pretty`
        },params))
    },
});