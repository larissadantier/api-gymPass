import { makeValidateCheckInsUseCase } from '@/use-cases/factories/make-validate-check-in'
import { FastifyReply, FastifyRequest } from 'fastify'

import { z } from 'zod'

export const validate = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  const validateCheckInParamsSchema = z.object({
    checkInId: z.string().uuid(),
  })

  const { checkInId } = validateCheckInParamsSchema.parse(request.params)

  const validateCheckInUseCase = makeValidateCheckInsUseCase()

  await validateCheckInUseCase.execute({ checkInId })

  return reply.status(204).send()
}
