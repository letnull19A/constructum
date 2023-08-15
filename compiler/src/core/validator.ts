import { IProject } from 'constructum-interfaces'
import { Types } from 'mongoose'

export const validate = async (project: IProject): Promise<boolean> => {
	return isOwnerValid(project.owner)
}

const isOwnerValid = async (id: Types.ObjectId): Promise<boolean> => {
	return true
}
