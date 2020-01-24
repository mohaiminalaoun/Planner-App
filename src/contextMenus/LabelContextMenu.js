import React from "react";
import "./LabelContextMenu.scss";
import PropTypes from "prop-types";
import withHOC from "./withContextMenu";
import { Form, Button, FormControl } from "react-bootstrap";

const LabelContextMenu = props => {
  // let divStyle = {
  //   left: props.tempPosition[0] + "px",
  //   top: props.tempPosition[1] + "px"
  // };
  return (
    <div className="labelContextMenu" style={props.divStyle}>
      <Form className="mb-3">
        <Form.Group controlId="formAddLabel">
          <FormControl
            placeholder="Label"
            aria-label="Add url"
            aria-describedby="basic-addon2"
            value={props.currentLabel}
            onChange={props.currentLabelChange}
          />
        </Form.Group>
        <div>
          <Button
            variant="primary"
            className="okContextMenuBtn"
            onClick={props.saveLabel}
          >
            Ok
          </Button>
          <Button variant="secondary" onClick={props.cancelSaveLabel}>
            Cancel
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default withHOC(LabelContextMenu);
