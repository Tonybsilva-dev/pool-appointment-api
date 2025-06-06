import { InMemorySpacesRepository } from "test/repositories/in-memory-spaces-repository"
import { describe, expect, it } from "vitest"
import { CreateSpaceUseCase } from "../create-space/create-space.use-case"
import { UpdateSpaceUseCase } from "./update-space.use-case"
import { makeSpace } from "test/factories/make-space"


describe('Update Space Use Case', () => {
  it('should update space details', async () => {
    const repository = new InMemorySpacesRepository()
    const createUseCase = new CreateSpaceUseCase(repository)
    const updateUseCase = new UpdateSpaceUseCase(repository)

    const space = makeSpace()
    await repository.create(space)

    await updateUseCase.execute({
      id: space.id.toString(),
      title: 'Piscina Atualizada',
      description: 'Com iluminação',
      rules: 'Sem som alto',
      photos: ['nova.jpg']
    })

    const updatedSpace = await repository.findById(space.id.toString())
    expect(updatedSpace?.title).toBe('Piscina Atualizada')
    expect(updatedSpace?.description).toBe('Com iluminação')
  })
})