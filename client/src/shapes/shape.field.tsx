import { Group, Rect, Text } from 'react-konva'

export interface IField {
  order: number
  isPrimaryKey: boolean
  isForeignKey: boolean
  width: number
  name: string
  type: string
}

export const Field = ({ type, order, isPrimaryKey, width, isForeignKey, name }: IField) => {
  return (
    <Group>
      <Rect width={40} height={40} y={40 + 40 * order} stroke="#3c3c3c" fill="#fff"></Rect>
      <Text
        text={isPrimaryKey ? 'PK' : isForeignKey ? 'FK' : ''}
        height={40}
        width={40}
        verticalAlign="middle"
        align="center"
        y={40 + 40 * order}
      />
      <Rect width={width - 40} height={40} x={40} y={40 + 40 * order} stroke="#3c3c3c" fill="#fff"></Rect>
      <Text text={`${name} (${type})`} x={50} y={55 + 40 * order} />
    </Group>
  )
}
