import { IProject } from 'constructum-interfaces'
import { ISyntax } from '../interfaces'
import path from 'path'
import * as fs from 'fs'

export class SQL implements ISyntax {
	private readonly _originProject: IProject
	private readonly buildPath: string
	private readonly deafultPath: string = path.join(__dirname, '../', '../', 'builds', '/')

	private _buildText: string

	constructor(project: IProject) {
		this._originProject = project
		this._buildText = ''
		this.buildPath = path.join(this.deafultPath, project.name.charAt(0).toUpperCase() + project.name.slice(1))
	}

	private normalizeType(type: string): string {
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
				return 'varchar(36)'
			default:
				'object'
		}

		return ''
	}

	private normalizeName(name: string): string {
		return name
	}

	build(): void {
		const originName = this._originProject.name
		const name = originName.charAt(0).toUpperCase() + originName.slice(1)
		const entities = this._originProject.entities

        let primaryKey: string= ''

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

					fs.writeFileSync(this.buildPath + '/' + entity.name + '.sql', codeDistText)
				}
			}
		} catch (e) {
			console.error(e)
		}
	}

	get buildText(): string {
		return this._buildText
	}
}
