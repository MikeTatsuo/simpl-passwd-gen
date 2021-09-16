import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';

import Card from './Card';

import { CardFactoryTypes } from 'src/models';

const { PASSWDGEN } = CardFactoryTypes;

let container: HTMLDivElement

describe('Card.tsx', () => {
	beforeEach(() => {
		container = document.createElement('div');
		document.body.appendChild(container);
	})

	afterEach(() => {
		unmountComponentAtNode(container);
		container.remove();
	})

	describe('snapshot', () => {
		it('should match snapshot', () => {
			act(() => {
				render(<Card type={PASSWDGEN} />, container);
			})

			expect(container).toMatchSnapshot();
		});
	})
});
