import React from "react";
import { render } from "@testing-library/react";
import Dashboard from "./Dashboard";

describe("Dashboard Page tests", () => {
  beforeAll(() => {
    const script = document.createElement("script");
    document.body.appendChild(script);
  });
  test("Renders without crashing", () => {
    render(<Dashboard tasks={[]} />);
  });
});
