import React from 'react';
import { Map as LeafletMap, GeoJSON, TileLayer, Popup } from 'react-leaflet';

import { Ellipse } from '../../components';
import input from '../../data/input';
import { filterFeatureGroup, findEllipseCenter } from '../../util';

export default function Map() {
    const position = [49.9844399, 21.9356703],
          radii = [50, 25],
          tilt = 30;
    const data = input();
    return (
        <LeafletMap center={position} zoom={14}>
            <TileLayer
                attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <GeoJSON
                data={filterFeatureGroup(data, "pm2.5", 35)}
                onEachFeature={(feature, layer) => {
                    layer.bindPopup(
                        'Id: ' + feature.properties.id + 
                        '<br />PM2.5: ' + feature.properties['pm2.5'] + 
                        "<br />Wiatr: " + feature.properties.windDir);
                }}
                coordsToLatLng={coords => coords}
            />
            
            {data && filterFeatureGroup(data, "pm2.5", 35).features.map(({ properties, geometry }) => (
                <Ellipse
                    key={properties.id}
                    latLng={findEllipseCenter(geometry.coordinates, radii, tilt)}
                    radii={radii}
                    tilt={tilt}
                    color={'red'}
                    fillColor={'red'}
                    fillOpacity={0.5}
                >
                    <Popup>{properties['pm2.5']}</Popup>
                </Ellipse>
            ))}
        </LeafletMap>
    );
};