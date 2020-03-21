import React from 'react';
import { Map as LeafletMap, TileLayer } from 'react-leaflet';

import { SmogLayer } from '../../components';
import input from '../../data/input';

export default function Map() {
    const position = [49.9844399, 21.9356703],
          radii = [50, 25];
    const data = input();
    return (
        <LeafletMap center={position} zoom={15}>
            <TileLayer
                attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <SmogLayer
                featureGroup={data}
                featureName="pm2.5"
                threshold={35}
                ellipseRadii={radii}
            />
        </LeafletMap>
    );
};