import React from 'react';
import { Map as LeafletMap, GeoJSON, Marker, Popup, TileLayer } from 'react-leaflet';

import { Ellipse } from '../../components';
import input from '../../data/input';

export default function Map() {
    const position = [49.9844399, 21.9356703];
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
            <GeoJSON data={input()} onEachFeature={(feature, layer) => {
                layer.bindPopup('PM2.5: ' + feature.properties['PM2,5'] + "<br /> Wiatr: " + feature.properties['Kierunek wiatru']);
            }}/>
            <Ellipse
                latLng={position}
                radii={[100, 200]}
                tilt={40}
                options={{
                    color: 'red',
                    fillColor: 'red',
                    fillOpacity: 0.5
                }}
            />
        </LeafletMap>
    );
};