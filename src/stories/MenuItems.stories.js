import React from "react";
import { action } from "@storybook/addon-actions";
import MenuItems from "../MenuItems";
import "../MenuItems.scss";
import "bootstrap/dist/css/bootstrap.min.css";

export default {
  title: "MenuItems",
  component: MenuItems
};

let menuOptionsList = [
  {
    text: "Close",
    onClick: () => {
      this.setState({
        displayAllContextMenus: false,
        displayCurtain: false
      });
    }
  },
  {
    text: "Add deadline",
    onClick: () => {
      this.setState({
        displayAllContextMenus: false,
        displayTaskCtxMenu: true,
        displayCurtain: false
      });
    }
  },
  {
    text: "Add link",
    onClick: () => {
      this.setState({
        displayAllContextMenus: false,
        displayLinkCtxMenu: true,
        displayCurtain: false
      });
    }
  },
  {
    text: "Add Label",
    onClick: () => {
      let curLabel = "";
      this.state.tasks.forEach(task => {
        if (task.task === this.state.tempTask) {
          curLabel = task.label;
        }
      });
      this.setState({
        displayAllContextMenus: false,
        displayLabelCtxMenu: true,
        currentLabel: curLabel,
        displayCurtain: false
      });
    }
  },
  {
    text: "Delete",
    onClick: e => {
      this.showDeleteContextMenu(e);
    }
  }
];

export const MenuItemsStory = () => (
  <MenuItems
    menuOptionsList={menuOptionsList}
    tempPosition={[0, 0]}
    Click={action("clicked")}
  >
    Hello Button
  </MenuItems>
);
