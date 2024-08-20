import request from 'supertest'
import { beforeAll, afterAll, describe, expect, it } from 'vitest'

import { app } from '@/app'

describe('Authenticate e2e', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to authenticate', async () => {
    await request(app.server).post('/users').send({
      name: 'Larissa Dantier',
      email: 'lari@gmail.com',
      password: 'Lari123',
    })

    const res = await request(app.server).post('/sessions').send({
      email: 'lari@gmail.com',
      password: 'Lari123',
    })

    expect(res.statusCode).toEqual(200)
    expect(res.body).toEqual({ token: expect.any(String) })
  })
})
