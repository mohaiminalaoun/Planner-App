import React from "react";
import "./LinkContextMenu.scss";
import PropTypes from "prop-types";
import withHOC from "./withContextMenu";
import { Form, Button, FormControl } from "react-bootstrap";

const LinkContextMenu = props => {
  return (
    <div className="linkContextMenu" style={props.divStyle}>
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

LinkContextMenu.propTypes = {
  changeURLFn: PropTypes.func,
  currentURL: PropTypes.string,
  changeURLTextFn: PropTypes.func,
  currentURLText: PropTypes.string,
  saveFn: PropTypes.func,
  closeFn: PropTypes.func
};

export default withHOC(LinkContextMenu);
