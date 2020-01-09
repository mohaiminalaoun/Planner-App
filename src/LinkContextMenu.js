import React from "react";
import { useEffect } from "react";
import "./LinkContextMenu.css";
import { Form, Button, FormControl } from "react-bootstrap";

const LinkContextMenu = props => {
  useEffect(() => {
    let div = document.getElementById("linkContextMenu");
    div.style.left = props.tempPosition[0] + "px";
    div.style.top = props.tempPosition[1] + "px";
  });
  return (
    <div className="linkContextMenu" id="linkContextMenu">
      <Form className="mb-3">
        <Form.Group controlId="formAddURL">
          <FormControl
            onChange={props.changeURLFn}
            value={props.currentURL}
            placeholder="Add url"
            aria-label="Add url"
            aria-describedby="basic-addon2"
          />
        </Form.Group>
        <Form.Group controlId="formAddURLText">
          <FormControl
            onChange={props.changeURLTextFn}
            value={props.currentURLText}
            placeholder="Add text to show"
            aria-label="Add text to show"
            aria-describedby="basic-addon2"
          />
        </Form.Group>
        <div>
          <Button variant="primary" onClick={props.saveFn}>
            Ok
          </Button>
          <Button variant="secondary" onClick={props.closeFn}>
            Cancel
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default LinkContextMenu;
