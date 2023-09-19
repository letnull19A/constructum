import './Select.scss'

export interface ISelect {
	value?: any
	className?: string
	items?: Array<any>
    onChange?: React.ChangeEventHandler<HTMLSelectElement> | undefined
    key?: React.Key | null | undefined
}

export const Select = (props: ISelect) => {
	return (
		<select onChange={props.onChange} className={'select-block ' + props.className} value={props.value}>
			{props.items?.map((items) => (
				<option value={items}>{items}</option>
			))}
		</select>
	)
}
