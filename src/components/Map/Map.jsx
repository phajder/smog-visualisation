import React from 'react';
import { Map as LeafletMap, GeoJSON, Marker, Popup, TileLayer } from 'react-leaflet';

import { Ellipse } from '../../components';
import input from '../../data/input';

export default function Map() {
    const position = [49.9844399, 21.9356703];
    const data = input();
    return (
        <LeafletMap center={position} zoom={14}>
            <TileLayer
                attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={position}>
                <Popup>
                    A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
            </Marker>
            {/* <GeoJSON data={data} onEachFeature={(feature, layer) => {
                layer.bindPopup('PM2.5: ' + feature.properties['PM2,5'] + "<br /> Wiatr: " + feature.properties['Kierunek wiatru']);
            }}/> */}

            {data && data.features.map(({ properties, geometry }) => (
                <Ellipse
                    key={properties["Punkt pomiaru"]}
                    latLng={geometry.coordinates.reverse()}
                    radii={[25, 50]}
                    tilt={45}
                    color={'red'}
                    fillColor={'red'}
                    fillOpacity={0.5}
                />
            ))}
        </LeafletMap>
    );
};