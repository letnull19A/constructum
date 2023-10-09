import { ReactNode, isValidElement } from 'react'
import './layout-flat.scss'

export interface IContents {
  children?: ReactNode[]
  header?: ReactNode
  content?: ReactNode
  menu?: ReactNode
  footer?: ReactNode
}

export const LayoutFlat = ({ children }: IContents) => {
  let headerElement
  let contentElement
  let footerElement

  children?.forEach((child) => {
    if (isValidElement(child) && typeof child?.type === 'function') {
      headerElement = children[0]
      contentElement = children[1]
      footerElement = children[2]
    }
  })

  return (
    <div className="layout-flat">
      <div className="layout-header">{headerElement}</div>
      <div className="layout-footer">{footerElement}</div>
      <div className="layout-content">{contentElement}</div>
    </div>
  )
}
