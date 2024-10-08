import { Gym, Prisma } from '@prisma/client'
import { randomUUID } from 'node:crypto'

import { FindManyNearbyParams, GymsRepository } from '../gyms-repository'
import { getDistanceBeetwenCoordinates } from '@/utils/get-distance-beetwen-coordinates'

export class InMemoryGymsRepository implements GymsRepository {
  public items: Gym[] = []

  async findById(id: string) {
    const gym = this.items.find((item) => item.id === id)

    if (!gym) return null

    return gym
  }

  async searchMany(query: string, page: number) {
    const gyms = this.items
      .filter((items) => items.title.includes(query))
      .slice((page - 1) * 20, page * 20)

    return gyms
  }

  async findManyNearby(params: FindManyNearbyParams) {
    return this.items.filter((item) => {
      const distance = getDistanceBeetwenCoordinates(
        { latitude: params.latitude, longitude: params.longitude },
        {
          latitude: Number(item.latitude),
          longitude: Number(item.longitude),
        },
      )

      return distance < 10
    })
  }

  async create(data: Prisma.GymCreateInput) {
    const gym = {
      id: data.id ?? randomUUID(),
      title: data.title,
      description: data.description ?? null,
      phone: data.phone ?? null,
      latitude: new Prisma.Decimal(String(data.latitude)),
      longitude: new Prisma.Decimal(String(data.longitude)),
      created_at: new Date(),
    }

    this.items.push(gym)

    return gym
  }
}
