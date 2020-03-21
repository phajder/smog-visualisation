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

export { filterFeatureGroup, findEllipseCenter };