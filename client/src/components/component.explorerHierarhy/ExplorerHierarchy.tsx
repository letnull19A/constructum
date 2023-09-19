import './ExplorerHierarchy.scss'

export const ExplorerHierarhy = () => {
	return (
		<div className="hierarchy">
			<ul>
				<li>project name</li>
				<li>
					<ul>
						<li>entity 1</li>
                        <li>entity 2</li>
                        <li>entity 3</li>
					</ul>
				</li>
			</ul>
		</div>
	)
}
