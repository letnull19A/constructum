import axios from 'axios'
import qs from 'qs'
import { expect, describe, it } from '@jest/globals'

describe('registration test', () => {
	it('success registration', async () => {
		const data = qs.stringify({
			email: 'av@gmail.com',
			name: 'Alex1',
			surname: 'Volkov1',
			password: '11111111',
			repassword: '11111111',
			login: 'login1'
		})

		const config = {
			method: 'post',
			maxBodyLength: Infinity,
			url: 'http://45.12.74.222/api/registration',
			headers: {
				Authorization: 'Bearer  ',
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			data: data
		}

		const response = await axios.request(config)

		expect(response.status).toBe(200)
		expect(response.dtaa).toBe({})
	})
})
