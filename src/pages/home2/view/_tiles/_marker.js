import React from 'react';
import Radium from 'radium';

const style = {
  boxShadow: '0 0.125em 0.125em 0 rgba(0, 0, 0, 0.5)',
  border: 'solid 2px #ffffff',
  height: '0.75em',
  marginLeft: '-0.375em',
  marginTop: '-0.375em',
  width: '0.75em',
  borderRadius: '100%'
};
export default Radium((props) => {
  return <div style={[ style, { left: `${props.left}%`, top: `${props.top}%` } ]} />;
});
