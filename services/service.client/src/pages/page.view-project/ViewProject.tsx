import { useNavigate, useParams } from 'react-router-dom'
import { Button, Card, CardContent, CardFooter, CardHead, Content, Footer, Header, Menu } from '../../components'
import { LayoutDefault } from '../../layouts/layout.default'
import './ViewProject.scss'
import { useEffect, useState } from 'react'
import { Method, useHttp } from '../../hooks/hook.use-http'
import { IProject } from 'constructum-interfaces'
import configs from './../../configs/server.config.json'
import { useBearer } from '../../hooks'

export const ViewProject = () => {
	const navigate = useNavigate()
	const { id } = useParams()
	const getEntities = useHttp<IProject>()
	const { bearer } = useBearer()
	const [title, setTitle] = useState<string>('')

	useEffect(() => {
		getEntities.requestWithInterceptors({
			method: Method.GET,
			url: `${configs.api}/api/project/${id}`,
			headers: {
				Authorization: bearer,
				'Content-Type': 'application/x-www-form-urlencoded'
			}
		})
	}, [bearer])

	useEffect(() => {
		if (getEntities.response !== undefined && getEntities.response !== null) {
			setTitle(getEntities.response.name)
		}
	}, [getEntities.response])

	const goToConstructor = (entity_id: any) => {
		navigate(`/project/${id}/entities/${entity_id}/constructor`)
	}

	return (
		<LayoutDefault>
			<Header />
			<Content className="view-content">
				<div className="toolbar">
					<Button outline className="button-back" type="secondary" label="Назад" onClick={() => navigate(-1)} />
					<h2>{title}</h2>
					<Button type="primary" onClick={() => navigate(`/project/${id}/entities/add`)} label="Создать сущность" />
					<Button type="foreign" label="Перейдти к схеме" />
					<Button type="warning" label="О проекте" />
					<Button type="magic" onClick={() => navigate(`/project/${id}/build`)} label="Собрать проект" />
				</div>
				<div className="section">
					<h3>Сущности</h3>
					<div className="entites-list">
						{getEntities.response?.entities?.map((item) => (
							<Card className="entity-card">
								<CardHead className="entity-head">{item.name}</CardHead>
								<CardContent className="entity-fields">
									<ul>
										{item.fields?.map((field) => (
											<li>{field.field_name}</li>
										))}
									</ul>
								</CardContent>
								<CardFooter>
									<Button type='primary' onClick={() => goToConstructor(item._id)} label="В конструктор" />
								</CardFooter>
							</Card>
						))}
					</div>
				</div>
			</Content>
			<Menu />
			<Footer />
		</LayoutDefault>
	)
}
