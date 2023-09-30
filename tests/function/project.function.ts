import fetch, { Headers } from 'node-fetch'
import { URL } from '../tests.config'
import qs from 'qs'

const createProject = async (owner?: string, name?: string, description?: string, bearer?: string) => {
	const headerData = {
        'Authorization': `Bearer ${bearer}`,
        'Content-Type': 'application/x-www-form-urlencoded'
    }
    
    const request = await fetch(`${URL}/project`, {
		method: 'POST',
        headers: new Headers(headerData),
		body: qs.stringify({
			owner: owner,
			name: name,
			description: description
		})
	})
	
    return request
}

const getProject = async (id?: string, bearer?: string) => {
	const headerData = {
        'Authorization': `Bearer ${bearer}`,
        'Content-Type': 'application/x-www-form-urlencoded'
    }
    
    const request = await fetch(`${URL}/project/${id}`, {
		method: 'GET',
        headers: new Headers(headerData)
	})
	
    return request
}

export { createProject, getProject }