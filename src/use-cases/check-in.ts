import { CheckIn } from '@prisma/client'

import { CheckInsRepository } from '@/repositories/check-ins-repository'

interface CheckInUserCaseRequest {
  userId: string
  gymId: string
}

type CheckInUserCaseResponse = {
  checkIn: CheckIn
}

export class CheckInUserCase {
  constructor(private checkInsRepository: CheckInsRepository) {}

  async execute({
    userId,
    gymId,
  }: CheckInUserCaseRequest): Promise<CheckInUserCaseResponse> {
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
