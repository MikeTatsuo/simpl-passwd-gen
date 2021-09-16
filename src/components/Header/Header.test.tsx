import { unmountComponentAtNode, render } from 'react-dom';
import { act } from 'react-dom/test-utils';

import Header from './Header';

import { HeaderMockup } from 'src/mockups';

const { title } = HeaderMockup;

let container: HTMLDivElement;

describe('Header.tsx', () => {
	beforeEach(() => {
		container = document.createElement('div');
		document.body.appendChild(container);
	});

	afterEach(() => {
		unmountComponentAtNode(container);
		container.remove();
	});

	describe('snapshot', () => {
		it('should match snapshot', () => {
			act(() => {
				render(<Header />, container);
			});

			expect(container).toMatchSnapshot();
		});
	});

	describe('data', () => {
		it('renders header title', () => {
			act(() => {
				render(<Header title={title} />, container);
			});

			expect(container.textContent).toMatch(title as string);
		});
	});
});
