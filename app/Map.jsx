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
    this.mapObj = new google.maps.Map(
      this.mapDomObj, {
        center: {
          lat: -34.397,
          lng: 150.644,
        },
        scrollwheel: false,
        zoom: 8,
      });
  }

  render() {
    return (
      <div
        ref={(mapDomObj) => { this.mapDomObj = mapDomObj; }}
        style={({
          width: '100vw',
          height: '100vh',
        })}
      />
    );
  }
}
