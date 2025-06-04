import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { Space } from '@/modules/spaces/domain/entities/space';
import { SpaceRepository } from '@/modules/spaces/domain/repositories/space-repository';

interface CreateSpaceDTO {
  title: string;
  description: string;
  photos: string[];
  rules: string;
  hostId: string;
}

export class CreateSpaceUseCase {
  constructor(private spaceRepository: SpaceRepository) { }

  async execute(data: CreateSpaceDTO): Promise<{ space: Space }> {
    const space = Space.create({
      ...data,
      createdAt: new Date(),
      updatedAt: new Date()
    }, new UniqueEntityID());

    await this.spaceRepository.create(space);
    return { space };
  }
}