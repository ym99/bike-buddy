import React from 'react';

export default class Map extends React.Component {
  constructor(props) {
    super(props);

    this.apiKey = 'AIzaSyCwddszOGNsmeumxZC24JkhvzM1nZogpk4';
    this.initMap = this.initMap.bind(this);
  }

  componentDidMount() {
    window.initMap = this.initMap;

    const mapsScript = window.document.createElement('script');
    mapsScript.src = `https://maps.googleapis.com/maps/api/js?key=${this.apiKey}&callback=initMap`;
    mapsScript.async = true;

    window.document.body.appendChild(mapsScript);
  }

  initMap() {
    const map = new google.maps.Map(
      this.mapObj, {
        center: { lat: 38.8648, lng: -77.0380 },
        clickableIcons: false,
        disableDefaultUI: true,
        disableDoubleClickZoom: false,
        draggable: false,
        mapTypeId: google.maps.MapTypeId.SATELLITE,
        scrollwheel: true,
        zoom: 17,
      });

    const bikeLayer = new google.maps.BicyclingLayer();
    bikeLayer.setMap(map);

    const points = [
      { lat: 38.8648, lng: -77.0380 },
      { lat: 38.7854, lng: -77.0630 },
      { lat: 38.7293, lng: -77.1074 },
    ];

    const polyline = new google.maps.Polyline({
      path: points,
      geodesic: true,
      strokeColor: 'yellow',
      strokeOpacity: 1.0,
      strokeWeight: 1,
    });

    polyline.setMap(map);
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
