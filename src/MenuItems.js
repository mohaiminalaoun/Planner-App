import React from "react";
import { useEffect } from "react";
import "./MenuItems.css";
import { Button, ListGroup } from "react-bootstrap";

const MenuItems = props => {
  useEffect(() => {
    let div = document.getElementById("menuItems");
    div.style.left = props.tempPosition[0] + "px";
    div.style.top = props.tempPosition[1] + "px";
  });

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
  });
  return (
    <ListGroup className="menuItems" id="menuItems">
      {options}
      <Button variant="secondary" onClick={props.closeAllCtxMenus}>
        Close
      </Button>
    </ListGroup>
  );
};

export default MenuItems;
