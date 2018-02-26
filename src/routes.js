import React from 'react';
import { Route } from 'react-router-dom';

import App from './app';

class Routes extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <section>
        <Route path="/:year?/:month?" component={ App }/>
      </section>
    )
  }
}

export default Routes;
