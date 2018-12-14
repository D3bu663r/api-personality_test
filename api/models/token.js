/**
 * @swagger
 * definitions:
 *   Token:
 *     type: object
 *     properties:
 *       access_token:
 *         type: string
 *       token_type:
 *         type: string
 *       expires_in:
 *         type: number
 *       scope:
 *         type: string
 */
const token = function (token, user) {

    return {
        access_token: token,
        token_type: "Bearer",
        expires_in: 3600,
        scope: user.role
    }
}

module.exports = token;