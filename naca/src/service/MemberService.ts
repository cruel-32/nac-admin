import { DefaultApi } from './DefaultApi';
export const MemberService = Object.assign(DefaultApi,{
    getMembers(params:any={}){
        return DefaultApi.get(`member`, Object.assign({
            print : `pretty`
        },params))
    },
});