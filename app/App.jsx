import React from 'react';
import Map from './Map';
import { testData } from './testData';

export default class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      history: [],
    };
  }

  componentDidMount() {
    this.timerHandle = setInterval(() => {
      if (testData.length > 0) {
        this.setState((prevState) => {
          const testItem = testData.splice(0, 1)[0];

          const history = [...prevState.history];
          history.push({
            time: new Date(),
            lat: testItem.lat,
            lng: testItem.lng,
          });

          return {
            history,
          };
        });
      }
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerHandle);
  }

  render() {
    return (
      <Map
        history={this.state.history}
      />
    );
  }
}
