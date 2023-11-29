export interface MapProps {
  center: [lat: number, lng: number];
  getCurrentPosition: (LatLng: any) => void;
  draggable: boolean;
  customerCode: string;
}
