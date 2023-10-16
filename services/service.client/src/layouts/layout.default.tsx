import { isValidElement } from 'react'
import './layout-default.scss'
import { IContents } from './layout.flat'
import { Content, Footer, Header, Menu } from '../components'

export const LayoutDefault = ({ children }: IContents) => {
  let headerElement
  let menuElement
  let contentElement
  let footerElement

  children?.forEach((child) => {
    if (isValidElement(child) && typeof child?.type === 'function') {
      switch (child.type.name) {
        case Header.name:
          headerElement = child
          break
        case Content.name:
          contentElement = child
          break
        case Footer.name:
          footerElement = child
          break
        case Menu.name:
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
