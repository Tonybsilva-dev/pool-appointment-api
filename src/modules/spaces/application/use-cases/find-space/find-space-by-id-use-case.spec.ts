
import { makeSpace } from 'test/factories/make-space'
import { InMemorySpacesRepository } from 'test/repositories/in-memory-spaces-repository'
import { describe, it, expect } from 'vitest'
import { FindSpaceByIdUseCase } from './find-space-by-id.use-case'

describe('Find Space By ID Use Case', () => {
  it('should return a space by id', async () => {
    const repository = new InMemorySpacesRepository()
    const findUseCase = new FindSpaceByIdUseCase(repository)

    const space = makeSpace()
    await repository.create(space)

    const found = await findUseCase.execute(space.id.toString())

    expect(found).toBeTruthy()
    expect(found).toEqual(space)
    expect(found?.id.toString()).toBe(space.id.toString())
  })
})