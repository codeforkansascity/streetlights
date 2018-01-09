export class Marker {

    lat: number;
    lon: number;
    street: string;
    zip: string;
    label: string;
    draggable: boolean;

    constructor() {
        this.draggable = false;
    }

    setLat(lat) {
        this.lat = lat;
    }

    setLng(lng) {
        this.lon = lng;
    }

    setStreet(street) {
        this.street = street;
    }

    setZip(zip) {
        this.zip = zip;
    }

    setLabel(label) {
        this.label = label;
    }


}