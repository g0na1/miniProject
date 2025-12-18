import { render, screen } from "@testing-library/react";
import Cart from "./cart";
import { Provider } from "react-redux";
import store from "../store"; 
import { BrowserRouter } from "react-router-dom";

describe("Cart Component", () => {
  it("renders the cart title", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Cart />
        </BrowserRouter>
      </Provider>
    );

    const titleElement = screen.getByText(/your cart/i);
    expect(titleElement).toBeInTheDocument();
  });
});
