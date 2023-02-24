import React from "react";
import { GoogleMap, InfoWindowF, MarkerF } from "@react-google-maps/api";
import { formatRelative } from "date-fns";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Search from "./Search";
import SaveSearch from "./SaveSearch";
import mapStyles from "../utils/mapStyles";

const options = {
  disableDefaultUI: true,
  styles: mapStyles,
  zoomControl: true,
};
const center = { lat: 3.139003, lng: 101.686852 };

export default function Map() {
  const [markers, setMarkers] = React.useState([]);
  const [selected, setSelected] = React.useState();

  const onMaplClick = React.useCallback((event) => {
    setMarkers((current) => [
      ...current,
      {
        lat: event.latLng.lat(),
        lng: event.latLng.lng(),
        time: new Date(),
      },
    ]);
  }, []);

  const mapRef = React.useRef();
  const onMapLoad = React.useCallback((map) => {
    mapRef.current = map;
  }, []);

  const panTo = React.useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(14);
  }, []);

  return (
    <Container maxWidth={false} disableGutters>
      <div className="map-title">
        <Typography variant="h4" gutterBottom>
          Mark Zombies{" "}
          <span role="img" aria-label="zombie">
            🧟
          </span>
        </Typography>
      </div>

      <div className="search-container">
        <Search panTo={panTo} />
      </div>

      <SaveSearch />

      <GoogleMap
        zoom={10}
        center={center}
        options={options}
        mapContainerClassName="map-container"
        onClick={onMaplClick}
        onLoad={onMapLoad}
      >
        {markers.map((marker) => (
          <MarkerF
            key={marker.time.toISOString()}
            position={{ lat: marker.lat, lng: marker.lng }}
            icon={{
              url: "/zombie.png",
              scaledSize: new window.google.maps.Size(30, 30),
              origin: new window.google.maps.Point(0, 0),
              anchor: new window.google.maps.Point(15, 15),
            }}
            onClick={() => {
              setSelected(marker);
            }}
          />
        ))}

        {selected ? (
          <InfoWindowF
            position={{ lat: selected.lat, lng: selected.lng }}
            onCloseClick={() => {
              setSelected(null);
            }}
          >
            <div className="">
              <Typography variant="h6" gutterBottom>
                Danger!
              </Typography>
              <Typography variant="body2">
                Spotted {formatRelative(selected.time, new Date())}
              </Typography>
            </div>
          </InfoWindowF>
        ) : null}
      </GoogleMap>
    </Container>
  );
}
