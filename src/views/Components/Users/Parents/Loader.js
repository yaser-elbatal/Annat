import React from 'react';
import { css } from '@emotion/core';
// First way to import
import { PulseLoader } from 'react-spinners';
// Another way to import. This is recommended to reduce bundle size
// import ClipLoader from 'react-spinners/ClipLoader';
 
// Can be a string as well. Need to ensure each key-value pair ends with ;
const override = css`
    display: block;
    margin: 2 auto;
    border-color: red;
`;
 
export default class Loader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    }
  }
  
  render() {
    return (
      <div className='sweet-loading'>
        <PulseLoader
          css={override}
          sizeUnit={"px"}
          size={15}
          color={'#1da3f2'}
          loading={this.state.loading}
        />
      </div> 
    )
  }
}