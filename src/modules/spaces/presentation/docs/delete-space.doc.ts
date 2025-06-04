/**
 * @swagger
 * /spaces/{id}:
 *   delete:
 *     summary: Deleta um espaço pelo ID
 *     tags: [Spaces]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do espaço
 *     responses:
 *       204:
 *         description: Espaço deletado com sucesso
 *       404:
 *         description: Espaço não encontrado
 */