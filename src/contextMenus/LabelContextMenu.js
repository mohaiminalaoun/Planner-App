import React from "react";
import "./LabelContextMenu.scss";
import PropTypes from "prop-types";
import withHOC from "./withContextMenu";
import { useState } from "react";
import { Form, Button, FormControl } from "react-bootstrap";

const LabelContextMenu = props => {
  const badgeOptions = [
      "secondary",
      "success",
      "danger",
      "warning",
      "info",
      "light",
      "dark"
    ],
    badgesDiv = badgeOptions.map((item, idx) => (
      <div
        key={idx}
        className={
          "badgeOption " +
          item +
          (idx === props.selectedLabelIdx ? " clicked" : "")
        }
        onClick={() => {
          props.selectedLabelIdxChange(idx);
        }}
      ></div>
    ));
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
        <h6 className="badge-container-heading">Choose color</h6>
        <div className="badge-container">{badgesDiv}</div>
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
