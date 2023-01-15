import '@testing-library/jest-dom';
import ExchangeBox from './ExchangeBox';
import { render, screen } from '@testing-library/react';

test('renders ExchangeBox', () => {
    render(<ExchangeBox apiKey={''} baseUrl={''} />);
    const linkElement = screen.queryByText('Convert');
    expect(linkElement).toBeInTheDocument();
});
