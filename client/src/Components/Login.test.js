import { render, screen } from "@testing-library/react";
import Login from "./Login";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../../store"; 

describe("Login Component", () => {
  const renderLogin = () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      </Provider>
    );
  };

  it("renders email input", () => {
    renderLogin();
    const emailInput = screen.getByPlaceholderText("Email");
    expect(emailInput).toBeInTheDocument();
  });
});
