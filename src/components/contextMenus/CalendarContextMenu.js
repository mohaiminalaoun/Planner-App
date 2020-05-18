import React from "react";
import Moment from "moment";
import { Button, InputGroup, FormControl, Badge } from "react-bootstrap";
import eventIcon from "../../assets/event.svg";
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

  let curDate = Moment(props.currentCalendarDate);
  let formattedCurDate = curDate._d
    .toString()
    .split(" ")
    .slice(0, 4)
    .join(" ");

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
      <img className="calendar-icon" src={eventIcon} />
      <Badge>{formattedCurDate}</Badge>
    </div>
  );
};

export default CalendarContextMenu;
