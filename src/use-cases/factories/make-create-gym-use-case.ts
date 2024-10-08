import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms-respository'

import { CreateGymUserCase } from '@/use-cases/create-gym'

export function makeCreateGymUseCase() {
  const gymsRepository = new PrismaGymsRepository()
  const useCase = new CreateGymUserCase(gymsRepository)

  return useCase
}
