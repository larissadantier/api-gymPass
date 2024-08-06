import { it, expect, describe } from 'vitest'
import { compare } from 'bcryptjs'

import { RegisterUserCase } from './register'

describe('Register Use Case', () => {
  it('should hash user password upon registration', async () => {
    const newUser = {
      name: 'Aline Brandão',
      email: 'aline@gmail.com',
      password: 'Aline123',
    }

    const registerUseCase = new RegisterUserCase({
      async findByEmail() {
        return null
      },

      async create(data) {
        return {
          id: 'user-1',
          name: data.name,
          email: data.email,
          password_hash: data.password_hash,
          created_at: new Date(),
          updated_at: new Date(),
        }
      },
    })

    const { user } = await registerUseCase.execute(newUser)

    const isPasswordCorrectlyHashed = await compare(
      newUser.password,
      user.password_hash,
    )

    expect(isPasswordCorrectlyHashed).toBe(true)
  })
})
