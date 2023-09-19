import React from 'react'
import './Button.scss'

export interface IButtonProp {
	type?: string
	outline?: boolean
	label?: string | JSX.Element
	style?: React.CSSProperties | undefined
	className?: string
	onClick?: () => void
}

export class Button extends React.Component<IButtonProp> {
	#type = this.props.type !== undefined ? 'type-' + {
		primary: 'primary',
		secondary: 'secondary',
		danger: 'danger',
		warning: 'warning',
		magic: 'magic',
		dummy: 'dummy'
	}[this.props.type] : ''

	#outline = this.props.outline ? 'outline-' + this.props.type : ''

	render() {
		return (
			<button
				style={this.props.style}
				className={this.#type + ' ' + this.#outline + ' button ' + this.props.className}
				onClick={this.props.onClick}
			>
				{this.props.label}
			</button>
		)
	}
}
