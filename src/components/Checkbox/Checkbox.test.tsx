import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';

import Checkbox from 'src/components/Checkbox/Checkbox';

import { CheckboxMockup } from 'src/mockups';

const { label, name, checked } = CheckboxMockup;
let container: HTMLDivElement;

describe('Checkbox.tsx', () => {
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
				render(<Checkbox label="label" name="name" />, container);
			});

			expect(container).toMatchSnapshot();
		});
	});

	describe('data', () => {
		it('should display label', () => {
			act(() => {
				render(<Checkbox label={label} />, container);
			});

			expect(container.textContent).toMatch(label as string);
		});

		it('should render name', () => {
			act(() => {
				render(<Checkbox name={name} />, container);
			});

			expect(container.querySelector('input')?.getAttribute('name')).toMatch(
				name as string
			);
		});

		it('should not be checked', () => {
			act(() => {
				render(<Checkbox checked={false} />, container);
			});

			expect(container.querySelector('input')).not.toBeChecked();
		});

		it('should be checked', () => {
			act(() => {
				render(<Checkbox checked={true} />, container);
			});

			expect(container.querySelector('input')).toBeChecked();
		});
	});

	describe('onChange', () => {
		it('should dispatch onCheckChange event', () => {
			const onCheck = jest.fn();

			act(() => {
				render(
					<Checkbox
						label={label}
						name={name}
						checked={checked}
						onCheckChange={onCheck}
					/>,
					container
				);
			});

			const input = container.querySelector('input');
			act(() => {
				input?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
			});

			expect(onCheck).toHaveBeenCalled();
			expect(onCheck).toHaveBeenCalledTimes(1);
			expect(onCheck).toHaveBeenCalledWith(!checked, name);
		});
	});
});
