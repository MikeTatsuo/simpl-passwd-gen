import { Component, SyntheticEvent } from 'react';

import Checkbox from 'src/components/Checkbox/Checkbox';

import { CheckboxProps } from 'src/models';

import { PasswdGenService } from 'src/services';

const passwdGenService = new PasswdGenService();

const intialState = {
	result: '',
	min: 6,
	max: 12,
	L: true,
	U: true,
	N: true,
	S: true,
	range: ['L', 'U', 'N', 'S'],
};

interface ReadonlyGenericType {
	[key: string]: boolean;
}

export default class PasswdGen extends Component<{}> {
	checkboxesData: CheckboxProps[];

	constructor(props: {}) {
		super(props);
		this.state = intialState;

		this.checkboxesData = [
			{
				label: 'Lower case',
				name: 'L',
			},
			{
				label: 'Upper case',
				name: 'U',
			},
			{
				label: 'Number',
				name: 'N',
			},
			{
				label: 'Special Characters',
				name: 'S',
			},
		];

		this.generatePasswd = this.generatePasswd.bind(this);
		this.clearPasswd = this.clearPasswd.bind(this);
		this.setMin = this.setMin.bind(this);
		this.setMax = this.setMax.bind(this);
		this.setRange = this.setRange.bind(this);
	}

	setMin(e: SyntheticEvent) {
		this.setState((PrevState: Readonly<{ min: number; max: number }>) => ({
			min: Number((e.target as HTMLInputElement).value),
			max:
				PrevState.max < Number((e.target as HTMLInputElement).value)
					? Number((e.target as HTMLInputElement).value)
					: PrevState.max,
		}));
	}

	setMax(e: SyntheticEvent) {
		this.setState((PrevState: Readonly<{ min: number; max: number }>) => ({
			max: Number((e.target as HTMLInputElement).value),
			min:
				PrevState.min > Number((e.target as HTMLInputElement).value)
					? Number((e.target as HTMLInputElement).value)
					: PrevState.min,
		}));
	}

	setRange(value: boolean, name: string) {
		this.setState(
			(
				PrevState: Readonly<{
					range: string[];
					L: boolean;
					U: boolean;
					N: boolean;
					S: boolean;
				}>
			) => ({
				range: value
					? [...PrevState.range, name]
					: PrevState.range.filter((item: string) => item !== name),
				[name]: value,
			})
		);
	}

	clearPasswd() {
		this.setState(intialState);
	}

	generatePasswd() {
		this.setState(
			({
				min,
				max,
				range,
			}: Readonly<{ min: number; max: number; range: string[] }>) => ({
				result: passwdGenService.generate(min, max, range),
			})
		);
	}

	render() {
		const checkboxes = this.checkboxesData.map(
			(data: CheckboxProps, index: number) => (
				<Checkbox
					key={index}
					checked={
						(this.state as Readonly<ReadonlyGenericType>)[data.name as string]
					}
					label={data.label}
					name={data.name}
					onCheckChange={this.setRange}
				/>
			)
		);

		return (
			<section className="passwd-gen">
				<p className="passwd-gen__title">Password:</p>
				<p className="passwd-gen__result">
					{(this.state as Readonly<{ result: string }>).result}
				</p>
				<section className="passwd-gen__options-container">
					<p className="passwd-gen__subtitle">Options:</p>
					<label htmlFor="passwd-gen__min-char">Minimum Characters</label>
					<input
						className="passwd-gen__min-char"
						type="number"
						min={0}
						max={100}
						value={(this.state as Readonly<{ min: number }>).min}
						onChange={this.setMin}
					/>
					<label htmlFor="passwd-gen__max-char">Maximum Characters</label>
					<input
						className="passwd-gen__max-char"
						type="number"
						min={0}
						max={100}
						value={(this.state as Readonly<{ max: number }>).max}
						onChange={this.setMax}
					/>
					{checkboxes}
				</section>
				<section className="passwd-gen__action-container">
					<button onClick={this.clearPasswd}>Clear</button>
					<button onClick={this.generatePasswd}>Generate</button>
				</section>
			</section>
		);
	}
}
