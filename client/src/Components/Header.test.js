import { screen, render } from '@testing-library/react';
import Header from './Header';
import { BrowserRouter } from 'react-router-dom';

describe("Header Component", () => {
  it("renders user profile image", () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );
    const element = screen.getByAltText("User Profile");
    expect(element).toBeInTheDocument();
  });
});
it("renders nav links", () => {
  render(
    <BrowserRouter>
      <Header />
    </BrowserRouter>
  );
  expect(screen.getByText(/Perfumes/i)).toBeInTheDocument();
  expect(screen.getByText(/Creams/i)).toBeInTheDocument();
  expect(screen.getByText(/Incense/i)).toBeInTheDocument();
});