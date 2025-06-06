/**
 * @swagger
 * /spaces/{id}:
 *   get:
 *     summary: Busca um espaço pelo ID
 *     tags: [Spaces]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do espaço
 *     responses:
 *       200:
 *         description: Espaço encontrado
 *       404:
 *         description: Espaço não encontrado
 */