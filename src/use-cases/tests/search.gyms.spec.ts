import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'

import { SearchGymUseCase } from '../search-gyms'

let gymsRepository: InMemoryGymsRepository
let sut: SearchGymUseCase

describe('Search Gym Use Case', () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new SearchGymUseCase(gymsRepository)
  })

  it('should be to search with title', async () => {
    await gymsRepository.create({
      title: 'TypeScript Gym',
      latitude: -21.7481216,
      longitude: -41.3466624,
    })

    await gymsRepository.create({
      title: 'Javascript Gym',
      latitude: -21.7481216,
      longitude: -41.3466624,
    })

    const { gyms } = await sut.execute({
      query: 'TypeScript Gym',
      page: 1,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: 'TypeScript Gym' })])
  })

  it('should be able to fetch paginated gyms search', async () => {
    for (let i = 1; i <= 22; i++) {
      await gymsRepository.create({
        title: `TypeScript Gym ${i}`,
        description: null,
        phone: null,
        latitude: -27.2092052,
        longitude: -49.6401091,
      })
    }

    const { gyms } = await sut.execute({
      query: 'TypeScript',
      page: 2,
    })

    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'TypeScript Gym 21' }),
      expect.objectContaining({ title: 'TypeScript Gym 22' }),
    ])
  })
})
