import fetch, { Headers } from 'node-fetch'
import { URL } from '../tests.config'
import qs from 'qs'

export const authUser = async (login?: string, password?: string) => {
	const headerData = {
        'Authorization': 'Bearer',
        'Content-Type': 'application/x-www-form-urlencoded'
    }
    
    const request = await fetch(`${URL}/auth`, {
		method: 'POST',
        headers: new Headers(headerData),
		body: qs.stringify({
			login: login,
			password: password
		})
	})
	
    return await request
}
