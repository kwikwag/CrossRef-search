import React, { Component } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';

import Nav from './Nav'

class App extends Component {
  render() {
    return (
        <React.Fragment>
            <CssBaseline />
            <Nav/>
        </React.Fragment>
    );
  }
}

export default App;
