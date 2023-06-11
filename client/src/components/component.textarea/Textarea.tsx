import React, { LegacyRef } from 'react'
import './Textarea.scss'

export interface ITextarea {
  type?: string
  placeholder?: string
  className?: string
  value?: string
  label?: string
  disabled?: boolean
  forwardRef?: LegacyRef<HTMLInputElement>
  dangerText?: string
  isNotCorrect?: boolean
  onChange?: React.ChangeEventHandler<HTMLInputElement> | undefined
}

export class Textarea extends React.Component<ITextarea> {
  render() {
    return (
      <div className="textarea">
        <label
          className={`textarea-heading ${this.props.isNotCorrect ? 'danger-heading' : ''} ${
            this.props.disabled ? 'disabled' : ''
          }`}
        >
          {this.props.label}
        </label>
        <textarea
          contentEditable
          forwardRef={this.props.forwardRef}
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
          textarea-help ${this.props.isNotCorrect ? 'danger-help' : ''}
          ${this.props.disabled ? 'disabled' : ''}`}
        >
          {this.props.dangerText}
        </span>
      </div>
    )
  }
}
