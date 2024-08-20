import { makeSearchGymsUseCase } from '@/use-cases/factories/make-fetch-search-gym-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'

import { z } from 'zod'

export const search = async (request: FastifyRequest, reply: FastifyReply) => {
  const searchBodySchema = z.object({
    q: z.string(),
    page: z.coerce.number().min(1).default(1),
  })

  const { q, page } = searchBodySchema.parse(request.body)

  const searchGymsUseCase = makeSearchGymsUseCase()

  const { gyms } = await searchGymsUseCase.execute({ query: q, page })

  return reply.status(201).send({ gyms })
}
