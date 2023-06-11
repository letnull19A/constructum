import { isValidElement } from 'react'
import './Card.scss'

export interface ICardProps {
  children?: JSX.Element[]
  className?: string
}

export const Card = (props: ICardProps) => {
  let cardTitle
  let cardImage
  let cardContent
  let cardFooter

  props.children?.forEach((child) => {
    if (isValidElement(child) && typeof child?.type === 'function') {
      switch (child.type.name) {
        case 'CardHead':
          cardTitle = child
          break
        case 'CardImage':
          cardImage = child
          break
        case 'CardContent':
          cardContent = child
          break
        case 'CardFooter':
          cardFooter = child
          break
        default:
          break
      }
    }
  })
  return (
    <div className={`card ${props.className}`}>
      <div className="card-image">{cardImage}</div>
      <div className="card-title">{cardTitle}</div>
      <div className="card-content">{cardContent}</div>
      <div className="card-footer">{cardFooter}</div>
    </div>
  )
}

export const CardHead = (props: ICardProps) => {
  return <div className={`card-head ${props.className}`}>{props.children}</div>
}

export const CardImage = (props: ICardProps) => {
  return <div className={`card-image ${props.className}`}>{props.children}</div>
}

export const CardContent = (props: ICardProps) => {
  return <div className={`card-content ${props.className}`}>{props.children}</div>
}

export const CardFooter = (props: ICardProps) => {
  return <div className={`card-footer ${props.className}`}>{props.children}</div>
}
