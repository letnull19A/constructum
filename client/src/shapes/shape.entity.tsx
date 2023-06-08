import { Rect, Text, Group } from 'react-konva'
import { Field } from './shape.field'
import { KonvaEventObject } from 'konva/lib/Node'
import { useEffect, useState } from 'react'

export type FieldData = {
  name: string
  isPrimaryKey: boolean
  isForeignKey: boolean
  type: string
  deps?: string
}

export interface IEntityProps {
  name?: string
  positionX: number
  positionY: number
  width: number
  height: number
  fields: Array<FieldData>
  deps?: Array<string>
  onPositionChanged?: (e: KonvaEventObject<DragEvent>) => any
}

export const Entity = (entityData: IEntityProps) => {
  const [positionX, setPositionX] = useState(0)
  const [positionY, setPositionY] = useState(0)
  const [width, setWidth] = useState(180)
  const [_, setHeight] = useState(0)

  const fields = entityData.fields.map((item, index) => (
    <Field
      type={item.type}
      order={index}
      isPrimaryKey={item.isPrimaryKey}
      isForeignKey={item.isForeignKey}
      width={width}
      name={item.name}
    />
  ))

  useEffect(() => {
    setPositionX(entityData.positionX)
    setPositionY(entityData.positionY)
    setWidth(entityData.width)
    setHeight(entityData.fields.length * 40 + 40)
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
      <Rect draggable={false} width={width} height={40 * (fields.length + 1)} x={10} y={10} fill="#8F8F8FC9" />
      <Rect width={width} height={40} stroke="#3c3c3c" fill="#5C84FAFF"></Rect>
      <Text text={entityData.name} width={width} align="center" y={15} fill="#fff" />
      {fields}
    </Group>
  )
}
