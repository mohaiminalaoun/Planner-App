import React from "react";
import { render } from "@testing-library/react";
import CalendarContextMenu from "./CalendarContextMenu";

describe("CalendarContextMenu Page tests", () => {
  beforeAll(() => {
    const script = document.createElement("script");
    document.body.appendChild(script);
  });
  test("Renders without crashing", () => {
    render(<CalendarContextMenu tasks={[]} />);
  });
});
