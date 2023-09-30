import { Tag } from '../../components'
import { useTitle } from '../../hooks/hook.use-title'

export const UI = () => {
	useTitle('UI - Settings')

	return (
		<>
			<h1>Tag - component</h1>
			<Tag elements={['ein', 'zwei']} handleElementType="input" />
			<Tag elements={['ein', 'zwei']} handleElementType="select" handleElementContent={['NONE', 'PrimaryKey', 'ForeignKey', 'Unique']} />
			<Tag elements={['ein', 'zwei']} handleElementType="button" handleElementContent="Добавить поле" />
		</>
	)
}
