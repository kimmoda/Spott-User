import React from 'react';
import Radium from 'radium';

const style = {
  base: {
    boxShadow: '0 0.125em 0.125em 0 rgba(0, 0, 0, 0.5)',
    border: 'solid 2px #ffffff',
    height: '0.75em',
    marginLeft: '-0.375em',
    marginTop: '-0.375em',
    width: '0.75em',
    borderRadius: '100%',
    position: 'absolute',
    opacity: '0.70'
  },
  selected: {
    backgroundColor: '#ffffff'
  }
};
export default Radium((props) => (
  <div style={[
    style.base,
    { left: `${props.relativeLeft}%`, top: `${props.relativeTop}%` },
    props.selected && style.selected
  ]} />
));
