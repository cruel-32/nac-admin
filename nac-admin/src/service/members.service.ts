import Member from '../model/member.model'
export default class MembersService extends Member{
    constructor(){
        console.log('Service 파일');
    }
    deleteMember(Member:Member){
        console.log('deleteMember Member : ', Member);
    }
    getMember(Member:Member){
        console.log('getMember Member : ', Member);
    }
    getMembers(filter){
        console.log('getMembers filter : ', filter);
    }
    updateMember(Member:Member){
        console.log('updateMember Member : ', Member);
    }
    createMember(Member:Member){
        console.log('createMember Member : ', Member);
    }
}