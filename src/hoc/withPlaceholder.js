import React, { Component } from 'react';

const withPlacebolder = WrappedComponent => (
  class HOC extends Component {
    render() {
      return(
        <WrappedComponent
          placeholder='Mon HOC'
          {...this.props}
        />
      )
    }
  }
)

export default withPlacebolder;