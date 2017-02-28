import React from 'react';

export default class Map extends React.Component {
  static propTypes = {
    history: React.PropTypes.arrayOf(
      React.PropTypes.shape({
        time: React.PropTypes.instanceOf(Date).isRequired,
        lat: React.PropTypes.number.isRequired,
        lng: React.PropTypes.number.isRequired,
      }),
    ),
  };

  constructor(props) {
    super(props);

    this.apiKey = 'AIzaSyCwddszOGNsmeumxZC24JkhvzM1nZogpk4';
    this.initMap = this.initMap.bind(this);
    this.polylines = [];
  }

  componentDidMount() {
    window.initMap = this.initMap;

    const mapsScript = window.document.createElement('script');
    mapsScript.src = `https://maps.googleapis.com/maps/api/js?libraries=geometry&key=${this.apiKey}&callback=initMap`;
    mapsScript.async = true;

    window.document.body.appendChild(mapsScript);
  }

  componentDidUpdate() {
    this.polylines.forEach(polyline => polyline.setMap(null));
    this.polylines = [];

    const last = this.props.history[this.props.history.length - 1];

    this.map.panTo({
      lat: last.lat,
      lng: last.lng,
    });

    for (let i = 1/* not a mistake */; i < this.props.history.length; i += 1) {
      const prevPoint = this.props.history[i - 1];
      const prevLatLng = new google.maps.LatLng(
        prevPoint.lat,
        prevPoint.lng,
      );

      const curPoint = this.props.history[i];
      const curLatLng = new google.maps.LatLng(
        curPoint.lat,
        curPoint.lng,
      );

      const distanceMiles = 0.000621371192 *
        google.maps.geometry.spherical.computeDistanceBetween(prevLatLng, curLatLng);
      const timeHours = (curPoint.time.getTime() - prevPoint.time.getTime())
        / 1000 / 60 / 60;
      const speed = distanceMiles / timeHours;

      const color =
        speed < 5.0 ? '#ff0000' :
        speed < 10.0 ? '#ffff00' :
        '#00ff00';

      this.polylines.push(new google.maps.Polyline({
        path: [
          prevLatLng,
          curLatLng,
        ],
        geodesic: true,
        strokeColor: color,
        strokeOpacity: 1.0,
        strokeWeight: 1,
        map: this.map,
      }));
    }
  }

  initMap() {
    const last = this.props.history[this.props.history.length - 1];

    this.map = new google.maps.Map(
      this.mapObj, {
        center: {
          lat: last.lat,
          lng: last.lng,
        },
        clickableIcons: false,
        disableDefaultUI: true,
        mapTypeId: google.maps.MapTypeId.SATELLITE,
        scrollwheel: true,
        zoom: 17,
      });

    // map.addListener('click', (event) => {
    //   console.log(`{ lat: ${event.latLng.lat()}, lng: ${event.latLng.lng()} },`);
    // });

    this.bicyclingLayer = new google.maps.BicyclingLayer({
      map: this.map,
    });

    this.startMarker = new google.maps.Marker({
      position: {
        lat: last.lat,
        lng: last.lng,
      },
      map: this.map,
      title: 'Start',
      label: 'S',
    });
  }

  render() {
    return (
      <div
        ref={(mapObj) => { this.mapObj = mapObj; }}
        style={({
          width: '100vw',
          height: '100vh',
        })}
      />
    );
  }
}
