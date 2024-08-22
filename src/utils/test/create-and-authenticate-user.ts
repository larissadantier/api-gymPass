import { FastifyInstance } from 'fastify'
import request from 'supertest'

export async function createAndAuthenticateUser(app: FastifyInstance) {
  await request(app.server).post('/users').send({
    name: 'Larissa Dantier',
    email: 'lari@gmail.com',
    password: 'Lari123',
  })

  const authResponse = await request(app.server).post('/sessions').send({
    email: 'lari@gmail.com',
    password: 'Lari123',
  })

  const { token } = authResponse.body

  return { token }
}
