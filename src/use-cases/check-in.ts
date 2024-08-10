import { GymsRepository } from './../repositories/gyms-repository'
import { CheckIn } from '@prisma/client'

import { CheckInsRepository } from '@/repositories/check-ins-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface CheckInUserCaseRequest {
  userId: string
  gymId: string
  userLatitude: number
  userLongitude: number
}

type CheckInUserCaseResponse = {
  checkIn: CheckIn
}

export class CheckInUserCase {
  constructor(
    private checkInsRepository: CheckInsRepository,
    private gymsRepository: GymsRepository,
  ) {}

  async execute({
    userId,
    gymId,
  }: CheckInUserCaseRequest): Promise<CheckInUserCaseResponse> {
    const gym = await this.gymsRepository.findById(gymId)

    if (!gym) {
      throw new ResourceNotFoundError()
    }

    // Calculate distance beetwen user and gym

    const checkInOnSomeday = await this.checkInsRepository.findByUserIdOnDate(
      userId,
      new Date(),
    )

    if (checkInOnSomeday) {
      throw new Error()
    }

    const checkIn = await this.checkInsRepository.create({
      user_id: userId,
      gym_id: gymId,
    })

    return {
      checkIn,
    }
  }
}
