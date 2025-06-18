/**
 * @swagger
 * /ratings/{id}:
 *   put:
 *     summary: Atualiza uma avaliação existente
 *     tags: [Ratings]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da avaliação
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               score:
 *                 type: number
 *                 description: Nota (1 a 5)
 *               comment:
 *                 type: string
 *                 description: Comentário
 *     responses:
 *       200:
 *         description: Avaliação atualizada com sucesso
 *       400:
 *         description: Dados inválidos
 *       404:
 *         description: Avaliação não encontrada
 */
// Exemplo de payload:
// {
//   "score": 4,
//   "comment": "Atualização do comentário."
// } 