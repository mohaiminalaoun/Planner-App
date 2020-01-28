import React from "react";

import MenuItems from "../MenuItems";
import LinkContextMenu from "./LinkContextMenu";
import LabelContextMenu from "./LabelContextMenu";
import DeleteContextMenu from "./DeleteContextMenu";
import TaskContextMenu from "./TaskContextMenu";

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
      changeFn,
      curDeadline,
      displayDeleteCtxMenu,
      displayLinkCtxMenu,
      displayLabelCtxMenu,
      linkCloseFn,
      saveFn,
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
            changeFn={changeFn}
            curDeadline={curDeadline}
            tempPosition={tempPosition}
          ></TaskContextMenu>
        ) : null}
        {displayLinkCtxMenu ? (
          <LinkContextMenu
            tempPosition={tempPosition}
            closeFn={linkCloseFn}
            saveFn={saveFn}
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
