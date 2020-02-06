import React from "react";
import "./MenuItems.scss";
import PropTypes from "prop-types";
import { ListGroup } from "react-bootstrap";

const MenuItems = ({ menuOptionsList, tempPosition }) => {
  const options = menuOptionsList.map(item => {
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
        tempPosition[0] + 150 < window.screen.width
          ? tempPosition[0] + "px"
          : tempPosition[0] - 100 + "px",
      top:
        tempPosition[0] + 150 < window.screen.width
          ? tempPosition[1] + "px"
          : tempPosition[1] - 50 + "px"
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
