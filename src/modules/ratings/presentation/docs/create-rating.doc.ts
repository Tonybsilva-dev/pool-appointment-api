/**
 * @swagger
 * /ratings:
 *   post:
 *     summary: Cria uma nova avaliação para um espaço
 *     tags: [Ratings]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               spaceId:
 *                 type: string
 *                 description: ID do espaço
 *               userId:
 *                 type: string
 *                 description: ID do usuário
 *               score:
 *                 type: number
 *                 description: Nota (1 a 5)
 *               comment:
 *                 type: string
 *                 description: Comentário
 *     responses:
 *       201:
 *         description: Avaliação criada com sucesso
 *       400:
 *         description: Dados inválidos
 */
// Exemplo de payload:
// {
//   "spaceId": "uuid-do-espaco",
//   "userId": "uuid-do-usuario",
//   "score": 5,
//   "comment": "Ótimo espaço!"
// } 