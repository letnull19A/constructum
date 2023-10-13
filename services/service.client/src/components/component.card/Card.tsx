import { isValidElement } from 'react'
import './Card.scss'

export interface ICardProps {
  style?: React.CSSProperties | undefined
  children?: JSX.Element | JSX.Element[] | string
  className?: string
}

export interface ICardElement {
  children?: JSX.Element | string | React.ReactNode
  className?: string
}

export const Card = (props: ICardProps) => {
  let cardTitle
  let cardImage
  let cardContent
  let cardFooter

  if (props.children instanceof Array) {
    props.children?.forEach((child) => {
      if (isValidElement(child) && typeof child?.type === 'function') {
        switch (child.type.name) {
          case CardHead.name:
            cardTitle = child
            break
          case CardImage.name:
            cardImage = child
            break
          case CardContent.name:
            cardContent = child
            break
          case CardFooter.name:
            cardFooter = child
            break
          default:
            break
        }
      }
    })
  } else {
    cardContent = props.children
  }
  return (
    <div style={props.style} className={`card ${props.className}`}>
      {cardImage ? <div className="card-section-image">{cardImage}</div> : null}
      {cardTitle ? <div className="card-section-title">{cardTitle}</div> : null}
      {cardContent ? <div className="card-section-content">{cardContent}</div> : null}
      {cardFooter ? <div className="card-section-footer">{cardFooter}</div> : null}
    </div>
  )
}

export const CardHead = (props: ICardElement) => {
  return <div className={`card-head ${props.className}`}>{props.children}</div>
}

export const CardImage = (props: ICardElement) => {
  return <div className={`card-image ${props.className}`}>{props.children}</div>
}

export const CardContent = (props: ICardElement) => {
  return <div className={`card-content ${props.className}`}>{props.children}</div>
}

export const CardFooter = (props: ICardElement) => {
  return <div className={`card-footer ${props.className}`}>{props.children}</div>
}
