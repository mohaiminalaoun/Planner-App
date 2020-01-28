import React from "react";
import TaskContextMenu from "./TaskContextMenu";
import MenuItems from "../MenuItems";
import LinkContextMenu from "./LinkContextMenu";
import LabelContextMenu from "./LabelContextMenu";
import DeleteContextMenu from "./DeleteContextMenu";

class ContextMenuContainer extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    let {
      displayAllContextMenus,
      tempPosition,
      menuOptionsList,
      displaySortingOptionsMenu,
      displayTaskCtxMenu,
      endTimeCloseFn,
      deadlineChangeFn,
      curDeadline,
      displayDeleteCtxMenu,
      displayLinkCtxMenu,
      displayLabelCtxMenu,
      linkCloseFn,
      saveLinkFn,
      currentURL,
      currentURLText,
      changeURLTextFn,
      changeURLFn,
      saveLabel,
      currentLabel,
      cancelSaveLabel,
      tempTask,
      currentLabelChange,
      selectedLabelIdx,
      selectedLabelIdxChange,
      labels,
      currentLabelChangeByClick,
      deleteTask,
      cancelDelete
    } = this.props;
    return (
      <>
        {displayAllContextMenus ? (
          <MenuItems
            tempPosition={tempPosition}
            menuOptionsList={menuOptionsList}
          ></MenuItems>
        ) : null}
        {displaySortingOptionsMenu ? (
          <MenuItems
            tempPosition={tempPosition}
            menuOptionsList={menuOptionsList}
          ></MenuItems>
        ) : null}
        {displayTaskCtxMenu ? (
          <TaskContextMenu
            closeFn={endTimeCloseFn}
            changeFn={deadlineChangeFn}
            curDeadline={curDeadline}
            tempPosition={tempPosition}
          ></TaskContextMenu>
        ) : null}
        {displayLinkCtxMenu ? (
          <LinkContextMenu
            tempPosition={tempPosition}
            closeFn={linkCloseFn}
            saveFn={saveLinkFn}
            currentURL={currentURL}
            currentURLText={currentURLText}
            changeURLTextFn={changeURLTextFn}
            changeURLFn={changeURLFn}
          ></LinkContextMenu>
        ) : null}
        {displayLabelCtxMenu ? (
          <LabelContextMenu
            tempPosition={tempPosition}
            saveLabel={saveLabel}
            currentLabel={currentLabel}
            cancelSaveLabel={cancelSaveLabel}
            tempTask={tempTask}
            currentLabelChange={currentLabelChange}
            selectedLabelIdx={selectedLabelIdx}
            selectedLabelIdxChange={selectedLabelIdxChange}
            labels={labels}
            currentLabelChangeByClick={currentLabelChangeByClick}
          />
        ) : null}
        {displayDeleteCtxMenu ? (
          <DeleteContextMenu
            tempPosition={tempPosition}
            tempTask={tempTask}
            deleteTask={deleteTask}
            cancelDelete={cancelDelete}
          />
        ) : null}
      </>
    );
  }
}

export default ContextMenuContainer;
