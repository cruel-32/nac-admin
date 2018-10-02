export class Meeting {
    date:Date;
    title:string = '';
    place:string = '';
    category:string[] = ['먹방'];
    
    constructor(date:Date=new Date, title:string='', place:string='', category:string[]=['먹방']) {
        this.date = date;
        this.title = title;
        this.place = place;
        this.category = category;
    }
}
