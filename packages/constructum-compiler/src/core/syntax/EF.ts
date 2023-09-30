import { IProject, ISyntax } from 'constructum-interfaces'
import { IBuildProjectResponse } from 'constructum-interfaces/queries/IBuildProjectResponse'

export class EF implements ISyntax {
	private _buildText: Array<IBuildProjectResponse>
	private _normalizedProjectName: string
	private _originProject: IProject

	constructor(project: IProject) {
		this._originProject = project
		this._buildText = []
		this._normalizedProjectName = ''
	}

	public normalizeDirectories(directories: Array<string>): string {
		let readyDirectories = ''

		if (directories === undefined) throw Error('directories is undefined!')

		for (let i = 0; i < directories.length; i++) {
			readyDirectories += `using ${directories[i]};\n`
		}

		readyDirectories += '\n'

		return readyDirectories
	}

	public normalizeProjectName(): string {
		this._normalizedProjectName = this._originProject.name.charAt(0).toUpperCase() + this._originProject.name.slice(1)
		return this._normalizedProjectName
	}

	public linkDirectories(): Array<string> {
		return [
			'System.ComponentModel.DataAnnotations', 
			'System.ComponentModel.DataAnnotations.Schema']
	}

	public get normalizedProjectName(): string {
		return this._normalizedProjectName
	}

	public get buildText(): Array<IBuildProjectResponse> {
		return this._buildText
	}

	public normalizeType(typeName: string): string {
		switch (typeName) {
			case 'String':
			case 'Text':
			case 'varchar':
			case 'string':
				return 'string'
			case 'Number':
				return 'int'
			case 'Boolean':
				return 'bool'
			case 'uuid':
			case 'guid':
			case 'uuid/guid':
				return 'Guid'
			default:
				'object'
		}

		return ''
	}

	public normalizeFieldName(name: string): string {
		return name.charAt(0).toUpperCase() + name.slice(1)
	}

	public build(): void {
		const entities = this._originProject.entities

		if (entities === undefined || entities.length === 0) {
			return
		}

		let codeDistText = new Array<IBuildProjectResponse>

		for (let i = 0; i < entities.length; i++) {
			const entity = entities[i]
			const className = entity.name.charAt(0).toUpperCase() + entity.name.slice(1)

			let programText = ''

			if (entity.fields !== undefined && entity.fields.length !== 0) {
				programText +=
					'using System.ComponentModel.DataAnnotations;\n' +
					'using System.ComponentModel.DataAnnotations.Schema;\n\n' +
					`[Table(\'${entity.name}\')]\n` +
					'public sealed class ' +
					className +
					'\n{\n'

				for (let j = 0; j < entity.fields.length; j++) {
					const field = entity.fields[j]

					if (field.indexes.includes('PrimaryKey')) {
						programText += '\t[Key]\n'
					}

					programText += `\t[Column(\'${field.field_name}\')]\n`

					programText +=
						'\tpublic ' +
						this.normalizeType(field.field_type) +
						' ' +
						this.normalizeFieldName(field.field_name) +
						' { get; set; }\n\n'
				}

				programText += '}'
			}

			codeDistText.push({
				virtualFileName: `${className}.cs`,
				virtualFileContent: programText
			})

		}

		this._buildText = codeDistText
	}
}
