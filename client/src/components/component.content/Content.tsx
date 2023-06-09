import { ReactNode } from 'react'
import './Content.scss'

export interface IContentProps {
  children?: ReactNode[] | ReactNode
  className?: string
}

export const Content = (props: IContentProps) => {
  return <div className={`content ${props.className}`}>{props.children}</div>
}
