import { render, screen } from '@testing-library/react';
import App from './App';
import '@testing-library/jest-dom';

test('renders APP', () => {
  render(<App />);
  const linkElement = screen.queryByText('Convert');
  expect(linkElement).toBeInTheDocument();
});
