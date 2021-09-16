export interface CheckboxProps {
	checked?: boolean;
	label?: string;
	name?: string;
	onCheckChange?: (value: boolean, name: string) => void;
}