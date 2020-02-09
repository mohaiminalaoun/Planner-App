import React from "react";
import { Button, InputGroup, FormControl, Badge } from "react-bootstrap";
import { useState } from "react";
import "./CalendarContextMenu.scss";

const CalendarContextMenu = props => {
  const [curTask, setCurTask] = useState("");

  let callAddTaskFn = () => {
    if (curTask.length > 0) {
      props.addTaskToDate(curTask, props.currentCalendarDate);
      props.hideCalendarContextMenu();
    }
  };

  let close = () => {
    props.hideCalendarContextMenu();
  };
  return (
    <div className="calendarCtxMenu">
      <InputGroup className="mb-3">
        <FormControl
          value={curTask}
          onChange={event => setCurTask(event.target.value)}
          placeholder="Add task"
          aria-label="Add task"
        />
        <InputGroup.Append>
          <Button className="addBtn" value={curTask} onClick={callAddTaskFn}>
            Add
          </Button>
          <Button
            className="cancelBtn"
            variant="secondary"
            value={curTask}
            onClick={close}
          >
            Cancel
          </Button>
        </InputGroup.Append>
      </InputGroup>
      <Badge>{props.currentCalendarDate}</Badge>
    </div>
  );
};

export default CalendarContextMenu;
