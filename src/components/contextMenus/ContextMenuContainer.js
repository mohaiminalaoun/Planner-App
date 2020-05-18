import React from "react";

import MenuItems from "../../MenuItems";
import LinkContextMenu from "./LinkContextMenu";
import LabelContextMenu from "./LabelContextMenu";
import DeleteContextMenu from "./DeleteContextMenu";
import DeadlineContextMenu from "./DeadlineContextMenu";
import CalendarContextMenu from "./CalendarContextMenu";

class ContextMenuContainer extends React.Component {
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
      currentCalendarDate,
      displayDeleteCtxMenu,
      displayLinkCtxMenu,
      displayLabelCtxMenu,
      displayCalendarCtxMenu,
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
          <DeadlineContextMenu
            closeFn={endTimeCloseFn}
            changeFn={changeFn}
            curDeadline={curDeadline}
            tempPosition={tempPosition}
          ></DeadlineContextMenu>
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
        {displayCalendarCtxMenu ? (
          <CalendarContextMenu
            currentCalendarDate={currentCalendarDate}
            addTaskToDate={this.props.addTaskToDate}
            hideCalendarContextMenu={this.props.hideCalendarContextMenu}
          />
        ) : null}
      </>
    );
  }
}

export default ContextMenuContainer;
