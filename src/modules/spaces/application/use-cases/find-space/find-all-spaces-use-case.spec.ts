import { InMemorySpacesRepository } from 'test/repositories/in-memory-spaces-repository'
import { makeSpace } from 'test/factories/make-space'
import { describe, it, expect } from 'vitest'
import { FindAllSpacesUseCase } from './find-all-spaces.use-case'

describe('Find All Spaces Use Case', () => {
  it('should list all created spaces', async () => {
    const repository = new InMemorySpacesRepository()
    const listUseCase = new FindAllSpacesUseCase(repository)

    const space1 = makeSpace({ title: 'Piscina 1' })
    const space2 = makeSpace({ title: 'Piscina 2' })

    await repository.create(space1)
    await repository.create(space2)

    const { spaces, total } = await listUseCase.execute({ page: 1, perPage: 10 })

    expect(total).toBe(2)
    expect(spaces).toHaveLength(2)
  })
})