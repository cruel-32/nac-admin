export class Meeting {
    date:Date;
    title:string = '';
    place:string = '';
    
    constructor(date:Date=new Date, title:string='', place:string='') {
        this.date = date;
        this.title = title;
        this.place = place;
    }
}
