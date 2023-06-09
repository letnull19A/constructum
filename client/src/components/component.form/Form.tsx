import { ReactNode } from 'react'
import './Form.scss'

export interface IFormProps {
  className?: string
  children?: ReactNode
  formTitle?: string
}

export const Form = (prop: IFormProps) => {
  return (
    <div className={`form ${prop.className}`}>
      <h1>{prop.formTitle}</h1>
      {prop.children}
    </div>
  )
}
