export class AuthTokenError extends Error{
    constructor(){
        super('Error de autenticação do token')
    }
}