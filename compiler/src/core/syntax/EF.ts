import { IProject } from 'constructum-interfaces'
import { ISyntax } from '../interfaces'
import * as fs from 'fs'
import path from 'path'

export class EF implements ISyntax {
	private _buildText: string
	private _originProject: IProject

	private readonly deafultPath: string = path.join(__dirname, '../', '../', 'builds', '/')
	private readonly buildPath: string

	constructor(project: IProject) {
		this._originProject = project
		this._buildText = ''
		this.buildPath = path.join(this.deafultPath, project.name.charAt(0).toUpperCase() + project.name.slice(1))
	}

	public get buildText(): string {
		return this._buildText
	}

	private normalizeType(type: string): string {
		switch (type) {
			case 'String':
			case 'Text':
			case 'string':
				return 'string'
			case 'Number':
				return 'int'
			case 'Boolean':
				return 'bool'
			case 'uuid':
			case 'guid':
				return 'Guid'
			default:
				'object'
		}

		return ''
	}

	private normalizeName(name: string): string {
		return name.charAt(0).toUpperCase() + name.slice(1)
	}

	public build(): void {
		const originName = this._originProject.name
		const name = originName.charAt(0).toUpperCase() + originName.slice(1)
		const entities = this._originProject.entities

		try {
			console.log(`
Building ${name}...
PATH: ${this.buildPath}
DEFAULT_PATH: ${this.deafultPath}`)

			if (!fs.existsSync(this.deafultPath)) {
				fs.mkdirSync(this.deafultPath)
			}

			if (!fs.existsSync(this.buildPath)) {
				fs.mkdirSync(this.buildPath)
			}

			if (entities === undefined || entities.length === 0) {
				return
			}

			for (let i = 0; i < entities.length; i++) {
				let codeDistText = ''

				const entity = entities[i]

				const className = entity.name.charAt(0).toUpperCase() + entity.name.slice(1)

				if (entity.fields !== undefined && entity.fields.length !== 0) {
					codeDistText +=
						'using System;\n' +
						'using System.Collections.Generic;\n' +
						'using System.ComponentModel.DataAnnotations;\n' +
						'using System.ComponentModel;\n\n' +
						`[Table(\'${entity.name}\')]\n` +
						'public sealed class ' +
						className +
						'\n{\n'

					for (let j = 0; j < entity.fields.length; j++) {
						const field = entity.fields[j]

						if (field.indexes.includes('PrimaryKey')) {
							codeDistText += '\t[Key]\n'
						}

						codeDistText += `\t[Column(\'${field.field_name}\')]\n`

						codeDistText +=
							'\tpublic ' +
							this.normalizeType(field.field_type) +
							' ' +
							this.normalizeName(field.field_name) +
							' { get; set; }\n\n'
					}

					codeDistText += '}'

					fs.writeFileSync(this.buildPath + '/' + className + '.cs', codeDistText)
				}
			}
		} catch (e) {
			console.error(e)
		}
	}
}
