import { datatype, lorem } from 'faker';

import { CheckboxProps } from "src/models";

export const CheckboxMockup: CheckboxProps = {
	checked: datatype.boolean(),
	label: lorem.word(),
	name: lorem.word(),
};
