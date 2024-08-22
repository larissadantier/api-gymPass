import { FastifyReply, FastifyRequest } from 'fastify'

import { z } from 'zod'

import { makeNearbyGymUseCase } from '@/use-cases/factories/make-fetch-nearby-gym-use-case'

export const nearby = async (request: FastifyRequest, reply: FastifyReply) => {
  const nearbyBodySchema = z.object({
    latitude: z.number().refine((value) => {
      return Math.abs(value) <= 90
    }),
    longitude: z.number().refine((value) => {
      return Math.abs(value) <= 180
    }),
  })

  const { latitude, longitude } = nearbyBodySchema.parse(request.query)

  const searchGymsUseCase = makeNearbyGymUseCase()

  const { gyms } = await searchGymsUseCase.execute({
    userLatitude: latitude,
    userLongitude: longitude,
  })

  return reply.status(201).send({ gyms })
}
