import { expect, describe, it } from '@jest/globals'
import { registUser } from '../function'

describe('registration testing', () => {
    
    it ('success user registration', async () => {
        const fetchedPairs = await (await registUser('letnull18a', '11111111dd', '11111111dd', 'example@ex.ee', 'Иван', 'Иванов', '')).json()
        expect(fetchedPairs).not.toBeNull()
        expect(fetchedPairs).not.toBeUndefined()
    })

	it('without login', async () => {
		const fetchedPairs = await (await registUser(undefined, '11111111dd', '11111111dd', 'example@ex.ee', 'Иван', 'Иванов', '')).status
		expect(fetchedPairs).toBe(404)
	})

	it('empty login', async () => {
		const fetchedPairs = await (await registUser('', '11111111dd', '11111111dd', 'example@ex.ee', 'Иван', 'Иванов', '')).status
		expect(fetchedPairs).toBe(400)
	})

	it('empty password', async () => {
		const fetchedPairs = await (await registUser('letnull18a', '', '11111111dd', 'example@ex.ee', 'Иван', 'Иванов', '')).status
		expect(fetchedPairs).toBe(400)
	})

	it('empty repassword', async () => {
		const fetchedPairs = await (await registUser('letnull18a', '11111111dd', '', 'example@ex.ee', 'Иван', 'Иванов', '')).status
		expect(fetchedPairs).toBe(400)
	})

	it('without password (is undefined)', async () => {
		const fetchedPairs = await (await registUser('letnull18a', undefined, '11111111dd', 'example@ex.ee', 'Иван', 'Иванов', '')).status
		expect(fetchedPairs).toBe(400)
	})

    it('without repassword (is undefined)', async () => {
		const fetchedPairs = await (await registUser('letnull18a', '11111111dd', undefined, 'example@ex.ee', 'Иван', 'Иванов', '')).status
		expect(fetchedPairs).toBe(400)
	})

    it('passwords are not equals', async () => {
		const fetchedPairs = await (await registUser('letnull18a', '11111111dd', 'undefined', 'example@ex.ee', 'Иван', 'Иванов', '')).status
		expect(fetchedPairs).toBe(400)
	})

    it('empty email', async () => {
		const fetchedPairs = await (await registUser('letnull18a', '11111111dd', '11111111dd', '', 'Иван', 'Иванов', '')).status
		expect(fetchedPairs).toBe(400)
	})

    it('email is undefined', async () => {
		const fetchedPairs = await (await registUser('letnull18a', '11111111dd', '11111111dd', undefined, 'Иван', 'Иванов', '')).status
		expect(fetchedPairs).toBe(400)
	})

    it('name is empty', async () => {
		const fetchedPairs = await (await registUser('letnull18a', '11111111dd', '11111111dd', 'example@ex.ee', '', 'Иванов', '')).status
		expect(fetchedPairs).toBe(400)
	})

    it('name is undefined', async () => {
		const fetchedPairs = await (await registUser('letnull18a', '11111111dd', '11111111dd', 'example@ex.ee', undefined, 'Иванов', '')).status
		expect(fetchedPairs).toBe(400)
	})

    it('surname is empty', async () => {
		const fetchedPairs = await (await registUser('letnull18a', '11111111dd', '11111111dd', 'example@ex.ee', 'Иван', '', '')).status
		expect(fetchedPairs).toBe(400)
	})

    it('surname is undefined', async () => {
		const fetchedPairs = await (await registUser('letnull18a', '11111111dd', '11111111dd', 'example@ex.ee', 'Иван', undefined, '')).status
		expect(fetchedPairs).toBe(400)
	})

    it('bearer not empty', async () => {
		const fetchedPairs = await (await registUser('letnull18a', '11111111dd', '11111111dd', 'example@ex.ee', 'Иван', undefined, '1')).status
		expect(fetchedPairs).toBe(400)
	})
})
