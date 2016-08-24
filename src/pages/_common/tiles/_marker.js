import React from 'react';
import Radium from 'radium';

const style = {
  base: {
    border: 'solid 0.125em #ffffff',
    borderRadius: '100%',
    boxShadow: '0 0.125em 0.125em 0 rgba(0, 0, 0, 0.5)',
    height: '0.75em',
    marginLeft: '-0.375em',
    marginTop: '-0.375em',
    opacity: 0.5,
    position: 'absolute',
    width: '0.75em'
  },
  selected: {
    opacity: 1
  }
};

export const largeMarkerStyle = {
  border: 'solid 0.188em #ffffff',
  height: '1.25em',
  marginLeft: '-0.625em',
  marginTop: '-0.625em',
  width: '1.25em'
};

export default Radium((props) => (
  <div style={[
    style.base,
    { left: `${props.relativeLeft}%`, top: `${props.relativeTop}%` },
    props.selected && style.selected,
    largeMarkerStyle
  ]} />
));
