import { describe, it, expect, beforeEach } from 'vitest';
import { CreateSpaceUseCase } from './create-space.use-case';
import { InMemorySpacesRepository } from 'test/repositories/in-memory-spaces-repository';
import { makeSpace } from 'test/factories/make-space';

let spacesRepository: InMemorySpacesRepository;
let createSpaceUseCase: CreateSpaceUseCase;

describe('Create Space Use Case', () => {
  beforeEach(() => {
    spacesRepository = new InMemorySpacesRepository();
    createSpaceUseCase = new CreateSpaceUseCase(spacesRepository);
  });

  it('should create a new space', async () => {
    const spaceData = {
      title: 'Piscina Azul',
      description: 'Espaço com piscina aquecida e churrasqueira',
      photos: ['img1.jpg', 'img2.jpg'],
      rules: 'Não é permitido animais',
      hostId: 'host-123',
    };

    const result = await createSpaceUseCase.execute(spaceData);

    expect(result.space).toBeTruthy();
    expect(result.space.title).toBe(spaceData.title);
    expect(result.space.photos).toContain(spaceData.photos[0]);
  });
});