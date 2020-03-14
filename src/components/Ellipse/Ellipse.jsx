import { Component } from 'react';
import L from 'leaflet';
import "leaflet-ellipse";
import { withLeaflet } from 'react-leaflet';

class Ellipse extends Component {
    componentDidMount() {
        const { latLng, radii, tilt, options } = this.props;
        const { map } = this.props.leaflet;
        L.ellipse(latLng, radii, tilt, options).addTo(map);
    }

    render() {
        return null;
    }
}

export default withLeaflet(Ellipse);