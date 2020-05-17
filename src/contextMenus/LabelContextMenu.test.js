import React from "react";
import { render } from "@testing-library/react";

import LabelContextMenu from "./LabelContextMenu";

describe("LabelContextMenu Page tests", () => {
  beforeAll(() => {
    const script = document.createElement("script");
    document.body.appendChild(script);
    Object.defineProperty(window, "matchMedia", {
      value: jest.fn(() => {
        return {
          matches: true,
          addEventListener: jest.fn(),
          removeEventListener: jest.fn()
        };
      })
    });
  });
  test("Renders without crashing", () => {
    render(<LabelContextMenu labels={[]} tempPosition={[]} />);
  });
});
