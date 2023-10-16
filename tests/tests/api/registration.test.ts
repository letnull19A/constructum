const axios = require('axios')
const qs = require('qs')

let data = qs.stringify({
	email: 'av@gmail.com',
	name: 'Alex1',
	surname: 'Volkov1',
	password: '11111111',
	repassword: '11111111',
	login: 'login1'
})

let config = {
	method: 'post',
	maxBodyLength: Infinity,
	url: 'http://45.12.74.222/api/registration',
	headers: {
		'Content-Type': 'application/x-www-form-urlencoded'
	},
	data: data
}

async function makeRequest() {
	try {
		const response = await axios.request(config)
		console.log(JSON.stringify(response.data))
	} catch (error) {
		console.log(error)
	}
}

makeRequest()
