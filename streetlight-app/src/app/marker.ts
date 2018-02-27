export class Marker {

    lat: number;
    lon: number;
    street: string;
    zip: string;
    label: string;
    nema: boolean;
    wireless: boolean;
    fixture_mfg: string;
    draggable: boolean;
    visible: boolean;

    constructor() {
        this.draggable = false;
    }

    setLat(lat: number) {
        this.lat = lat;
    }

    setLng(lng: number) {
        this.lon = lng;
    }

    setStreet(street: string) {
        this.street = street;
    }

    setZip(zip: string) {
        this.zip = zip;
    }

    setLabel(label: string) {
        this.label = label;
    }

    setNema(state: boolean) {
        this.nema = state;
    }

    setWireless(state: boolean) {
        this.wireless = state;
    }

    setFixture(state: string) {
        this.fixture_mfg = state;
    }

    setVisible(state: boolean) {
        this.visible = state;
    }

}