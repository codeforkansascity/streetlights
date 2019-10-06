export class Streetlight {
    poleID: string;
    longitude: number;
    latitude: number;
    lightbulbType: string;
    wattage: number;
    lumens: number;
    attachedTech: string;
    poleOwner: string;
    dataSource: string;
    fiberWifiEnabled: boolean;
    lightAttributes: string;
    poleType: string;
}

export class StreetlightData {
  count: number;
  streetlights: Streetlight[];
}
