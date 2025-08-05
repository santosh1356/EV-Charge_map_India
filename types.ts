
export enum ChargerType {
  AC = 'AC',
  DC_FAST = 'DC Fast',
  TESLA_SUPERCHARGER = 'Tesla Supercharger',
}

export enum StationStatus {
  AVAILABLE = 'Available',
  IN_USE = 'In Use',
  OUT_OF_ORDER = 'Out of Order',
}

export interface ChargingStation {
  id: string;
  name: string;
  address: string;
  city: string;
  latitude: number;
  longitude: number;
  chargerType: ChargerType[];
  status: StationStatus;
  connectorTypes: string[];
}
