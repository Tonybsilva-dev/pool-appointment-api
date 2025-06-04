import { Space } from '@/modules/spaces/domain/entities/space';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';

interface MakeSpaceProps {
  id?: string;
  title?: string;
  description?: string;
  photos?: string[];
  rules?: string;
  hostId?: string;
}

export function makeSpace(overrides: MakeSpaceProps = {}): Space {
  const {
    id = new UniqueEntityID().toString(),
    title = 'Espaço Teste',
    description = 'Descrição do espaço teste',
    photos = ['photo1.jpg', 'photo2.jpg'],
    rules = 'Regras do espaço teste',
    hostId = 'host-123',
  } = overrides;

  return Space.create({
    title,
    description,
    photos,
    rules,
    hostId,
    createdAt: new Date(),
    updatedAt: new Date(),
  }, new UniqueEntityID(id));
} 