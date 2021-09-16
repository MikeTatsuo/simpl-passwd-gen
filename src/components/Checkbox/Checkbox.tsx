import { Component, SyntheticEvent } from 'react';

import { CheckboxProps } from 'src/models';

export default class Checkbox extends Component<CheckboxProps> {
	constructor(props: CheckboxProps) {
		super(props);

		this.checkChange = this.checkChange.bind(this);
	}

	checkChange(e: SyntheticEvent) {
		(this.props.onCheckChange as (value: boolean, name: string) => void)(
			(e.target as HTMLInputElement).checked,
			this.props.name ?? ''
		);
	}

	render() {
		return (
			<div className="checkbox">
				<input
					className="checkbox__input"
					type="checkbox"
					name={this.props.name ?? ''}
					checked={this.props.checked ?? false}
					onChange={this.checkChange}
				/>
				<label htmlFor="checkbox__label">{this.props.label ?? ''}</label>
			</div>
		);
	}
}
