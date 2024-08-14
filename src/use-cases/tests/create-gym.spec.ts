import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { CreateGymUserCase } from '../create-gym'

let gymsRepository: InMemoryGymsRepository
let sut: CreateGymUserCase

describe('Create Gym Use Case', () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new CreateGymUserCase(gymsRepository)

    await gymsRepository.create({
      title: 'gym-1',
      description: null,
      phone: null,
      latitude: -21.7481216,
      longitude: -41.3466624,
    })
  })

  it('should be to register gym', async () => {
    const newGym = {
      title: 'gym-1',
      description: null,
      phone: null,
      latitude: -21.7481216,
      longitude: -41.3466624,
    }

    const { gym } = await sut.execute(newGym)

    expect(gym.id).toEqual(expect.any(String))
  })
})
