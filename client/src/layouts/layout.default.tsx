import { isValidElement } from 'react'
import './layout-default.scss'
import { IContents } from './layout.flat'

export const LayoutDefault = ({ children }: IContents) => {
  let headerElement
  let menuElement
  let contentElement
  let footerElement

  children?.forEach((child) => {
    if (isValidElement(child) && typeof child?.type === 'function') {
      switch (child.type.name) {
        case 'Header':
          headerElement = child
          break
        case 'Content':
          contentElement = child
          break
        case 'Footer':
          footerElement = child
          break
        case 'Menu':
          menuElement = child
          break
        default:
          break
      }
    }
  })

  return (
    <div className="layout-default">
      <div className="layout-header">{headerElement}</div>
      <div className="layout-menu">{menuElement}</div>
      <div className="layout-footer">{footerElement}</div>
      <div className="layout-content">{contentElement}</div>
    </div>
  )
}
