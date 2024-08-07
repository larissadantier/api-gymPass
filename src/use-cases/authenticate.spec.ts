import { describe, expect, it } from 'vitest'
import { hash } from 'bcryptjs'

import { AuthenticateUserCase } from './authenticate'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

describe('Authenticate Use Case', () => {
  it('should be able to authenticate ', async () => {
    const userRepository = new InMemoryUsersRepository()
    const sut = new AuthenticateUserCase(userRepository)

    await userRepository.create({
      name: 'Aline Brandão',
      email: 'aline@gmail.com',
      password_hash: await hash('Aline123', 6),
    })

    const { user } = await sut.execute({
      email: 'aline@gmail.com',
      password: 'Aline123',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should not be able to authenticate with wrong email', async () => {
    const userRepository = new InMemoryUsersRepository()
    const sut = new AuthenticateUserCase(userRepository)

    await userRepository.create({
      name: 'Aline Brandão',
      email: 'aline2@gmail.com',
      password_hash: await hash('Aline123', 6),
    })

    await expect(() =>
      sut.execute({
        email: 'aline@gmail.com',
        password: 'Aline123',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be able to authenticate with wrong password', async () => {
    const userRepository = new InMemoryUsersRepository()
    const sut = new AuthenticateUserCase(userRepository)

    await userRepository.create({
      name: 'Aline Brandão',
      email: 'aline2@gmail.com',
      password_hash: await hash('Aline123', 6),
    })

    await expect(() =>
      sut.execute({
        email: 'aline@gmail.com',
        password: 'Aline126',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
