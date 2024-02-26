import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import zag from "../data/zag.json";

export const Map = () => {
  return (
    <MapContainer
      center={[30.587233051962436, 31.5202796459198]}
      zoom={13}
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {zag.features.map((item) => (
        <Marker
          key={item.id}
          position={[
            item.geometry.coordinates[1]!,
            item.geometry.coordinates[0]!,
          ]}
        >
          <Popup>
            <div>
              <h3>{item.properties.name}</h3>
              <p>{item.properties.type}</p>
              <img
                src={item.properties.photo.replace("\\", "/")}
                alt="this point not contain an image"
                height="150px"
                width="250px"
              />
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};
