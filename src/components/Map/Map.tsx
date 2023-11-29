import "leaflet/dist/leaflet.css";

import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import iconRetina from "leaflet/dist/images/marker-icon-2x.png";
import L from "leaflet";
import { MapProps } from "./type";

let DefaultIcon = L.icon({
  ...L.Icon.Default.prototype.options,
  iconUrl: icon,
  iconRetinaUrl: iconRetina,
  shadowUrl: iconShadow,
});
L.Marker.prototype.options.icon = DefaultIcon;

const RenderMarker = (position: any) => {
  const map = useMap();

  useEffect(() => {
    map.setView(position.position);
  }, [position]);

  return null;
};

const Map = ({
  center,
  getCurrentPosition,
  customerCode,
  draggable,
}: MapProps) => {
  const [position, setPosition] = useState<any>(center);

  const markerRef = useRef<any>(null);

  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current;
        if (marker != null) {
          const pos = marker.getLatLng();
          setPosition(pos);
          getCurrentPosition(pos);
        }
      },
    }),
    []
  );

  return (
    <MapContainer
      fadeAnimation
      zoomAnimation
      className='border rounded'
      center={center}
      zoom={16}
      scrollWheelZoom={false}>
      <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />
      <Marker
        draggable={draggable}
        eventHandlers={eventHandlers}
        position={position}
        ref={markerRef}>
        <Popup minWidth={90}>
          <div className='d-flex align-items-center'>
            <span>کد مشتری: </span>
            <span>{customerCode}</span>
          </div>
        </Popup>
      </Marker>
      <RenderMarker position={position} />
    </MapContainer>
  );
};

export default Map;
