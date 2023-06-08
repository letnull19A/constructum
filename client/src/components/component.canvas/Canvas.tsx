import { Group, Layer, Line, Stage, Text } from 'react-konva'
import './Canvas.scss'
import { Entity } from '../../shapes'
import { FieldData, IEntityProps } from '../../shapes/shape.entity'
import { Grid } from '../component.grid/Grid'
import { ReactElement, useEffect, useState } from 'react'
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
    {
      index: 1,
      startFromX: 0,
      fromX: 0,
      fromY: 0,
      startToX: 0,
      toX: 0,
      toY: 0,
    },
    {
      index: 2,
      startFromX: 0,
      fromX: 0,
      fromY: 0,
      startToX: 0,
      toX: 0,
      toY: 0,
    },
  ])

  const [_, setEntities] = useState<Array<IEntityProps>>([])
  const [linesMap, setLinesMap] = useState<Array<Array<number>>>([
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ])
  //const [isNeedToUpdate, setIsNeedToUpdate] = useState(true)

  useEffect(() => {
    const entityList: Array<IEntityProps> = new Array<IEntityProps>()

    fake.forEach((entity) => {
      entityList.push(subscribe(entity as IEntityProps))
    })

    setEntities(entityList)
    setLinesMap(generateLinesMap(fake as Array<IEntityProps>))
    recalculateLines(linesMap, fake as Array<IEntityProps>)
  }, [])

  useEffect(() => {
    //if (isNeedToUpdate) {
    recalculateLines(linesMap, fake as Array<IEntityProps>)
    //}
  }, [linesMap, lines])

  const generateLinesMap = (entities: Array<IEntityProps>): Array<Array<number>> => {
    const originLinesMap: Array<Array<number>> = []

    entities.forEach((entity, index) => {
      const deps = getDependenciesFromTable(entity)

      deps.forEach((dependency) => {
        const split = dependency.split('.')
        const tableName = split[0]
        const columnName = split[1]

        const tableIndex = getDependencyTableIndex(entities, tableName)
        const columnIndex = getDependencyColumnIndex(entities[tableIndex], columnName)

        const lastColumnIndex = getColumnIndexByDependency(entities[index], dependency)

        originLinesMap.push([index, tableIndex, lastColumnIndex + 1, columnIndex + 1])
      })
    })

    return originLinesMap
  }

  const getColumnIndexByDependency = (column: IEntityProps, columnName: string): number => {
    return column.fields.map((q) => q.deps).indexOf(columnName)
  }

  const getDependenciesFromTable = (table: IEntityProps): Array<string> => {
    return table.deps === undefined ? [] : table.deps
  }

  const getDependencyColumnIndex = (table: IEntityProps, fieldName: string): number => {
    return (table.fields as Array<FieldData>).map((r) => r.name).indexOf(fieldName)
  }

  const getDependencyTableIndex = (db: Array<IEntityProps>, tableName: string): number => {
    return db.map((e) => e.name).indexOf(tableName)
  }

  const subscribe = (entity: IEntityProps): IEntityProps => {
    entity.height = entity.fields.length * 40 + 40

    entity.onPositionChanged = (e) => {
      entity.positionX = Math.round(e.target.x() / 20) * 20
      entity.positionY = Math.round(e.target.y() / 20) * 20

      recalculateLines(linesMap, fake as Array<IEntityProps>)
    }

    return entity
  }

  const recalculateLines = (map: Array<Array<number>>, entities: Array<IEntityProps>) => {
    map.forEach((mapItem, index) => {
      recalculateLine(entities, mapItem[0], mapItem[1], index, mapItem[2], mapItem[3])
    })
  }

  const recalculateLine = (
    data: Array<IEntityProps>,
    startIndex: number,
    targetIndex: number,
    indx: number,
    fieldStart: number,
    fieldEnd: number,
  ) => {
    const line = lines

    const firstEntity = data[startIndex]
    const secondEntity = data[targetIndex]
    const currrentline = line[indx]

    const deltaX = firstEntity.positionX - secondEntity.positionX

    if (deltaX < -219 && deltaX <= 0) {
      currrentline.startFromX = firstEntity.positionX + firstEntity.width
      currrentline.fromX = firstEntity.positionX + firstEntity.width
      currrentline.startToX = secondEntity.positionX
      currrentline.toX = secondEntity.positionX
    }
    if (deltaX > 219 && deltaX >= 0) {
      currrentline.startFromX = firstEntity.positionX - 40
      currrentline.fromX = firstEntity.positionX
      currrentline.startToX = secondEntity.positionX + secondEntity.width + 40
      currrentline.toX = secondEntity.positionX + secondEntity.width
    }

    currrentline.fromY = firstEntity.positionY + 20 + 40 * fieldStart
    currrentline.toY = secondEntity.positionY + 20 + 40 * fieldEnd

    if (deltaX < 220 && deltaX > -201) {
      currrentline.startFromX = firstEntity.positionX - 20 + firstEntity.width / 2
      currrentline.fromX = firstEntity.positionX + firstEntity.width / 2
      currrentline.startToX = secondEntity.positionX + 20 + secondEntity.width / 2
      currrentline.toX = secondEntity.positionX + secondEntity.width / 2

      if (firstEntity.positionY > secondEntity.positionY) {
        currrentline.fromY = firstEntity.positionY
        currrentline.toY = secondEntity.positionY + secondEntity.height
      }

      if (firstEntity.positionY < secondEntity.positionY) {
        currrentline.fromY = firstEntity.positionY + firstEntity.height
        currrentline.toY = secondEntity.positionY
      }
    }

    //setIsNeedToUpdate((prev) => !prev)

    //if (isNeedToUpdate) {
    setLines([...line])
    //}
  }

  const drawLines = (): Array<ReactElement> => {
    const result: Array<ReactElement> = []

    for (let i = 0; i < lines.length; i++) {
      result.push(
        <Line
          points={[
            lines[i].fromX,
            lines[i].fromY,
            lines[i].startFromX + 20,
            lines[i].fromY,
            lines[i].startToX - 20,
            lines[i].toY,
            lines[i].toX,
            lines[i].toY,
          ]}
          stroke="red"
        />,
      )
    }

    return result
  }

  return (
    <Stage width={1536} height={873} className="canvas-stage">
      <Layer>
        <Group draggable>
          <Grid />
          {(fake as Array<IEntityProps>).map((obj, index) => (
            <Group>
              <Entity key={index} {...obj} />
              <Text
                fill="red"
                x={obj.positionX}
                y={obj.positionY - 15}
                text={`index: ${index} x:${obj.positionX} y:${obj.positionY} h: ${obj.height} w: ${obj.width}`}
              />
            </Group>
          ))}

          {drawLines()}
        </Group>
      </Layer>
    </Stage>
  )
}
