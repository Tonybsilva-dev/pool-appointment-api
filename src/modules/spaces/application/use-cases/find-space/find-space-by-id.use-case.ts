import { Space } from "@/modules/spaces/domain/entities/space";
import { SpaceRepository } from "@/modules/spaces/domain/repositories/space-repository";

export class FindSpaceByIdUseCase {
  constructor(private spaceRepository: SpaceRepository) { }

  async execute(id: string): Promise<Space | null> {
    return await this.spaceRepository.findById(id);
  }
} 