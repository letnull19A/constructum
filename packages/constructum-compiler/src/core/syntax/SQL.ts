import { IProject, ISyntax } from 'constructum-interfaces'
import { IBuildProjectResponse } from 'constructum-interfaces/queries/IBuildProjectResponse'

export class SQL implements ISyntax {
	private readonly _originProject: IProject

	private _buildText: Array<IBuildProjectResponse>
	private _normalizedProjectName: string

	constructor(project: IProject) {
		this._normalizedProjectName = ''
		this._originProject = project
		this._buildText = []
	}

	normalizeFieldName(fieldName: string): string {
		return fieldName
	}

	normalizeProjectName(): string {
		this._normalizedProjectName = this._originProject.name
		return this._normalizedProjectName
	}

	linkDirectories(): string[] {
		return new Array()
	}

	normalizeDirectories(directories: string[]): string {
		return ''
	}

	get normalizedProjectName(): string {
		return this._normalizedProjectName
	}

	public normalizeType(type: string): string {
		switch (type) {
			case 'String':
			case 'Text':
			case 'string':
				return 'varchar(255)'
			case 'Number':
				return 'int'
			case 'Boolean':
				return 'bool'
			case 'uuid':
			case 'guid':
			case 'uuid/guid':
				return 'varchar(36)'
			default:
				'object'
		}

		return ''
	}

	public normalizeName(name: string): string {
		return name
	}

	build(): void {
		const entities = this._originProject.entities

		if (entities === undefined || entities.length === 0) {
			return
		}

		let primaryKey: string = ''
		let codeDistText = ''

		for (let i = 0; i < entities.length; i++) {
			const entity = entities[i]

			if (entity.fields !== undefined && entity.fields.length !== 0) {
				codeDistText += `CREATE TABLE ${entity.name} (\n`

				for (let j = 0; j < entity.fields.length; j++) {
					const field = entity.fields[j]

					if (field.indexes.includes('PrimaryKey')) {
						primaryKey = `\tPRIMARY KEY (${field.field_name})`
					}

					codeDistText +=
						'\t' +
						this.normalizeName(field.field_name) +
						' ' +
						this.normalizeType(field.field_type) +
						' ' +
						(field.isNull ? '' : 'NOT NULL') +
						',\n'
				}

				codeDistText += primaryKey
				codeDistText += '\n);'
			}
		}

		this._buildText.push({
			virtualFileName: `${this.normalizeProjectName()}.sql`,
			virtualFileContent: codeDistText
		})
	}

	get buildText(): Array<IBuildProjectResponse> {
		return this._buildText
	}
}
