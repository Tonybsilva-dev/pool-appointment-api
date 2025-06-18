/**
 * @swagger
 * /appointments/{id}:
 *   delete:
 *     summary: Deletar agendamento
 *     description: Remove um agendamento existente
 *     tags: [Appointments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID do agendamento
 *     responses:
 *       204:
 *         description: Agendamento deletado com sucesso
 *       404:
 *         description: Agendamento não encontrado
 */ 