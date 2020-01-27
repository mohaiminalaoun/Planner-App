import React from "react";
import withHOC from "./withContextMenu";
import "./DeleteContextMenu.scss";
import { Modal, Button } from "react-bootstrap";

const DeleteContextMenu = props => {
  const delteButtonStyle = {
    marginRight: "8px"
  };
  return (
    <div className="deleteContextMenu" style={props.divStyle}>
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
