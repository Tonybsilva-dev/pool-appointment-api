import { SpaceRepository } from "@/modules/spaces/domain/repositories/space-repository";
import { Space } from "@/modules/spaces/domain/entities/space";
import { PaginationParams } from "@/core/repositories/pagination-params";

export class InMemorySpacesRepository implements SpaceRepository {
  public items: Space[] = [];

  async create(space: Space): Promise<void> {
    this.items.push(space);
  }

  async findById(id: string): Promise<Space | null> {
    const space = this.items.find((item) => item.id.toString() === id);
    return space ?? null;
  }

  async findAll({ page = 1, perPage = 10 }: PaginationParams): Promise<{ total: number, spaces: Space[] }> {
    const start = (page - 1) * perPage;
    const end = start + perPage;
    const spaces = this.items.slice(start, end);
    const total = this.items.length;

    return { total, spaces };
  }

  async update(space: Space): Promise<void> {
    const index = this.items.findIndex((item) => item.id.toString() === space.id.toString());
    if (index >= 0) {
      this.items[index] = space;
    }
  }

  async delete(id: string): Promise<void> {
    this.items = this.items.filter((item) => item.id.toString() !== id);
  }
}
