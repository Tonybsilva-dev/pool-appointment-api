import { SpaceRepository } from "@/modules/spaces/domain/repositories/space-repository";
import { Space } from "@/modules/spaces/domain/entities/space";

export class InMemorySpacesRepository implements SpaceRepository {
  public items: Space[] = [];

  async create(space: Space): Promise<void> {
    this.items.push(space);
  }

  async findById(id: string): Promise<Space | null> {
    const space = this.items.find((item) => item.id.toString() === id);
    return space ?? null;
  }

  async findAll(): Promise<Space[]> {
    return this.items;
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
