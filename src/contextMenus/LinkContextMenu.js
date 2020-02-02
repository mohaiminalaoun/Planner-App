import React from "react";
import "./LinkContextMenu.scss";
import PropTypes from "prop-types";
import withHOC from "./withContextMenu";
import { Form, Button, FormControl } from "react-bootstrap";

const LinkContextMenu = props => {
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

  return (
    <div className="linkContextMenu" style={isMobile ? style : props.divStyle}>
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
          <Button
            variant="primary"
            className="okContextMenuBtn"
            onClick={props.saveFn}
          >
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

LinkContextMenu.propTypes = {
  changeURLFn: PropTypes.func,
  currentURL: PropTypes.string,
  changeURLTextFn: PropTypes.func,
  currentURLText: PropTypes.string,
  saveFn: PropTypes.func,
  closeFn: PropTypes.func
};

export default withHOC(LinkContextMenu);
