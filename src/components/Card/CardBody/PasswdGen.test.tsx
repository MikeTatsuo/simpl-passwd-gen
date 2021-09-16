import { act } from '@testing-library/react';
import { unmountComponentAtNode, render } from 'react-dom';

import PasswdGen from './PasswdGen';

let container: HTMLDivElement;
describe('PasswdGen.tsx', () => {
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
				render(<PasswdGen />, container);
			});

			expect(container).toMatchSnapshot();
		});
	});
});
