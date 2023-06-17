import React from 'react'
import './Button.scss'

export interface IButtonProp {
  label?: string | JSX.Element
  onClick?: () => void
}

export class Button extends React.Component<IButtonProp> {
	render() {
		return (
			<button className="button" onClick={this.props.onClick}>
				{this.props.label}
			</button>
		)
	}
}
