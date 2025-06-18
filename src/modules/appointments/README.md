# Módulo de Appointments

Este módulo gerencia os agendamentos de espaços, permitindo que usuários agendem o uso de um espaço em uma data e horário específicos.

## Funcionalidades

- **Criar agendamento**: Cria um novo agendamento para um espaço
- **Buscar agendamento por ID**: Retorna um agendamento específico
- **Listar agendamentos por usuário**: Lista todos os agendamentos de um usuário
- **Listar agendamentos por espaço**: Lista todos os agendamentos de um espaço
- **Atualizar agendamento**: Atualiza dados de um agendamento existente
- **Cancelar agendamento**: Remove um agendamento

## Regras de Negócio

1. **Validação de data**: Não é possível agendar para datas passadas
2. **Validação de horário**: O horário de início deve ser menor que o horário de fim
3. **Conflito de horários**: Não é possível agendar um espaço que já possui agendamento no mesmo horário
4. **Status do agendamento**: Pode ser PENDING, CONFIRMED ou CANCELLED

## Estrutura do Módulo

```
appointments/
├── domain/
│   ├── entities/
│   │   └── appointment.ts
│   └── repositories/
│       └── appointment-repository.ts
├── application/
│   └── use-cases/
│       ├── create-appointment/
│       ├── find-appointment/
│       ├── update-appointment/
│       └── delete-appointment/
├── infra/
│   └── repositories/
│       └── prisma-appointment-repository.ts
└── presentation/
    ├── controllers/
    ├── validators/
    ├── routes/
    └── docs/
```

## Endpoints

- `POST /api/appointments` - Criar agendamento
- `GET /api/appointments/:id` - Buscar agendamento por ID
- `GET /api/appointments/user/:userId` - Listar agendamentos por usuário
- `GET /api/appointments/space/:spaceId` - Listar agendamentos por espaço
- `PUT /api/appointments/:id` - Atualizar agendamento
- `DELETE /api/appointments/:id` - Deletar agendamento

## Exemplo de Uso

```json
{
  "userId": "user-uuid",
  "spaceId": "space-uuid",
  "date": "2024-01-15T00:00:00.000Z",
  "startTime": "2024-01-15T10:00:00.000Z",
  "endTime": "2024-01-15T12:00:00.000Z"
}
``` 