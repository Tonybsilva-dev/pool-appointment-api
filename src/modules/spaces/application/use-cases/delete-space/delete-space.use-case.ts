import { SpaceRepository } from "@/modules/spaces/domain/repositories/space-repository";

export class DeleteSpaceUseCase {
  constructor(private spaceRepository: SpaceRepository) { }

  async execute(id: string): Promise<void> {
    await this.spaceRepository.delete(id);
  }
}
