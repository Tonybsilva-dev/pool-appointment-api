/**
 * @swagger
 * /spaces/{id}:
 *   put:
 *     summary: Atualiza um espaço pelo ID
 *     tags: [Spaces]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do espaço
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               photos:
 *                 type: array
 *                 items:
 *                   type: string
 *               rules:
 *                 type: string
 *     responses:
 *       200:
 *         description: Espaço atualizado com sucesso
 *       400:
 *         description: Erro de validação
 *       404:
 *         description: Espaço não encontrado
 */