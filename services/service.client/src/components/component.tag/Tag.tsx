import { useEffect, useRef, useState } from 'react'
import './Tag.scss'
import { v4 as uuidv4 } from 'uuid'

export type HandleElementType = any | HTMLInputElement | HTMLSelectElement
export type HandleElementContent = Array<string> | string | any

export interface IElement {
	uuid: string
	content: string
}

export interface IProps {
	className?: string
	elements?: Array<string>
	enableRemoveIcon?: boolean
	handleElement?: HandleElementType
	handleElementType?: string
	handleElementContent?: HandleElementContent
    onRemove?: (elements: Array<string>) => void
    onAdd?: (elements: Array<string>) => void
    onChange?: (elements: Array<string>) => void
}

export const Tag = (props: IProps) => {
	const [elements, setElements] = useState<Array<IElement>>([])
    const handleInputRef = useRef<HTMLInputElement | HTMLSelectElement>(null)

	useEffect(() => {
		if (props.elements === undefined) return

		const newElements = props.elements.map((element) => {
			return {
				uuid: uuidv4(),
				content: element
			}
		})

		setElements(newElements)
	}, [props.elements])

	const removeElement = (element: IElement) => {
		const newElements = elements.filter((e) => e.uuid !== element.uuid)

		if (props.onChange !== undefined)
			props.onChange(newElements.map(e => e.content))

		setElements(newElements)
	}

	const addElement = (content: string) => {
		const origin = elements 

		origin.push({
				uuid: uuidv4(),
				content: content
			})

		if (props.onChange !== undefined)
			props.onChange(elements.map(e => e.content))

        setElements(origin)
    }

	const handleElements = {
		input: (
			<div>
				<input ref={handleInputRef} />
				<button onClick={() => {addElement(handleInputRef.current?.value)}}>Add</button>
			</div>
		),
		select: (
			<select onChange={(e) => addElement(e.target.value)}>
				{Array.isArray(props.handleElementContent) && props.handleElementContent.map((elm) => <option>{elm}</option>)}
			</select>
		),
		button: <button>{props.handleElementContent}</button>
	}

	const handle =
		props.handleElement && props.handleElementType === undefined
			? props.handleElement
			: handleElements[props.handleElementType]

	return (
		<div className={`tag ${props.className}`}>
			{elements.length > 0 &&
				elements.map((element) => (
					<div key={element.uuid} className="tag-element">
						{element.content}
						<i className="remove-icon" onClick={() => removeElement(element)}>
							x
						</i>
					</div>
				))}
			{handle}
		</div>
	)
}
