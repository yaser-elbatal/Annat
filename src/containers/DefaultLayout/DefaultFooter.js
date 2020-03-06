import React, { Component } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

class DefaultFooter extends Component {
  render() {

    // eslint-disable-next-line
    const { children, ...attributes } = this.props;

    return (
      <React.Fragment>
        <span>copy 2019</span>
        {/* <span><span style={{color: '#20a8d8',fontWeight: '600',fontSize: '13px;'}}>XcorteX Company</span> &copy; 2019</span>
        <span className="ml-auto">Powered by <span style={{color: '#20a8d8',fontWeight: '700',fontSize: '16px;'}}>XcorteX Company</span></span> */}
      </React.Fragment>
    );
  }
}

DefaultFooter.propTypes = propTypes;
DefaultFooter.defaultProps = defaultProps;

export default DefaultFooter;
