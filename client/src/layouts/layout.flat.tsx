import { ReactNode } from 'react'
import './layout-flat.scss'

interface IContents {
  header: ReactNode
  content: ReactNode
  footer: ReactNode
}

export const LayoutFlat = ({ header, content, footer }: IContents) => {
  return (
    <div className="layout-flat">
      <div className="layout-header">{header}</div>
      <div className="layout-footer">{footer}</div>
      <div className="layout-content">{content}</div>
    </div>
  )
}
