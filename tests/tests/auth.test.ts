import { expect, describe, it } from '@jest/globals'
import { authUser } from '../function/auth.function'

describe('auth testing', () => {
    
    it ('success user auth', async () => {
        const fetchedPairs = await (await authUser('letnull19a', '11111111')).json()
        expect(fetchedPairs).not.toBeNull()
        expect(fetchedPairs).not.toBeUndefined()
    })

	it('user not found', async () => {
		const fetchedPairs = (await authUser('letnull19', '11111111')).status
		expect(fetchedPairs).toBe(404)
	})

	it('empty login', async () => {
		const fetchedPairs = await authUser('', '11111111')
		expect(fetchedPairs.status).toBe(400)
	})

	it('empty password', async () => {
		const fetchedPairs = await authUser('letnull19a', '')
		expect(fetchedPairs.status).toBe(400)
	})

	it('without login (is undefined)', async () => {
		const fetchedPairs = await authUser(undefined, '11111111')
		expect(fetchedPairs.status).toBe(400)
	})

	it('without password (is undefined)', async () => {
		const fetchedPairs = await authUser('letnull19a', undefined)
		expect(fetchedPairs.status).toBe(400)
	})

    it('data is cosist', async () => {
		const fetchedPairs = await (await authUser('letnull19a', '11111111')).json()
		expect(fetchedPairs.status).not.toBe(400)
        expect(fetchedPairs.user.nickname).toBe('letnull19a')
	})
})
