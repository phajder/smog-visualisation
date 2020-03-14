import L from 'leaflet';
import "leaflet-ellipse";
import { withLeaflet, Path } from 'react-leaflet';

class Ellipse extends Path {
    createLeafletElement() {
        const { latLng, radii, tilt, ...options } = this.props;
        return new L.Ellipse(latLng, radii, tilt, this.getOptions(options));
    }

    updateLeafletElement(fromProps, toProps) {
        if(toProps.latLng !== fromProps.latLng) {
            this.leafletElement.setLatLang(toProps.latLng);
        }

        if(toProps.radii !== fromProps.radii) {
            this.leafletElement.setRadii(toProps.radii);
        }

        if(toProps.tilt !== fromProps.tilt) {
            this.leafletElement.setTilt(toProps.tilt);
        }
    }
}

export default withLeaflet(Ellipse);