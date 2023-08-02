import fetch, { Headers } from 'node-fetch'
import { URL } from '../tests.config'
import qs from 'qs'

export const registUser = async (login?: string, password?: string, repassword?: string, email?: string, name?: string, surname?: string, bearer?: string) => {
	const headerData = {
        'Authorization': `Bearer ${bearer}`,
        'Content-Type': 'application/x-www-form-urlencoded'
    }
    
    const request = await fetch(`${URL}/registration`, {
		method: 'POST',
        headers: new Headers(headerData),
		body: qs.stringify({
            email: email,
            repassword: repassword,
            name: name,
            surname: surname,
			login: login,
			password: password
		})
	})
	
    return request
}
