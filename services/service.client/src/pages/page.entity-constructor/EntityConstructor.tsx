import { useEffect, useState } from 'react'
import { Button, Content, Footer, Header, Menu, Select, Tag, Textarea, Textbox } from '../../components'
import { LayoutDefault } from '../../layouts/layout.default'
import { Method, useHttp } from '../../hooks/hook.use-http'
import { IFieldData, IJwtSet, IProjectData } from 'constructum-interfaces'
import { useNavigate, useParams } from 'react-router-dom'
import './EntityConstructor.scss'
import { useTitle } from '../../hooks/hook.use-title'
import { v4 as uuidv4 } from 'uuid'
import { useBearer } from '../../hooks'

interface IRowViewData {
	isSelected: boolean
	name: string
	type: string
	length: number
	min?: number
	max?: number
	isNull: boolean
	indexes: string[]
	description?: string
}

export const EntityConstructor = () => {
	useTitle('Конструктор сущности')

	const dataTypes = ['string', 'integer', 'float', 'date', 'time', 'dateTime', 'timeStamp', 'char', 'uuid/guid']
	const indexes = ['NONE', 'PrimaryKey', 'Unique', 'ForeignKey']
	const [tableName, setTableName] = useState<string>()
	const [rows, setRows] = useState<Array<IRowViewData>>()
	const [removeRowsNumber, setRemoveRowsNumber] = useState<number>(0)
	const getFieldRequest = useHttp<Array<IFieldData>>()
	const getEntityRequest = useHttp<Array<IProjectData>>()
	const { bearer } = useBearer()
	const { id, entity_id } = useParams()
	const navigate = useNavigate()

	const toQueryObject = (row: IRowViewData) => {
		return {
			name: row.name,
			type: row.type,
			isNull: row.isNull,
			indexes: row.indexes,
			description: row.description,
			min: row.min,
			max: row.max,
			length: row.length
		}
	}

	const addRow = () => {
		setRows((prev) => [
			// @ts-ignore
			...prev,
			{
				isSelected: false,
				name: '',
				type: 'string',
				length: 64,
				isNull: false,
				indexes: 'NONE'
			}
		])
	}

	const rowIsGUID = (row: IRowViewData) => row.type === 'uuid/guid'

	const rowIsPrimaryKey = (row: IRowViewData) => row.indexes[0] === indexes[1]

	const rowIsNumber = (row: IRowViewData) => row.type === 'float' || row.type === 'integer' || row.type === 'number'

	const rowIsChar = (row: IRowViewData) => row.type === 'char'

	const removeRows = () => {
		let originRows = rows

		originRows = originRows?.filter((element) => element.isSelected !== true)

		setRows(originRows)
	}

	const updateRowName = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
		let origin = rows

		if (origin === undefined) return

		origin[index].name = e.target.value

		setRows([...origin])
	}

	const updateMinValue = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
		let origin = rows

		if (origin === undefined) return

		const value = parseInt(e.target.value)

		let maxValue = origin[index].max

		if (maxValue === undefined) maxValue = 0

		if (value < maxValue) origin[index].min = value

		setRows([...origin])
	}

	const updateMaxValue = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
		let origin = rows

		if (origin === undefined) return

		const value = parseInt(e.target.value)

		let minValue = origin[index].min

		if (minValue === undefined) minValue = 0

		if (value > minValue) origin[index].max = value

		setRows([...origin])
	}

	const updateIndexes = (array: Array<string>, index: number) => {
		let origin = rows

		if (origin === undefined) return

		console.log(array)

		origin[index].indexes = array

		setRows([...origin])
	}

	const updateTypeRow = (e: React.ChangeEvent<HTMLSelectElement>, index: number) => {
		let origin = rows

		if (origin === undefined) return

		origin[index].type = e.target.value

		setRows([...origin])
	}

	const updateLength = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
		let origin = rows

		if (origin === undefined) return

		origin[index].length = Number.parseInt(e.target.value)

		setRows([...origin])
	}

	const updateIsNull = (index: number) => {
		let origin = rows

		if (origin === undefined) return

		origin[index].isNull = !origin[index].isNull

		setRows([...origin])
	}

	const updateSelection = (index: number) => {
		let origin = rows

		if (origin === undefined) return

		origin[index].isSelected = !origin[index].isSelected

		setRows([...origin])
	}

	const confirmChanges = () => {
		if (rows === undefined) return

		const readyData = rows.map((row) => toQueryObject(row))

		if (bearer === null) return

		getFieldRequest.requestWithInterceptors({
			method: Method.POST,
			url: `http://localhost:7161/api/project/${id}/entities/${entity_id}/fields`,
			data: JSON.stringify(readyData),
			headers: {
				Authorization: bearer,
				'Content-Type': 'application/json'
			}
		})
	}

	useEffect(() => {
		setTableName('загрузка...')

		if (bearer !== '') {
			getFieldRequest.requestWithInterceptors({
				method: Method.GET,
				url: `http://localhost:7161/api/project/${id}/entities/${entity_id}/fields`,
				headers: {
					Authorization: bearer,
					'Content-Type': 'application/x-www-form-urlencoded'
				}
			})

			getEntityRequest.requestWithInterceptors({
				method: Method.GET,
				url: `http://localhost:7161/api/project/${id}/entities/${entity_id}`,
				headers: {
					Authorization: bearer,
					'Content-Type': 'application/x-www-form-urlencoded'
				}
			})
		}
	}, [bearer])

	useEffect(() => {
		if (getEntityRequest.response !== undefined && getEntityRequest.response !== null) {
			console.log(getEntityRequest.response.entities)
			setTableName(getEntityRequest.response[0]?.entities[0].name)
		}
	}, [getEntityRequest.response])

	useEffect(() => {
		if (getFieldRequest.response !== undefined && getFieldRequest.response !== null) {
			if (getFieldRequest.response.length === 0 || getFieldRequest.response.length === undefined) {
				setRows([
					{
						isSelected: false,
						name: 'id',
						type: 'uuid/guid',
						length: 32,
						isNull: false,
						indexes: ['PrimaryKey']
					}
				])
			} else {
				const originRows = getFieldRequest.response.map((element) => {
					return {
						isSelected: false,
						name: element.field_name,
						type: element.field_type,
						length: element.field_length ?? 64,
						min: element.field_min,
						max: element.field_max,
						isNull: element.isNull,
						indexes: element.indexes,
						description: element.description
					}
				})

				setRows(originRows)
			}
		}
	}, [getFieldRequest.response])

	useEffect(() => {
		setRemoveRowsNumber(rows?.filter((element) => element.isSelected === true).length || 0)
	}, [rows])

	return (
		<LayoutDefault>
			<Header />
			<Menu />
			<Footer />
			<Content className="content-constructor">
				<Button outline className="button-back" type="secondary" label="Назад" onClick={() => navigate(-1)} />
				<h2 className="title">Конструктор сущности: {tableName}</h2>
				<table className="constructor-table">
					<thead>
						<tr>
							<th>#</th>
							<th>Название</th>
							<th>Тип</th>
							<th width="120">Длина</th>
							<th width="120">Мин.</th>
							<th width="120">Макс.</th>
							<th>NULL</th>
							<th>Индексы</th>
							<th>Описание</th>
						</tr>
					</thead>
					<tbody>
						{rows?.map((rowData, index) => (
							<tr>
								<td>
									<input
										checked={rowData.isSelected}
										key={uuidv4()}
										type="checkbox"
										onChange={() => updateSelection(index)}
									/>
								</td>
								<td>
									<Textbox
										className="textbox-custom"
										onChange={(e) => updateRowName(e, index)}
										value={rowData.name.toString()}
									/>
								</td>
								<td>
									<Select items={dataTypes} onChange={(e) => updateTypeRow(e, index)} value={rowData.type.toString()} />
								</td>
								<td>
									{!rowIsChar(rowData) && !rowIsNumber(rowData) && !rowIsGUID(rowData) && (
										<Textbox
											onChange={(e) => updateLength(e, index)}
											type="number"
											min={0}
											max={100000}
											value={rowData.length.toString()}
										/>
									)}
								</td>
								<td>
									{rowIsNumber(rowData) && (
										<Textbox
											className="textbox-custom"
											type="number"
											value={rowData.min?.toString()}
											min={0}
											max={100000}
											onChange={(e) => updateMinValue(e, index)}
										/>
									)}
								</td>
								<td>
									{rowIsNumber(rowData) && (
										<Textbox
											className="textbox-custom"
											type="number"
											value={rowData.max?.toString()}
											min={0}
											max={100000}
											onChange={(e) => updateMaxValue(e, index)}
										/>
									)}
								</td>
								<td>
									{!rowIsPrimaryKey(rowData) && (
										<input type="checkbox" onChange={() => updateIsNull(index)} checked={rowData.isNull} />
									)}
								</td>
								<td>
									<Tag
										onChange={(arr) => updateIndexes(arr, index)}
										elements={rowData.indexes}
										handleElementType="select"
										handleElementContent={['NONE', 'PrimaryKey', 'ForeignKey', 'Unique']}
									/>
								</td>
								<td>
									<Textarea className="field-description textbox-custom" />
								</td>
							</tr>
						))}
					</tbody>
				</table>
				<div className="constructor-controls">
					<Button
						type="danger"
						label={`Удалить (${removeRowsNumber !== undefined && removeRowsNumber >= 0 ? removeRowsNumber : 0})`}
						onClick={() => {
							removeRows()
						}}
					/>
					<Button type="secondary" label="Добавить поле" onClick={() => addRow()} />
					<Button type="primary" label="Применить" onClick={() => confirmChanges()} />
				</div>
			</Content>
		</LayoutDefault>
	)
}
