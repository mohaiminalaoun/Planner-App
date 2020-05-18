import React, { useState, useEffect } from "react";
import "./DeadlineContextMenu.scss";
import PropTypes from "prop-types";
import withHOC from "./withContextMenu";
import { Button, InputGroup, FormControl } from "react-bootstrap";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

const DeadlineContextMenu = props => {
  const [startDate, setStartDate] = useState(new Date());
  let style = {};
  let isMobile = window.matchMedia("only screen and (max-width: 760px)")
    .matches;
  if (isMobile) {
    style.position = "absolute";
    style.border = "1px solid lightgrey";
    style.borderTopLeftRadius = "10px";
    style.borderTopRightRadius = "10px";
    style.width = "100%";
    style.bottom = "0px";
    style.left = "0px";
    style.height = "100px";
    style.boxShadow = "0px 0px 20px 5px rgba(0, 0, 0, .2)";
  }

  useEffect(() => {
    if (isMobile) {
      const datePickers = document.getElementsByClassName(
        "react-datepicker__input-container"
      );
      Array.from(datePickers).forEach(el =>
        el.childNodes[0].setAttribute("readOnly", true)
      );
    }
  });
  return (
    <>
      <div
        className="taskContextMenu"
        style={isMobile ? style : props.divStyle}
      >
        <DatePicker
          selected={startDate}
          onChange={date => {
            setStartDate(date);
            props.changeFn(date.toString());
          }}
          showTimeSelect
          timeFormat="HH:mm"
          timeIntervals={15}
          timeCaption="time"
          dateFormat="MMMM d, yyyy h:mm aa"
        />
        <span className="deadlont-text">Select a deadline for the task</span>

        {/*  <InputGroup className="mb-3">
          <FormControl
            onChange={props.changeFn}
            value={props.curDeadline}
            placeholder="Hours"
            aria-label="Add deadline to task"
            aria-describedby="basic-addon2"
          />
        </InputGroup> */}
        {
          <InputGroup.Append>
            <Button
              className="deadline-close-btn"
              onClick={props.closeFn}
              variant="secondary"
            >
              Cancel
            </Button>
            <Button
              className="deadline-ok-btn"
              onClick={() => {
                props.changeFn(startDate);
                props.closeFn();
                console.log(startDate);
              }}
              variant="primary"
            >
              Okay
            </Button>
          </InputGroup.Append>
        }
      </div>
    </>
  );
};

DeadlineContextMenu.propTypes = {
  changeFn: PropTypes.func,
  tempPosition: PropTypes.array,
  closeFn: PropTypes.func
};

export default withHOC(DeadlineContextMenu);
