/**
 * @route PUT /api/ratings/:id
 * @summary Atualiza uma avaliação existente
 * @tags Ratings
 * @param {string} id.path.required - ID da avaliação
 * @param {number} score.body.optional - Nota (1 a 5)
 * @param {string} comment.body.optional - Comentário
 * @response 200 - Avaliação atualizada com sucesso
 * @response 400 - Dados inválidos
 * @response 404 - Avaliação não encontrada
 */
// Exemplo de payload:
// {
//   "score": 4,
//   "comment": "Atualização do comentário."
// } 