/**
 * @swagger
 * /ratings/user/{userId}:
 *   get:
 *     summary: Lista avaliações de um usuário
 *     tags: [Ratings]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do usuário
 *       - in: query
 *         name: page
 *         schema:
 *           type: number
 *         description: "Página (default: 1)"
 *       - in: query
 *         name: perPage
 *         schema:
 *           type: number
 *         description: "Itens por página (default: 10)"
 *     responses:
 *       200:
 *         description: Lista de avaliações
 */