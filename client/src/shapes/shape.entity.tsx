import { Rect, Text, Group } from 'react-konva'
import { Field } from './shape.field'
import { KonvaEventObject } from 'konva/lib/Node'
import { useEffect, useState } from 'react'

export type EntityData = {
  name: string
  isPrimatyKey: boolean
  isForeignKey: boolean
  type: string
}

export interface IEntityProps {
  name?: string
  positionX: number
  positionY: number
  fields: Array<EntityData>
  deps?: Array<IEntityProps>
  onPositionChanged?: (e: KonvaEventObject<DragEvent>) => any
}

export const Entity = (entityData: IEntityProps) => {
  const [positionX, setPositionX] = useState(0)
  const [positionY, setPositionY] = useState(0)

  const fields = entityData.fields.map((item, index) => (
    <Field
      type={item.type}
      order={index}
      isPrimaryKey={item.isPrimatyKey}
      isForeignKey={item.isForeignKey}
      name={item.name}
    />
  ))

  useEffect(() => {
    setPositionX(entityData.positionX)
    setPositionY(entityData.positionY)
  }, [])

  return (
    <Group
      draggable
      x={entityData.positionX}
      y={entityData.positionY}
      onDragMove={(e) => {
        entityData.onPositionChanged?.(e)

        setPositionX(Math.round(e.target.x() / 20) * 20)
        setPositionY(Math.round(e.target.y() / 20) * 20)

        e.target.position({
          y: positionY,
          x: positionX,
        })
      }}
    >
      <Rect width={180} height={40 * (fields.length + 1)} x={10} y={10} fill="grey" />
      <Rect width={180} height={40} stroke="#3c3c3c" fill="blue"></Rect>
      <Text text={entityData.name} x={80} y={15} fill="#fff" />
      {fields}
    </Group>
  )
}
