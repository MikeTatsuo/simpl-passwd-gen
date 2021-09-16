import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';

import App from './App';

let container: HTMLDivElement;

describe('App.tsx', () => {
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
				render(<App />, container);
			});

			expect(container).toMatchSnapshot();
		});
	});
});
