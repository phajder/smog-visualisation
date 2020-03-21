const filterFeatureGroup = (data, name, threshold) => ({
    type: "FeatureGroup",
    features: data.features.filter(feature => feature.properties[name] > threshold)
});

const findEllipseCenter = (emissionPoint, radii, tilt) => {
    const EARTH_RADIUS = 6378100.0,
          C = Math.PI/180.,
          radiusCoeff = radii[0] / EARTH_RADIUS,
          angle = -C * tilt;
    const lat = C * emissionPoint[0] + radiusCoeff * Math.sin(angle),
          lon = C * emissionPoint[1] +  radiusCoeff * Math.cos(angle)/Math.cos(lat);
    return [lat / C, lon / C];
};
const calculateEllipseTilt = (windDirection) => {
    switch(windDirection) {
        case "NE": return 315;
        case "N": return 270;
        case "NW": return 225;
        case "W": return 180;
        case "SW": return 135;
        case "S": return 90;
        case "SE": return 45;
        case "E": return 0;
        default: return null;
    }
};

export { filterFeatureGroup, findEllipseCenter, calculateEllipseTilt };