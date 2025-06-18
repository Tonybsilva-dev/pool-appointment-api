/**
 * @swagger
 * /ratings/space/{spaceId}:
 *   get:
 *     summary: Lista avaliações de um espaço
 *     tags: [Ratings]
 *     parameters:
 *       - in: path
 *         name: spaceId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do espaço
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