import { render, screen } from '@testing-library/react';
import { Home } from './Home';

describe('Home component', () => {
	test('renders "find the book" as a text', () => {
		render(<Home />);

		const findBook = screen.getByText('find the book');
		expect(findBook).toBeInTheDocument();
	});
});
