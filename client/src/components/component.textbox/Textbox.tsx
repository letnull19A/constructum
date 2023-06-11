import React, { LegacyRef, MutableRefObject } from 'react'
import './Textbox.scss'

export interface ITextbox {
  type?: string
  placeholder?: string
  className?: string
  value?: string
  label?: string
  forwardRef?: LegacyRef<HTMLInputElement> | undefined | MutableRefObject<undefined>
  dangerText?: string
  isNotCorrect?: boolean
  onChange?: React.ChangeEventHandler<HTMLInputElement> | undefined
}

export class Textbox extends React.Component<ITextbox> {
  render() {
    return (
      <div className="textbox">
        <label className={`textbox-heading ${this.props.isNotCorrect ? 'danger-heading' : ''}`}>
          {this.props.label}
        </label>
        <input
          ref={this.props.forwardRef}
          type={this.props.type}
          placeholder={this.props.placeholder}
          value={this.props.value}
          className={`${this.props.className} ${this.props.isNotCorrect ? 'danger-input' : ''}`}
          onChange={this.props.onChange}
        />
        <span className={`textbox-help ${this.props.isNotCorrect ? 'danger-help' : ''}`}>{this.props.dangerText}</span>
      </div>
    )
  }
}
