import { ReactNode, isValidElement } from 'react'
import './layout-flat.scss'

interface IContents {
  children?: ReactNode[]
  header?: ReactNode
  content?: ReactNode
  footer?: ReactNode
}

export const LayoutFlat = ({ children }: IContents) => {
  let headerElement
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
        default:
          break
      }
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
