import PropTypes from 'prop-types';
import React from 'react';
import cn from 'classnames';

var style = {
    backgroundColor: "#000000",
    borderTop: "1px solid #E7E7E7",
    textAlign: "center",
    padding: "20px",
    position: "fixed",
    left: "0",
    bottom: "0",
    height: "60px",
    width: "100%",
    color: 'white'
}

var phantom = {
  display: 'block',
  padding: '20px',
  height: '60px',
  width: '100%',
}


function Footer({ children }) {
    return (
        <div>
            <div style={phantom} />
            <div style={style}>
                { children }
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent accumsan eu leo sit amet tincidunt. Aenean id elit arcu. Pellentesque eget fringilla enim, at porta leo.
            </div>
        </div>
    )
}

export default Footer