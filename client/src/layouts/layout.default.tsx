import { ReactNode } from 'react'
import './layout-default.scss'

interface IContents {
  header: ReactNode
  menu: ReactNode
  content: ReactNode
  footer: ReactNode
}

export const LayoutDefault = ({ header, menu, content, footer }: IContents) => {
  return (
    <div className="layout-default">
      <div className="layout-header">{header}</div>
      <div className="layout-menu">{menu}</div>
      <div className="layout-footer">{footer}</div>
      <div className="layout-content">{content}</div>
    </div>
  )
}
