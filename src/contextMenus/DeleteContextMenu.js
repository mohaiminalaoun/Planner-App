import React from "react";
import withHOC from "./withContextMenu";
import "./DeleteContextMenu.scss";
import { Modal, Button } from "react-bootstrap";

const DeleteContextMenu = props => {
  const delteButtonStyle = {
    marginRight: "8px"
  };

  let style = {};
  let isMobile = window.matchMedia("only screen and (max-width: 760px)")
    .matches;
  if (isMobile) {
    style.position = "absolute";
    style.bottom = "0px";
    style.left = "0px";
    style.top = "85%";
    style.width = "100%";
    style.border = "1px solid lightgrey";
    style.borderTopLeftRadius = "12px";
    style.borderTopRightRadius = "12px";
    style.boxShadow = "0px 0px 20px 5px rgba(0, 0, 0, .2)";
  }
  return (
    <div
      className="deleteContextMenu"
      style={isMobile ? style : props.divStyle}
    >
      <div>Are you sure you want to delete this task?</div>
      <Button
        style={delteButtonStyle}
        className="cancelDelete"
        variant="secondary"
        onClick={props.cancelDelete}
      >
        Cancel
      </Button>
      <Button variant="danger" onClick={() => props.deleteTask(props.tempTask)}>
        Delete task
      </Button>
    </div>
  );
};

export default withHOC(DeleteContextMenu);
