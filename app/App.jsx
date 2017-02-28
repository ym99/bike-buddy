import React from 'react';
import Map from './Map';

export default class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      history: [],
    };
  }

  componentDidMount() {
    this.componentDidUpdate();
  }

  componentDidUpdate() {
    if (navigator.geolocation) {
      setTimeout(() => {
        navigator.geolocation.getCurrentPosition((position) => {
          console.log(position);

          this.setState((prevState) => {
            const history = [...prevState.history];
            history.push({
              time: new Date(),
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            });

            return {
              history,
            };
          });
        });
      }, 1000);
    }
  }

  render() {
    return (
      <div
        style={({
          width: '100vw',
          height: '100vh',
        })}
      >
        {this.state.history.length === 0 &&
          <div
            style={({
              position: 'fixed',
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: '1000',
              textAlign: 'center',
            })}
          >
            Waiting for GPS ...
          </div>
        }
        {this.state.history.length > 0 &&
          <Map
            history={this.state.history}
          />
        }
      </div>
    );
  }
}
