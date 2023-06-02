import { Prop } from '../../types'
import './Container.scss'

export const Container = ({ children }: Prop) => {
  return <div className="container">{children}</div>
}
