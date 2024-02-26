import {
  ImageOverlay,
  LayerGroup,
  LayersControl,
  MapContainer,
  Marker,
  Polygon,
  Popup,
  TileLayer,
} from "react-leaflet";
import zag from "../data/zag.json";

export const Map = () => {
  const pathRaster = "zag.jpg";
  const polygon: any = [
    [30.601313, 31.524711],
    [30.578113, 31.549962],
    [30.572792, 31.549612],
    [30.562889, 31.504607],
    [30.58166, 31.466473],
    [30.601313, 31.468878],
    [30.610473, 31.489669],
  ];

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
      <LayersControl position="topright">
        <LayersControl.Overlay name="Emergency Managment with popup">
          <LayerGroup>
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
          </LayerGroup>
        </LayersControl.Overlay>
        <LayersControl.Overlay name="Industry">
        <Polygon pathOptions={{ color: 'red', fillColor: 'red' }} positions={polygon} />
        </LayersControl.Overlay>
        <LayersControl.Overlay name="raster">
          <ImageOverlay bounds={polygon} url={pathRaster} />
        </LayersControl.Overlay>
      </LayersControl>
    </MapContainer>
  );
};
