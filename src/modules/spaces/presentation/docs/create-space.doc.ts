/**
 * @swagger
 * /spaces:
 *   post:
 *     summary: Cria um novo espaço
 *     tags: [Spaces]
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
 *               hostId:
 *                 type: string
 *     responses:
 *       201:
 *         description: Espaço criado com sucesso
 *       400:
 *         description: Erro de validação
 */