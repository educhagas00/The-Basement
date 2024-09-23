import type { HttpContext } from '@adonisjs/core/http'
import UsersController from './users_controller.js'

const usersData = [
    {
        email: 'vmigu@gmail.com',
        senha: 'pipipi',
    },
    {
        email: 'tangas@gmail.com',
        senha: 'popopo',
    },
]

export default class SignUpController {
    
    public async index({ view }: HttpContext) {
        return view.render('signup')
    }

    public async store({ request, response }: HttpContext) {
        // Captura os dados do formulário (email e senha)
        const newSignUp = request.only(['email', 'senha'])
    
        // Armazena o email e senha em uma variável const
        usersData.push({
            ...newSignUp
        })
    
        // Retorna uma resposta simples ou redireciona para outra página
        response.status(200)
        return { message: 'foi'}
    }
}