/**
 * @route POST /api/ratings
 * @summary Cria uma nova avaliação para um espaço
 * @tags Ratings
 * @param {string} spaceId.body.required - ID do espaço
 * @param {string} userId.body.required - ID do usuário
 * @param {number} score.body.required - Nota (1 a 5)
 * @param {string} comment.body.optional - Comentário
 * @response 201 - Avaliação criada com sucesso
 * @response 400 - Dados inválidos
 */
// Exemplo de payload:
// {
//   "spaceId": "uuid-do-espaco",
//   "userId": "uuid-do-usuario",
//   "score": 5,
//   "comment": "Ótimo espaço!"
// } 