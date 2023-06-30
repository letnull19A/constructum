import React from 'react'
import './Button.scss'

export interface IButtonProp {
	label?: string | JSX.Element
	style?: React.CSSProperties | undefined
	onClick?: () => void
}

export class Button extends React.Component<IButtonProp> {
	render() {
		return (
			<button style={this.props.style} className="button" onClick={this.props.onClick}>
				{this.props.label}
			</button>
		)
	}
}
