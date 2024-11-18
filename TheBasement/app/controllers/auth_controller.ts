import type { HttpContext } from '@adonisjs/core/http'

export default class AuthController {

 

    async create({ view }: HttpContext) {
        return view.render('pages/auth/register')
    }

    async store({ request }: HttpContext) {

        
    }

    async destroy({ view }: HttpContext) {
        return view.render('pages/auth/logout')
    }
}