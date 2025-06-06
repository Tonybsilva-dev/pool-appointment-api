# Testes da Aplicação

## Módulo de Usuários

### Casos de Uso

#### CreateUserUseCase
- ✅ Deve criar um novo usuário
- ✅ Não deve permitir emails duplicados
- ✅ Deve criar usuário admin
- ✅ Deve criar usuário inativo
- ✅ Deve fazer hash da senha
- ✅ Deve ser case insensitive para unicidade de email

#### UpdateUserUseCase
- ✅ Deve atualizar nome do usuário
- ✅ Deve atualizar email do usuário
- ✅ Deve atualizar status do usuário
- ✅ Deve atualizar role do usuário
- ✅ Deve limpar deletedAt ao reativar usuário
- ✅ Deve atualizar updatedAt ao modificar usuário
- ✅ Deve manter campos não modificados

#### DeleteUserUseCase
- ✅ Deve marcar usuário como deletado
- ✅ Deve atualizar updatedAt ao deletar
- ✅ Deve manter status do usuário ao deletar
- ✅ Deve retornar erro se usuário não existir

#### FindUserByIdUseCase
- ✅ Deve encontrar usuário por ID
- ✅ Deve retornar null quando usuário não encontrado
- ✅ Deve encontrar usuário inativo
- ✅ Deve encontrar usuário deletado
- ✅ Deve retornar todos os campos do usuário

#### FindUserByEmailUseCase
- ✅ Deve encontrar usuário por email
- ✅ Deve retornar null quando usuário não encontrado
- ✅ Deve encontrar usuário inativo
- ✅ Deve encontrar usuário deletado
- ✅ Deve retornar todos os campos do usuário
- ✅ Deve ser case insensitive para email

#### FindAllUsersUseCase
- ✅ Deve retornar usuários paginados com total
- ✅ Deve retornar lista vazia quando não existem usuários
- ✅ Deve retornar página correta de usuários
- ✅ Deve retornar usuários ativos mesmo com deletedAt
- ✅ Deve retornar última página corretamente

#### CountUsersUseCase
- ✅ Deve contar usuários ativos
- ✅ Deve retornar zero quando não existem usuários
- ✅ Não deve contar usuários inativos
- ✅ Não deve contar usuários deletados
- ✅ Deve contar usuários com diferentes roles

#### AuthenticateUserUseCase
- ✅ Deve autenticar usuário com credenciais válidas
- ✅ Deve retornar erro com credenciais inválidas
- ✅ Deve retornar erro se usuário não existir
- ✅ Deve retornar erro se senha estiver incorreta
- ✅ Deve retornar erro se usuário estiver inativo
- ✅ Deve retornar erro se usuário estiver deletado
- ✅ Deve ser case insensitive para email

## Módulo de Espaços

### Casos de Uso

#### CreateSpaceUseCase
- ✅ Deve criar um novo espaço

#### UpdateSpaceUseCase
- ✅ Deve atualizar um espaço existente

#### DeleteSpaceUseCase
- ✅ Deve deletar um espaço existente

#### FindSpaceByIdUseCase
- ✅ Deve encontrar espaço por ID

#### FindAllSpacesUseCase
- ✅ Deve listar todos os espaços

### Avaliações

#### CreateRatingUseCase
- ✅ Deve criar uma nova avaliação
- ✅ Deve criar avaliação sem comentário
- ✅ Deve lançar erro se nota for menor que 1
- ✅ Deve lançar erro se nota for maior que 5

#### UpdateRatingUseCase
- ✅ Deve atualizar nota da avaliação
- ✅ Deve atualizar comentário da avaliação
- ✅ Deve lançar erro se nota for menor que 1
- ✅ Deve lançar erro se nota for maior que 5

#### DeleteRatingUseCase
- ✅ Deve deletar uma avaliação
- ✅ Deve lançar erro se avaliação não existir

#### FindRatingByIdUseCase
- ✅ Deve encontrar avaliação por ID
- ✅ Deve retornar null quando avaliação não encontrada

#### FindRatingsBySpaceIdUseCase
- ✅ Deve listar avaliações de um espaço
- ✅ Deve retornar lista vazia quando não existem avaliações
- ✅ Deve retornar página correta de avaliações

#### FindRatingsByUserIdUseCase
- ✅ Deve listar avaliações de um usuário
- ✅ Deve retornar lista vazia quando não existem avaliações
- ✅ Deve retornar página correta de avaliações

#### GetSpaceAverageRatingUseCase
- ✅ Deve retornar média das avaliações de um espaço
- ✅ Deve retornar 0 quando não existem avaliações

## Entidades

### User
- ✅ Deve criar um usuário
- ✅ Deve atualizar nome do usuário
- ✅ Deve atualizar email do usuário
- ✅ Deve atualizar status do usuário
- ✅ Deve atualizar role do usuário
- ✅ Deve deletar usuário
- ✅ Deve criar usuário com props customizadas

### Space
- ✅ Deve criar um espaço
- ✅ Deve atualizar um espaço
- ✅ Deve deletar um espaço
- ✅ Deve criar espaço com props customizadas

### Rating
- ✅ Deve criar uma avaliação
- ✅ Deve atualizar nota da avaliação
- ✅ Deve atualizar comentário da avaliação
- ✅ Deve lançar erro se nota for inválida
- ✅ Deve criar avaliação com props customizadas

## Repositórios

### InMemoryUserRepository
- ✅ Deve criar usuário
- ✅ Deve encontrar usuário por email (case insensitive)
- ✅ Deve encontrar usuário por ID
- ✅ Deve listar usuários com paginação
- ✅ Deve atualizar usuário
- ✅ Deve deletar usuário
- ✅ Deve contar usuários ativos e não deletados

### PrismaUserRepository
- ✅ Deve criar usuário
- ✅ Deve encontrar usuário por email
- ✅ Deve encontrar usuário por ID
- ✅ Deve listar usuários com paginação
- ✅ Deve atualizar usuário
- ✅ Deve deletar usuário
- ✅ Deve contar usuários ativos e não deletados

### InMemoryRatingRepository
- ✅ Deve criar avaliação
- ✅ Deve encontrar avaliação por ID
- ✅ Deve listar avaliações por espaço
- ✅ Deve listar avaliações por usuário
- ✅ Deve atualizar avaliação
- ✅ Deve deletar avaliação
- ✅ Deve contar avaliações por espaço
- ✅ Deve calcular média de avaliações por espaço 