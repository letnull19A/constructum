import { isValidElement } from 'react'
import './layout-explorer.scss'
import { IContents } from './layout.flat'

export const LayoutExplorer = ({ children }: IContents) => {
  let headerElement
  let menuElement
  let contentElement

  children?.forEach((child) => {
    if (isValidElement(child) && typeof child?.type === 'function') {
      switch (child.type.name) {
        case 'Header':
          headerElement = child
          break
        case 'Content':
          contentElement = child
          break
        case 'ExplorerHierarhy':
          menuElement = child
          break
        default:
          break
      }
    }
  })

  return (
    <div className="layout-explorer">
      <div className="layout-header">{headerElement}</div>
      <div className="layout-menu">{menuElement}</div>
      <div className="layout-content">{contentElement}</div>
    </div>
  )
}