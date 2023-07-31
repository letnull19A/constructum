import { useEffect, useState } from 'react'
import { Button, Content, Footer, Header, Menu, Textarea, Textbox } from '../../components'
import { LayoutDefault } from '../../layouts/layout.default'
import { IInterceptors, Method, useHttp } from '../../hooks/hook.use-http'
import { IJwtSet, IProject } from 'constructum-interfaces'
import { AxiosError } from 'axios'
import { useParams } from 'react-router-dom'
import qs from 'qs'
import './EntityConstructor.scss'
import { useTitle } from '../../hooks/hook.use-title'
import { v4 as uuidv4 } from 'uuid';

interface IRowViewData {
	name: String
	type: String
	length: number
	min?: number
	max?: number
	isNull: boolean
	indexes: string
	description?: string
}

export const EntityConstructor = () => {
	useTitle('Конструктор сущности')

	const [tableName, setTableName] = useState<string>()
	const getFieldRequest = useHttp<Array<IProject>>()
	const userTokens = JSON.parse(localStorage.getItem('token') ?? '{}') as IJwtSet
	const bearer = 'Bearer ' + userTokens.access
	const { id, entity_id, field_id } = useParams()
	const [rows, setRows] = useState<Array<IRowViewData>>()
	const [selectedRows, setSelectedRows] = useState<Array<number>>()

	const interceptor: IInterceptors = {
		onError: async (error: AxiosError) => {
			const original = error.config

			const data = qs.stringify({
				refresh: userTokens.refresh
			})

			if (error.code === AxiosError.ERR_BAD_REQUEST) {
				const response = await getFieldRequest.request({
					url: 'http://localhost:3005/api/refresh',
					method: Method.POST,
					data: data
				})

				console.log(response?.data, response?.data.access)

				localStorage.setItem(
					'token',
					JSON.stringify({ access: response?.data.access, refresh: response?.data.refresh })
				)
				getFieldRequest.request({ url: original?.url ?? '', method: original?.method ?? '' })
			}

			return await error
		}
	}

	const addRow = () => {
		setRows((prev) => [
			...prev,
			{
				name: '',
				type: 'string',
				length: 999,
				isNull: false,
				indexes: 'PrimaryKey'
			}
		])
	}

	const turnForRemove = (index: number) => {
		const isConsistInList = selectedRows?.find((o) => index === o)

		console.log(isConsistInList)

		if (isConsistInList === undefined) {
			console.log(index)

			if (selectedRows?.length > 0) setSelectedRows((prev) => [...prev, index])
			else setSelectedRows([index])
			return
		}

		const origin = selectedRows

		setSelectedRows(origin?.filter((p) => p !== index))
	}

	const removeRows = () => {
		if (selectedRows !== undefined) {
			
			let originRows = rows

			selectedRows.forEach((elm) => {
				console.log(elm);
				
				originRows = originRows?.filter((_, index) => index !== elm)
			})

			setRows(prev => originRows)
			setSelectedRows([])
		}
	}

	const updateRowName = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
		let origin = rows
		origin[index].name = e.target.value

		setRows([...origin])
	}

	useEffect(() => {
		getFieldRequest.requestWithInterceptors(
			{
				method: Method.GET,
				url: `http://localhost:7161/api/project/${id}/entities/${entity_id}`,
				data: qs.stringify({}),
				headers: {
					Authorization: bearer,
					'Content-Type': 'application/x-www-form-urlencoded'
				}
			},
			interceptor
		)

		setRows([
			{
				name: 'id',
				type: 'string',
				length: 999,
				isNull: false,
				indexes: 'PrimaryKey'
			}
		])
	}, [])

	useEffect(() => {
		console.log('rows is updated!');
	}, [rows])

	useEffect(() => {
		setTableName(getFieldRequest.response?.[0].entities?.[0].name)
	}, [getFieldRequest])

	const dataTypes = ['string', 'integer', 'float', 'date', 'time', 'dateTime', 'timeStamp', 'char']

	return (
		<LayoutDefault>
			<Header />
			<Menu />
			<Footer />
			<Content className="content-constructor">
				<h2 className="title">Конструктор сущности: {tableName}</h2>
				<table className="constructor-table">
					<thead>
						<tr>
							<th>#</th>
							<th>Название</th>
							<th>Тип</th>
							<th>Длина</th>
							<th>Мин.</th>
							<th>Макс.</th>
							<th>NULL</th>
							<th>Индексы</th>
							<th>Описание</th>
						</tr>
					</thead>
					<tbody>
						{rows?.map((item, index) => (
							<tr>
								<td>
									<input type="checkbox" onClick={() => turnForRemove(index)} />
								</td>
								<td>
									<Textbox onChange={(e) => updateRowName(e, index)} value={item.name.toString()} />
								</td>
								<td>
									<select key={uuidv4()} defaultValue={item.type.toString()}>
										<option>---</option>
										{dataTypes.map((type) => (
											<option>{type}</option>
										))}
									</select>
								</td>
								<td>
									<Textbox type="number" min={0} max={100000} />
								</td>
								<td>
									<Textbox type="number" min={0} max={100000} />
								</td>
								<td>
									<Textbox type="number" min={0} max={100000} />
								</td>
								<td>
									<input type="checkbox" />
								</td>
								<td>
									<select>
										<option>---</option>
										<option>PrimaryKey</option>
										<option>Foreign</option>
									</select>
								</td>
								<td>
									<Textarea className="field-description" />
								</td>
							</tr>
						))}
					</tbody>
				</table>
				<div className="constructor-controls">
					<Button
						type="danger"
						label={'Удалить (' + (selectedRows?.length !== undefined ? selectedRows?.length : 0) + ')'}
						onClick={() => {
							removeRows()
						}}
					/>
					<Button type="primary" label="Добавить поле" onClick={() => addRow()} />
				</div>
			</Content>
		</LayoutDefault>
	)
}
