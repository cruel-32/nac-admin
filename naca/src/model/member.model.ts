export class Member {
    address:string = "서울";
    birth:number = 0;
    grade:number = 4;
    job:string = "";
    joinDate:number = 20180620;
    mail:string = "a@b.com";
    name:string = "홍길동";
    participation:any = {};
    phone:number = 1012345678;
    outDay:number = 0;
    
    constructor(
        address:string,
        birth:number,
        joinDate:number,
        name:string,
        job:string = "",
        mail:string = "",
        grade:number = 4,
        participation:any = {},
        phone:number = 1012345678,
        outDay:number = 0
    ) {
        this.address = address;
        this.birth = birth;
        this.joinDate = joinDate;
        this.name = name;
        this.job = job;
        this.mail = mail;
        this.grade = grade;
        this.participation = participation;
        this.phone = phone;
        this.outDay = outDay;
    }
}