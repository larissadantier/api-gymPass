import { it, expect, describe } from 'vitest'
import { compare } from 'bcryptjs'

import { RegisterUserCase } from './register'

import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'

import { UserAlreadyExistsError } from './errors/user-already-exists-error'

describe('Register Use Case', () => {
  it('should be able to register', async () => {
    const newUser = {
      name: 'Aline Brandão',
      email: 'aline@gmail.com',
      password: 'Aline123',
    }

    const usersRepository = new InMemoryUsersRepository()
    const registerUseCase = new RegisterUserCase(usersRepository)

    const { user } = await registerUseCase.execute(newUser)

    expect(user.id).toEqual(expect.any(String))
  })

  it('should hash user password upon registration', async () => {
    const newUser = {
      name: 'Aline Brandão',
      email: 'aline@gmail.com',
      password: 'Aline123',
    }
    const usersRepository = new InMemoryUsersRepository()
    const registerUseCase = new RegisterUserCase(usersRepository)

    const { user } = await registerUseCase.execute(newUser)

    const isPasswordCorrectlyHashed = await compare(
      newUser.password,
      user.password_hash,
    )

    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('should not able to register with same email twice', async () => {
    const newUser = {
      name: 'Aline Brandão',
      email: 'aline@gmail.com',
      password: 'Aline123',
    }

    const usersRepository = new InMemoryUsersRepository()
    const registerUseCase = new RegisterUserCase(usersRepository)

    await registerUseCase.execute(newUser)

    expect(() => registerUseCase.execute(newUser)).rejects.toBeInstanceOf(
      UserAlreadyExistsError,
    )
  })
})
