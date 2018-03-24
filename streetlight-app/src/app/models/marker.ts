export class Marker {

    lat: number;
    lon: number;
    label: string;
    nema: boolean;
    wireless: boolean;
    poleOwner: string;
    lightBulbType: string;
    draggable: boolean;
    visible: boolean;

    constructor() {
        this.draggable = false;
    }

    setLat(lat: number) {
        this.lat = <number>lat;
    }

    setLng(lng: number) {
        this.lon = <number>lng;
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

    setPoleOwner(value: string) {
        this.poleOwner = value;
    }

    setLightBulbType(value: string) {
        this.lightBulbType = value;
    }

    setVisible(state: boolean) {
        this.visible = state;
    }

}