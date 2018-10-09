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
    updateMember(key:string,params:any){
        return DefaultApi.patch(`member/${key}`, params)
    },
    updateMembers(params:any){
        return new Promise((resolve,reject)=>{
            this.getMembers().then((snapShot:any)=>{
                console.log('snapShot : ', snapShot);
                if(snapShot){
                    let members = snapShot.val();
                    let keys = Object.keys(params);
    
                    keys.forEach((key)=>{
                        let meetingKey = Object.keys(params[key]['participation'])[0];
                        members[key]['participation'] ? 
                        Object.assign(members[key]['participation'], params[key]['participation'])
                        : members[key]['participation'] = params[key]['participation']
                    });

                    return DefaultApi.patch(`member`, members)
                }
            }).then((res:any)=>{
                if(res){
                    resolve(true)
                } else {
                    reject(false);
                }
            })

        })
    }
}); 