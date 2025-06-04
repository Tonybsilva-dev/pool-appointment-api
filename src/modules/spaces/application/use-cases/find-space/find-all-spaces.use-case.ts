import { PaginationParams } from "@/core/repositories/pagination-params";
import { Space } from "@/modules/spaces/domain/entities/space";
import { SpaceRepository } from "@/modules/spaces/domain/repositories/space-repository";

export class FindAllSpacesUseCase {
  constructor(private spaceRepository: SpaceRepository) { }

  async execute(params: PaginationParams): Promise<{ total: number, spaces: Space[] }> {
    return await this.spaceRepository.findAll(params);
  }
}