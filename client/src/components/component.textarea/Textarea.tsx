import React, { LegacyRef } from 'react'
import './Textarea.scss'

export interface ITextarea {
  placeholder?: string
  className?: string
  value?: string
  label?: string
  disabled?: boolean
  forwardref?: LegacyRef<HTMLTextAreaElement>
  dangerText?: string
  isNotCorrect?: boolean
  onChange?: React.ChangeEventHandler<HTMLTextAreaElement> | undefined
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
          ref={this.props.forwardref}
          disabled={this.props.disabled}
          autoComplete="off"
          placeholder={this.props.placeholder}
          value={this.props.value}
          className={`
            ${this.props.className} 
            ${this.props.isNotCorrect ? ' danger-input ' : ''}
            ${this.props.disabled ? ' disabled ' : ''}`}
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
