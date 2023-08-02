import { expect, describe, it } from '@jest/globals'
import { getProject, createProject, authUser } from '../function'

describe('project testing', () => {
	it('get not exist project by id and empty bearer', async () => {
		const fetchedPairs = (await getProject('10007', '')).status
		expect(fetchedPairs).toBe(401)
	})

    
	it('get not exist project when authenticated user', async () => {
        const auth = await (await authUser('letnull19a', '11111111')).json()
		const fetchedPairs = (await getProject('10007', auth.tokens.access)).status
		expect(fetchedPairs).toBe(404)
	})
    
	it('get realy project', async () => {
        const auth = await (await authUser('letnull19a', '11111111')).json()
		const fetchedPairs = (await getProject('64a45685a7baeffc22a40b59', auth.tokens.access)).status
		expect(fetchedPairs).not.toBe(401)
		expect(fetchedPairs).not.toBe(404)
		expect(fetchedPairs).toBe(200)
	})

	it('get realy project without autherization', async () => {
        const auth = await (await authUser('letnull19a', '11111111')).json()
		const fetchedPairs = (await getProject('64a45685a7baeffc22a40b59', '')).status
		expect(fetchedPairs).toBe(401)
		expect(fetchedPairs).not.toBe(200)
	})
})
