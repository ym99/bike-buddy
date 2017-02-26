import React from 'react';

export default class Map extends React.Component {
  static propTypes = {
    history: React.PropTypes.arrayOf(
      React.PropTypes.shape({
        time: React.PropTypes.instanceOf(Date).isRequired,
        latLng: React.PropTypes.shape({
          lat: React.PropTypes.number.isRequired,
          lng: React.PropTypes.number.isRequired,
        }),
      }),
    ),
  };

  constructor(props) {
    super(props);

    this.apiKey = 'AIzaSyCwddszOGNsmeumxZC24JkhvzM1nZogpk4';
    this.initMap = this.initMap.bind(this);
    this.path = this.path.bind(this);
  }

  componentDidMount() {
    window.initMap = this.initMap;

    const mapsScript = window.document.createElement('script');
    mapsScript.src = `https://maps.googleapis.com/maps/api/js?key=${this.apiKey}&callback=initMap`;
    mapsScript.async = true;

    window.document.body.appendChild(mapsScript);
  }

  componentDidUpdate() {
    this.polyline.setPath(this.path());
  }

  initMap() {
    const map = new google.maps.Map(
      this.mapObj, {
        center: { lat: 38.8648, lng: -77.0380 },
        clickableIcons: false,
        disableDefaultUI: true,
        mapTypeId: google.maps.MapTypeId.SATELLITE,
        scrollwheel: true,
        zoom: 17,
      });

    // map.addListener('click', (event) => {
    //   console.log(`{ lat: ${event.latLng.lat()}, lng: ${event.latLng.lng()} },`);
    // });

    const bikeLayer = new google.maps.BicyclingLayer();
    bikeLayer.setMap(map);

    this.polyline = new google.maps.Polyline({
      path: this.path(),
      geodesic: true,
      strokeColor: 'yellow',
      strokeOpacity: 1.0,
      strokeWeight: 1,
    });

    this.polyline.setMap(map);
  }

  path() {
    return this.props.history.map(item => ({
      lat: item.latLng.lat,
      lng: item.latLng.lng,
    }));
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
