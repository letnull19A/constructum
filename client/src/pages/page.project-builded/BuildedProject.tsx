import { Header, Content, Footer, ExplorerHierarhy, Card, CardHead, CardContent, CardFooter } from '../../components'
import { useTitle } from '../../hooks/hook.use-title'
import { LayoutExplorer } from '../../layouts/layout.explorer'
import './BuildedProject.scss'

export const BuildedProject = () => {

    useTitle('Собранный проект')

	return (
		<LayoutExplorer>
			<Header />
			<ExplorerHierarhy />
			<Content>
                <Card className='entity-card'>
                    <CardHead>EntityName&#46;cs</CardHead>
                    <CardContent>
                        <code className='code-block'>
                            <pre>
                            &#91;Table&#40;&#34;entity&#34;&#41;&#93;<br/>
                            <span className='modify'>public</span> <span className='sealed'>sealed</span> class <span className='type'>Entity</span><br/>
                            &#123;<br/>
                            &#9;&#91;Key&#93;<br/>
                            &#9;&#91;Column&#40;&#34;entity_id&#34;&#41;&#93;<br/>
                            &#9;<span className='modify'>public</span> <span className='type'>Guid</span> Id &#123; get; set; &#125;
                            <br/>&#125;
                            </pre>
                        </code>
                    </CardContent>
                    <CardFooter></CardFooter>
                </Card>
			</Content>
			<Footer />
		</LayoutExplorer>
	)
}
