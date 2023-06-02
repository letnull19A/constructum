import { Group, Layer, Line, Stage, Text } from 'react-konva'
import './Canvas.scss'
import { Entity } from '../../shapes'
import { IEntityProps } from '../../shapes/shape.entity'
import { Grid } from '../component.grid/Grid'
import { useEffect, useState } from 'react'
import fake from './fake.json'

export interface ILines {
  index: number
  startFromX: number
  fromX: number
  fromY: number
  startToX: number
  toX: number
  toY: number
}

export const Canvas = () => {
  const [lines, setLines] = useState<Array<ILines>>([
    {
      index: 0,
      startFromX: 0,
      fromX: 0,
      fromY: 0,
      startToX: 0,
      toX: 0,
      toY: 0,
    },
  ])
  const [entities, setEntities] = useState<Array<IEntityProps>>([])

  useEffect(() => {
    subscribe(fake)
  }, [])

  const subscribe = (data: Array<IEntityProps>) => {
    let origin = data

    for (let i = 0; i < data.length; i++) {
      origin[i].onPositionChanged = (e) => {
        origin[i].positionX = Math.round(e.target.x() / 20) * 20
        origin[i].positionY = Math.round(e.target.y() / 20) * 20

        let y = lines
        const deltaX = origin[0].positionX - origin[1].positionX

        if (deltaX < -219 && deltaX <= 0) {
          y[0].startFromX = origin[0].positionX + 180
          y[0].fromX = origin[0].positionX + 180
          y[0].startToX = origin[1].positionX
          y[0].toX = origin[1].positionX
        }
        if (deltaX > 219 && deltaX >= 0) {
          y[0].startFromX = origin[0].positionX - 40
          y[0].fromX = origin[0].positionX
          y[0].startToX = origin[1].positionX + 220
          y[0].toX = origin[1].positionX + 180
        }

        y[0].fromY = origin[0].positionY + 20 + 40 * 2
        y[0].toY = origin[1].positionY + 20 + 40 * 1

        if (deltaX < 221 && deltaX > -201) {
          y[0].startFromX = origin[0].positionX + 70
          y[0].fromX = origin[0].positionX + 90
          y[0].startToX = origin[1].positionX + 110
          y[0].toX = origin[1].positionX + 90

          if (origin[0].positionY > origin[1].positionY) {
            y[0].fromY = origin[0].positionY
            y[0].toY = origin[1].positionY + 120
          }

          if (origin[0].positionY < origin[1].positionY) {
            y[0].fromY = origin[0].positionY + 120
            y[0].toY = origin[1].positionY
          }
        }

        setLines([...lines, y])
      }
    }

    setEntities(origin)
  }

  return (
    <Stage width={1536} height={873} className="canvas-stage">
      <Layer>
        <Group draggable>
          <Grid />
          {entities.map((obj, index) => (
            <Group>
              <Entity key={index} {...obj} />
              <Text
                fill="black"
                x={obj.positionX}
                y={obj.positionY - 15}
                text={`index: ${index} - ${obj.positionX} ${obj.positionY}`}
              />
            </Group>
          ))}
          <Line
            points={[
              lines[0].fromX,
              lines[0].fromY,
              lines[0].startFromX + 20,
              lines[0].fromY,
              lines[0].startToX - 20,
              lines[0].toY,
              lines[0].toX,
              lines[0].toY,
            ]}
            stroke="red"
          />
        </Group>
      </Layer>
    </Stage>
  )
}
