import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms-respository'

import { FetchNearbyGymsUseCase } from '@/use-cases/fetch-nearby-gyms'

export function makeNearbyGymUseCase() {
  const gymsRepository = new PrismaGymsRepository()
  const useCase = new FetchNearbyGymsUseCase(gymsRepository)

  return useCase
}
