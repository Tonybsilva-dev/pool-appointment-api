/**
 * @route GET /api/ratings/user/:userId
 * @summary Lista avaliações feitas por um usuário
 * @tags Ratings
 * @param {string} userId.path.required - ID do usuário
 * @param {number} page.query.optional - Página (default: 1)
 * @param {number} perPage.query.optional - Itens por página (default: 10)
 * @response 200 - Lista de avaliações
 */ 