import { Group, Rect, Text } from 'react-konva'

export interface IField {
  order: number
  isPrimaryKey: boolean
  isForeignKey: boolean
  name: string
  type: string
}

export const Field = ({ type, order, isPrimaryKey, isForeignKey, name }: IField) => {
  return (
    <Group>
      <Rect width={40} height={40} y={40 + 40 * order} stroke="#3c3c3c" fill="#fff"></Rect>
      <Text text={isPrimaryKey ? 'PK' : isForeignKey ? 'FK' : ''} x={11} y={55 + 40 * order} />
      <Rect width={140} height={40} x={40} y={40 + 40 * order} stroke="#3c3c3c" fill="#fff"></Rect>
      <Text text={`${name} (${type})`} x={50} y={55 + 40 * order} />
    </Group>
  )
}
