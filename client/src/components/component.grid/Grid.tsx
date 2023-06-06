import { Group, Line, Rect } from 'react-konva'

export const Grid = () => {
  return (
    <Group>
      <Rect width={1000} height={900} fill="whitesmoke"></Rect>
      {[...Array(46)].map((_, i) => (
        <Line x={0} y={0} key={i} points={[0, i * 20, 1000, i * 20]} stroke="#7597FA6B" />
      ))}
      {[...Array(51)].map((_, i) => (
        <Line x={0} y={0} key={i} points={[0 + i * 20, 0, 0 + i * 20, 900]} stroke="#7597FA6B" />
      ))}
    </Group>
  )
}
