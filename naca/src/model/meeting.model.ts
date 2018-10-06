export class Meeting {
    date:number;
    title:string = '';
    place:string = '';
    contents:string[] = [];
    members:string[] = [];
    
    constructor(date:number, title:string='', place:string='', contents:string[]=[],members:string[]=[]) {
        this.date = date;
        this.title = title;
        this.place = place;
        this.contents = contents;
        this.members = members;
    }
}
