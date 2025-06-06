/**
 * @route GET /api/ratings/space/:spaceId
 * @summary Lista avaliações de um espaço
 * @tags Ratings
 * @param {string} spaceId.path.required - ID do espaço
 * @param {number} page.query.optional - Página (default: 1)
 * @param {number} perPage.query.optional - Itens por página (default: 10)
 * @response 200 - Lista de avaliações
 */ 