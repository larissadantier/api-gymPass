import request from 'supertest'
import { beforeAll, afterAll, describe, expect, it } from 'vitest'

import { app } from '@/app'

describe('Refresh Token e2e', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to refresh token of user', async () => {
    await request(app.server).post('/users').send({
      name: 'Larissa Dantier',
      email: 'lari@gmail.com',
      password: 'Lari123',
    })

    const authResponse = await request(app.server).post('/sessions').send({
      email: 'lari@gmail.com',
      password: 'Lari123',
    })

    const cookies = authResponse.get('Set-Cookie') ?? []

    const response = await request(app.server)
      .patch('/token/refresh')
      .set('Cookie', cookies)
      .send()

    expect(authResponse.statusCode).toEqual(200)
    expect(authResponse.body).toEqual({ token: expect.any(String) })
    expect(response.get('Set-Cookie')).toEqual([
      expect.stringContaining('refreshToken='),
    ])
  })
})
