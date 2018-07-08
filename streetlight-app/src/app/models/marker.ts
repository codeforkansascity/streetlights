export class Marker {

    attachedTech: string;
    draggable: boolean;
    fiberWifiEnabled: boolean;
    label: string;
    lat: number;
    lightAttributes: string;
    lightBulbType: string;
    lon: number;
    lumens: number;
    poleOwner: string;
    poleType: string;
    visible: boolean;
    wattage: number;

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

    setWireless(state: boolean) {
        this.fiberWifiEnabled = state;
    }

    setPoleOwner(value: string) {
        this.poleOwner = value;
    }

    setLightBulbType(value: string) {
        this.lightBulbType = value;
    }

    setAttachedTech(value: any) {
        this.attachedTech = value;
    }

    setLumens(value: number) {
        this.lumens = value;
    }

    setPoleType(value: string) {
        this.poleType = value;
    }

    setWattage(value: number) {
        this.wattage = value;
    }



    setVisible(state: boolean) {
        this.visible = state;
    }

}