import { useNavigate } from 'react-router-dom'
import { Button, Card, CardContent, CardFooter, CardHead, Content, Footer, Header, Menu } from '../../components'
import { useTitle } from '../../hooks/hook.use-title'
import { LayoutDefault } from '../../layouts/layout.default'
import { Method, useHttp } from '../../hooks/hook.use-http'
import { useEffect, useState } from 'react'
import './Projects.scss'
import { useBearer } from '../../hooks'
import { IProject } from 'constructum-interfaces'

export const Projects = () => {
	useTitle('Мои проекты')

	const navigate = useNavigate()
	const getAllProjects = useHttp<IProject>()
	const userData = JSON.parse(localStorage.getItem('user') ?? '{}')
	const { bearer } = useBearer()
	const [projects, setProjects] = useState<Array<IProject>>()

	useEffect(() => {
		console.log(bearer)
		if (bearer !== '') {
			getAllProjects.requestWithInterceptors({
				method: Method.GET,
				url: `${import.meta.env.VITE_API_URL}/api/user/${userData.id}/projects`,
				headers: {
					Authorization: bearer,
					'Content-Type': 'application/x-www-form-urlencoded'
				}
			})
		}
	}, [bearer])

	useEffect(() => {
		if (getAllProjects.response === null && getAllProjects.response === undefined) {
			setProjects([])
			return
		}
		// @ts-ignore line
		setProjects(getAllProjects.response)
	}, [getAllProjects.response])

	return (
		<LayoutDefault>
			<Menu />
			<Header />
			<Content className="projects-content">
				<h1>Мои проекты</h1>
				<Button type='primary' label="Добавить новый проект" onClick={() => navigate('/project/new')} />
				<div className="project-list">
					{getAllProjects.error === null && projects !== null && projects !== undefined && projects.length > 0 ? (
						projects?.map((project, index) => (
							<Card key={index} className="project-item">
								<CardHead>{project.name}</CardHead>
								<CardContent>{project.description}</CardContent>
								<CardFooter>
									<Button
										type='primary'
										label="Просмотр"
										onClick={() => {
											// @ts-ignore line
											navigate(`/project/${project['_id']}`)
										}}
									/>
								</CardFooter>
							</Card>
						))
					) : (
						<p>Не удалось загрузить проекты =(</p>
					)}
				</div>
			</Content>
			<Footer />
		</LayoutDefault>
	)
}
