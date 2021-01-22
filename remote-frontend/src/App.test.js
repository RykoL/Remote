import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {

});

test("renders a burger button", () => {
  render(<App />);

  expect(screen.getByRole("button")).toBeInTheDocument();
})