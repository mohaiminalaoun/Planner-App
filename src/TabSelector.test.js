import React from "react";
import { render } from "@testing-library/react";
import TabSelector from "./TabSelector";

describe("Tab Selector tests", () => {
  beforeAll(() => {
    const script = document.createElement("script");
    document.body.appendChild(script);
  });
  test("Renders without crashing", () => {
    render(<TabSelector />);
  });
});
