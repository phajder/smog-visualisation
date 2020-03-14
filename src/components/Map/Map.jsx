import React from 'react';
import { Map as LeafletMap, GeoJSON, Marker, Popup, TileLayer } from 'react-leaflet';
import * as turf from '@turf/turf';

function gen() {
    var extent = [0, 30, 20, 50];
    var cellWidth = 100;
    var pointGrid = turf.pointGrid(extent, cellWidth, {units: 'miles'});

    for (var i = 0; i < pointGrid.features.length; i++) {
    pointGrid.features[i].properties.temperature = Math.random() * 10;
    }
    var breaks = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    var lines = turf.isolines(pointGrid, breaks, {zProperty: 'temperature'});

    return lines;
}

export default function Map() {
    const position = [51.984880, 19.368896];
    return (
        <LeafletMap center={position} zoom={13}>
            <TileLayer
                attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={position}>
            <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
            </Marker>
            <GeoJSON data={gen()} onEachFeature={(feature, layer) => {
                layer.bindPopup('Hello, I have ' + feature.properties.temperature + ' degrees!');
            }}/>
        </LeafletMap>
    );
};