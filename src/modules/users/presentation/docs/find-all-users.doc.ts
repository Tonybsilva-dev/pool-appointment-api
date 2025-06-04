/**
 * @swagger
 * /users:
 *   get:
 *     summary: Lista usuários com paginação
 *     tags: [Users]
 *     parameters:
 *       - name: page
 *         in: query
 *         required: true
 *         schema:
 *           type: integer
 *       - name: perPage
 *         in: query
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Lista de usuários
 *       400:
 *         description: Parâmetros inválidos
 */