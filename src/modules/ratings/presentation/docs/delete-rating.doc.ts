/**
 * @route DELETE /api/ratings/:id
 * @summary Remove uma avaliação
 * @tags Ratings
 * @param {string} id.path.required - ID da avaliação
 * @response 204 - Avaliação removida com sucesso
 * @response 404 - Avaliação não encontrada
 */ 