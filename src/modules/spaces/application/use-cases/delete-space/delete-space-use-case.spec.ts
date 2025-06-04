import { describe, expect, it } from 'vitest'
import { InMemorySpacesRepository } from 'test/repositories/in-memory-spaces-repository'
import { makeSpace } from 'test/factories/make-space'
import { DeleteSpaceUseCase } from './delete-space.use-case'

describe('Delete Space Use Case', () => {
  it('should delete a space by id', async () => {
    const repository = new InMemorySpacesRepository()
    const deleteUseCase = new DeleteSpaceUseCase(repository)

    const space = makeSpace()
    await repository.create(space)

    await deleteUseCase.execute(space.id.toString())

    expect(repository.items).toHaveLength(0)
  })
})