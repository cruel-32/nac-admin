export class Meeting {
    title:string = '';
    place:string = '';
    contents:string[] = [];
    members:string[] = [];
    
    constructor(title:string='', place:string='', contents:string[]=[],members:string[]=[]) {
        this.title = title;
        this.place = place;
        this.contents = contents;
        this.members = members;
    }
}
