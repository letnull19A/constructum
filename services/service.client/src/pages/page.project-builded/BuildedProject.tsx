import { useEffect, useState } from 'react'
import { Header, Content, Footer, ExplorerHierarhy, Card, CardHead, CardContent, CardFooter } from '../../components'
import { useHttp } from '../../hooks/hook.use-http'
import { useTitle } from '../../hooks/hook.use-title'
import { LayoutExplorer } from '../../layouts/layout.explorer'
import './BuildedProject.scss'
import configs from '../../configs/server.config.json'
import { useParams } from 'react-router-dom'
import { IBuildProjectResponse } from 'constructum-interfaces/queries/IBuildProjectResponse'
import { v4 as uuidv4 } from 'uuid'

export const BuildedProject = () => {
	useTitle('Собранный проект')

	const buildQuery = useHttp()
	const { id, syntax } = useParams()
	const tokens = JSON.parse(localStorage.getItem('token') ?? '{}')
	const bearer = 'Bearer ' + tokens.access
	const [files, setFiles] = useState<Array<IBuildProjectResponse>>([])

	useEffect(() => {
		buildQuery.requestWithInterceptors({
			url: `${configs.api}/api/project/${id}/${syntax}/build`,
			method: 'post',
			headers: {
				Authorization: bearer,
				'Content-Type': 'application/x-www-form-urlencoded'
			}
		})
	}, [])

	useEffect(() => {
		console.log(buildQuery.response)

		setFiles(buildQuery.response)
	}, [buildQuery.response])

	return (
		<LayoutExplorer>
			<Header />
			<ExplorerHierarhy />
			<Content className='files-content'>
				{files?.map((item) => (
					<Card key={uuidv4()} className="entity-card">
						<CardHead>{item.virtualFileName}</CardHead>
						<CardContent>
							<code className="code-block">
								{/* <pre>
									&#91;Table&#40;&#34;entity&#34;&#41;&#93;
									<br />
									<span className="modify">public</span> <span className="sealed">sealed</span> class{' '}
									<span className="type">Entity</span>
									<br />
									&#123;
									<br />
									&#9;&#91;Key&#93;
									<br />
									&#9;&#91;Column&#40;&#34;entity_id&#34;&#41;&#93;
									<br />
									&#9;<span className="modify">public</span> <span className="type">Guid</span> Id &#123; get; set;
									&#125;
									<br />
									&#125;
								</pre> */}
                                {item.virtualFileContent}
							</code>
						</CardContent>
						<CardFooter></CardFooter>
					</Card>
				))}
			</Content>
			<Footer />
		</LayoutExplorer>
	)
}
