import { Component } from 'react';

import PasswdGen from './CardBody/PasswdGen';

import { CardProps } from 'src/models';

import './Card.sass';

const typeToBody = {
	PASSWDGEN: <PasswdGen />,
};

export default class Card extends Component<CardProps> {
	render() {
		return <section className="card">{typeToBody[this.props.type]}</section>;
	}
}
