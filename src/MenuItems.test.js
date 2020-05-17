import React from "react";
import { render } from "@testing-library/react";
import MenuItems from "./MenuItems";

describe("Menu Items tests", () => {
  beforeAll(() => {
    const script = document.createElement("script");
    document.body.appendChild(script);
  });
  test("Renders without crashing", () => {
    render(<MenuItems menuOptionsList={[]} tempPosition={[]} />);
  });
});
