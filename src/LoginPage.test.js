import React from "react";
import { render } from "@testing-library/react";
import LoginPage from "./LoginPage";

describe("Login Page tests", () => {
  beforeAll(() => {
    const script = document.createElement("script");
    document.body.appendChild(script);
  });
  test("Renders without crashing", () => {
    render(<LoginPage />);
  });
});
