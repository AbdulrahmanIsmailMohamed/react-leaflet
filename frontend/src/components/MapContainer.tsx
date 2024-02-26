import { useState } from "react";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMapEvents,
} from "react-leaflet";
import { LatLngExpression, Map } from "leaflet";

function LocationMarker() {
  const [position, setPosition] = useState<LatLngExpression | null>(null);

  const map: Map = useMapEvents({
    click() {
      map.locate();
    },
    locationfound(e: { latlng: LatLngExpression }) {
      setPosition(e.latlng);
      map.flyTo(e.latlng, map.getMaxZoom());
    },
  });

  return (
    position === null || (
      <Marker position={position}>
        <Popup>you're here</Popup>
      </Marker>
    )
  );
}

const MapContainers = () => {
  const center: LatLngExpression = { lat: 0, lng: 0 };

  return (
    <MapContainer center={center} zoom={0} scrollWheelZoom={false}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <LocationMarker />
    </MapContainer>
  );
};

export default MapContainers;
