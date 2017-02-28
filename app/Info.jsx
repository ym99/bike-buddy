import React from 'react';

export default class Info extends React.Component {
  static propTypes = {
    speed: React.PropTypes.number.isRequired,
  };

  render() {
    return (
      <div
        style={({
          fontSize: '50vw',
        })}
      >
        {`${props.speed.toFixed(1)}`}
      </div>
    );
  }
}
