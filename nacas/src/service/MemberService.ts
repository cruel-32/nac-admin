import { DefaultApi } from './DefaultApi';
export const MemberService = Object.assign(DefaultApi,{
    getMember(key:any,params:any={}){
        return DefaultApi.get(`member/${key}`, Object.assign({
            print : `pretty`
        },params))
    },
    getMembers(params:any={}){
        return DefaultApi.get(`member`, Object.assign({
            orderByChild : `grade`,
            startAt : 0,
            endAt : 5,
            print : `pretty`
        },params))
    },
    createMember(params:any){
        return DefaultApi.post(`member`, params);
    },
    updateMember(key:string,params:any){
        return DefaultApi.patch(`member/${key}`, params)
    },
    updateMembersParticipation(params:any){
        return new Promise((resolve,reject)=>{
            this.getMembers().then((snapShot:any)=>{
                if(snapShot){
                    let members = snapShot.val();
                    let membersArr = Object.keys(members);
                    const key = params.key.toString();
                    const method = params.method;
                    const prevMembers = params.membersOrigin;
                    const nextMembers = params.members;

                    const gradeChanger = (member:any,participation:any)=>{
                        const participationKeys = Object.keys(participation);
                        if(member.grade == 3 || member.grade == 4){ //member.grade == 2 || 도 넣으면 일반회원에서 강등도 가능
                            if(participationKeys.length >= 4){
                                member.grade = 2
                            } else if(participationKeys.length >= 1){
                                member.grade = 3
                            } else {
                                member.grade = 4
                            }
                        }
                    }
                    
                    if(method == 'post'){
                        membersArr.forEach((memberKey:any)=>{
                            const isNext = nextMembers.includes(memberKey);
                            if(isNext){
                                members[memberKey]['participation'] ? (members[memberKey]['participation'][key] = true) : (members[memberKey]['participation'] = {[key]:true});
                                gradeChanger(members[memberKey], members[memberKey]['participation']);
                            }
                        });
                    } else if(method == 'put'){
                        membersArr.forEach((memberKey:any)=>{
                            const isPrev = prevMembers.includes(memberKey);
                            const isNext = nextMembers.includes(memberKey);

                            if(isPrev && !isNext){
                                members[memberKey]['participation'] && delete members[memberKey]['participation'][key]
                                gradeChanger(members[memberKey], members[memberKey]['participation']);
                            } else if(!isPrev && isNext){
                                members[memberKey]['participation'] ? members[memberKey]['participation'][key] = true : members[memberKey]['participation'] = {[key]:true};
                                gradeChanger(members[memberKey], members[memberKey]['participation']);
                            }
                        });
                    } else if(method == 'delete'){
                        membersArr.forEach((memberKey:any)=>{
                            const isPrev = prevMembers.includes(memberKey);
                            if(isPrev){
                                members[memberKey]['participation'] && delete members[memberKey]['participation'][key]
                                gradeChanger(members[memberKey], members[memberKey]['participation']);
                            }
                        });
                    }
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