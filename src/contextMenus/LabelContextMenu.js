import React from "react";
import "./LabelContextMenu.scss";
import PropTypes from "prop-types";
import withHOC from "./withContextMenu";
import { createMenu } from "floating-options-menu";
import { useState } from "react";
import { Form, Button, FormControl, Badge } from "react-bootstrap";

const LabelContextMenu = props => {
  let style = {};
  let isMobile = window.matchMedia("only screen and (max-width: 760px)")
    .matches;
  if (isMobile) {
    style.position = "absolute";
    style.bottom = "0px";
    style.left = "0px";
    style.top = "70%";
    style.width = "100%";
    style.border = "1px solid lightgrey";
    style.borderTopLeftRadius = "12px";
    style.borderTopRightRadius = "12px";
    style.boxShadow = "0px 0px 20px 5px rgba(0, 0, 0, .2)";
  }
  const badgeOptions = [
      "secondary",
      "success",
      "danger",
      "warning",
      "info",
      "light",
      "dark"
    ],
    getBadgeMenuItems = (id) => [
      {text: "Grey", fn: () => props.selectedLabelIdxChange(0), classes: id === 0 ? 'selected': ''},
      {text: "Green", fn: () => props.selectedLabelIdxChange(1), classes: id === 1 ? 'selected': ''},
      {text: "Red", fn: () => props.selectedLabelIdxChange(2), classes: id === 2 ? 'selected': ''},
      {text: "Yellow", fn: () => props.selectedLabelIdxChange(3), classes: id === 3 ? 'selected': ''},
      {text: "Blue", fn: () => props.selectedLabelIdxChange(4), classes: id === 4 ? 'selected': ''},
      {text: "White", fn: () => props.selectedLabelIdxChange(5), classes: id === 5 ? 'selected': ''}
    ],
    prevUsedLabels = [];
  props.labels.forEach(label => {
    prevUsedLabels.push(label);
  });

  const clickPrevUsedLabel = ev => {
    props.currentLabelChangeByClick(ev.currentTarget.getAttribute("value"));
  };
  let id = -1;
  const prevUsedLabelsDisplay = prevUsedLabels.map(label => {
    id++;
    return (
      <Badge
        key={id}
        className="prevUsedLabel"
        variant="warning"
        onClick={clickPrevUsedLabel}
        value={label}
      >
        {label}
      </Badge>
    );
  });
  return (
    <div className="labelContextMenu" style={isMobile ? style : props.divStyle}>
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
        <h6 className="badge-container-heading" onClick={(evt)=>{
          createMenu(evt, getBadgeMenuItems(props.selectedLabelIdx), null)
        }}>Choose color</h6>
        <div className="prevBadgeContainer">{prevUsedLabelsDisplay} </div>
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
