import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

const packageJson = require('../package.json');

ReactDOM.render(
  <App />,
  document.getElementById('app'),
);

document.title = `${packageJson.description} v${packageJson.version}`;

if (module.hot) {
  module.hot.accept();
}
