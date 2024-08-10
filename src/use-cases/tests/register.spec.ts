import { it, expect, describe, beforeEach } from 'vitest'
import { compare } from 'bcryptjs'

import { RegisterUserCase } from '../register'

import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'

import { UserAlreadyExistsError } from '../errors/user-already-exists-error'

let usersRepository: InMemoryUsersRepository
let sut: RegisterUserCase

describe('Register Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new RegisterUserCase(usersRepository)
  })

  it('should be able to register', async () => {
    const newUser = {
      name: 'Aline Brandão',
      email: 'aline@gmail.com',
      password: 'Aline123',
    }

    const { user } = await sut.execute(newUser)

    expect(user.id).toEqual(expect.any(String))
  })

  it('should hash user password upon registration', async () => {
    const newUser = {
      name: 'Aline Brandão',
      email: 'aline@gmail.com',
      password: 'Aline123',
    }

    const { user } = await sut.execute(newUser)

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

    await sut.execute(newUser)

    await expect(() => sut.execute(newUser)).rejects.toBeInstanceOf(
      UserAlreadyExistsError,
    )
  })
})
