import { Component } from 'react';

import { HeaderProps } from 'src/models';

import './Header.sass'

export default class Header extends Component<HeaderProps> {
	render() {
		return (
			<header className="header">
				<span className="header-title">{this.props.title ?? ''}</span>
			</header>
		);
	}
}
