//rcep command can be used to automatically generate the basic structure of the class 
//and also the import functions
import loading from './loading.gif'

import React, { Component } from 'react'
import PropTypes from 'prop-types'

export class Spinner extends Component {

  render() {
    return (
      <div className="d-flex justify-content-center vh-1">
        <img src={loading} alt="loading"/>
      </div>
    )
  }
}

export default Spinner
