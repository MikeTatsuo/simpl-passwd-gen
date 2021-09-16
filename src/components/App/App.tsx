import { Component } from 'react';

import Header from 'src/components/Header/Header';
import Card from 'src/components/Card/Card';

import { EnvConfig } from 'src/config';

import { CardFactoryTypes } from 'src/models';

import './App.sass';

const { title } = EnvConfig;
const { PASSWDGEN } = CardFactoryTypes;

export default class App extends Component {
	render() {
		return (
			<div className="App">
				<Header title={title} />
				<Card type={PASSWDGEN} />
			</div>
		);
	}
}
