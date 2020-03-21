import React, { Component } from 'react';
import { GeoJSON } from 'react-leaflet';
import { Ellipse } from '../../components';

import { filterFeatureGroup, findEllipseCenter, calculateEllipseTilt } from '../../util';

class SmogLayer extends Component {
    render() {
        const filteredFeatureGroup = filterFeatureGroup(
            this.props.featureGroup,
            this.props.featureName,
            this.props.threshold
        );
        return (
            <div id="smogDataContainer">
                <GeoJSON
                    data={filteredFeatureGroup}
                    onEachFeature={(feature, layer) => {
                        layer.bindPopup(
                            "Id: " + feature.properties.id + 
                            "<br />" + this.props.featureName.toUpperCase() + ": " + feature.properties[this.props.featureName] + 
                            "<br />Wiatr: " + feature.properties.windDir);
                    }}
                    coordsToLatLng={coords => coords}
                />
                {filteredFeatureGroup && filteredFeatureGroup.features.map(
                    ({ properties, geometry }) => {
                        const ellipseTilt = calculateEllipseTilt(properties.windDir),
                              center = findEllipseCenter(geometry.coordinates, this.props.ellipseRadii, ellipseTilt);
                        return (
                            <Ellipse
                                key={properties.id}
                                latLng={center}
                                radii={this.props.ellipseRadii}
                                tilt={ellipseTilt}
                                color={'red'}
                                fillColor={'red'}
                                fillOpacity={0.5}
                            />
                        );
                    }
                )}
            </div>
            
        );
    }
};

export default SmogLayer;