import { Gym } from '@prisma/client'

import { GymsRepository } from '@/repositories/gyms-repository'

interface CreateGymUserCaseRequest {
  title: string
  latitude: number
  longitude: number
  description: string | null
  phone: string | null
}

interface CreateGymUseCaseResponse {
  gym: Gym
}

export class CreateGymUserCase {
  constructor(private gymsRepository: GymsRepository) {}

  async execute({
    title,
    description,
    phone,
    latitude,
    longitude,
  }: CreateGymUserCaseRequest): Promise<CreateGymUseCaseResponse> {
    const gym = await this.gymsRepository.create({
      title,
      latitude,
      longitude,
      description,
      phone,
    })

    return { gym }
  }
}
