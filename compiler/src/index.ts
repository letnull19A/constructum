import { createHTTPServer } from '@trpc/server/adapters/standalone' 
import { compilerRouter } from './trpc/router.compiler.js'

const main = async () => {
	// const mockProject: IProject = {
	// 	owner: new Types.ObjectId(),
	// 	name: 'test',
	// 	description: 'test',
	// 	members: [],
	// 	access: 'PRIVATE',
	// 	entities: [
	// 		{
	// 			_id: new Types.ObjectId(),
	// 			_meta: {
	// 				_id: new Types.ObjectId(),
	// 				_version: {
	// 					major: 0,
	// 					minor: 0,
	// 					revision: 0,
	// 					build: 1
	// 				},
	// 				_created: Date.now()
	// 			},
	// 			name: 'users',
	// 			fields: [
	// 				{
	// 					_id: new Types.ObjectId(),
	// 					_meta: {
	// 						_id: new Types.ObjectId(),
	// 						_version: {
	// 							major: 0,
	// 							minor: 0,
	// 							revision: 0,
	// 							build: 1
	// 						},
	// 						_created: Date.now()
	// 					},
	// 					field_name: 'id',
	// 					field_type: 'uuid',
	// 					isNull: false,
	// 					indexes: ['PrimaryKey'],
	// 					description: 'id'
	// 				},
    //                 {
	// 					_id: new Types.ObjectId(),
	// 					_meta: {
	// 						_id: new Types.ObjectId(),
	// 						_version: {
	// 							major: 0,
	// 							minor: 0,
	// 							revision: 0,
	// 							build: 1
	// 						},
	// 						_created: Date.now()
	// 					},
	// 					field_name: 'name',
	// 					field_type: 'string',
	// 					isNull: false,
	// 					indexes: [],
	// 					description: 'id'
	// 				}
	// 			]
	// 		}
	// 	]
	// }

	// const e: EF = new EF(mockProject)

	// e.build()

	// const r: SQL = new SQL(mockProject)

	// r.build()

	const server = createHTTPServer({ 
		router: compilerRouter
	}) 
 
	server.listen(2004)
}

main()