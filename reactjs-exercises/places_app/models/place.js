import { v4 as uuidv4 } from 'uuid';

class Place {
    constructor(title, imageUrl, address, location) {
        this.title = title;
        this.imageUrl = imageUrl;
        this.address = address;
        this.location = location;
        this.id = uuidv4().toString();
    }
}