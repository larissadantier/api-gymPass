import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { FetchNearbyGymsUseCase } from '../fetch-nearby-gyms'

let gymsRepository: InMemoryGymsRepository
let sut: FetchNearbyGymsUseCase

describe('Fetch Nearmy Gyms Use Case', () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new FetchNearbyGymsUseCase(gymsRepository)
  })

  it('should be able to fetch nearby gyms ', async () => {
    await gymsRepository.create({
      title: 'Near Gym',
      latitude: -20.357274,
      longitude: -40.300650,
    })

    await gymsRepository.create({
      title: 'Far Gym 2',
      latitude: -19.929797,
      longitude: -40.142581,
    })

    const { gyms } = await sut.execute({
      userLatitude: -20.357830,
      userLongitude: -40.301028,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: 'Near Gym' })])
  })
})
