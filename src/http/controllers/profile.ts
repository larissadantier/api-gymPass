import { FastifyRequest, FastifyReply } from 'fastify'
import z from 'zod'

import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { makeGetUserProfileUseCase } from '@/use-cases/factories/make-get-user-profile-use-case'

export async function profile(request: FastifyRequest, reply: FastifyReply) {
  const profileBodySchema = z.object({
    id: z.string().uuid(),
  })

  const { id } = profileBodySchema.parse(request.body)

  try {
    const getUserProfileUseCase = makeGetUserProfileUseCase()

    await getUserProfileUseCase.execute({ userId: id })
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(400).send({ message: err.message })
    }
    throw err
  }

  return reply.status(200).send()
}
