import React from "react";
import { action } from "@storybook/addon-actions";
import LoginPage from "../LoginPage";
import "../LoginPage.scss";

export default {
  title: "LoginPage",
  component: LoginPage
};

export const LoginPageStory = () => (
  <LoginPage onClick={action("clicked")}>Hello Button</LoginPage>
);
