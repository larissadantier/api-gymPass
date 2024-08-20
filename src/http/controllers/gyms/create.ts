import { FastifyReply, FastifyRequest } from 'fastify'

import { z } from 'zod'

import { makeCreateGymUseCase } from '@/use-cases/factories/make-create-gym-use-case'

export const create = async (request: FastifyRequest, reply: FastifyReply) => {
  const createBodySchema = z.object({
    title: z.string(),
    latitude: z.number().refine((value) => {
      return Math.abs(value) <= 90
    }),
    longitude: z.number().refine((value) => {
      return Math.abs(value) <= 180
    }),
    description: z.string().nullable(),
    phone: z.string().nullable(),
  })

  const { title, latitude, longitude, description, phone } =
    createBodySchema.parse(request.body)

  const createGymUseCase = makeCreateGymUseCase()

  await createGymUseCase.execute({
    title,
    latitude,
    longitude,
    description,
    phone,
  })

  return reply.status(201).send()
}
