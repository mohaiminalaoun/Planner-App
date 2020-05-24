import React from "react";
import { Badge, ListGroup, ProgressBar } from "react-bootstrap";
import dragIcon from "../../assets/drag.svg";
import Moment from "moment";
import eventIcon from "../../assets/event.svg";

const TaskListGroup = ({
  currentDraggingTask,
  onDragEnd,
  openTaskModal,
  progressClick,
  shouldShowColors,
  showDeadlineContextMenu,
  showDeleteContextMenu,
  startDrag,
  stopDrag,
  initializeDrag,
  tasks
}) => {
  let listId = 0;
  const badgeOptions = [
    "secondary",
    "success",
    "danger",
    "warning",
    "info",
    "light",
    "dark"
  ];
  return (
    <ListGroup className="listOfTasksContainer">
      {tasks.map(task => {
        return (
          <ListGroup.Item
            key={listId++}
            onDrop={() => {
              stopDrag(task.task);
            }}
            onDragOver={e => {
              e.preventDefault();
            }}
            className={
              currentDraggingTask && currentDraggingTask.task === task.task
                ? "blur"
                : ""
            }
          >
            {shouldShowColors ? (
              <div className={"color-status " + task.progressState}></div>
            ) : null}
            <img
              className="dragIcon"
              value={task.task}
              src={dragIcon}
              draggable
              onDragStart={initializeDrag}
              onDrag={startDrag}
              onDragEnd={onDragEnd}
            ></img>
            <div
              className="task-title"
              value={task.task}
              onClick={openTaskModal}
            >
              <span className="details-icon">Details</span>
              {task.task}
            </div>
            {task.end ? (
              <>
                <img className="calendar-icon" src={eventIcon} />
                <div className="endTime">{Moment(task.end).format("LLLL")}</div>
              </>
            ) : null}

            {/*<button
              onClick={showDeleteContextMenu}
              value={task.task}
              className="menuItembutton"
            />*/}
            <div className="list-link">
              <a href={"https://" + task.url} target="_blank">
                {task.urlText}
              </a>
            </div>

            <button
              onClick={showDeadlineContextMenu}
              value={task.task}
              className="menuLinkbutton"
            />
            {!task.label ? null : (
              <Badge
                className="genericLabel"
                variant={badgeOptions[task.selectedLabelIdx]}
              >
                {task.label}
              </Badge>
            )}
            <ProgressBar
              striped
              onClick={progressClick}
              value={task.task}
              now={!task.progressPercent ? 10 : task.progressPercent}
            />
          </ListGroup.Item>
        );
      })}
    </ListGroup>
  );
};

export default TaskListGroup;
