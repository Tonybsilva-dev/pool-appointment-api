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

## Módulo de Agendamentos

### Casos de Uso

#### CreateAppointmentUseCase
- ✅ Deve criar um novo agendamento
- ✅ Deve retornar erro se usuário não existir
- ✅ Deve retornar erro se espaço não existir
- ✅ Deve retornar erro se data for no passado
- ✅ Deve retornar erro se horário de início for maior que fim
- ✅ Deve retornar erro se houver conflito de horário no mesmo espaço
- ✅ Deve permitir agendamentos em espaços diferentes no mesmo horário

#### FindAppointmentByIdUseCase
- ✅ Deve encontrar agendamento por ID
- ✅ Deve retornar null quando agendamento não encontrado
- ✅ Deve encontrar agendamentos com diferentes status
- ✅ Deve retornar todos os campos do agendamento

#### FindAppointmentsByUserIdUseCase
- ✅ Deve retornar agendamentos paginados com total
- ✅ Deve retornar lista vazia quando não existem agendamentos
- ✅ Deve retornar página correta de agendamentos
- ✅ Deve retornar agendamentos com diferentes status
- ✅ Deve retornar última página corretamente
- ✅ Deve lidar com paginação com valores padrão

#### FindAppointmentsBySpaceIdUseCase
- ✅ Deve retornar agendamentos paginados com total
- ✅ Deve retornar lista vazia quando não existem agendamentos
- ✅ Deve retornar página correta de agendamentos
- ✅ Deve retornar agendamentos com diferentes status
- ✅ Deve retornar última página corretamente
- ✅ Deve lidar com paginação com valores padrão

#### UpdateAppointmentUseCase
- ✅ Deve atualizar status do agendamento
- ✅ Deve atualizar data e horário do agendamento
- ✅ Deve atualizar múltiplos campos de uma vez
- ✅ Deve retornar erro se agendamento não existir
- ✅ Deve retornar erro se nova data for no passado
- ✅ Deve retornar erro se horário de início for maior que fim
- ✅ Deve manter campos não modificados

#### DeleteAppointmentUseCase
- ✅ Deve deletar um agendamento
- ✅ Deve retornar erro se agendamento não existir
- ✅ Deve deletar agendamentos com diferentes status
- ✅ Deve deletar múltiplos agendamentos

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

### Appointment
- ✅ Deve criar um agendamento
- ✅ Deve criar agendamento com status customizado
- ✅ Deve lançar erro se data for no passado
- ✅ Deve lançar erro se horário de início for maior que fim
- ✅ Deve atualizar status
- ✅ Deve atualizar data e horário
- ✅ Deve lançar erro ao atualizar data para passado
- ✅ Deve lançar erro ao atualizar horário com range inválido

## Repositórios

### InMemoryUserRepository
- ✅ Deve criar usuário
- ✅ Deve encontrar usuário por email (case insensitive)
- ✅ Deve encontrar usuário por ID
- ✅ Deve retornar null quando usuário não encontrado
- ✅ Deve listar usuários com paginação
- ✅ Deve retornar lista vazia quando não existem usuários
- ✅ Deve retornar página correta de usuários
- ✅ Deve atualizar usuário
- ✅ Deve deletar usuário (marcar como inativo e setar deletedAt)
- ✅ Deve contar usuários ativos e não deletados
- ✅ Deve não contar usuários deletados
- ✅ Deve lidar com paginação com valores padrão
- ✅ Deve retornar usuários ativos mesmo com deletedAt

### PrismaUserRepository
- ✅ Deve criar usuário
- ✅ Deve encontrar usuário por email
- ✅ Deve encontrar usuário por ID
- ✅ Deve listar usuários com paginação
- ✅ Deve atualizar usuário
- ✅ Deve deletar usuário
- ✅ Deve contar usuários ativos e não deletados

### InMemorySpacesRepository
- ✅ Deve criar espaço
- ✅ Deve encontrar espaço por ID
- ✅ Deve retornar null quando espaço não encontrado
- ✅ Deve listar espaços com paginação
- ✅ Deve retornar lista vazia quando não existem espaços
- ✅ Deve atualizar espaço
- ✅ Deve deletar espaço
- ✅ Deve lidar com múltiplos espaços
- ✅ Deve atualizar espaço com propriedades customizadas
- ✅ Deve lidar com paginação corretamente

### InMemoryRatingRepository
- ✅ Deve criar avaliação
- ✅ Deve encontrar avaliação por ID
- ✅ Deve retornar null quando avaliação não encontrada
- ✅ Deve listar avaliações por espaço com paginação
- ✅ Deve listar avaliações por usuário com paginação
- ✅ Deve retornar lista vazia quando não existem avaliações
- ✅ Deve atualizar avaliação
- ✅ Deve deletar avaliação
- ✅ Deve contar avaliações por espaço
- ✅ Deve calcular média de score por espaço
- ✅ Deve retornar 0 quando não existem avaliações
- ✅ Deve lidar com paginação corretamente para avaliações de espaço
- ✅ Deve lidar com paginação corretamente para avaliações de usuário
- ✅ Deve lidar com paginação com valores padrão

### InMemoryAppointmentRepository
- ✅ Deve criar agendamento
- ✅ Deve encontrar agendamento por ID
- ✅ Deve retornar null quando agendamento não encontrado
- ✅ Deve listar agendamentos por usuário com paginação
- ✅ Deve listar agendamentos por espaço com paginação
- ✅ Deve encontrar agendamentos por range de data
- ✅ Deve não retornar agendamentos cancelados no range de data
- ✅ Deve atualizar agendamento
- ✅ Deve deletar agendamento
- ✅ Deve contar agendamentos
- ✅ Deve lidar com paginação corretamente 