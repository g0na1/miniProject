// Per.test.js
import React from "react";
import { render, screen } from "@testing-library/react";
import Per from "./Per";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../store"; 

describe("Per Page", () => {
  it("renders at least one perfume after loading", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Per />
        </BrowserRouter>
      </Provider>
    );

    const perfumeName = screen.queryByText(/Rose|Jasmine|Perfume/i); 
    expect(perfumeName).toBeInTheDocument();
  });
});
