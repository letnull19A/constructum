import React, { LegacyRef } from 'react'
import './Textbox.scss'

export interface ITextbox {
  type?: string
  placeholder?: string
  className?: string
  value?: string
  label?: string
  disabled?: boolean
  forwardref?: LegacyRef<HTMLInputElement>
  dangerText?: string
  isNotCorrect?: boolean
  onChange?: React.ChangeEventHandler<HTMLInputElement> | undefined
}

export class Textbox extends React.Component<ITextbox> {
  render() {
    return (
      <div className="textbox">
        <label
          className={`textbox-heading ${this.props.isNotCorrect ? 'danger-heading' : ''} ${
            this.props.disabled ? 'disabled' : ''
          }`}
        >
          {this.props.label}
        </label>
        <input
          ref={this.props.forwardref}
          disabled={this.props.disabled}
          autoComplete="off"
          type={this.props.type}
          placeholder={this.props.placeholder}
          value={this.props.value}
          className={`
            ${this.props.className} 
            ${this.props.isNotCorrect ? 'danger-input' : ''}
            ${this.props.disabled ? 'disabled' : ''}`}
          onChange={this.props.onChange}
        />
        <span
          className={`
          textbox-help ${this.props.isNotCorrect ? 'danger-help' : ''}
          ${this.props.disabled ? 'disabled' : ''}`}
        >
          {this.props.dangerText}
        </span>
      </div>
    )
  }
}
