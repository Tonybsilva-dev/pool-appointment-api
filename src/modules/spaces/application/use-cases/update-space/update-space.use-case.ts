import { SpaceRepository } from "@/modules/spaces/domain/repositories/space-repository";

interface UpdateSpaceDTO {
  id: string;
  title?: string;
  description?: string;
  photos?: string[];
  rules?: string;
}

export class UpdateSpaceUseCase {
  constructor(private spaceRepository: SpaceRepository) { }

  async execute(data: UpdateSpaceDTO): Promise<void> {
    const space = await this.spaceRepository.findById(data.id);
    if (!space) throw new Error('Space not found');

    if (data.title) space.title = data.title;
    if (data.description) space.description = data.description;
    if (data.photos) space.photos = data.photos;
    if (data.rules) space.rules = data.rules;

    await this.spaceRepository.update(space);
  }
}