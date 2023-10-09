import { CardImage } from 'react-bootstrap-icons'
import { Button, Card, CardFooter, CardHead, Content, Footer, Header, Menu } from '../../components'
import { useTitle } from '../../hooks/hook.use-title'
import { LayoutDefault } from '../../layouts/layout.default'
import './BuildSelect.scss'
import { useNavigate, useParams } from 'react-router-dom'

export const BuildSelect = () => {
	useTitle('Выберете сборку')

	const navigate = useNavigate()

	const { id } = useParams()

	return (
		<LayoutDefault>
			<Header />
			<Menu />
			<Footer />
			<Content className="content-buildSelect">
				<div className="toolbar">
					<Button outline className="button-back" type="secondary" label="Назад" onClick={() => navigate(-1)} />
				</div>
				<div className="card-list">
					<Card>
						<CardImage />
						<CardHead>EF Core</CardHead>
						<CardFooter>
							<Button onClick={() => navigate(`/project/${id}/build/ef`)} label="Собрать с EF Core" />
						</CardFooter>
					</Card>
				</div>
			</Content>
		</LayoutDefault>
	)
}
