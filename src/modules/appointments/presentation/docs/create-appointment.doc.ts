/**
 * @swagger
 * /appointments:
 *   post:
 *     summary: Criar um novo agendamento
 *     description: Cria um novo agendamento para um espaço em uma data e horário específicos
 *     tags: [Appointments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - spaceId
 *               - date
 *               - startTime
 *               - endTime
 *             properties:
 *               userId:
 *                 type: string
 *                 format: uuid
 *                 description: ID do usuário que está fazendo o agendamento
 *               spaceId:
 *                 type: string
 *                 format: uuid
 *                 description: ID do espaço que está sendo agendado
 *               date:
 *                 type: string
 *                 format: date-time
 *                 description: Data do agendamento
 *               startTime:
 *                 type: string
 *                 format: date-time
 *                 description: Horário de início do agendamento
 *               endTime:
 *                 type: string
 *                 format: date-time
 *                 description: Horário de fim do agendamento
 *     responses:
 *       201:
 *         description: Agendamento criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 userId:
 *                   type: string
 *                 spaceId:
 *                   type: string
 *                 date:
 *                   type: string
 *                   format: date-time
 *                 startTime:
 *                   type: string
 *                   format: date-time
 *                 endTime:
 *                   type: string
 *                   format: date-time
 *                 status:
 *                   type: string
 *                   enum: [PENDING, CONFIRMED, CANCELLED]
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *       400:
 *         description: Dados inválidos ou conflito de horário
 *       404:
 *         description: Usuário ou espaço não encontrado
 */ 