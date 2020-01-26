import React from "react";
import "./MenuItems.scss";
import PropTypes from "prop-types";
import { Button, ListGroup } from "react-bootstrap";

const MenuItems = props => {
  const options = props.menuOptionsList.map(item => {
      return (
        <ListGroup.Item
          className="menuOption"
          key={item.text}
          onClick={item.onClick}
        >
          {item.text}
        </ListGroup.Item>
      );
    }),
    divStyle = {
      left:
        props.tempPosition[0] + 150 < window.screen.width
          ? props.tempPosition[0] + "px"
          : props.tempPosition[0] - 150 + "px",
      top: props.tempPosition[1] + "px"
    };
  return (
    <ListGroup className="menuItems" id="menuItems" style={divStyle}>
      {options}
    </ListGroup>
  );
};

MenuItems.propTypes = {
  tempPosition: PropTypes.array,
  menuOptionsList: PropTypes.array
};

export default MenuItems;
