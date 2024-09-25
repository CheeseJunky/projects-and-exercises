import { v4 as uuidv4 } from 'uuid';

export class Place {
    constructor(title, imageUrl, location) {
        this.title = title;
        this.imageUrl = imageUrl;
        this.location = { lat: location.lat, long: location.long };
        // this.id = uuidv4().toString();
        this.id = new Date().toString() + Math.random().toString();
    }
}