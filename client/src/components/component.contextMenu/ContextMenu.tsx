// import { useRef } from 'react'
import './ContextMenu.scss'

interface IProp {
  isActive: boolean
  posX: string
  posY: string
}

export const ConstextMenu = ({ isActive = false, posX, posY }: IProp) => {
  // const refContext = useRef()

  // const disable = () => {
  //   console.log(refContext.current)
  // }

  return (
    <div
      style={{ top: posY, left: posX }}
      // ref={refContext}
      className={'context-menu' + (isActive ? ' active' : ' disabled')}
    >
      <p>Контекстное меню</p>
      <ul>
        <li>
          <button>Удалить</button>
        </li>
        <li>
          <button>Редактировать</button>
        </li>
      </ul>
    </div>
  )
}
